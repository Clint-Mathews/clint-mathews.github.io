# Portfolio

## Ford Pro: EV Charging Platform

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

### Charging KPI Analytics System <span class="project-tag">Ford Pro</span>

<div class="project-body">

**What I Built**

Developed a KPI analytics system to measure the effectiveness and ROI of Ford's managed charging algorithms, translating complex data into actionable business insights for stakeholders.

</div>
</div>

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

---

## Experion Technologies: Enterprise Solutions

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

## Personal Projects

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

<div class="project-card" id="photonicops">

### PhotonicOps — Offline Telemetry Ingestion Engine <span class="project-tag">Golang · gRPC · HIPAA</span>

<div class="project-body">

**The Problem**

Silicon photonic biosensors in HIPAA-sensitive clinical environments generate continuous, high-frequency optical resonance telemetry that must be ingested reliably with zero cloud dependencies — fully air-gapped, no OpenAI/AWS/GCP calls anywhere.

**What I Built** *(Phase 0 + Phase 1 — implemented)*

Designed and built a high-throughput, offline telemetry ingestion engine in Go:

- **High-throughput gRPC service** (client-streaming RPCs) sustaining 10 kHz data ingestion, with a Protobuf-defined sensor telemetry contract and a synthetic load-generating client (mock 10 kHz sensor simulator with injected Gaussian noise + thermal drift modeling).
- **Zero-allocation / low-GC hot path** using `sync.Pool` for buffer reuse; concurrent worker-pool pattern (fixed goroutine pool + buffered channel) for backpressure-aware load handling; lock-free / mutex-protected circular (ring) buffer for fixed-memory, leak-free long-running ingestion.
- **Go workspaces** (`go.work`) for multi-module monorepo management.
- **GitHub Actions CI pipeline:** build, `go vet`, race-detector test runs (`go test -race`), coverage reporting, lint gating, and cross-compilation to static Linux binaries as artifacts.
- **Fully offline Docker Compose infra stack** (Postgres, Prometheus, Grafana, Langfuse, Ollama) pinned to `linux/arm64` for Apple Silicon, with an environment-gate script validating service health before development proceeds.
- **Profiling instrumentation** via `net/http/pprof` to verify GC-pause / performance SLAs.
- **ADRs** documenting key tradeoffs: mTLS transport security, Unix-domain-socket IPC design, fail-safe LLM decision fallback states.

**Architected, not yet built** *(later phases — designed via ADR)*

- A local-only agentic hardware-triage system on Ollama (self-hosted LLM, zero cloud API calls) with Langfuse tracing.
- Safety-first agent pattern: triage agent must degrade to `REQUIRES_MANUAL_REVIEW` on timeout or low-confidence response — human-in-the-loop safety constraint for agentic actions in a clinical/HIPAA context.

**AI-Assisted Engineering Practice**

Used Claude Code as a primary agentic dev tool — configured project-level constraint files to enforce architectural rules (ARM64-only Docker configs, zero-allocation Go patterns, zero-cloud-API policy) automatically across every session. Designed custom directory-scoped AI personas per service, and used ADRs as durable machine-readable context for AI continuity.

**Results**

<div class="metrics-row">
  <span class="metric-badge">10,000 samples/sec sustained</span>
  <span class="metric-badge">Zero-allocation hot path</span>
  <span class="metric-badge">Race-detector-clean</span>
  <span class="metric-badge">Fully air-gapped</span>
</div>

</div>
</div>
