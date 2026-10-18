<script setup lang="ts">
import type { FileEntry } from "../data/types";
import { showcases } from "../data/showcase";
import { fileStatus } from "../data/commands";
import ProjectVisual from "./ProjectVisual.vue";
defineProps<{ file: FileEntry }>();
</script>

<template>
  <a class="project-card" :href="`#${file.filename}`">
    <ProjectVisual v-if="showcases[file.filename]" :showcase="showcases[file.filename]" />
    <div class="project-card-body">
      <div class="project-card-meta"><span>{{ fileStatus(file) }}</span><span>{{ file.year }}</span></div>
      <h3>{{ file.filename }} <span aria-hidden="true">↗</span></h3>
      <p>{{ file.oneLine }}</p>
      <div class="project-tags"><span v-for="tag in file.stack.slice(0, 4)" :key="tag">{{ tag }}</span></div>
      <span class="project-card-link">Read case study <span aria-hidden="true">→</span></span>
    </div>
  </a>
</template>
