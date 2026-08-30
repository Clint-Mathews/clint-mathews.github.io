<script setup lang="ts">
import { site, availability } from "../site";
</script>

<template>
  <section class="hero">
    <div class="hero-inner">
      <p class="avail-chip">
        <span class="pulse" aria-hidden="true"></span>{{ availability.status }}
      </p>

      <h1 class="hero-title">
        Backend that holds when the <em>load arrives</em>.
      </h1>

      <p class="hero-sub">
        Seven years building infrastructure at Ford Pro. I design the systems
        that stay up when traffic stops being theoretical, and I write the RFC
        before I write the code.
      </p>

      <div class="hero-actions">
        <a class="btn-primary" :href="`mailto:${site.email}`">Start a conversation</a>
        <a class="btn-ghost" :href="site.resume" download>Download resume</a>
      </div>
    </div>
  </section>
</template>
