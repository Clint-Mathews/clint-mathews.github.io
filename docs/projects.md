# Work

Every result below is one I owned or led. Where a design has a full write-up,
it links out.

*Details are abstracted to focus on architecture and trade-offs rather than
confidential business logic.*

---

## Built from zero

Systems that did not exist until I built them: architecture, implementation, and the decisions in between. PhotonicOps, EchoGate, and Fencelock are solo projects; the rest in this section were built inside Ford Pro.

<div class="project-card" id="photonicops">

### PhotonicOps: Offline Agentic Triage Engine <span class="project-tag">Go · Python · gRPC · Local LLM</span>

<div class="project-body">

**The Problem**

Clinical microfluidic biosensors stream optical telemetry (resonance wavelength shift, in picometers) at high frequency, and physical faults like micro-bubbles or channel clogs must be detected and remediated in near real time. In a HIPAA-sensitive clinical setting, sending any of that telemetry to a cloud API is a non-starter, so the entire pipeline, including the LLM making the decisions, had to run air-gapped on local hardware.

**What I Built**

- **Ingestion engine (Go).** An mTLS gRPC server ingesting 10,000 samples/sec per sensor, built around a zero-allocation worker pool and a mutex-protected ring buffer, both pre-sized at startup and reused via `sync.Pool` to avoid GC churn on the hot path. Verified with `pprof` to show no significant GC pauses under sustained load from a mock 10 kHz sensor client I also wrote, holding sub-2 ms p99 latency.
- **DSP pipeline (Python).** Telemetry crosses into Python over a Unix-domain-socket gRPC transport reusing the same Protobuf `FrameBatch` contract, where it is smoothed with a 1D steady-state Kalman filter, de-drifted with rolling-baseline subtraction, and scanned for anomalies via first-derivative thresholding, fully vectorized NumPy/SciPy with no per-sample Python loops, under 10 ms per frame.
- **Agentic triage (Python + local LLM).** When an anomaly is flagged, a local Llama 3.1 model served by Ollama is prompted through Instructor to emit a strictly-typed Pydantic `RemediationDecision`, never raw text. A safety module is the only authorized caller, and a fail-safe state machine guarantees that low-confidence, schema-invalid, timed-out, or unreachable responses degrade to `REQUIRES_MANUAL_REVIEW` rather than executing anything against hardware, backed by a dedicated test asserting the no-auto-execute invariant.
- **Observability & audit.** Every triage decision, whether auto-executed, manual-review, or manual-override, is traced through a self-hosted Langfuse instance and persisted to a durable audit log (Postgres + JSONL) alongside the triggering telemetry window, satisfying clinical traceability requirements.
- **Infrastructure.** The full stack (Prometheus, Grafana, Langfuse/Postgres, Ollama) runs as native `linux/arm64` Docker Compose services on Apple Silicon, gated by a health-check script before development proceeds. CI covers build, `go vet`, race-detector test runs, coverage, lint gating, and cross-compiled static Linux binaries.

**Notable Engineering Decisions (documented as ADRs)**

- Required mTLS (TLS 1.3, local CA) on the sensor TCP listener; kept the Go→Python DSP hop plaintext over a Unix domain socket rather than inventing a second wire format or wrapping loopback IPC in TLS.
- Made a hardware-safety call: the triage agent can *recommend* a remediation but is architecturally incapable of auto-executing on anything but a high-confidence, schema-valid, fully-authorized response.

**Status**

Ingestion, DSP, and agentic triage phases are complete and tested, including mTLS on the sensor path and Prometheus `/metrics`. In progress: a Promptfoo evaluation suite scoring remediation accuracy and fail-safe behavior across clean/noisy/ambiguous/adversarial scenarios, plus further Go hardening (load-shedding defaults, per-sensor ring-buffer sharding) before it would be appropriate for real clinical hardware.

**AI-Assisted Engineering Practice**

Used Claude Code as a primary agentic dev tool: project-level constraint files enforce architectural rules (ARM64-only Docker configs, zero-allocation Go patterns, zero-cloud-API policy) automatically across every session, with directory-scoped AI personas per service and ADRs as durable machine-readable context for continuity.

**Results**

<div class="metrics-row">
  <span class="metric-badge">10,000 samples/sec sustained</span>
  <span class="metric-badge">Sub-2ms p99 latency</span>
  <span class="metric-badge">&lt;10ms per DSP frame</span>
  <span class="metric-badge">Zero-allocation hot path</span>
  <span class="metric-badge">Fully air-gapped</span>
</div>

