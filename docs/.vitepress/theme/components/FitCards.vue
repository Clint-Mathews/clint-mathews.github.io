<script setup lang="ts">
const fits = [
  {
    title: "Ship the v1 backend",
    body: "Built PhotonicOps and EchoGate solo (Go, Python, gRPC, local LLM inference) from empty repo to running system, architecture decisions included.",
    link: "/projects#photonicops",
    linkText: "See the builds",
  },
  {
    title: "Move the scaling wall",
    body: "Rewrote a fire-and-forget Kafka consumer around backpressure and circuit breaking when it became the platform's failure mode. Wrote the RFC, then built it.",
    link: "/portfolio-resilient-charging-consumer",
    linkText: "Read the case study",
  },
  {
    title: "Cut the infra bill",
    body: "Decommissioned ~2,150 servers and rebuilt the Datadog config: $9,000/month and 60% of observability spend, without losing debuggability.",
    link: "/projects",
    linkText: "See the work",
  },
];
</script>

<template>
  <section class="home-section">
    <p class="eyebrow">Where I help</p>
    <h2 class="section-title">What I can take on</h2>

    <div class="fit-grid">
      <article v-for="fit in fits" :key="fit.title" class="fit-card">
        <h3>{{ fit.title }}</h3>
        <p>{{ fit.body }}</p>
        <a :href="fit.link">{{ fit.linkText }} &rarr;</a>
      </article>
    </div>
  </section>
</template>
