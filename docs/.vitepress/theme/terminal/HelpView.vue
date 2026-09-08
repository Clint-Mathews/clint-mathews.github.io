<script setup lang="ts">
import { CLI_COMMANDS } from "../data/commands";

defineProps<{ command?: string }>();
</script>

<template>
  <div class="pane help-pane">
    <p class="cmd-line"><span class="cmd-ps">$</span> {{ command ?? "help" }}</p>
    <p class="help-h">available commands:</p>
    <div class="help-list">
      <div v-for="row in CLI_COMMANDS" :key="row.name" class="help-row">
        <span class="help-cmd">{{ row.name }}</span>
        <span class="help-cmt">// {{ row.desc }}</span>
      </div>
    </div>
  </div>
</template>
