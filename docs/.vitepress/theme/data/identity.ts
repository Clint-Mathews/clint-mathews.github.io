import { site, availability } from "../site";

export const SYS = {
  name: "CLINT_OS v1.0.0",
  auth: "GUEST_ACCESS_GRANTED",
  node: "clint-mathews.github.io",
  status: "200",
  terminal: "TTY0",
};

export const ASCII_BANNER = [
  "   ____ _     ___ _   _ _____",
  "  / ___| |   |_ _| \\ | |_   _|",
  " | |   | |    | ||  \\| | | |",
  " | |___| |___ | || |\\  | | |",
  "  \\____|_____|___|_| \\_| |_|",
].join("\n");

export const WHOAMI = [
  `${site.name} — backend engineer, 7+ years.`,
  "Seven years building infrastructure, the last four at Ford Pro. I design",
  "the systems that stay up when traffic stops being theoretical, and I write the",
  "RFC before I write the code. Backend that holds when the load arrives.",
].join("\n");

export const STATUS_ROWS = [
  { k: "LOCATION", v: `India -- ${availability.cells[2].value}` },
  { k: "FOCUS", v: `${availability.cells[3].value} -- systems under load` },
  { k: "CONTACT", v: site.email },
];

export const STATUS_TXT = [
  "// STATUS.TXT",
  `LOCATION : India -- ${availability.cells[2].value}`,
  `FOCUS    : ${availability.cells[3].value} -- systems under load`,
  `CONTACT  : ${site.email}`,
].join("\n");

export const HOME_TIP = "TIP: ↑↓ arrows to navigate -- type a command (try: help)";

export const ABOUT_MD = [
  "// ABOUT.MD",
  `${site.name}, backend engineer with 7+ years building high-performance`,
  "distributed systems that power enterprise-scale platforms.",
  "",
  "// WHAT I DO",
  "I architect and build the backend systems that organizations depend on. Work",
  "spans the full lifecycle of distributed platforms: authoring foundational RFCs,",
  "designing microservice architectures, implementing high-throughput data",
  "pipelines, and optimizing observability at scale.",
  "",
  "I collaborate with hardware/firmware, CX, and Product to turn requirements",
  "into reliable technical solutions, and mentor junior engineers through",
  "rigorous code reviews.",
  "",
  "// EXPERIENCE",
  "Technical Lead (Senior Software Engineer) — Ford Motor Company · Remote, India",
  "Aug 2022 – Present",
  "- Led backend delivery for the monolith-to-microservices transition",
  "- Technical translator between Product, engineering, and hardware/firmware",
  "- Owned L3 production support; 99.95% uptime and RCA on incidents",
  "- Authored foundational RFCs for OCPP 2.x and core platform services",
  "",
  "Software Engineer — Experion Technologies · Hybrid, Kochi, India",
  "Aug 2019 – Jul 2022",
  "- Directed technical delivery across 4 enterprise projects",
  "- Mentored teams of up to 10 developers across the full SDLC",
  "- Sage ERP inventory SaaS; +25% customer satisfaction",
  "",
  "// SKILLS",
  "Languages     : Golang · Python · TypeScript · JavaScript · C#",
  "Backend/Cloud : NestJS · .NET Core · Kafka · AWS · Docker · Flask · etcd",
  "Data          : PostgreSQL · MongoDB · Redis · MySQL",
  "Architecture  : Microservices · event-driven · circuit breakers · backpressure",
  "                · fencing tokens · OCPP · RFC authorship",
  "Go systems    : gRPC · Protobuf · zero-allocation hot paths · pprof",
  "AI agents     : Claude Code · Cursor · OpenCode · Codex · OpenRouter",
  "               · Copilot Enterprise · Ollama · Langfuse",
  "",
  "// EDUCATION",
  "B.Sc. Computer Science — Mar Athanasius College of Engineering",
  "GPA 7.88 / 10",
  "",
  "// AWARDS",
  '- "Go that Extra Mile", Ford Pro, 2023',
  "- Retail & Pro Services Technology Hackathon Finalist, Ford Pro, Q4 2025",
  "- Spot Award, Experion Technologies, Apr 2022",
  "- Award of Excellence, Experion Technologies, Oct 2021",
  "- R&R Award, Experion Technologies, Oct 2020",
  "",
  "// CONNECT",
  `mailto:${site.email}`,
  site.github,
  site.linkedin,
  site.resume,
].join("\n");

export const RESUME_TXT = [
  "// RESUME.TXT  — condensed. Full PDF:",
  site.resume,
  "",
  `${site.name}`,
  "Backend engineer for systems under load.",
  `${site.email} · ${site.phone}`,
  "",
  "// EXPERIENCE",
  "Ford Motor Company — Technical Lead (Senior Software Engineer)  2022–present",
  "EV charging platform: 8,200 chargers, 6M messages/day, 99.95% uptime.",
  "OCPP gateway migration (~2,150 servers decommissioned, $9K/mo cut).",
  "Kafka fleet consumer + RFC for backpressure/circuit breaking.",
  "SME for charger data systems (NestJS, MongoDB).",
  "",
  "Experion Technologies — Software Engineer  2019–2022",
  "Full-stack .NET/Angular/AWS/ERP across SCANCO, ARIA/BAZAR, WAREFLEX.",
  "",
  "// EDUCATION",
  "B.Sc. Computer Science — Mar Athanasius College of Engineering",
  "GPA 7.88 / 10",
  "",
  "// SKILLS",
  "Go · Python · Kafka · NestJS · AWS · Postgres · Redis · etcd · OCPP",
  "AI agents: Claude Code · Cursor · OpenCode · Codex · OpenRouter",
].join("\n");

export const RESUME_PAGE = {
  experience: [
    {
      title: "TECHNICAL LEAD (SENIOR SOFTWARE ENGINEER) -- FORD MOTOR COMPANY",
      dates: "DATES: 2022.08 -- PRESENT",
      bullets: [
        "Backend for Ford Pro Charging: 8,200 chargers, 6M messages/day, 99.95% uptime.",
        "OCPP gateway migration: ~2,150 servers decommissioned, $9K/mo infra cut.",
        "Kafka fleet consumer + RFC for backpressure and circuit breaking.",
        "SME for charger data systems (NestJS, MongoDB); L3 production support.",
      ],
    },
    {
      title: "SOFTWARE ENGINEER -- EXPERION TECHNOLOGIES",
      dates: "DATES: 2019.08 -- 2022.07",
      bullets: [
        "Directed technical delivery across 4 enterprise projects.",
        "Mentored teams of up to 10 developers across the full SDLC.",
        "Sage ERP inventory SaaS; +25% customer satisfaction.",
      ],
    },
  ],
  education: [
    {
      title: "B.SC. COMPUTER SCIENCE -- MAR ATHANASIUS COLLEGE OF ENGINEERING",
      dates: "GPA 7.88 / 10",
      bullets: [] as string[],
    },
  ],
  skills: [
    "Go · Python · TypeScript · NestJS · Kafka · AWS · Postgres · Redis · etcd · OCPP",
    "AI agents: Claude Code · Cursor · OpenCode · Codex · OpenRouter",
  ],
  pdf: site.resume,
  email: site.email,
};