[View on GitHub →](https://github.com/Clint-Mathews/PhotonicOps)

</div>
</div>

<div class="project-card" id="echogate">

### EchoGate: Split-Plane AI API Gateway <span class="project-tag">Go · Python · FAISS</span>

<div class="project-body">

**The Problem**

Self-hosting an LLM is cheap in principle, but naive reverse proxies undermine the two things that make streaming inference usable. They buffer the response, so tokens arrive in a burst instead of a stream, and they have no visibility into what is actually being asked, so every prompt, including near-duplicates, pays full inference cost.

**My Approach**

I split the system into two planes with different jobs and different failure domains, documented as a set of ADRs. The **Go data plane** sits on the request's critical path where every millisecond is user-visible latency; the **Python control plane** sits off it, where being slower and heavier is fine. Each scales and fails independently.

**What I Built**

- **Non-buffering reverse proxy (Go).** Built on `httputil.ReverseProxy`, forwarding streamed LLM tokens to clients with zero added buffering: immediate flush intervals plus explicit `X-Accel-Buffering` handling to preserve real-time streaming through intermediate proxies.
- **Header-based gateway auth.** Internal auth tokens are validated and stripped at the proxy edge before requests ever reach the upstream model host, preventing credential leakage upstream.
- **Async fire-and-forget telemetry.** A bounded tail-buffer response writer recovers token usage from streamed SSE responses without blocking the client, posted off a detached goroutine after stream close.
- **Local semantic cache (Python).** FAISS over `all-MiniLM-L6-v2` embeddings at a 95% cosine-similarity threshold, designed to cut redundant upstream LLM calls and reduce inference cost and latency, with telemetry ingestion to SQLite and a metrics API behind it.
- **Local multi-service orchestration.** Docker Compose runs Ollama, the Go proxy, and supporting services together for end-to-end development and manual streaming verification, with CI linting and testing the Go data plane on every change.

**Status**

Shipped honestly, in phases. Complete: the local Ollama host and the Go proxy core: reverse proxy, auth stripping, immediate-flush streaming. In progress: async telemetry (usage capture built, retry/backpressure hardening next), the Python control plane (embeddings, FAISS cache, SQLite ingestion), and a React dashboard for live cache hit-rate and token-velocity metrics.

**Results**

<div class="metrics-row">
  <span class="metric-badge">Zero added stream buffering</span>
  <span class="metric-badge">95% similarity cache threshold</span>
  <span class="metric-badge">5 ADRs authored</span>
  <span class="metric-badge">Credentials stripped at edge</span>
</div>

[View on GitHub →](https://github.com/Clint-Mathews/EchoGate)

</div>
</div>

<div class="project-card" id="fencelock">

### Fencelock: Fencing Tokens for Distributed Locks <span class="project-tag">Go · etcd · Redis</span>

<div class="project-body">

**The Problem**

A distributed lock cannot guarantee mutual exclusion. A holder can pause (GC, VM stall, network partition) past its lease TTL, the lock expires, another client acquires it, and two clients both believe they hold the lock. Timeouts do not fix this. The lock service can only hand out a token; it cannot stop a stale client from writing.

**My Approach**

Treat the problem as ordered writes with staleness rejection, not as unenforceable mutual exclusion. Every acquire issues a monotonically increasing, **server-side** fencing token. The protected resource rejects any write whose token is lower than the highest it has already seen. etcd is the primary backend (linearizable; token = lock-key create revision). Redis is a secondary, best-effort backend kept on purpose as the Redlock counterexample: same `Locker` interface, weaker foundation.

**What I Built**

- **`lock.Locker` API.** `Acquire` / `TryAcquire` return a `Lease` carrying a fencing token. `Valid()` is client-side and advisory; a write is only safe if the resource checks the token.
- **etcd and Redis backends.** etcd via sessions/mutexes with revision as the token. Redis via `SET NX PX`, Lua compare-and-delete release, and `INCR` for tokens, documented as best-effort rather than equivalent.
- **`FencedResource`.** In-memory (race-safe) and Postgres (`UPDATE ... WHERE last_token < $1`) stores that reject stale writes without mutating state.
- **Reproducible failure and fix.** `cmd/demo` plus integration tests against real etcd and Redis (testcontainers, not mocks): pause past TTL, second client acquires, first client's stale write is rejected. A companion test shows where Redis can still admit a hazard etcd does not.

**Results**

<div class="metrics-row">
  <span class="metric-badge">Pause → expire → fence, tested</span>
  <span class="metric-badge">etcd primary · Redis counterexample</span>
  <span class="metric-badge">Memory + Postgres fenced stores</span>
  <span class="metric-badge">`go test -race` vs real containers</span>
</div>

[View on GitHub →](https://github.com/Clint-Mathews/fencelock) · [Read the write-up →](https://clint-mathews.medium.com/why-your-distributed-lock-is-probably-broken-592987479e7b)

</div>
</div>

<div class="project-card">

### Global OCPP Simulator (GOS) <span class="project-tag">Ford Pro</span>

<div class="project-body">

**The Problem**

Validating the OCPP Gateway at scale required a simulation platform that could realistically mimic charger behavior across thousands of devices. Without this, testing system performance and reliability before production rollout was not feasible.

**What I Built**

I drove the development of the Global OCPP Simulator, delivering a platform that simulates over 2,000 chargers to validate system performance and reliability at scale. I authored and drove the adoption of 5 foundational RFCs that defined the core architecture and feature roadmap for the platform.

**Results**

<div class="metrics-row">
  <span class="metric-badge">2,000+ chargers simulated</span>
  <span class="metric-badge">5 RFCs authored</span>
</div>

</div>
</div>

<div class="project-card">

### ChargeBox Simulator <span class="project-tag">Ford Pro</span>

<div class="project-body">

**The Problem**

The existing charger simulation tool was slow and lacked automated test coverage, making it a bottleneck in the development and QA pipeline for charging session workflows.

**What I Built**

I overhauled the ChargeBox Simulator and implemented a test automation suite, significantly improving the speed and reliability of charger and charging session simulation.

**Results**

<div class="metrics-row">
  <span class="metric-badge">30% performance boost</span>
  <span class="metric-badge">40% testing time reduction</span>
</div>

</div>
</div>

<div class="project-card">

### File-To-BinaryVideo-BackTo-File <span class="project-tag">Golang</span>

<div class="project-body">

**What I Built**

Engineered an encoding mechanism that converts any file into a binary video format, enabling lossless decoding back to the original source file. An exploration of binary data representation, video encoding pipelines, and creative approaches to data storage.

[View on GitHub →](https://github.com/Clint-Mathews)

</div>
</div>

<div class="project-card">

### PUB/SUB Implementation using Redis <span class="project-tag">Golang</span>

<div class="project-body">

**What I Built**

A technical write-up and implementation of a highly available publish/subscribe messaging system using Redis. Covers connection management, message serialization, and reliable delivery patterns.

[Read the Write-up →](https://github.com/Clint-Mathews)

</div>
</div>

---

## Made it survive scale

Platforms that were already live and already struggling. This is also where the cost work sits. The gateway migration decommissioned ~2,150 servers and cut observability spend by 60% on the way through.

<div class="project-card">

### High-Throughput Kafka Fleet Consumer <span class="project-tag">Ford Pro</span>

<div class="project-body">

**The Problem**

The platform required a robust mechanism to ingest and process a massive influx of daily telemetry messages from fleet chargers. Dropped messages or processing delays would directly impact the analytics and operational visibility for fleet managers.

**My Approach**

I focused on fault tolerance and throughput. Before writing code, I evaluated the partition strategy and consumer group configurations to ensure the system could scale horizontally as the fleet size and data volume grew.

**What I Built**

I architected and implemented a high-throughput Kafka consumer from the ground up. I built the service to reliably ingest, process, and route millions of messages daily, ensuring strict adherence to defined data contracts.

**Results**

<div class="metrics-row">
  <span class="metric-badge">6M+ messages/day</span>
  <span class="metric-badge">99.9% data integrity</span>
  <span class="metric-badge">Horizontal scalability</span>
</div>

As the fleet grew, this consumer's fire-and-forget dispatch became its own failure mode. I authored the RFC redesigning it around backpressure and circuit breaking, and implemented that architecture in full. [read the case study →](/portfolio-resilient-charging-consumer)

</div>
</div>

<div class="project-card">

### OCPP Gateway Migration <span class="project-tag">Ford Pro</span>

<div class="project-body">

**The Problem**

The legacy monolith architecture could not scale to support a rapidly growing fleet of EV chargers, resulting in high infrastructure costs and maintenance bottlenecks. The challenge was to transition to a microservices architecture while ensuring seamless, uninterrupted OCPP communication for thousands of active chargers.

**My Approach**

I led the architectural strategy by authoring foundational RFCs to define the core platform services and the path for OCPP 2.x adoption. I prioritized a scalable gateway design capable of handling high-throughput real-time traffic while optimizing our observability stack to prevent future cost overruns.

**What I Built**

I architected and deployed a central communication gateway, successfully migrating 8,200 chargers to the new system. Alongside feature implementation, I entirely revamped our Datadog logging and monitoring configurations to filter logs more efficiently and accelerate root cause analysis.

**Results**

<div class="metrics-row">
  <span class="metric-badge">8,200 chargers migrated</span>
  <span class="metric-badge">~2,150 servers decommissioned</span>
  <span class="metric-badge">$9,000/mo cost savings</span>
  <span class="metric-badge">60% Datadog cost reduction</span>
  <span class="metric-badge">99.95% uptime</span>
</div>

</div>
</div>

<div class="project-card">

### Ford Pro Charging (FPC) Platform <span class="project-tag">Ford Pro</span>

<div class="project-body">

**The Problem**

The Ford Pro Charging SaaS platform needed a reliable backbone for all charger data systems, the services that fleet managers depend on for visibility into their EV charging infrastructure.

**What I Built**

Served as the Subject Matter Expert (SME) for all charger data systems, owning the backend services (NestJS, MongoDB) that form the backbone of the Ford Pro Charging platform for 8,200+ chargers.

**Results**

<div class="metrics-row">
  <span class="metric-badge">8,200+ chargers supported</span>
  <span class="metric-badge">SME for charger data</span>
</div>

</div>
</div>

---

## Turned data into decisions

Making large, messy datasets answer a question a human actually asked.

<div class="project-card">

### Jiralyzer: AI Analytics Platform <span class="project-tag tag--highlight">Hackathon Finalist</span>

<div class="project-body">

**The Problem**

Analyzing massive volumes of Jira tickets for performance metrics was slow and manual. The goal was to build an intelligent, secure system that could query and summarize this data using natural language, without timing out on large datasets.

**What I Built**

I built a full-stack AI analytics platform (React, Flask, GPT-4) with enterprise-grade features including Azure AD authentication, automated PDF reporting, and a real-time AI chat for interactive performance analysis. Implemented intelligent caching and parallel processing for LLM workloads, cutting analysis response times by 70%.

**Results**

<div class="metrics-row">
  <span class="metric-badge">70% faster analysis</span>
  <span class="metric-badge">100,000+ Jira issues processed</span>
  <span class="metric-badge">Hackathon Finalist</span>
</div>

</div>
</div>

<div class="project-card">

### Charging KPI Analytics System <span class="project-tag">Ford Pro</span>

<div class="project-body">

**What I Built**

Developed a KPI analytics system to measure the effectiveness and ROI of Ford's managed charging algorithms, translating complex data into actionable business insights for stakeholders.

</div>
</div>

---

## Earlier enterprise work

Full-stack delivery at Experion Technologies, 2019 to 2022: .NET, Angular, AWS, and ERP integration across four enterprise projects.

<div class="project-card">

### SCANCO / CloudConnectIT / SPA <span class="project-tag">Experion Technologies</span>

<div class="project-body">

**What I Built**

Designed a full-stack solution (.NET, Angular, AWS) that integrated with Sage ERP to track over 2,000+ products through their entire manufacturing lifecycle. Contributed to a SaaS-based product for inventory tracking, increasing customer satisfaction by 25%.

**Results**

<div class="metrics-row">
  <span class="metric-badge">2,000+ products tracked</span>
  <span class="metric-badge">Sage ERP integration</span>
  <span class="metric-badge">25% customer satisfaction increase</span>
</div>

</div>
</div>

<div class="project-card">

### ARIA B2B / BAZAR (B2B2C) <span class="project-tag">Experion Technologies</span>

<div class="project-body">

**What I Built**

Guided the frontend development team (React) to build and launch a B2B platform, scaling it to support over 5,000+ users and drive product sales.

**Results**

<div class="metrics-row">
  <span class="metric-badge">5,000+ users</span>
  <span class="metric-badge">React frontend</span>
</div>

</div>
</div>

<div class="project-card">

### WAREFLEX: Logistics Platform <span class="project-tag">Experion Technologies</span>

<div class="project-body">

**What I Built**

Built a real-time logistics platform (.NET, Angular) to monitor 1,000+ active shipments and optimize warehouse scheduling with live dock availability data.

**Results**

<div class="metrics-row">
  <span class="metric-badge">1,000+ active shipments</span>
  <span class="metric-badge">Real-time monitoring</span>
</div>

</div>
</div>

---

## At a glance

<div class="metrics-row">
  <span class="metric-badge">8,200 chargers migrated</span>
  <span class="metric-badge">6M+ messages / day</span>
  <span class="metric-badge">99.95% uptime</span>
  <span class="metric-badge">$9,000/mo infrastructure cut</span>
  <span class="metric-badge">8+ RFCs adopted</span>
</div>

[Download the resume (PDF) →](/CLINT-MATHEWS.pdf) · [Start a conversation →](/#contact)
