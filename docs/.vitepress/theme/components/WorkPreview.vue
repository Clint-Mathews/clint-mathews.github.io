<script setup lang="ts">
const work = [
  {
    title: "Resilient Charging Consumer",
    tag: "Architecture RFC · shipped",
    body: "The fleet consumer's fire-and-forget dispatch became its own failure mode as volume grew. I authored the RFC redesigning it around bounded concurrency, backpressure, and circuit breaking, then implemented it in full.",
    metrics: ["6M+ msgs/day", "99.9% data integrity"],
    link: "/portfolio-resilient-charging-consumer",
  },
  {
    title: "PhotonicOps",
    tag: "Solo build · Go · Python · gRPC",
    body: "An offline agentic triage engine built from zero: client-streaming gRPC, zero-allocation hot paths, and fully local LLM inference under a strict zero-cloud-API policy.",
    metrics: ["0 → 1", "Air-gapped by design"],
    link: "/projects#photonicops",
  },
  {
    title: "OCPP Gateway Migration",
    tag: "Ford Pro · platform migration",
    body: "Led the monolith-to-microservices transition for EV charging, migrating 8,200 chargers onto a new gateway without interrupting live OCPP sessions, and rebuilt observability along the way.",
    metrics: ["8,200 chargers", "$9K/mo saved", "99.95% uptime"],
    link: "/projects",
  },
];
</script>

<template>
  <section class="home-section">
    <p class="eyebrow">Selected work</p>
    <h2 class="section-title">Selected projects</h2>
    <div class="work-list">
      <a v-for="item in work" :key="item.title" class="work-item" :href="item.link">
        <div class="work-head">
          <h3>{{ item.title }}</h3>
          <span class="work-tag">{{ item.tag }}</span>
        </div>
        <p>{{ item.body }}</p>
        <div class="work-metrics">
          <span v-for="m in item.metrics" :key="m" class="metric-badge">{{ m }}</span>
        </div>
      </a>
    </div>

    <p class="section-more"><a href="/projects">See all work &rarr;</a></p>
  </section>
</template>
