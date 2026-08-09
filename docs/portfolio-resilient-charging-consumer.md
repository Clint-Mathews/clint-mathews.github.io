---
title: "Designing a Kafka consumer that degrades instead of dying"
---

<div class="rfc-card" id="portfolio-resilient-consumer">
<div class="rfc-header">
  <h1 style="margin:0;font-size:1.55em;">Designing a Kafka consumer that degrades instead of dying</h1>
  <span class="project-tag tag--highlight">Architecture RFC</span>
  <!-- <span class="project-tag" style="background:#fef3c7;color:#92400e;border-color:#d97706;">Design — under review</span> -->
</div>

<div class="portfolio-meta" style="display:flex;flex-wrap:wrap;gap:24px;margin:16px 0 24px;padding:16px 0;border-top:1px solid var(--vp-c-border);border-bottom:1px solid var(--vp-c-border);">
  <div>
    <div style="font-size:0.78em;text-transform:uppercase;letter-spacing:0.05em;color:var(--vp-c-text-3);margin-bottom:3px;">Role</div>
    <div style="font-weight:600;font-size:0.95em;">Backend Lead — RFC author</div>
  </div>
  <div>
    <div style="font-size:0.78em;text-transform:uppercase;letter-spacing:0.05em;color:var(--vp-c-text-3);margin-bottom:3px;">Duration</div>
    <div style="font-weight:600;font-size:0.95em;">Dec 2025 – Jan 2026</div>
  </div>
  <div>
    <div style="font-size:0.78em;text-transform:uppercase;letter-spacing:0.05em;color:var(--vp-c-text-3);margin-bottom:3px;">Scale</div>
    <div style="font-weight:600;font-size:0.95em;">10,000+ EV chargers · 6 pods · 10 partitions · two regions</div>
  </div>
  <div>
    <div style="font-size:0.78em;text-transform:uppercase;letter-spacing:0.05em;color:var(--vp-c-text-3);margin-bottom:3px;">Headline metric</div>
    <div style="font-weight:600;font-size:0.95em;">Up to 14.4 M messages a day against a 500 MB pod ceiling</div>
  </div>
</div>

<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:28px;">
  <span class="project-tag">Kafka</span>
  <span class="project-tag">Redis</span>
  <span class="project-tag">BullMQ</span>
  <span class="project-tag">Node.js</span>
  <span class="project-tag">Kubernetes</span>
  <span class="project-tag">OCPP</span>
</div>

<div class="rfc-body">

## The problem

A consumer service ingested OCPP events from a fleet of more than 10,000 EV chargers. Each charger reports one to two messages every two minutes whether or not anyone is plugged in — so the fleet produces **5,000–10,000 messages a minute, 7.2 to 14.4 million a day**, with no overnight lull to recover in. The service polled Kafka in batches of 100+ and dispatched every message fire-and-forget, which meant nothing bounded the work in flight.

That was survivable until the downstream Charging Management System degraded. Then it wasn't. Each of six pods was absorbing 830–1,670 messages a minute; with the downstream unable to retire any of them, and three retries per message on top, in-flight work accumulated far faster than a pod could shed it. **Pods hit their 500 MB Kubernetes limit and were OOMKilled within 5–10 minutes.** Recovery was manual and took the better part of an hour. Every crash also risked losing messages, because Kafka offsets were committed before the work was actually safe.

The arithmetic of a full 30-minute outage is the part that decided the design: 150,000–300,000 messages fleet-wide, 25,000–50,000 per pod, up to 150,000 downstream calls once retries are counted. No pod ever survived to see that backlog — it died in the first ten minutes, its partitions were reassigned, and the pressure moved to whichever pod picked them up.

---

## Architecture

<div style="overflow-x:auto;margin:28px 0;">

![Resilient event-driven consumer architecture — Kafka topic with 10 partitions feeds a consumer group of 6 pods, which enqueue into 20 Redis-backed queues. Partition-isolated worker pools guarded by 20 circuit breakers call the regional downstream service.](/fleet-charging-consumer-architecture.svg)

