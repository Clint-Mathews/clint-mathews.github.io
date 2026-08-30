# Deep Dives

Where I moved past implementation into system design: the problem, the
alternatives I weighed, what I rejected and why, and where the decision landed.

<div class="project-card project-card--ai">

### Featured case study: Resilient Charging Consumer

<div class="project-body">

The fleet consumer's fire-and-forget dispatch became the platform's own failure
mode as volume grew. I authored the RFC redesigning it around bounded
concurrency, backpressure, and circuit breaking, then implemented that
architecture in full.

[Read the full case study →](/portfolio-resilient-charging-consumer)

</div>
</div>

*Details below are abstracted to focus on architectural patterns and trade-offs
rather than confidential business logic.*

---

<div class="rfc-card">
<div class="rfc-header">
<h3>Rearchitecting a Reporting Pipeline for Reliability at Scale</h3>
<span class="project-tag tag--active">Architecture RFC, adopted</span>
</div>

<div class="rfc-body">

**Status: adopted and shipped.** This design was reviewed, approved, and built. The async job queue is what runs report generation on the platform today.

**The Challenge**
The platform's report generation ran entirely inside a single blocking HTTP request. Collecting scope, calling downstream APIs in batches, transforming data, uploading to cloud storage, and emailing signed links all happened synchronously. At scale (19 report types × up to 300 sites ≈ 5,700 downstream API calls), this produced 30+ minute blocked connections, gateway timeouts, OOM crashes, and all-or-nothing failures, leading to a 91.3% overall success rate.

**Investigation & Patterns Evaluated**
I diagnosed six distinct architectural failure modes from production data. Before proposing a design, I evaluated the simplest possible fix, keeping it synchronous but streaming progress via Server-Sent Events (SSE).
- **Server-Sent Events (SSE) (rejected):** quantified analysis showed severe thread exhaustion (each concurrent user permanently pins a thread for 15+ mins) and memory accumulation (fetched records sit in-process until the response fully flushes). It also failed to scale horizontally.
- **Async job queue (chosen):** decoupling report generation from the request lifecycle using Celery + Redis + MongoDB, moving the existing reporting function **unmodified** into a Celery task to minimise migration risk, with job state tracked in MongoDB.

**Before & After Architecture**

*Before: Synchronous Bottleneck*

![Synchronous Bottleneck](./public/Synchronous-Bottleneck.png)

*After: Asynchronous Decoupling*

![Asynchronous Decoupling](./public/Asynchronous-Decoupling.png)

**The Trade-off**
We traded a larger immediate rewrite (offloading report logic entirely into the downstream services) for a staged migration. The queue stabilises the system first, setting up a clean path to migrate report types incrementally later.

**Result**
Reliability targeted from 91.3% to 99.9%. Response times went from 5-30 minutes of blocking wait to a Job ID returned in under a second. Blast radius became isolated to individual workers, so partial successes replaced all-or-nothing failures.

<div class="metrics-row" style="margin-top:20px;margin-bottom:16px;">
  <span class="metric-badge">91.3% → 99.9% target reliability</span>
  <span class="metric-badge">30 min wait → &lt;1s Job ID</span>
  <span class="metric-badge">5,700 downstream calls decoupled</span>
  <span class="metric-badge">Partial-success recovery</span>
</div>

**Additional Info**

![Synchronus Report Generation](./public/synchronus-report-generation.jpeg)

![Why SSEE Streaming was rejected](./public/why-sse-streaming-was-rejected.jpeg)

![Async Report Generation](./public/async-queue-after.jpeg)

</div>
</div>

---

<div class="rfc-card">
<div class="rfc-header">
<h3>Building a Resilient Event-Driven Consumer That Stops Cascading Failures</h3>
<span class="project-tag" style="background:#fef3c7;color:#92400e;border-color:#d97706;">Not adopted, built independently</span>
</div>

<div class="rfc-body">

**Status: not adopted by the platform, implemented in full by me.** The RFC went through review but the redesign was not taken up. I built the architecture out completely anyway, as a working implementation of the four defence layers described below, so the design is a finished system rather than a paper proposal.

**The Challenge**
A high-throughput Kafka consumer (Node.js) ingesting OCPP events from 10,000+ EV chargers processed messages fire-and-forget: unbounded concurrent async work per message, no backpressure, no concurrency limits. When the downstream Charging Management System degraded, retries and in-flight promises multiplied until pods hit their 500 MB limit and were OOMKilled within 5-10 minutes. Recovery was manual, and every crash risked message loss because offsets committed before the work was safe.

**Patterns Evaluated**
- **Simple retry limit (rejected):** doesn't address the absence of backpressure or isolation between message groups. A slowdown in one region would still consume all shared capacity.
- **Single global worker pool (rejected):** simpler topology, but one regional outage could exhaust the pool and take everything down with it.
- **Multi-layered resilience (chosen):** bounded intake, durable Redis-backed offload with post-enqueue offset commits, partition pausing at 80% queue depth, and 20 independent circuit breakers isolated per partition-region pair.

<div class="metrics-row" style="margin-top:20px;margin-bottom:16px;">
  <span class="metric-badge">10,000+ EV chargers</span>
  <span class="metric-badge">14.4 M messages / day</span>
  <span class="metric-badge">20 circuit breakers</span>
  <span class="metric-badge">Target MTTR: 60 min → &lt; 5 min</span>
  <span class="metric-badge">Target 0 offset gaps / day</span>
</div>

<a href="/portfolio-resilient-charging-consumer" style="font-weight:600;color:var(--vp-c-brand-1);">Read the full deep-dive: architecture diagram, four-layer breakdown, tradeoffs →</a>

</div>
</div>
