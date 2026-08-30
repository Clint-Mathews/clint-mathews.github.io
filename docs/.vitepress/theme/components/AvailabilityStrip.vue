<script setup lang="ts">
import { availability } from "../site";
</script>

<template>
  <section class="strip" aria-label="Availability">
    <div
      v-for="cell in availability.cells"
      :key="cell.label"
      class="strip-cell"
    >
      <span class="strip-label">{{ cell.label }}</span>
      <span class="strip-value">{{ cell.value }}</span>
      <span class="strip-note">{{ cell.note }}</span>
    </div>
  </section>
</template>
