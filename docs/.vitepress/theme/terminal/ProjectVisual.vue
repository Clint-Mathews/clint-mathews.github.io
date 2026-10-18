<script setup lang="ts">
import type { Showcase } from "../data/showcase";
defineProps<{ showcase: Showcase }>();
</script>

<template>
  <div class="project-visual" :class="`accent-${showcase.accent}`">
    <div class="visual-label"><span class="visual-dot"></span>{{ showcase.label }}<span>SYS / MAP</span></div>
    <div class="visual-signal">{{ showcase.signal }}</div>
    <div class="visual-flow">
      <template v-for="(node, i) in showcase.nodes" :key="node">
        <span v-if="i" class="flow-arrow" aria-hidden="true">→</span>
        <span class="flow-node">{{ node }}</span>
      </template>
    </div>
    <p class="visual-principle">{{ showcase.principle }}</p>
    <span class="visual-caption">ARCHITECTURE SKETCH / NOT LIVE TELEMETRY</span>
  </div>
</template>
