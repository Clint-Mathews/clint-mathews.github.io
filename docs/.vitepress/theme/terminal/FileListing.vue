<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { FileDir, FileEntry } from "../data/types";
import { fileStatus, lsCommand } from "../data/commands";
import { projectGroup, showcases, workGroups } from "../data/showcase";
import ProjectVisual from "./ProjectVisual.vue";

const props = defineProps<{ files: FileEntry[]; dir: FileDir }>();
const query = ref("");
const filter = ref("all");
watch(() => props.dir, () => { query.value = ""; filter.value = "all"; });
const matching = computed(() => props.files.filter((file) => {
  const text = [file.filename, file.oneLine, file.desc, ...file.stack].join(" ").toLowerCase();
  return text.includes(query.value.trim().toLowerCase()) &&
    (filter.value === "all" || projectGroup(file) === filter.value);
}));
const groups = computed(() => props.dir === "projects"
  ? workGroups.map((group) => ({ ...group, files: matching.value.filter((file) => projectGroup(file) === group.id) }))
  : [{ id: props.dir, label: props.dir === "dives" ? "Architecture deep dives" : "Writing & field notes", description: props.dir === "dives" ? "Decisions, alternatives, and implementation details." : "Lessons from building and operating systems.", files: matching.value }]);
</script>

<template>
  <div class="pane work-pane">
    <p class="cmd-line"><span class="cmd-ps">$</span> {{ lsCommand(dir) }}</p>
    <h1 class="work-title">{{ dir === 'projects' ? 'Systems, built with intent.' : dir === 'dives' ? 'Inside the architecture.' : 'Notes from the work.' }}</h1>
    <nav class="work-nav" aria-label="Work directories">
      <a href="#work" :aria-current="dir === 'projects' ? 'page' : undefined">Projects</a>
      <a href="#dives" :aria-current="dir === 'dives' ? 'page' : undefined">Deep dives</a>
      <a href="#writing" :aria-current="dir === 'writing' ? 'page' : undefined">Writing</a>
    </nav>
    <div class="work-tools">
      <div v-if="dir === 'projects'" class="work-filters" aria-label="Filter projects">
        <button type="button" :aria-pressed="filter === 'all'" @click="filter = 'all'">All</button>
        <button v-for="group in workGroups" :key="group.id" type="button" :aria-pressed="filter === group.id" @click="filter = group.id">{{ group.label }}</button>
      </div>
      <label class="work-search"><span>Search</span><input v-model="query" type="search" placeholder="project or technology…" /></label>
    </div>
    <p class="listing-hint" role="status">{{ matching.length }} / {{ files.length }} entries</p>
    <section v-for="group in groups.filter(g => g.files.length)" :key="group.id" class="work-group" :aria-labelledby="`group-${group.id}`">
      <h2 :id="`group-${group.id}`">./{{ group.id }}/ <span>— {{ group.description }}</span></h2>
      <a v-for="file in group.files" :key="file.filename" class="work-entry" :class="{ 'has-visual': showcases[file.filename] }" :href="`#${file.filename}`">
        <ProjectVisual v-if="showcases[file.filename]" :showcase="showcases[file.filename]" />
        <div class="work-entry-body">
          <div class="project-card-meta"><span>{{ fileStatus(file) }}</span><span>{{ file.year }}</span></div>
          <h3>{{ file.filename }} <span aria-hidden="true">↗</span></h3>
          <p>{{ file.oneLine }}</p>
          <p class="work-role">{{ file.role }}</p>
          <div class="project-tags"><span v-for="metric in file.metrics.slice(0, 2)" :key="metric">{{ metric }}</span></div>
          <span class="project-card-link">{{ dir === 'writing' ? 'Read note' : 'Read case study' }} →</span>
        </div>
      </a>
    </section>
    <p v-if="!matching.length" class="empty-work">No matches. Try a project name or a technology such as Go, Kafka, or React.</p>
  </div>
</template>
