<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { ASCII_BANNER, GOPHER_FRAMES } from "../data/identity";

const frame = ref(0);
let timer: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;
  timer = setInterval(() => {
    frame.value = (frame.value + 1) % GOPHER_FRAMES.length;
  }, 1100);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<template>
  <div class="ascii-hero">
    <pre class="ascii-banner" aria-hidden="true">{{ ASCII_BANNER }}</pre>
    <div class="ascii-gopher-stage" title="Go gopher, after Renee French">
      <img
        v-for="(src, i) in GOPHER_FRAMES"
        :key="src"
        class="ascii-gopher-img"
        :class="{ on: i === frame }"
        :src="src"
        width="96"
        height="96"
        alt=""
      />
    </div>
  </div>
</template>
