import { files } from "./files";
import type { FileEntry } from "./types";

export interface Showcase {
  accent: "green" | "blue" | "amber";
  label: string;
  signal: string;
  nodes: string[];
  principle: string;
  problem: string;
  approach: string;
  outcome: string;
}

// Editorial summaries of the evidence in files.ts, not live telemetry.
export const showcases: Record<string, Showcase> = {
  "PHOTONICOPS.eng": {
    accent: "green", label: "LOCAL INTELLIGENCE", signal: "10 kHz",
    nodes: ["Go ingestion", "Python DSP", "Local LLM"],
    principle: "Telemetry stays on the device.",
    problem: "Detect physical faults in high-frequency optical telemetry without sending sensor data to a cloud API.",
    approach: "A bounded Go ingestion path feeds Python signal processing and schema-validated, local LLM triage.",
    outcome: "Ingestion, DSP, and triage implemented and tested. Sub-2ms ingestion p99 against a mock 10 kHz client; evaluations and further hardening in progress.",
  },
  "ECHOGATE.gw": {
    accent: "blue", label: "SPLIT-PLANE INFERENCE", signal: "stream →",
    nodes: ["Client", "Go proxy", "Ollama"],
    principle: "Keep the control plane off the token path.",
    problem: "Buffered proxies turn streaming tokens into bursts; repeated prompts pay the full inference cost.",
    approach: "Separate the Go streaming data plane from Python telemetry and semantic caching, with independent failure domains.",
    outcome: "Local host and streaming proxy core complete. Telemetry hardening, FAISS cache, and dashboard remain in progress.",
  },
  "FENCELOCK.lock": {
    accent: "amber", label: "DISTRIBUTED CORRECTNESS", signal: "42 > 41",
    nodes: ["Lease", "Fencing token", "Guarded write"],
    principle: "A lock expires. A stale writer must not win.",
    problem: "A paused client can outlive its lease and resume writing after another client has acquired the lock.",
    approach: "Issue increasing fencing tokens and make the protected resource reject stale writes. Use etcd as the primary backend.",
    outcome: "Memory and Postgres fenced stores implemented, with pause → expire → reject integration tests against real containers. Redis documents the weaker counterexample.",
  },
  "CHAOSBOX.lab": {
    accent: "amber", label: "FAILURE & SCALE LAB", signal: "load → learn",
    nodes: ["Load test", "Go API", "Postgres"],
    principle: "Measure the constraint before adding architecture.",
    problem: "Capacity claims are meaningless if the workload, traffic path, and retained evidence are not validated first.",
    approach: "Run a deliberately simple Go service in constrained Kubernetes pods and inspect correctness, latency, and failure under load.",
    outcome: "Phase 1 testing in progress. The 100-user workload is a test target, not a demonstrated capacity claim.",
  },
  "CHARGING_CONSUMER.rfc": {
    accent: "green", label: "RESILIENCE BY DESIGN", signal: "20 queues",
    nodes: ["Kafka", "Redis / BullMQ", "Isolated workers"],
    principle: "Degrade under pressure. Keep the work durable.",
    problem: "Downstream outages multiplied retries and in-flight work until 500 MB pods died, leaving unsafe offsets and manual recovery.",
    approach: "Bound intake, offload to durable queues, pause partitions under pressure, and isolate regional workers with circuit breakers.",
    outcome: "RFC authored and implemented in full; not adopted by the platform. Throughput and recovery targets are design criteria, not reproduced-load measurements.",
  },
  "REPORTING_PIPELINE.rfc": {
    accent: "blue", label: "ASYNC REPORT GENERATION", signal: "HTTP → job",
    nodes: ["Job ID", "Celery / Redis", "Report + status"],
    principle: "A report should not hold a connection hostage.",
    problem: "Up to 5,700 downstream calls inside one HTTP request caused timeouts, memory pressure, and all-or-nothing failures.",
    approach: "Move report generation into Celery workers, track job state in MongoDB, and recover partial successes independently.",
    outcome: "Adopted and shipped. The blocking request becomes a job acknowledgement; 99.9% reliability remains the stated target.",
  },
  "OCPP.gw": {
    accent: "blue", label: "PRODUCTION MIGRATION", signal: "8,200",
    nodes: ["EV chargers", "OCPP gateway", "Microservices"],
    principle: "Move the fleet. Keep the sessions alive.",
    problem: "A legacy monolith needed to scale without interrupting thousands of live charging sessions.",
    approach: "Author the platform RFCs, deploy a central gateway, and rebuild observability alongside the migration.",
    outcome: "8,200 chargers migrated, approximately 2,150 servers decommissioned, $9,000/month saved, and 99.95% uptime.",
  },
};

const featuredNames = ["PHOTONICOPS.eng", "FENCELOCK.lock", "ECHOGATE.gw", "CHARGING_CONSUMER.rfc"];
export const featuredFiles = featuredNames.map((name) => files.find((file) => file.filename === name)!);

export const workGroups = [
  { id: "builds", label: "Independent builds", description: "Go systems, local AI, and experiments in correctness." },
  { id: "production", label: "Production systems", description: "Fleet infrastructure and enterprise platforms." },
] as const;

export function projectGroup(file: FileEntry) {
  return /^(PHOTONICOPS|ECHOGATE|FENCELOCK|CHAOSBOX|FILE2VIDEO|REDIS_PUBSUB)\./.test(file.filename)
    ? "builds" : "production";
}
