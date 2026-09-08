import { ABOUT_MD, RESUME_TXT, STATUS_TXT, WHOAMI } from "./identity";
import { files, filesIn, fileStem, findFile } from "./files";
import type { FileDir, FileEntry, ModuleDef, ModuleId } from "./types";

export const MODULES: ModuleDef[] = [
  { id: "home", num: "01", label: "HOME", hash: "home" },
  { id: "work", num: "02", label: "WORK", hash: "work" },
  { id: "about", num: "03", label: "ABOUT", hash: "about" },
  { id: "resume", num: "04", label: "RESUME", hash: "resume" },
];

export const PATH_TO_HASH: Record<string, string> = {
  "/": "home",
  "/index.html": "home",
  "/projects": "work",
  "/projects.html": "work",
  "/architecture": "dives",
  "/architecture.html": "dives",
  "/learning": "writing",
  "/learning.html": "writing",
  "/about": "about",
  "/about.html": "about",
  "/portfolio-resilient-charging-consumer": "CHARGING_CONSUMER.rfc",
  "/portfolio-resilient-charging-consumer.html": "CHARGING_CONSUMER.rfc",
};

export interface CliRow {
  name: string;
  desc: string;
}

const FILE_ALIASES: Record<string, string[]> = {
  "PHOTONICOPS.eng": ["photonic"],
  "ECHOGATE.gw": ["echo"],
  "FENCELOCK.lock": ["fence"],
  "KAFKA.consumer": ["consumer"],
  "OCPP.gw": ["gateway"],
  "FPC.platform": ["charging"],
  "JIRALYZER.ai": ["jira"],
  "REDIS_PUBSUB.msg": ["redis"],
  "FILE2VIDEO.bin": ["f2v"],
  "AI_FIRST.md": ["opencode", "codex", "openrouter", "cursor", "claude"],
};

export const CLI_COMMANDS: CliRow[] = [
  { name: "home", desc: "go home" },
  { name: "work", desc: "project list" },
  ...filesIn("projects").map((f, i) => {
    const name = fileStem(f.filename);
    const als = FILE_ALIASES[f.filename];
    const n = String(i + 1).padStart(2, "0");
    const also = als?.length ? ` (also: ${als.join(", ")})` : "";
    return { name, desc: `case study ${n}${also}` };
  }),
  { name: "dives", desc: "architecture RFCs" },
  { name: "writing", desc: "posts and experiments" },
  {
    name: "ai_first",
    desc: "coding harnesses (also: claude, cursor, opencode, codex, openrouter)",
  },
  { name: "about", desc: "about page" },
  { name: "resume", desc: "resume" },
  { name: "email", desc: "copy email" },
  { name: "clear", desc: "clear response" },
  { name: "hide", desc: "hide response (same as clear)" },
  { name: "whoami", desc: "short bio" },
  { name: "?", desc: "???" },
];

export const HELP_TXT = [
  "available commands:",
  ...CLI_COMMANDS.map((c) => `${c.name} // ${c.desc}`),
].join("\n");

const aliasToFile = new Map<string, FileEntry>();
for (const f of files) {
  aliasToFile.set(fileStem(f.filename), f);
  aliasToFile.set(f.filename.toLowerCase(), f);
  for (const a of FILE_ALIASES[f.filename] ?? []) {
    aliasToFile.set(a.toLowerCase(), f);
  }
}

export type Parsed =
  | { type: "empty" }
  | { type: "help" }
  | { type: "home" }
  | { type: "work" }
  | { type: "about" }
  | { type: "resume" }
  | { type: "dives" }
  | { type: "writing" }
  | { type: "email" }
  | { type: "clear" }
  | { type: "mystery" }
  | { type: "file"; file: FileEntry }
  | { type: "cat"; target: string }
  | { type: "ls"; dir: FileDir | null; raw: string }
  | { type: "unknown"; raw: string };

export function parseCommand(raw: string): Parsed {
  const s = raw.trim();
  if (!s) return { type: "empty" };
  const lower = s.toLowerCase();

  if (lower === "help") return { type: "help" };
  if (lower === "?") return { type: "mystery" };
  if (lower === "home" || lower === "whoami") return { type: "home" };
  if (lower === "work" || lower === "projects") return { type: "work" };
  if (lower === "about") return { type: "about" };
  if (lower === "resume") return { type: "resume" };
  if (lower === "dives" || lower === "architecture") return { type: "dives" };
  if (lower === "writing" || lower === "learning") return { type: "writing" };
  if (lower === "email") return { type: "email" };
  if (lower === "clear" || lower === "cls" || lower === "hide") return { type: "clear" };

  const hit = aliasToFile.get(lower);
  if (hit) return { type: "file", file: hit };

  const cat = s.match(/^(?:cat|open|less|more)\s+(.+)$/i);
  if (cat) return { type: "cat", target: normalizeTarget(cat[1]) };

  if (/^ls(\s|$)/i.test(s)) {
    const rest = s.replace(/^ls(\s+-l[aA]?)?\s*/i, "").trim();
    return { type: "ls", dir: dirFromPath(rest), raw: rest };
  }

  return { type: "unknown", raw: s };
}