</div>

The diagram shows the four numbered defence layers and how they compose. Each one fails into the next — the design principle throughout.

---

## Four layers of defence

**① Bounded intake**

Fire-and-forget dispatch was replaced with batch polling (50–100 messages) and *sequential* enqueue. Work in flight became a number I chose rather than a number the broker chose for me. This alone prevents the initial accumulation that triggers OOM.

**② Durable offload**

Messages move immediately into Redis-backed BullMQ queues — 20 of them, one per partition per region. Kafka offsets commit only *after* a successful enqueue. That single reordering moves the durability boundary to Redis and turns message loss from a pod-crash problem into a Redis problem. Jobs are keyed on partition + offset, making them idempotent by construction.

**③ Backpressure — pause at 80% depth**

When a queue reaches 80% of capacity, the consumer pauses that Kafka partition. The system stops accepting work it cannot hold rather than accepting it and dying. Crucially the pause is reversible — once the queue drains, the partition resumes automatically without manual intervention.

**④ Circuit breaking**

Twenty independent breakers, one per partition-region pair, open after sustained downstream failure and back off from 30 seconds to a five-minute ceiling. This is what stops retry amplification at the source — the difference between tens of thousands of calls into a degraded system and near zero. Isolation runs through all of it: workers are partitioned rather than pooled, so a failure in one region cannot starve the other of capacity.

---

## The tradeoffs

The interesting decisions were the things I gave up.

**Exactly-once semantics.** Kafka transactions plus a transactional outbox would have given end-to-end exactly-once. The downstream API isn't transactional, so the guarantee would have been partly theatre in exchange for real complexity. I took under 0.1% duplicate processing instead and made jobs idempotent by keying them on partition and offset.

**A single global worker pool.** Fewer workers, simpler topology — and one regional outage could exhaust the pool and take everything down with it. Rejected for insufficient isolation.

**One cost I couldn't design away.** The pause mechanism operates at Kafka partition granularity, but queues are per partition *per region*. If one region's queue saturates within a partition, pausing that partition delays the other region's traffic too. Regional isolation holds for worker capacity but not for ingestion. I documented it rather than hid it; removing it means either per-region topics or a partitioning scheme keyed on region, both of which cost more than the failure mode is currently worth.

---

## Design targets

This is a design under review, not a shipped result. These are the criteria it commits to being measured against.

| | Before | Target |
|---|---|---|
| OOM crashes during downstream outage | Pods dead in 5–10 min | **0** |
| Mean time to recovery | Manual, ~45–60 min | **< 5 min** |
| Message accounting | Loss on crash | **100%** (consumed = completed + failed + DLQ) |
| Sustained throughput | 5,000–10,000 msg/min | **12,000 msg/min**, design capacity 50,000 |
| Enqueue failure rate | — | **< 0.1%** |
| Offset gaps | — | **0 / day** |

<div class="metrics-row" style="margin-top:20px;">
  <span class="metric-badge">0 OOM crashes during outage</span>
  <span class="metric-badge">MTTR &lt; 5 min</span>
  <span class="metric-badge">100% message accounting</span>
  <span class="metric-badge">20 independent circuit breakers</span>
  <span class="metric-badge">&lt; 0.1% duplicates</span>
  <span class="metric-badge">0 offset gaps / day</span>
</div>

---

## What I'd change

I'd have insisted on production-load simulation before the design review rather than after. The whole architecture is a bet about behaviour under a load nobody has actually reproduced, and the pause-granularity tradeoff is exactly the kind of thing a real load test either vindicates or embarrasses. The RFC documents this gap explicitly — the load test is the next gate.

</div>
</div>

<div style="margin-top:40px;padding-top:24px;border-top:1px solid var(--vp-c-border);">
  <a href="/architecture" style="font-weight:500;color:var(--vp-c-brand-1);">← Back to Architecture & RFCs</a>
</div>
