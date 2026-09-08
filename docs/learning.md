# Writing

## Engineering philosophy

Great systems are built through iteration, and the reasoning is worth publishing alongside the result. Technical experiments, open-source work, and the write-ups that came out of them.

---

## Featured Technical Writing & Experiments

<div class="learning-card">

### Why your distributed lock is probably broken <span class="project-tag">Golang · etcd</span>

A write-up of the pause → expire → fence argument: timeouts cannot guarantee mutual exclusion, so the resource must reject stale fencing tokens. The working example is [Fencelock](/projects#fencelock), a Go library with etcd as the primary backend and Redis kept as a documented weaker counterexample.

[Read the write-up →](https://clint-mathews.medium.com/why-your-distributed-lock-is-probably-broken-592987479e7b) · [View on GitHub →](https://github.com/Clint-Mathews/fencelock)

</div>

<div class="learning-card">

### A Zero-Allocation Worker Pool for 10kHz Sensor Ingestion in Go <span class="project-tag">Golang · Performance</span>

Part of the PhotonicOps build log. This write-up covers a fixed-size worker pool, bounded backpressure, and `sync.Pool` buffer recycling for a sensor pipeline handling 10,000 frames per second without per-frame allocations.

[Read the write-up →](https://dev.to/clintmathews/a-zero-allocation-worker-pool-for-10khz-sensor-ingestion-in-go-17ji)

</div>

<div class="learning-card">

### gRPC over a Unix socket, not HTTP: a real IPC tradeoff from a HIPAA-postured edge system <span class="project-tag">Go · gRPC · Python</span>

An architecture decision from PhotonicOps: why the local Go-to-Python DSP boundary uses gRPC over a Unix domain socket instead of HTTP and JSON, and where that decision stops applying.

[Read the write-up →](https://dev.to/clintmathews/grpc-over-a-unix-socket-not-http-a-real-ipc-tradeoff-from-a-hipaa-postured-edge-system-4foa)

</div>

<div class="learning-card">

### File-To-BinaryVideo-BackTo-File <span class="project-tag">Golang</span>

Engineered an encoding mechanism that converts any file into a binary video format, enabling lossless decoding back to the original source. An exploration of binary data representation, video encoding pipelines, and creative approaches to data storage.

[View on GitHub →](https://github.com/Clint-Mathews)

</div>

<div class="learning-card">

### Pub/Sub Implementation using Redis <span class="project-tag">Golang</span>

A step-by-step technical breakdown of building a highly available publish/subscribe messaging system using Redis. Covers connection management, message serialization, and patterns for reliable message delivery.

[Read the Write-up →](https://github.com/Clint-Mathews)

</div>

<div class="learning-card">

### AI-Assisted Engineering Practice <span class="project-tag">AI / Agentic Workflow</span>

Through building [PhotonicOps](/projects#photonicops), I developed hands-on experience running an AI-augmented engineering workflow at a level beyond simple autocomplete:

- **Agentic project context:** Configured project-level constraint files (`CLAUDE.md`, `.agents/AGENTS.md`) to automatically enforce architectural rules (ARM64-only Docker configs, zero-allocation Go patterns, zero-cloud-API policy) across Claude Code, Cursor, OpenCode, and Codex sessions — the same repo, the same rules, no manual reminding.
- **Directory-scoped agent personas:** Designed custom AI skills (`go-architect`, `dsp-math`, `mlops-agent`), each carrying domain-specific constraints (e.g., "vectorized NumPy only, no `for` loops over data arrays") so the agent self-enforces the right rules per part of the codebase.
- **ADRs as machine-readable context:** Used Architecture Decision Records as durable context so an AI agent picking up work later doesn't reinvent or contradict prior design decisions.
- **Gate-checked phased roadmap:** Structured a phased roadmap (Phase 0 → 1 → 1.5 → 2 → 3) with explicit, testable gate criteria (e.g., "zero significant GC pauses," verified via `pprof`) to keep AI-assisted work scoped and verifiable rather than sprawling.

</div>

<div class="learning-card">

### AI-First Approach to Learning <span class="project-tag">AI / Agentic Workflow</span>

I've adopted an AI-first methodology for continuous learning and engineering, using agentic tools not just to write code faster, but to explore new architectures, prototype ideas at speed, and learn by doing:

- **Claude Code**: agentic/autonomous coding with directory-scoped project context and constraint enforcement.
- **Cursor**: IDE-native agent (Composer / agent mode) on the same constraint files and ADRs.
- **OpenCode**: open-source coding harness for repo-scoped agent sessions.
- **Codex**: OpenAI Codex CLI/agent for repo-level coding against the same project context.
- **OpenRouter**: multi-model API access for comparing providers (cost/latency/context-window/capability tradeoffs) without vendor lock-in.
- **Google Antigravity**: advanced agentic capabilities for complex multi-file refactoring and problem-solving across a full codebase.
- **GitHub Copilot for Enterprise**: enterprise-context-aware inline generation for accelerated day-to-day coding.
- **Ollama**: self-hosted local LLM inference for offline/air-gapped environments (used in PhotonicOps).
- **Langfuse**: LLM observability and tracing for agentic workflows.

</div>

---

## What's Next

I have recently started exploring **AI Platform Engineering and MLOps**, learning how backend principles of reliability and scalability apply to AI infrastructure, from prompt pipelines and model serving to LLM observability. Early days, but sharing the journey as I go.
