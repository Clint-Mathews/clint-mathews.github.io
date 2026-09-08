<script setup lang="ts">
import { computed } from "vue";
import type { FileEntry } from "../data/types";
import { caseSections, caseTitle, fileIndex, filePlatform, fileStatus } from "../data/commands";
import { site } from "../site";

const props = defineProps<{ file: FileEntry }>();
const emit = defineEmits<{ back: []; list: [] }>();

const title = computed(() => caseTitle(props.file));
const idx = computed(() => fileIndex(props.file));
const sections = computed(() => caseSections(props.file));
const dirPath = computed(() => `/${props.file.dir}`);

function linkify(text: string) {
  const re = /(https?:\/\/[^\s]+|\/[A-Za-z0-9._/-]+\.(?:pdf|svg|png|jpe?g))/g;
  const parts: { t: string; href?: string }[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push({ t: text.slice(last, m.index) });
    parts.push({ t: m[0], href: m[0] });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ t: text.slice(last) });
  return parts.length ? parts : [{ t: text }];
}
</script>

<template>
  <div class="pane case-pane">
    <p class="crumb">
      <button type="button" class="crumb-link" @click="emit('back')">back</button>
      <button type="button" class="crumb-link" @click="emit('list')">{{ dirPath }}</button>
      <span class="crumb-sep">/</span>
      <span class="crumb-file">{{ file.filename }}</span>
    </p>
    <p class="cmd-line"><span class="cmd-ps">$</span> cat {{ file.filename }}</p>
    <p class="case-idx">{{ String(idx.n).padStart(2, "0") }} / {{ String(idx.total).padStart(2, "0") }}</p>
    <h1 class="case-title">{{ title }}</h1>
    <p class="case-sub">{{ file.oneLine }}</p>
    <div class="case-meta">
      <div><em>ROLE</em> {{ file.role }}</div>
      <div><em>YEAR</em> {{ file.year }}</div>
      <div><em>PLATFORM</em> {{ filePlatform(file) }}</div>
      <div><em>STATUS</em> {{ fileStatus(file) }}</div>
      <div v-if="file.award"><em>AWARD</em> <span class="sys-ok">{{ file.award }}</span></div>
    </div>
    <section v-for="(sec, i) in sections" :key="i" class="case-sec">
      <h2 class="case-h">// {{ sec.heading }}</h2>
      <pre class="pane-body"><template v-for="(p, j) in linkify(sec.body)" :key="j"><a
            v-if="p.href"
            :href="p.href"
            :target="p.href.startsWith('http') ? '_blank' : undefined"
            rel="noopener"
          >{{ p.t }}</a><template v-else>{{ p.t }}</template></template></pre>
    </section>
    <p v-if="file.links?.length" class="case-links">
      <a v-for="l in file.links" :key="l.href" :href="l.href" :target="l.href.startsWith('http') ? '_blank' : undefined" rel="noopener">{{ l.label }}</a>
    </p>
    <p class="case-mail"><a :href="`mailto:${site.email}`">{{ site.email }}</a></p>
  </div>
</template>
