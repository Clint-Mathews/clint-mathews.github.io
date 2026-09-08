import type { FileEntry } from "./types";

export const files: FileEntry[] = [
  {
    filename: "PHOTONICOPS.eng",
    dir: "projects",
    year: "2026",
    size: "24K",
    oneLine: "Offline agentic triage for clinical optical telemetry",
    desc: "Air-gapped pipeline: Go ingestion, Python DSP, local LLM remediation — no cloud APIs.",
    role: "Solo build · architecture + implementation",
    stack: ["Go", "Python", "gRPC", "Ollama", "Langfuse"],
    metrics: [
      "10,000 samples/sec",
      "Sub-2ms p99",
      "<10ms DSP frame",
      "Zero-allocation hot path",
      "Fully air-gapped",
    ],
    links: [{ label: "GitHub", href: "https://github.com/Clint-Mathews/PhotonicOps" }],
    body: `// PHOTONICOPS.eng — Offline Agentic Triage Engine

// PROBLEM
Clinical microfluidic biosensors stream optical telemetry (resonance wavelength
shift, picometers) at high frequency. Physical faults (micro-bubbles, channel
clogs) must be detected and remediated in near real time. In a HIPAA-sensitive
setting, sending telemetry to a cloud API is a non-starter. The entire pipeline,
including the LLM, had to run air-gapped on local hardware.

// BUILD
- Ingestion (Go): mTLS gRPC server, 10,000 samples/sec per sensor. Zero-allocation
  worker pool, mutex-protected ring buffer, sync.Pool reuse. pprof-verified
  no significant GC pauses; sub-2 ms p99 vs a mock 10 kHz client.
- DSP (Python): Unix-domain-socket gRPC, same Protobuf FrameBatch. Kalman smooth,
  rolling-baseline de-drift, first-derivative anomalies. Vectorized NumPy/SciPy,
  <10 ms per frame, no per-sample Python loops.
- Agentic triage: local Llama 3.1 via Ollama + Instructor → typed Pydantic
  RemediationDecision. Fail-safe state machine: low-confidence / invalid / timeout
  → REQUIRES_MANUAL_REVIEW. Tested no-auto-execute invariant.
- Audit: Langfuse traces + Postgres/JSONL audit log of every decision.
- Infra: linux/arm64 Compose (Prometheus, Grafana, Langfuse, Ollama). CI: vet,
  race, coverage, lint, static Linux binaries.

// DECISIONS
- mTLS (TLS 1.3, local CA) on the sensor TCP listener; Go→Python DSP stays
  plaintext over a Unix domain socket.
- Agent can recommend remediation; it cannot auto-execute except on a
  high-confidence, schema-valid, authorized response.

// STATUS
Ingestion, DSP, and triage complete and tested. In progress: Promptfoo evals and
further Go hardening (load-shedding, per-sensor ring sharding).

// LINKS
https://github.com/Clint-Mathews/PhotonicOps`,
  },
  {
    filename: "ECHOGATE.gw",
    dir: "projects",
    year: "2026",
    size: "16K",
    oneLine: "Split-plane AI API gateway: stream, don't buffer",
    desc: "Go data plane on the token path; Python control plane off it (FAISS cache).",
    role: "Solo build · ADRs + implementation",
    stack: ["Go", "Python", "FAISS", "Ollama"],
    metrics: [
      "Zero added stream buffering",
      "95% similarity cache threshold",
      "5 ADRs authored",
      "Credentials stripped at edge",
    ],
    links: [{ label: "GitHub", href: "https://github.com/Clint-Mathews/EchoGate" }],
    body: `// ECHOGATE.gw — Split-Plane AI API Gateway

// PROBLEM
Naive reverse proxies buffer streaming inference (tokens arrive in a burst)
and have no visibility into prompts, so near-duplicates pay full inference cost.

// APPROACH
Two planes, different failure domains. Go data plane on the request's critical
path. Python control plane off it. Each scales and fails independently. Five ADRs.

// BUILD
- Non-buffering ReverseProxy: immediate flush + X-Accel-Buffering so tokens stream.
- Header-based gateway auth; tokens stripped before upstream.
- Async fire-and-forget telemetry from a bounded tail-buffer after stream close.
- Local semantic cache (Python): FAISS + all-MiniLM-L6-v2 at 95% cosine similarity.
- Compose: Ollama + Go proxy for end-to-end streaming verification.

// STATUS
Shipped in phases. Complete: local host + Go proxy core. In progress: telemetry
hardening, FAISS cache/SQLite, React dashboard for hit-rate and token velocity.

// LINKS
https://github.com/Clint-Mathews/EchoGate`,
  },
  {
    filename: "FENCELOCK.lock",
    dir: "projects",
    year: "2026",
    size: "14K",
    oneLine: "Fencing tokens so stale lock holders cannot write",
    desc: "Distributed lock as ordered writes with staleness rejection. etcd primary; Redis as Redlock counterexample.",
    role: "Solo build · library + tests vs real containers",
    stack: ["Go", "etcd", "Redis", "Postgres"],
    metrics: [
      "Pause → expire → fence, tested",
      "etcd primary · Redis counterexample",
      "Memory + Postgres fenced stores",
      "go test -race vs real containers",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/Clint-Mathews/fencelock" },
      {
        label: "Write-up",
        href: "https://clint-mathews.medium.com/why-your-distributed-lock-is-probably-broken-592987479e7b",
      },
    ],
    body: `// FENCELOCK.lock — Fencing Tokens for Distributed Locks

// PROBLEM
A distributed lock cannot guarantee mutual exclusion. A holder can pause past
its lease TTL; another client acquires; both believe they hold the lock. Timeouts
do not fix this. The lock service can only hand out a token.

// APPROACH
Ordered writes with staleness rejection. Every acquire issues a monotonically
increasing, server-side fencing token. The protected resource rejects writes whose
token is lower than the highest it has seen. etcd is primary (token = create
revision). Redis is a documented weaker Redlock counterexample on the same API.

// BUILD
- lock.Locker: Acquire / TryAcquire return a Lease with a fencing token.
  Valid() is advisory; a write is only safe if the resource checks the token.
- etcd via sessions/mutexes; Redis via SET NX PX + Lua release + INCR.
- FencedResource: in-memory and Postgres (UPDATE ... WHERE last_token < $1).
- cmd/demo + integration tests (testcontainers): pause past TTL, stale write rejected.

// LINKS
https://github.com/Clint-Mathews/fencelock
https://clint-mathews.medium.com/why-your-distributed-lock-is-probably-broken-592987479e7b`,
  },
  {
    filename: "GOS.sim",
    dir: "projects",
    year: "2024",
    size: "8.1K",
    oneLine: "Global OCPP Simulator — 2,000+ chargers",
    desc: "Simulation platform to validate the OCPP gateway at fleet scale before production.",
    role: "Ford Pro · drove development + 5 RFCs",
    stack: ["OCPP", "simulation", "RFC"],
    metrics: ["2,000+ chargers simulated", "5 RFCs authored"],
    body: `// GOS.sim — Global OCPP Simulator

// PROBLEM
Validating the OCPP Gateway at scale required a platform that could mimic charger
behavior across thousands of devices. Without it, pre-production performance
and reliability testing was not feasible.

// BUILD
Drove development of GOS: simulates 2,000+ chargers. Authored and drove adoption
of 5 foundational RFCs for core architecture and the feature roadmap.

// RESULTS
2,000+ chargers simulated · 5 RFCs authored`,
  },
  {
    filename: "CHARGEBOX.sim",
    dir: "projects",
    year: "2023",
    size: "6.4K",
    oneLine: "ChargeBox simulator + test automation overhaul",
    desc: "Made charger/session simulation fast enough to stop being a QA bottleneck.",
    role: "Ford Pro · overhaul + test suite",
    stack: ["OCPP", "test automation"],
    metrics: ["30% performance boost", "40% testing time reduction"],
    body: `// CHARGEBOX.sim — ChargeBox Simulator

// PROBLEM
The existing charger simulation tool was slow and lacked automated coverage,
bottlenecking the development and QA pipeline for charging session workflows.

// BUILD
Overhauled ChargeBox Simulator and implemented a test automation suite.

// RESULTS
30% performance boost · 40% testing time reduction`,
  },
  {
    filename: "FILE2VIDEO.bin",
    dir: "projects",
    year: "2021",
    size: "4.2K",
    oneLine: "Lossless file ↔ binary video encoding",
    desc: "Any file into a binary video, then back. Data representation experiment.",
    role: "Personal experiment",
    stack: ["Go"],
    metrics: ["Lossless round-trip"],
    links: [{ label: "GitHub", href: "https://github.com/Clint-Mathews" }],
    body: `// FILE2VIDEO.bin — File-To-BinaryVideo-BackTo-File

Engineered an encoding mechanism that converts any file into a binary video
format, enabling lossless decoding back to the original source. An exploration of
binary data representation, video encoding pipelines, and creative storage.

// LINKS
https://github.com/Clint-Mathews`,
  },
  {
    filename: "REDIS_PUBSUB.msg",
    dir: "projects",
    year: "2021",
    size: "3.8K",
    oneLine: "HA Redis pub/sub in Go",
    desc: "Connection management, serialization, reliable delivery patterns.",
    role: "Personal write-up + implementation",
    stack: ["Go", "Redis"],
    metrics: ["Highly available pub/sub"],
    links: [{ label: "GitHub", href: "https://github.com/Clint-Mathews" }],
    body: `// REDIS_PUBSUB.msg

Technical write-up and implementation of a highly available publish/subscribe
messaging system using Redis. Covers connection management, message serialization,
and reliable delivery patterns.

// LINKS
https://github.com/Clint-Mathews`,
  },
  {
    filename: "KAFKA.consumer",
    dir: "projects",
    year: "2024",
    size: "12K",
    oneLine: "High-throughput Kafka fleet consumer — 6M+ msgs/day",
    desc: "NestJS/TypeScript telemetry consumer with Redis/BullMQ backpressure and contract fidelity.",
    role: "Ford Pro · architect + implement",
    stack: ["NestJS", "TypeScript", "JavaScript", "Kafka", "Redis", "BullMQ", "Node.js", "OCPP"],
    metrics: ["6M+ messages/day", "99.9% data integrity", "Horizontal scalability"],
    links: [
      { label: "RFC case study", href: "#CHARGING_CONSUMER.rfc" },
      { label: "NestJS", href: "https://nestjs.com/" },
      { label: "TypeScript", href: "https://www.typescriptlang.org/" },
      { label: "BullMQ", href: "https://bullmq.io/" },
      { label: "Redis", href: "https://redis.io/" },
    ],
    body: `// KAFKA.consumer — High-Throughput Kafka Fleet Consumer

// PROBLEM
The platform needed to ingest a massive influx of daily telemetry from fleet
chargers. Dropped messages or delays hit analytics and operational visibility.

// APPROACH
Fault tolerance and throughput first: partition strategy and consumer-group config
evaluated before code, so the system could scale with fleet size.

// BUILD
Architected and implemented a NestJS / TypeScript Kafka consumer from the ground
up: ingest, process, and route millions of messages daily against defined
contracts. The resilience implementation uses Redis-backed BullMQ queues to
bound work and preserve partition-aware processing under downstream failure.

// RESULTS
6M+ messages/day · 99.9% data integrity · horizontal scalability

As the fleet grew, fire-and-forget dispatch became its own failure mode. I authored
the RFC redesigning it around backpressure and circuit breaking, and implemented
that architecture in full.

cat CHARGING_CONSUMER.rfc`,
  },
  {
    filename: "OCPP.gw",
    dir: "projects",
    year: "2023",
    size: "11K",
    oneLine: "OCPP gateway migration — 8,200 chargers live",
    desc: "Monolith to microservices without interrupting live OCPP sessions.",
    role: "Ford Pro · architectural strategy + deploy",
    stack: ["OCPP", "microservices", "Datadog"],
    metrics: [
      "8,200 chargers migrated",
      "~2,150 servers decommissioned",
      "$9,000/mo cost savings",
      "60% Datadog cost reduction",
      "99.95% uptime",
    ],
    body: `// OCPP.gw — OCPP Gateway Migration

// PROBLEM
The legacy monolith could not scale with a growing EV charger fleet: high infra
cost and maintenance bottlenecks. Transition to microservices had to keep OCPP
sessions uninterrupted for thousands of active chargers.

// APPROACH
Authored foundational RFCs for core platform services and OCPP 2.x. Prioritized
a gateway that could take high-throughput real-time traffic, and rebuilt
observability so cost would not overrun later.

// BUILD
Architected and deployed a central communication gateway; migrated 8,200 chargers.
Revamped Datadog logging/monitoring to filter logs and accelerate RCA.

// RESULTS
8,200 chargers · ~2,150 servers decommissioned · $9,000/mo · 60% Datadog cut ·
99.95% uptime`,
  },
  {
    filename: "FPC.platform",
    dir: "projects",
    year: "2023",
    size: "5.6K",
    oneLine: "Ford Pro Charging — charger data backbone",
    desc: "Led the team and co-owned 16 production services across charging and its utilities.",
    role: "Ford Pro · team lead, SME, backend owner",
    stack: ["NestJS", "TypeScript", "JavaScript", "MongoDB"],
    metrics: ["16 production services co-owned", "8,200+ chargers supported", "SME for charger data"],
    links: [
      { label: "NestJS", href: "https://nestjs.com/" },
      { label: "TypeScript", href: "https://www.typescriptlang.org/" },
    ],
    body: `// FPC.platform — Ford Pro Charging

// PROBLEM
The Ford Pro Charging SaaS platform needed a reliable backbone for charger data
systems that fleet managers depend on.

// BUILD
Led the charging engineering team, co-owning 16 production services across
charging and its utilities while coordinating integrations with partner teams.
Served as SME for charger data systems, including NestJS / TypeScript backend
services and MongoDB data systems for 8,200+ chargers.

// RESULTS
16 production services co-owned · 8,200+ chargers supported · SME for charger data`,
  },
  {
    filename: "JIRALYZER.ai",
    dir: "projects",
    year: "2025",
    size: "7.2K",
    oneLine: "AI analytics over 100k+ Jira issues",
    desc: "NL query + summary without timing out on large datasets. Hackathon finalist.",
    role: "Hackathon finalist · full-stack",
    stack: ["React", "JavaScript", "Flask", "GPT-4", "Azure AD"],
    award: "Ford Pro Hackathon Finalist, Q4 2025",
    metrics: ["70% faster analysis", "100,000+ Jira issues", "Hackathon Finalist"],
    links: [{ label: "React", href: "https://react.dev/" }],
    body: `// JIRALYZER.ai — AI Analytics Platform

// PROBLEM
Analyzing massive Jira volumes for performance metrics was slow and manual. Goal:
query and summarize with natural language without timing out on large sets.

// BUILD
Full-stack AI analytics (React, Flask, GPT-4): Azure AD, automated PDF reporting,
real-time AI chat. Intelligent caching and parallel LLM processing; 70% faster
analysis response times.

// RESULTS
70% faster analysis · 100,000+ Jira issues · Hackathon Finalist`,
  },
  {
    filename: "KPI.analytics",
    dir: "projects",
    year: "2024",
    size: "3.1K",
    oneLine: "Charging KPI analytics for managed-algorithm ROI",
    desc: "Translate complex charging data into stakeholder insights.",
    role: "Ford Pro",
    stack: ["analytics", "KPIs"],
    metrics: ["Algorithm ROI visibility"],
    body: `// KPI.analytics — Charging KPI Analytics System

Developed a KPI analytics system to measure the effectiveness and ROI of
Ford's managed charging algorithms, translating complex data into actionable
business insights for stakeholders.`,
  },
  {
    filename: "SCANCO.erp",
    dir: "projects",
    year: "2021",
    size: "4.9K",
    oneLine: "Manufacturing lifecycle + Sage ERP (2,000+ SKUs)",
    desc: "Full-stack .NET/Angular/AWS inventory tracking.",
    role: "Experion Technologies",
    stack: [".NET", "Angular", "AWS", "Sage ERP"],
    metrics: ["2,000+ products tracked", "Sage ERP integration", "25% CSAT increase"],
    body: `// SCANCO.erp / CloudConnectIT / SPA

Designed a full-stack solution (.NET, Angular, AWS) integrating with Sage ERP
to track 2,000+ products through their manufacturing lifecycle. Contributed to a
SaaS inventory product that increased customer satisfaction by 25%.`,
  },
  {
    filename: "ARIA.b2b",
    dir: "projects",
    year: "2020",
    size: "3.4K",
    oneLine: "B2B / B2B2C storefront to 5,000+ users",
    desc: "Guided React frontend delivery through launch.",
    role: "Experion Technologies · frontend lead",
    stack: ["React"],
    metrics: ["5,000+ users", "React frontend"],
    body: `// ARIA.b2b / BAZAR (B2B2C)

Guided the frontend development team (React) to build and launch a B2B
platform, scaling it to 5,000+ users and driving product sales.`,
  },
  {
    filename: "WAREFLEX.logi",
    dir: "projects",
    year: "2020",
    size: "3.6K",
    oneLine: "Real-time logistics: 1,000+ active shipments",
    desc: "Dock availability and warehouse scheduling.",
    role: "Experion Technologies",
    stack: [".NET", "Angular"],
    metrics: ["1,000+ active shipments", "Real-time monitoring"],
    body: `// WAREFLEX.logi — Logistics Platform

Built a real-time logistics platform (.NET, Angular) to monitor 1,000+ active
shipments and optimize warehouse scheduling with live dock availability data.`,
  },
  {
    filename: "CHARGING_CONSUMER.rfc",
    dir: "dives",
    year: "2026",
    size: "32K",
    oneLine: "Kafka consumer that degrades instead of dying",
    desc: "Bounded intake, Redis offload, partition pause, 20 circuit breakers. Not adopted; built in full.",
    role: "Backend Lead, RFC author",
    stack: ["Kafka", "Redis", "BullMQ", "Node.js", "Kubernetes", "OCPP"],
    metrics: [
      "10,000+ EV chargers",
      "14.4 M messages / day",
      "20 circuit breakers",
      "Target MTTR 60 min → <5 min",
      "Target 0 offset gaps / day",
    ],
    links: [{ label: "Architecture diagram", href: "/fleet-charging-consumer-architecture.svg" }],
    body: `// CHARGING_CONSUMER.rfc
// Designing a Kafka consumer that degrades instead of dying

// META
Role     : Backend Lead, RFC author
Duration : Dec 2025 – Jan 2026
Scale    : 10,000+ EV chargers · 6 pods · 10 partitions · two regions
Headline : Up to 14.4 M messages a day against a 500 MB pod ceiling
Status   : Not adopted by the platform. Implemented in full anyway.
           Design-target numbers are criteria, not reproduced-load measurements.

// PROBLEM
A consumer ingested OCPP events from 10,000+ chargers. Each charger reports
1–2 messages every two minutes: 5,000–10,000 msg/min, 7.2–14.4 M/day, no
overnight lull. The service polled Kafka in batches of 100+ and dispatched
fire-and-forget. When the downstream Charging Management System degraded, retries
and in-flight promises multiplied. Pods hit 500 MB and OOMKilled in 5–10 min.
Recovery was manual (~1h). Offsets committed before work was safe.

A full 30-minute outage: 150k–300k messages fleet-wide. No pod survived to see
that backlog — it died in the first ten minutes and the pressure moved.

// FOUR LAYERS
1. Bounded intake — batch poll 50–100, sequential enqueue. Work in flight is chosen.
2. Durable offload — 20 Redis/BullMQ queues (partition × region). Offsets commit
   after enqueue. Jobs keyed partition+offset (idempotent).
3. Backpressure — pause the Kafka partition at 80% queue depth; auto-resume.
4. Circuit breaking — 20 breakers, 30s–5min backoff. Isolation: workers partitioned,
   so one region cannot starve the other.

// TRADEOFFS
- Exactly-once via Kafka tx + outbox rejected: downstream isn't transactional.
  Took <0.1% duplicates + idempotent keys.
- Single global worker pool rejected: one regional outage could take everything.
- Pause is partition-granular while queues are per region: documented, not hidden.

// DESIGN TARGETS (implementation criteria, not reproduced-load proof)
OOM during outage     : pods dead 5–10 min  →  0
MTTR                  : manual 45–60 min   →  < 5 min
Message accounting    : loss on crash       →  100%
Sustained throughput  : 5–10k msg/min       →  12k (design 50k)
Enqueue failure       : n/a                 →  < 0.1%
Offset gaps           : n/a                 →  0 / day

// WHAT I'D CHANGE
Insist on production-load simulation before design review. The pause-granularity
tradeoff is exactly what a real load test vindicates or embarrasses.

// DIAGRAM
/fleet-charging-consumer-architecture.svg`,
  },
  {
    filename: "REPORTING_PIPELINE.rfc",
    dir: "dives",
    year: "2024",
    size: "18K",
    oneLine: "Reporting pipeline: sync HTTP → async job queue",
    desc: "Adopted. Celery + Redis + MongoDB. 91.3% → 99.9% target reliability.",
    role: "Architecture RFC, adopted and shipped",
    stack: ["Celery", "Redis", "MongoDB"],
    metrics: [
      "91.3% → 99.9% target reliability",
      "30 min wait → <1s Job ID",
      "5,700 downstream calls decoupled",
      "Partial-success recovery",
    ],
    links: [
      { label: "Before diagram", href: "/Synchronous-Bottleneck.png" },
      { label: "After diagram", href: "/Asynchronous-Decoupling.png" },
    ],
    body: `// REPORTING_PIPELINE.rfc
// Rearchitecting a Reporting Pipeline for Reliability at Scale

// STATUS
Adopted and shipped. The async job queue is what runs report generation today.

// CHALLENGE
Report generation ran inside a single blocking HTTP request: collect scope,
batch downstream APIs, transform, upload, email signed links. At scale
(19 types × up to 300 sites ≈ 5,700 downstream calls) this meant 30+ minute
blocked connections, gateway timeouts, OOM, all-or-nothing failures, 91.3%
success.

// PATTERNS
- SSE (rejected): thread exhaustion (user pins a thread 15+ min), memory
  accumulation, no horizontal scale.
- Async job queue (chosen): Celery + Redis + MongoDB. Existing reporting function
  moved unmodified into a Celery task. Job state in MongoDB.

// TRADE-OFF
Larger rewrite (push logic into downstream services) deferred. Queue stabilises
first; report types can migrate incrementally.

// RESULT
Reliability target 91.3% → 99.9%. 5–30 min blocking wait → Job ID in <1s.
Blast radius isolated to workers; partial success instead of all-or-nothing.

// DIAGRAMS
/Synchronous-Bottleneck.png
/Asynchronous-Decoupling.png`,
  },
  {
    filename: "DISTRIBUTED_LOCK.md",
    dir: "writing",
    year: "2026",
    size: "9.4K",
    oneLine: "Why your distributed lock is probably broken",
    desc: "Pause → expire → fence. Resource must reject stale tokens.",
    role: "Technical writing",
    stack: ["Go", "etcd"],
    metrics: ["Medium essay", "Fencelock companion"],
    links: [
      {
        label: "Medium",
        href: "https://clint-mathews.medium.com/why-your-distributed-lock-is-probably-broken-592987479e7b",
      },
      { label: "Fencelock", href: "#FENCELOCK.lock" },
    ],
    body: `// DISTRIBUTED_LOCK.md

A write-up of the pause → expire → fence argument: timeouts cannot guarantee
mutual exclusion, so the resource must reject stale fencing tokens. Working
example is Fencelock (cat FENCELOCK.lock): etcd primary, Redis as documented
weaker counterexample.

https://clint-mathews.medium.com/why-your-distributed-lock-is-probably-broken-592987479e7b
https://github.com/Clint-Mathews/fencelock`,
  },
  {
    filename: "WORKER_POOL.md",
    dir: "writing",
    year: "2026",
    size: "7.8K",
    oneLine: "A zero-allocation worker pool for 10kHz sensor ingestion in Go",
    desc: "Fixed workers, bounded backpressure, and sync.Pool recycling for a 10kHz hot path.",
    role: "Technical writing",
    stack: ["Go", "gRPC", "sync.Pool"],
    metrics: ["10,000 frames/sec", "Zero per-frame allocations", "Bounded backpressure"],
    links: [
      {
        label: "DEV.to",
        href: "https://dev.to/clintmathews/a-zero-allocation-worker-pool-for-10khz-sensor-ingestion-in-go-17ji",
      },
    ],
    body: `// WORKER_POOL.md

A build-log write-up for PhotonicOps: a fixed-size Go worker pool between the
gRPC ingestion stream and the DSP handoff. The design keeps the receive loop
light, uses a bounded queue for backpressure, and recycles scratch buffers with
sync.Pool instead of allocating on every frame.

10,000 frames/sec · 10 fixed workers · 50,000-slot queue · no silent drops

https://dev.to/clintmathews/a-zero-allocation-worker-pool-for-10khz-sensor-ingestion-in-go-17ji`,
  },
  {
    filename: "UNIX_SOCKET_GRPC.md",
    dir: "writing",
    year: "2026",
    size: "10.2K",
    oneLine: "gRPC over a Unix socket, not HTTP",
    desc: "A real IPC tradeoff for an offline, HIPAA-postured edge system.",
    role: "Technical writing",
    stack: ["Go", "gRPC", "Python", "Unix sockets"],
    metrics: ["10kHz telemetry", "Protobuf contract reuse", "Zero cloud APIs"],
    links: [
      {
        label: "DEV.to",
        href: "https://dev.to/clintmathews/grpc-over-a-unix-socket-not-http-a-real-ipc-tradeoff-from-a-hipaa-postured-edge-system-4foa",
      },
    ],
    body: `// UNIX_SOCKET_GRPC.md

An architecture decision from PhotonicOps: why the Go ingestion engine uses
gRPC over a Unix domain socket for its local Python DSP hop instead of HTTP and
JSON. The choice preserves the streaming shape and Protobuf contract while
reducing serialization overhead and the local exposure surface.

The tradeoff is explicit: this works because both processes are co-located on
one air-gapped edge host. A multi-host deployment would need TCP-based gRPC
with mTLS.

https://dev.to/clintmathews/grpc-over-a-unix-socket-not-http-a-real-ipc-tradeoff-from-a-hipaa-postured-edge-system-4foa`,
  },
  {
    filename: "FILE2VIDEO.md",
    dir: "writing",
    year: "2021",
    size: "2.8K",
    oneLine: "File-to-binary-video experiment notes",
    desc: "Same exploration as FILE2VIDEO.bin, written up.",
    role: "Experiment notes",
    stack: ["Go"],
    metrics: ["Lossless encoding"],
    links: [{ label: "GitHub", href: "https://github.com/Clint-Mathews" }],
    body: `// FILE2VIDEO.md

Engineered an encoding mechanism that converts any file into a binary video
format, enabling lossless decoding back to the original source.

https://github.com/Clint-Mathews`,
  },
  {
    filename: "REDIS_PUBSUB.md",
    dir: "writing",
    year: "2021",
    size: "2.6K",
    oneLine: "Redis pub/sub write-up",
    desc: "HA messaging: connections, serialization, delivery.",
    role: "Technical writing",
    stack: ["Go", "Redis"],
    metrics: ["Step-by-step breakdown"],
    links: [{ label: "GitHub", href: "https://github.com/Clint-Mathews" }],
    body: `// REDIS_PUBSUB.md

Step-by-step technical breakdown of building a highly available pub/sub system
on Redis: connection management, message serialization, reliable delivery.

https://github.com/Clint-Mathews`,
  },
  {
    filename: "AGENTIC_PRACTICE.md",
    dir: "writing",
    year: "2026",
    size: "8.8K",
    oneLine: "AI-assisted engineering practice (PhotonicOps)",
    desc: "Constraint files, directory-scoped personas, ADRs as agent context.",
    role: "Practice notes",
    stack: ["Claude Code", "Cursor", "OpenCode"],
    metrics: ["Constraint-enforced sessions"],
    links: [{ label: "PhotonicOps", href: "#PHOTONICOPS.eng" }],
    body: `// AGENTIC_PRACTICE.md

Through PhotonicOps, an AI-augmented workflow beyond autocomplete:

- Coding harness mix: Claude Code, Cursor, OpenCode, Codex on the same repo.
  Constraint files + ADRs travel with the project; OpenRouter swaps models.
- Agentic project context: CLAUDE.md / AGENTS.md enforce ARM64-only Docker,
  zero-allocation Go, zero-cloud-API — no manual reminding.
- Directory-scoped personas: go-architect, dsp-math, mlops-agent with domain
  constraints (e.g. vectorized NumPy only).
- ADRs as durable machine-readable context so later sessions don't contradict
  prior decisions.
- Gate-checked roadmap (Phase 0 → 3) with testable gates (zero significant GC
  pauses via pprof).`,
  },
  {
    filename: "AI_FIRST.md",
    dir: "writing",
    year: "2026",
    size: "5.1K",
    oneLine: "AI-first learning: coding harnesses, not just autocomplete",
    desc: "Claude Code, Cursor, OpenCode, Codex, OpenRouter.",
    role: "Practice notes",
    stack: ["Claude Code", "Cursor", "OpenCode", "Codex", "OpenRouter"],
    metrics: ["Multi-harness agentic stack"],
    body: `// AI_FIRST.md

AI-first methodology for continuous learning: explore architectures, prototype
at speed, learn by doing. Same repo, multiple coding harnesses.

- Claude Code — agentic coding with directory-scoped constraints
- Cursor — IDE-native agent (Composer / agent mode)
- OpenCode — open-source coding harness for repo-scoped sessions
- Codex — OpenAI Codex CLI/agent for repo-level coding
- OpenRouter — multi-model access without vendor lock-in
- Google Antigravity — multi-file refactoring across a codebase
- GitHub Copilot for Enterprise — context-aware inline generation
- Ollama — self-hosted inference (PhotonicOps)
- Langfuse — LLM observability for agentic workflows

What's next: AI platform engineering and MLOps — reliability/scalability applied
to prompt pipelines, model serving, and LLM observability.`,
  },
];

export function filesIn(dir: FileEntry["dir"]): FileEntry[] {
  return files.filter((f) => f.dir === dir);
}

export function fileStem(filename: string): string {
  return filename.replace(/\.[^.]+$/, "").toLowerCase();
}

export function findFile(name: string): FileEntry | undefined {
  const n = name.replace(/^\/+/, "").split("/").pop() ?? name;
  const lower = n.toLowerCase();
  const noExt = lower.replace(/\.[^.]+$/, "");
  return files.find((f) => {
    const fn = f.filename.toLowerCase();
    const st = fileStem(f.filename);
    return fn === lower || st === lower || st === noExt;
  });
}
