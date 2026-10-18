<script setup lang="ts">
import { computed, ref } from "vue";

const steps = [
  { title: "Client A acquires a lease", a: "Holds token 41", b: "Waiting", store: "Last accepted token: 40", detail: "The lock service issues an increasing token. Client A has permission to attempt a write, but the resource still has to check it." },
  { title: "Client A pauses; its lease expires", a: "Paused · lease expired", b: "Waiting", store: "Last accepted token: 40", detail: "A long pause outlives the lease. Client A cannot observe the expiry while it is paused. A timeout alone cannot prevent its next write." },
  { title: "Client B acquires and writes", a: "Paused · token 41", b: "Writes with token 42", store: "Last accepted token: 42", detail: "Client B receives token 42. The resource accepts the write and remembers 42 as the highest token it has seen." },
  { title: "Client A resumes with stale authority", a: "Attempts write · token 41", b: "Current owner · token 42", store: "REJECTED: 41 < 42", detail: "The resource rejects A's stale token. The guarantee lives at the write boundary, not in the client's belief that it owns a lock." },
];
const index = ref(0);
const step = computed(() => steps[index.value]);
</script>

<template>
  <section class="fencing-demo" aria-labelledby="fencing-heading">
    <div class="section-heading">
      <h2 id="fencing-heading" class="case-h">// interactive walkthrough</h2>
      <span class="demo-label">ILLUSTRATIVE MODEL</span>
    </div>
    <p>Step through the pause → expire → fence failure scenario. This explains the protocol; it does not run a live lock service.</p>
    <div class="demo-state" aria-live="polite" aria-atomic="true">
      <p class="demo-step">0{{ index + 1 }} / 04 — {{ step.title }}</p>
      <div class="demo-clients">
        <div><span>CLIENT A</span><strong>{{ step.a }}</strong></div>
        <div><span>CLIENT B</span><strong>{{ step.b }}</strong></div>
      </div>
      <div class="demo-resource" :class="{ rejected: index === 3 }"><span>PROTECTED RESOURCE</span><strong>{{ step.store }}</strong></div>
      <p class="demo-explanation">{{ step.detail }}</p>
    </div>
    <div class="demo-controls">
      <button type="button" :disabled="index === 0" @click="index--">← Previous</button>
      <button type="button" @click="index = (index + 1) % steps.length">{{ index === 3 ? 'Reset walkthrough ↺' : 'Next step →' }}</button>
    </div>
  </section>
</template>
