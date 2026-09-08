<script setup lang="ts">
const method = [
  {
    title: "RFC before code",
    body: "Eight-plus adopted RFCs across two platforms. I write the problem, the alternatives, and the trade-off down first, including the designs I rejected and why. It makes the decision reviewable instead of personal.",
  },
  {
    title: "AI-native workflow",
    body: "Claude Code, Cursor, OpenCode, Codex, and OpenRouter — plus Copilot and self-hosted Ollama — driven by committed constraint files and directory-scoped agent personas so architectural rules enforce themselves across harnesses. Not autocomplete. Leverage.",
  },
  {
    title: "Translator between teams",
    body: "At Ford Pro I sit between Product, firmware, and CX, turning feature requests into scoped requirements and hardware constraints into engineering plans. Small teams need this more than large ones do.",
  },
];
</script>

<template>
  <section class="home-section">
    <p class="eyebrow">Method</p>
    <h2 class="section-title">How I work</h2>

    <div class="method-grid">
      <article v-for="m in method" :key="m.title" class="method-item">
        <h3>{{ m.title }}</h3>
        <p>{{ m.body }}</p>
      </article>
    </div>
  </section>
</template>
