<script setup lang="ts">
import type { ModuleId } from "../data/types";
import { MODULES } from "../data/commands";

defineProps<{
  active: ModuleId;
  focused: ModuleId;
}>();
const emit = defineEmits<{ select: [id: ModuleId] }>();
</script>

<template>
  <nav class="module-bar" aria-label="modules">
    <div class="mod-prompt">
      <span class="mod-path">root@clint/nav</span>
      <span class="mod-gt"> &gt; </span>
      <span>SELECT MODULE [↑↓ arrows + ENTER or click]</span>
    </div>
    <div class="mod-chips">
      <button
        v-for="m in MODULES"
        :key="m.id"
        type="button"
        class="mod-chip"
        :class="{ on: focused === m.id }"
        :aria-current="active === m.id ? 'page' : undefined"
        @click="emit('select', m.id)"
      >
        {{ focused === m.id ? "> " : "" }}{{ m.num }}._{{ m.label }}
      </button>
    </div>
  </nav>
</template>
