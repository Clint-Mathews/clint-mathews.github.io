<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vitepress";
import AboutView from "./AboutView.vue";
import BootSequence from "./BootSequence.vue";
import CaseStudy from "./CaseStudy.vue";
import FileListing from "./FileListing.vue";
import HelpView from "./HelpView.vue";
import HomeView from "./HomeView.vue";
import ModuleBar from "./ModuleBar.vue";
import PromptLine from "./PromptLine.vue";
import ResumeView from "./ResumeView.vue";
import StatusHeader from "./StatusHeader.vue";
import { BOOT_STORAGE_KEY } from "../data/boot";
import {
  MODULES,
  PATH_TO_HASH,
  catTarget,
  dirHash,
  fileForHash,
  listingDirForHash,
  lsDir,
  moduleForHash,
  parseCommand,
} from "../data/commands";
import { site } from "../site";
import type { FileDir, FileEntry, ModuleId, ViewMode } from "../data/types";

const vpRoute = useRoute();

const reduced =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const draft = ref("");
const view = ref<ViewMode>("home");
const active = ref<ModuleId>("home");
const focused = ref<ModuleId>("home");
const listDir = ref<FileDir>("projects");
const openFile = ref<FileEntry | null>(null);
const errorText = ref("");
const noticeText = ref("");
const lastCmd = ref("");
const outputEl = ref<HTMLElement | null>(null);
const promptRef = ref<{ focus: () => void } | null>(null);
let ignoreHash = false;

function alreadyBooted() {
  try {
    return sessionStorage.getItem(BOOT_STORAGE_KEY) === "1";
  } catch {
    return true;
  }
}

function markBooted() {
  try {
    sessionStorage.setItem(BOOT_STORAGE_KEY, "1");
  } catch {
    /* ignore */
  }
}

function scrollTop() {
  nextTick(() => {
    if (outputEl.value) outputEl.value.scrollTop = 0;
  });
}

function setHash(h: string) {
  const next = h.startsWith("#") ? h : `#${h}`;
  if (location.hash === next) return;
  ignoreHash = true;
  location.hash = next;
  requestAnimationFrame(() => {
    ignoreHash = false;
  });
}

function focusPrompt() {
  nextTick(() => promptRef.value?.focus());
}

function showHome() {
  view.value = "home";
  active.value = "home";
  focused.value = "home";
  openFile.value = null;
  setHash("home");
  scrollTop();
}

function showWork(dir: FileDir = "projects") {
  listDir.value = dir;
  view.value = "work";
  active.value = "work";
  focused.value = "work";
  openFile.value = null;
  setHash(dirHash(dir));
  scrollTop();
}

function showAbout() {
  view.value = "about";
  active.value = "about";
  focused.value = "about";
  openFile.value = null;
  setHash("about");
  scrollTop();
}

function showResume() {
  view.value = "resume";
  active.value = "resume";
  focused.value = "resume";
  openFile.value = null;
  setHash("resume");
  scrollTop();
}

function showFile(file: FileEntry) {
  openFile.value = file;
  view.value = "file";
  active.value = "work";
  focused.value = "work";
  listDir.value = file.dir;
  setHash(file.filename);
  scrollTop();
}

function selectModule(id: ModuleId) {
  if (id === "home") showHome();
  else if (id === "work") showWork("projects");
  else if (id === "about") showAbout();
  else showResume();
  focusPrompt();
}

function showNotice(cmd: string, text: string) {
  lastCmd.value = cmd;
  noticeText.value = text;
  view.value = "notice";
  openFile.value = null;
}

async function copyEmail() {
  const addr = site.email;
  try {
    await navigator.clipboard.writeText(addr);
    showNotice("email", `copied ${addr}`);
  } catch {
    showNotice("email", addr);
  }
}

function runParsed(raw: string) {
  const parsed = parseCommand(raw);
  if (parsed.type === "empty") {
    selectModule(focused.value);
    return;
  }

  switch (parsed.type) {
    case "help":
      lastCmd.value = "help";
      view.value = "help";
      openFile.value = null;
      break;
    case "home":
      showHome();
      break;
    case "work":
      showWork("projects");
      break;
    case "about":
      showAbout();
      break;
    case "resume":
      showResume();
      break;
    case "dives":
      showWork("dives");
      break;
    case "writing":
      showWork("writing");
      break;
    case "email":
      void copyEmail();
      break;
    case "clear":
      showHome();
      break;
    case "mystery":
      showNotice("?", "???");
      break;
    case "file":
      showFile(parsed.file);
      break;
    case "ls":
      if (!parsed.dir) {
        view.value = "error";
        errorText.value = `ls: cannot access '${parsed.raw || "."}': no such directory\ntry: work · dives · writing`;
        break;
      }
      showWork(parsed.dir);
      break;
    case "cat": {
      const t = parsed.target.toLowerCase();
      if (t.includes("status")) {
        showHome();
        break;
      }
      if (t.includes("about")) {
        showAbout();
        break;
      }
      if (t.includes("resume")) {
        showResume();
        break;
      }
      if (t.includes("help")) {
        lastCmd.value = "help";
        view.value = "help";
        openFile.value = null;
        break;
      }
      const result = catTarget(parsed.target);
      if (result.missing) {
        view.value = "error";
        errorText.value = `cat: ${result.missing}: no such file\ntry: help`;
        break;
      }
      if (result.file) showFile(result.file);
      else if (result.text) {
        lastCmd.value = raw;
        noticeText.value = result.text;
        view.value = "notice";
      }
      break;
    }
    case "unknown":
      view.value = "error";
      errorText.value = `${parsed.raw}: command not found\ntry: help`;
      break;
  }
  focusPrompt();
}

