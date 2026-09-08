<script setup lang="ts">
import { computed, ref } from "vue";
import type { FileDir, FileEntry } from "../data/types";
import { lsCommand } from "../data/commands";

const props = defineProps<{ files: FileEntry[]; dir: FileDir }>();
const emit = defineEmits<{ open: [file: FileEntry] }>();

const expanded = ref<string | null>(null);

const hint = computed(
  () =>
    `${props.files.length} entries -- click filename to expand -- click [OPEN] to read case study`,
);

function toggle(file: FileEntry) {
  expanded.value = expanded.value === file.filename ? null : file.filename;
}

function open(file: FileEntry) {
  emit("open", file);
}
</script>

<template>
  <div class="pane work-pane">
    <p class="cmd-line"><span class="cmd-ps">$</span> {{ lsCommand(dir) }}</p>
    <p class="listing-hint">{{ hint }}</p>
    <div class="file-listing">
      <div class="ls-head">
        <span class="ls-name">NAME</span>
        <span class="ls-size">SIZE</span>
        <span class="ls-year">MODIFIED</span>
        <span class="ls-desc">DESCRIPTION</span>
      </div>
      <div v-for="file in files" :key="file.filename" class="ls-block">
        <button class="ls-row" type="button" @click="toggle(file)">
          <span class="ls-name">{{ file.filename }}</span>
          <span class="ls-size">{{ file.size }}</span>
          <span class="ls-year">{{ file.year }}</span>
          <span class="ls-desc">{{ file.oneLine }}</span>
        </button>
        <div v-if="expanded === file.filename" class="ls-meta">
          <p><em>DESC</em>    {{ file.desc }}</p>
          <p><em>ROLE</em>    {{ file.role }}</p>
          <p><em>STACK</em>   {{ file.stack.join(" · ") }}</p>
          <p><em>METRICS</em> {{ file.metrics.join(" · ") }}</p>
          <p v-if="file.award"><em>AWARD</em>   {{ file.award }}</p>
          <div class="ls-open-line">
            <span class="cmd-ps">$</span>
            <span> cat {{ file.filename }}</span>
            <button class="open-btn" type="button" @click="open(file)">[OPEN]</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
