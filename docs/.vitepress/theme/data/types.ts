export type ModuleId = "home" | "work" | "about" | "resume";

export type FileDir = "projects" | "writing" | "dives";

export interface FileLink {
  label: string;
  href: string;
}

export interface FileEntry {
  filename: string;
  year: string;
  size: string;
  oneLine: string;
  desc: string;
  role: string;
  stack: string[];
  metrics: string[];
  body: string;
  links?: FileLink[];
  dir: FileDir;
  award?: string;
  platform?: string;
  status?: string;
}

export interface ModuleDef {
  id: ModuleId;
  num: string;
  label: string;
  hash: string;
}

export type OutputKind = "command" | "text" | "listing" | "error";

export interface OutputBlock {
  id: number;
  kind: OutputKind;
  text?: string;
  dir?: FileDir;
  files?: FileEntry[];
}

export type ViewMode =
  | "boot"
  | "home"
  | "work"
  | "about"
  | "resume"
  | "help"
  | "error"
  | "file"
  | "notice";