function submit(v: string) {
  const cmd = v.trim();
  draft.value = "";
  if (!cmd) {
    selectModule(focused.value);
    return;
  }
  runParsed(cmd);
}

function cycleFocus(dir: 1 | -1) {
  const i = MODULES.findIndex((m) => m.id === focused.value);
  const n = (i + dir + MODULES.length) % MODULES.length;
  focused.value = MODULES[n].id;
}

function onKey(e: KeyboardEvent) {
  const tag = (e.target as HTMLElement | null)?.tagName;
  if (e.key === "ArrowUp") {
    e.preventDefault();
    cycleFocus(-1);
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    cycleFocus(1);
  } else if (e.key === "Enter" && tag !== "INPUT" && tag !== "BUTTON") {
    e.preventDefault();
    selectModule(focused.value);
  } else if (e.key === "Escape") {
    promptRef.value?.focus();
  }
}

function applyLanding(hash: string) {
  const h = hash.replace(/^#/, "");
  const file = fileForHash(h);
  if (file) {
    showFile(file);
    return;
  }
  const listing = listingDirForHash(h);
  if (listing && (h === "dives" || h === "writing" || h === "architecture" || h === "learning")) {
    showWork(listing);
    return;
  }
  const mod = moduleForHash(h);
  if (mod === "work") showWork("projects");
  else if (mod === "about") showAbout();
  else if (mod === "resume") showResume();
  else showHome();
}

function landFromUrl() {
  const raw = vpRoute.path || "/";
  const path = (raw.replace(/\.html$/, "") || "/").replace(/\/$/, "") || "/";
  const mapped =
    PATH_TO_HASH[vpRoute.path] ?? PATH_TO_HASH[path] ?? PATH_TO_HASH[`${path}.html`];
  return location.hash.replace(/^#/, "") || mapped || "home";
}

function isHomeHash(hash: string) {
  const h = hash.replace(/^#/, "").toLowerCase();
  return !h || h === "home";
}

function onBootDone() {
  markBooted();
  showHome();
  view.value = "home";
  focusPrompt();
}

function start() {
  const hash = landFromUrl();
  const home = isHomeHash(hash);

  if (!home) {
    markBooted();
    view.value = "home";
    applyLanding(hash);
    focusPrompt();
    return;
  }

  if (alreadyBooted()) {
    showHome();
    focusPrompt();
    return;
  }

  view.value = "boot";
}

function onHash() {
  if (ignoreHash) return;
  applyLanding(location.hash.replace(/^#/, "") || "home");
}

onMounted(() => {
  window.addEventListener("keydown", onKey, true);
  window.addEventListener("hashchange", onHash);
  start();
});

onUnmounted(() => {
  window.removeEventListener("keydown", onKey, true);
  window.removeEventListener("hashchange", onHash);
});
</script>

<template>
  <div class="os-root">
    <StatusHeader />
    <div ref="outputEl" class="os-scroll">
      <BootSequence v-if="view === 'boot'" :instant="reduced" @done="onBootDone" />
      <HomeView v-else-if="view === 'home'" />
      <FileListing
        v-else-if="view === 'work'"
        :files="lsDir(listDir)"
        :dir="listDir"
        @open="showFile"
      />
      <AboutView v-else-if="view === 'about'" />
      <ResumeView v-else-if="view === 'resume'" />
      <CaseStudy
        v-else-if="view === 'file' && openFile"
        :file="openFile"
        @back="showWork(listDir)"
        @list="showWork(listDir)"
      />
      <HelpView v-else-if="view === 'help'" :command="lastCmd || 'help'" />
      <div v-else-if="view === 'notice'" class="pane">
        <p class="cmd-line"><span class="cmd-ps">$</span> {{ lastCmd }}</p>
        <pre class="pane-body">{{ noticeText }}</pre>
      </div>
      <pre v-else-if="view === 'error'" class="out-err">{{ errorText }}</pre>
    </div>
    <footer v-if="view !== 'boot'" class="os-foot">
      <PromptLine ref="promptRef" v-model="draft" @submit="submit" />
      <ModuleBar :active="active" :focused="focused" @select="selectModule" />
    </footer>
  </div>
</template>
