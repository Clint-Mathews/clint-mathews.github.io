# Learning in Public

## Engineering Philosophy

Great systems are built through iteration, and great engineering is learned in public. I share my technical experiments, open-source contributions, and learnings along the way.

---

## Featured Technical Writing & Experiments

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

- **Agentic project context:** Configured project-level constraint files (`CLAUDE.md`, `.agents/AGENTS.md`) to automatically enforce architectural rules (ARM64-only Docker configs, zero-allocation Go patterns, zero-cloud-API policy) across every Claude Code session — no manual reminding needed.
- **Directory-scoped agent personas:** Designed custom AI skills (`go-architect`, `dsp-math`, `mlops-agent`), each carrying domain-specific constraints (e.g., "vectorized NumPy only, no `for` loops over data arrays") so the agent self-enforces the right rules per part of the codebase.
- **ADRs as machine-readable context:** Used Architecture Decision Records as durable context so an AI agent picking up work later doesn't reinvent or contradict prior design decisions.
- **Gate-checked phased roadmap:** Structured a phased roadmap (Phase 0 → 1 → 1.5 → 2 → 3) with explicit, testable gate criteria (e.g., "zero significant GC pauses," verified via `pprof`) to keep AI-assisted work scoped and verifiable rather than sprawling.

</div>

<div class="learning-card">

### AI-First Approach to Learning <span class="project-tag">AI / Agentic Workflow</span>

I've adopted an AI-first methodology for continuous learning and engineering — using agentic tools not just to write code faster, but to explore new architectures, prototype ideas at speed, and learn by doing:

- **Claude Code** — agentic/autonomous coding with directory-scoped project context and constraint enforcement.
- **Google Antigravity** — advanced agentic capabilities for complex multi-file refactoring and problem-solving across a full codebase.
- **GitHub Copilot for Enterprise** — enterprise-context-aware inline generation for accelerated day-to-day coding.
- **OpenRouter** — multi-model API access for comparing providers (cost/latency/context-window/capability tradeoffs) without vendor lock-in.
- **Ollama** — self-hosted local LLM inference for offline/air-gapped environments (used in PhotonicOps).
- **Langfuse** — LLM observability and tracing for agentic workflows.

</div>

---

## What's Next

I have recently started exploring **AI Platform Engineering and MLOps**, learning how backend principles of reliability and scalability apply to AI infrastructure — from prompt pipelines and model serving to LLM observability. Early days, but sharing the journey as I go.
