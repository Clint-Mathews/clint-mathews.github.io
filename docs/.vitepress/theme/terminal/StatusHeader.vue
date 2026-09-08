<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { SYS } from "../data/identity";

const started = new Date("2026-07-29T00:00:00").getTime();
const uptime = ref("00:00:00");
let timer = 0;

function tick() {
  const s = Math.floor((Date.now() - started) / 1000);
  const days = Math.floor(s / 86_400);
  const hh = String(Math.floor((s % 86_400) / 3600)).padStart(2, "0");
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  uptime.value = `${days}d ${hh}:${mm}:${ss}`;
}

onMounted(() => {
  tick();
  timer = window.setInterval(tick, 1000);
});
onUnmounted(() => window.clearInterval(timer));
</script>

<template>
  <header class="sys-head" aria-label="system status">
    <div class="sys-cols">
      <div class="sys-col">
        <div class="sys-row">
          <em>SYS.NAME</em> : <span>{{ SYS.name }}</span>
        </div>
        <div class="sys-row">
          <em>SYS.AUTH</em> : <span class="sys-ok">{{ SYS.auth }}</span>
        </div>
        <div class="sys-row">
          <em>SYS.NODE</em> : <span>{{ SYS.node }}</span>
        </div>
      </div>
      <div class="sys-col sys-col-right">
        <div class="sys-row">
          <em>STATUS</em><span class="sys-sep"> : </span><span class="sys-status">{{ SYS.status }}</span>
        </div>
        <div class="sys-row">
          <em>TERMINAL</em><span class="sys-sep"> : </span><span>{{ SYS.terminal }}</span>
        </div>
        <div class="sys-row">
          <em>UPTIME</em><span class="sys-sep"> : </span><span>{{ uptime }}</span>
        </div>
      </div>
    </div>
  </header>
</template>
