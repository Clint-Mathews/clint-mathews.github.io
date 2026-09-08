<script setup lang="ts">
import AsciiBanner from "./AsciiBanner.vue";
import { HOME_TIP, STATUS_ROWS, WHOAMI } from "../data/identity";
import { site } from "../site";
</script>


<template>
  <div class="pane home-pane">
    <AsciiBanner />
    <p class="cmd-line"><span class="cmd-ps">$</span> whoami</p>
    <pre class="pane-body">{{ WHOAMI }}</pre>
    <p class="cmd-line"><span class="cmd-ps">$</span> cat status.txt</p>
    <div class="kv-table">
      <div v-for="row in STATUS_ROWS" :key="row.k" class="kv-row">
        <span class="kv-k">{{ row.k }}</span>
        <a v-if="row.k === 'CONTACT'" class="kv-v" :href="`mailto:${site.email}`">{{ row.v }}</a>
        <span v-else class="kv-v">{{ row.v }}</span>
      </div>
    </div>
    <p class="home-tip">{{ HOME_TIP }}</p>
  </div>
</template>
