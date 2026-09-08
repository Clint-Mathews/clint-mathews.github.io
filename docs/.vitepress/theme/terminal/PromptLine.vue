<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from "vue";

const props = defineProps<{
  modelValue: string;
  disabled?: boolean;
}>();
const emit = defineEmits<{
  "update:modelValue": [v: string];
  submit: [v: string];
}>();

const input = ref<HTMLInputElement | null>(null);

function onKey(e: KeyboardEvent) {
  if (e.key === "Enter") emit("submit", props.modelValue);
}

onMounted(() => input.value?.focus());

watch(
  () => props.disabled,
  async (v) => {
    if (!v) {
      await nextTick();
      input.value?.focus();
    }
  },
);

defineExpose({ focus: () => input.value?.focus() });
</script>

<template>
  <div class="prompt-line" @click="input?.focus()">
    <span class="prompt-ps">clint@portfolio:~$</span>
    <span v-if="!modelValue" class="block-cursor" aria-hidden="true"></span>
    <input
      ref="input"
      class="prompt-input"
      type="text"
      autocomplete="off"
      autocapitalize="off"
      autocorrect="off"
      spellcheck="false"
      placeholder="type a command (try: help)"
      :disabled="disabled"
      :value="modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @keydown="onKey"
      aria-label="terminal command"
    />
  </div>
</template>
