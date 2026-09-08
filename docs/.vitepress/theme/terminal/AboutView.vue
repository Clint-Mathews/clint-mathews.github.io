<script setup lang="ts">
import { ABOUT_MD } from "../data/identity";

const body = ABOUT_MD.replace(/^\/\/ ABOUT\.MD\n/, "");
</script>

<template>
  <div class="pane about-pane">
    <p class="cmd-line"><span class="cmd-ps">$</span> cat about.md</p>
    <pre class="pane-body">{{ body }}</pre>
  </div>
</template>
