<script setup lang="ts">
import { site } from "../site";
</script>

<template>
  <section id="contact" class="contact">
    <p class="eyebrow">Contact</p>
    <h2 class="section-title">Get in touch</h2>
    <p class="contact-lede">
      Full-time roles, or a contract engagement scoped to one outcome: a v1 to
      ship, a scaling wall to move, a bill to cut.
    </p>

    <div class="contact-grid">
      <a class="contact-card" :href="`mailto:${site.email}`">
        <span class="contact-label">Email</span>
        <span class="contact-value">{{ site.email }}</span>
      </a>
      <a class="contact-card" :href="`tel:${site.phone.replace(/\s/g, '')}`">
        <span class="contact-label">Phone</span>
        <span class="contact-value">{{ site.phone }}</span>
      </a>
      <a class="contact-card" :href="site.linkedin" target="_blank" rel="noopener">
        <span class="contact-label">LinkedIn</span>
        <span class="contact-value">/in/clint-mathews</span>
      </a>
      <a class="contact-card" :href="site.github" target="_blank" rel="noopener">
        <span class="contact-label">GitHub</span>
        <span class="contact-value">@Clint-Mathews</span>
      </a>
    </div>

    <p class="contact-foot">
      Based in India (IST, UTC+5:30), roughly four hours of daily overlap with
      US Eastern and near-full overlap with the UK and EU.
      <a :href="site.resume" download>Download resume (PDF) &rarr;</a>
    </p>
  </section>
</template>
