<script setup lang="ts">
import { ABOUT_MD } from "../data/identity";
import { site } from "../site";

const sections = ABOUT_MD.replace(/^\/\/ ABOUT\.MD\n/, "").split(/\n\/\/ /).map((text, index) => {
  if (index === 0) return { heading: "A little about me", body: text.trim() };
  const [heading, ...body] = text.split("\n");
  return { heading, body: body.join("\n").trim() };
}).filter(section => section.heading !== "CONNECT");
</script>

<template>
  <div class="pane about-pane">
    <p class="cmd-line"><span class="cmd-ps">$</span> cat about.md</p>
    <h1 class="work-title">Engineer. Gopher. Curious by default.</h1>
    <div class="about-grid">
      <section v-for="section in sections" :key="section.heading" class="about-section">
        <h2 class="case-h">// {{ section.heading.toLowerCase() }}</h2>
        <pre class="pane-body">{{ section.body }}</pre>
      </section>
    </div>
    <div class="about-connect">
      <h2 class="case-h">// let's build something that holds</h2>
      <a :href="`mailto:${site.email}`">{{ site.email }} ↗</a>
      <div class="home-actions">
        <a :href="site.github" target="_blank" rel="noopener">GitHub ↗</a>
        <a :href="site.linkedin" target="_blank" rel="noopener">LinkedIn ↗</a>
        <a :href="site.resume" target="_blank" rel="noopener">Résumé ↓</a>
      </div>
    </div>
  </div>
</template>
