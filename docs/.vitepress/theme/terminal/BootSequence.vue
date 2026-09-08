<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { BOOT_HEAD, BOOT_LINES, type BootLine } from "../data/boot";

const props = defineProps<{ instant?: boolean }>();
const emit = defineEmits<{ done: [] }>();

const shown = ref<(BootLine & { ready?: boolean })[]>([]);
let cancelled = false;

function delay(ms: number) {
  return new Promise<void>((r) => setTimeout(r, props.instant ? 0 : ms));
}

onMounted(async () => {
  if (props.instant) {
    shown.value = BOOT_LINES.map((l) => ({ ...l, ready: true }));
    await delay(80);
    if (!cancelled) emit("done");
    return;
  }

  await delay(220);

  for (const line of BOOT_LINES) {
    if (cancelled) return;
    shown.value.push({ label: line.label, ready: false });
    await delay(90 + Math.random() * 70);
    if (cancelled) return;
    const idx = shown.value.length - 1;
    shown.value[idx] = { ...line, ready: true };
    await delay(55);
  }

  await delay(420);
  if (!cancelled) emit("done");
});

onUnmounted(() => {
  cancelled = true;
});
</script>

<template>
  <div class="boot-seq" aria-live="polite">
    <div class="boot-head">{{ BOOT_HEAD }}</div>
    <div v-for="(line, i) in shown" :key="i" class="boot-line" :class="{ pending: !line.ready }">
      <span class="boot-label">{{ line.label }}</span>
      <span v-if="line.ready && line.status" class="boot-status">[{{ line.status }}]</span>
    </div>
  </div>
</template>
