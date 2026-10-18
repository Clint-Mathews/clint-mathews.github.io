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

export const GOPHER_FRAMES = [
  "/gopher/gopher-dance-1.png",
  "/gopher/gopher-dance-2.png",
  "/gopher/gopher-dance-3.png",
  "/gopher/gopher-dance-4.png",
];

export const PROFILE_INTRO = `${site.name} — technical lead and backend engineer, 7+ years. At Ford Pro, I lead four team members and own 20 services, translating product needs into technical requirements and delivery plans. I connect feature delivery with the ongoing reliability and improvement of the systems we run.`;

export const WHOAMI = [
  `${site.name} — technical lead and backend engineer, 7+ years.`,
  "At Ford Pro, I lead four team members and own 20 services.",
  "Technical Lead since mid-2025, previously Member of Technical Staff 2–3.",
  "My focus is technical leadership: gathering",
  "requirements, translating product needs into engineering plans, guiding",
  "feature delivery, and continuously improving the services we operate.",
  "Passionate about Golang and building real solutions with it.",
  "I like reading. Favorite book: The Stranger by Albert Camus.",
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
  `READING  : The Stranger -- Albert Camus`,
  `CONTACT  : ${site.email}`,
].join("\n");

export const HOME_TIP = "TIP: ↑↓ arrows to navigate -- type a command (try: help)";

export const ABOUT_MD = [
  "// ABOUT.MD",
  `${site.name}, technical lead and backend engineer with 7+ years building`,
  "distributed systems that power enterprise-scale platforms.",
  "Passionate about Golang and building solutions with it — a gopher",
  "through and through.",
  "",
  "// WHAT I DO",
  "I have been a Technical Lead since mid-2025, after working as Member of",
  "Technical Staff 2–3 at Ford from August 2022 to mid-2025.",
  "I lead four team members and own 20 services at Ford Pro, combining feature",
  "delivery with service management, reliability, and continuous improvement.",
  "",
  "I gather context from Product, CX, hardware/firmware, and partner teams,",
  "clarify requirements, and translate product needs into scoped technical work.",
  "I explain engineering constraints and tradeoffs to help Product make informed",
  "decisions, then guide the team through implementation and ongoing ownership.",
  "Architecture, RFCs, code reviews, and production support remain part of the job.",
  "",
  "// EXPERIENCE",
  "Ford Motor Company · Remote, India",
  "Company tenure: Aug 2022 – Present",
  "Current: Technical Lead — mid-2025 – Present",
  "Previous: Member of Technical Staff 2–3 — Aug 2022 – mid-2025",
  "- Lead four team members and own 20 services across charging and its utilities",
  "- Gather requirements and translate product needs into technical delivery plans",
  "- Manage service operations and drive continuous improvements",
  "- Led backend delivery for the monolith-to-microservices transition",
  "- Owned L3 production support; 99.95% uptime and RCA on incidents",
  "- Authored foundational RFCs for OCPP 2.x and core platform services",
  "- Use AI tools in engineering workflows; contributed to a new AI chatbot feature",
  "",
  "Software Engineer — Experion Technologies · Hybrid, Kochi, India",
  "Aug 2019 – Jul 2022",
  "- Directed technical delivery across 4 enterprise projects",
  "- Mentored teams of up to 10 developers across the full SDLC",
  "- Sage ERP inventory SaaS; +25% customer satisfaction",
  "",
  "// SKILLS",
  "Languages     : Golang · Python · TypeScript · JavaScript · C#",
  "Backend/Cloud : NestJS · FastAPI · .NET Core · Kafka · Redis · BullMQ · AWS · GCP",
  "Data          : PostgreSQL · MongoDB · Redis · MySQL",
  "Frontend      : React · JavaScript · TypeScript",
  "Architecture  : Microservices · event-driven · circuit breakers · backpressure",
  "                · fencing tokens · OCPP · RFC authorship",
  "Go systems    : gRPC · Protobuf · zero-allocation hot paths · pprof",
  "AI agents     : Claude Code · Cursor · OpenCode · Codex · OpenRouter",
  "               · Copilot Enterprise · Ollama · Langfuse",
  "",
  "// AI AT WORK",
  "Alongside AI-assisted engineering workflows, I have contributed to a new AI",
  "chatbot feature at work. A separate project write-up is in progress; the",
  "architecture and implementation details will be added in a future case study.",
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
  "",
  "// OFF DUTY",
  "I like reading. Favorite book: The Stranger by Albert Camus.",
].join("\n");

export const RESUME_TXT = [
  "// RESUME.TXT  — condensed. Full PDF:",
  site.resume,
  "",
  `${site.name}`,
  "Technical lead connecting product needs, engineering delivery, and service ownership.",
  `${site.email} · ${site.phone}`,
  "",
  "// EXPERIENCE",
  "Ford Motor Company — company tenure: Aug 2022–present",
  "Current: Technical Lead — mid-2025 – Present",
  "Previous: Member of Technical Staff 2–3 — Aug 2022 – mid-2025",
  "Lead four team members and own 20 services across charging and its utilities.",
  "Gather requirements and translate product needs into scoped technical delivery plans.",
  "Manage service operations and drive continuous improvements with partner teams.",
  "Use AI tools in engineering workflows; contributed to a new AI chatbot feature.",
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
   "Go · Python · TypeScript · JavaScript · NestJS · FastAPI · Kafka · Redis · BullMQ · GCP",
  "AI agents: Claude Code · Cursor · OpenCode · Codex · OpenRouter",
].join("\n");

export const RESUME_PAGE = {
  experience: [
    {
      title: "FORD MOTOR COMPANY",
      dates: "COMPANY TENURE: 2022.08 -- PRESENT",
      progression: [
        "CURRENT: Technical Lead — mid-2025 – Present",
        "PREVIOUS: Member of Technical Staff 2–3 — Aug 2022 – mid-2025",
      ].join("\n"),
      bullets: [
        "Current leadership scope: leading four team members and owning 20 services.",
        "Gather requirements across Product, CX, hardware/firmware, and partner teams; translate product needs into scoped technical delivery plans.",
        "Guide feature delivery, communicate technical tradeoffs, and manage service operations and continuous improvements.",
        "Use AI tools in engineering workflows; contributed to a new AI chatbot feature.",
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
    "Technical leadership · Requirements gathering · Product–engineering translation · Service ownership",
    "Go · Python · TypeScript · JavaScript · NestJS · FastAPI · Kafka · Redis · BullMQ",
    "React · Postgres · MongoDB · AWS · GCP · etcd · OCPP",
    "AI agents: Claude Code · Cursor · OpenCode · Codex · OpenRouter",
  ],
  pdf: site.resume,
  email: site.email,
};