function normalizeTarget(t: string): string {
  return t.replace(/^["']|["']$/g, "").replace(/^\/+/, "").trim();
}

function dirFromPath(path: string): FileDir | null {
  const p = path.toLowerCase().replace(/\/+$/, "");
  if (!p || p === "." || p === "/projects" || p === "projects" || p === "/work" || p === "work")
    return "projects";
  if (p === "/dives" || p === "dives" || p === "/architecture") return "dives";
  if (p === "/writing" || p === "writing" || p === "/learning") return "writing";
  if (p.includes("project")) return "projects";
  if (p.includes("dive") || p.includes("arch")) return "dives";
  if (p.includes("writ") || p.includes("learn")) return "writing";
  return null;
}

export function specialCat(target: string): string | null {
  const t = target.toLowerCase().split("/").pop() ?? target;
  if (t === "status.txt" || t === "status") return STATUS_TXT;
  if (t === "about.md" || t === "about") return ABOUT_MD;
  if (t === "resume.txt" || t === "resume" || t === "resume.pdf") return RESUME_TXT;
  if (t === "help.txt" || t === "help") return HELP_TXT;
  if (t === "whoami") return WHOAMI;
  return null;
}

export function catTarget(target: string): { text?: string; file?: FileEntry; missing?: string } {
  const special = specialCat(target);
  if (special) return { text: special };
  const file = findFile(target);
  if (file) return { file };
  return { missing: target };
}

export function lsDir(dir: FileDir): FileEntry[] {
  return filesIn(dir);
}

export function lsCommand(dir: FileDir): string {
  return dir === "projects" ? "ls -la /projects/" : `ls /${dir}/`;
}

export function dirHash(dir: FileDir): string {
  if (dir === "projects") return "work";
  return dir;
}

export function moduleForHash(hash: string): ModuleId | null {
  const h = hash.replace(/^#/, "").toLowerCase();
  if (h === "home" || h === "") return "home";
  if (h === "work" || h === "projects") return "work";
  if (h === "about") return "about";
  if (h === "resume") return "resume";
  return MODULES.find((m) => m.hash === h)?.id ?? null;
}

export function listingDirForHash(hash: string): FileDir | null {
  const h = hash.replace(/^#/, "").toLowerCase();
  if (h === "work" || h === "projects") return "projects";
  if (h === "dives" || h === "architecture") return "dives";
  if (h === "writing" || h === "learning") return "writing";
  return null;
}

export function fileForHash(hash: string): FileEntry | undefined {
  const h = hash.replace(/^#/, "");
  return findFile(h) ?? files.find((f) => f.filename === h);
}

export function caseTitle(file: FileEntry): string {
  const first = file.body.split("\n")[0] ?? "";
  const rest = first.replace(/^\/\/\s*/, "");
  const em = rest.includes("—") ? rest.split("—").slice(1).join("—").trim() : "";
  if (em) return file.filename.split(".")[0].toUpperCase();
  return file.filename.split(".")[0].toUpperCase();
}

export function caseSections(file: FileEntry): { heading: string; body: string }[] {
  const lines = file.body.split("\n");
  const sections: { heading: string; body: string }[] = [];
  let heading = "";
  let buf: string[] = [];
  const flush = () => {
    const body = buf.join("\n").trim();
    if (heading || body) sections.push({ heading: heading || "NOTE", body });
    buf = [];
  };
  for (const line of lines) {
    const m = line.match(/^\/\/\s+(.+)$/);
    if (m) {
      const h = m[1].trim();
      if (!heading && !buf.join("").trim() && /[.—]/.test(h) && h.length > 20) {
        continue;
      }
      flush();
      heading = h;
      continue;
    }
    buf.push(line);
  }
  flush();
  return sections.filter((s) => s.body || s.heading);
}

export function fileIndex(file: FileEntry): { n: number; total: number } {
  const list = filesIn(file.dir);
  const i = list.findIndex((f) => f.filename === file.filename);
  return { n: i + 1, total: list.length };
}

export function fileStatus(file: FileEntry): string {
  if (file.status) return file.status;
  if (file.dir === "dives") return "RFC";
  if (file.dir === "writing") return "NOTE";
  return "SHIPPED";
}

export function filePlatform(file: FileEntry): string {
  if (file.platform) return file.platform;
  return file.stack.slice(0, 4).join(" -- ");
}

export { WHOAMI, files };
