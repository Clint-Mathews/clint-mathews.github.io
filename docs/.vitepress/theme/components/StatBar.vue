<script setup lang="ts">
import { stats } from "../site";
</script>

<template>
  <section class="statbar" aria-label="Key results">
    <div v-for="s in stats" :key="s.k" class="statbar-cell">
      <span class="statbar-n">{{ s.n }}</span>
      <span class="statbar-k">{{ s.k }}</span>
    </div>
  </section>
</template>
