import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import puppeteer from "puppeteer";

const root = process.cwd();
const databankPath = path.join(root, "DataBank/master-resume-databank.md");
const defaultOutput = path.join(root, "docs/public/CLINT-MATHEWS.pdf");
const outputFlag = process.argv.indexOf("--output");
const outputPath = outputFlag === -1 ? defaultOutput : path.resolve(process.argv[outputFlag + 1] ?? "");

const resume = {
  name: "CLINT MATHEWS",
  title: "Senior Backend Engineer - Distributed Systems",
  contact:
    "mathewsclint28@gmail.com | +91 70255 89085 | linkedin.com/in/clint-mathews | github.com/Clint-Mathews",
  summary:
    "Backend engineer with 7+ years of experience building high-performance distributed systems for enterprise-scale platforms. Specializes in microservices, Go, and reliability at scale.",
  skills: [
    ["Languages", "Go, Python, TypeScript, JavaScript, C#"],
    ["Backend & Cloud", "NestJS, FastAPI, Kafka, BullMQ, Redis, Docker, AWS, GCP"],
    ["Data", "PostgreSQL, MongoDB, MySQL, Redis"],
    ["Architecture", "Microservices, event-driven architecture, circuit breakers, backpressure, async job queues, OCPP, RFC authorship"],
  ],
  experience: [
    {
      company: "Ford Motor Company",
      role: "Technical Lead (Senior Software Engineer)",
      dates: "Aug 2022 - Present",
      location: "Remote, India",
      bullets: [
        "Led the charging engineering team, co-owning 16 production services across charging and its utilities while coordinating integrations with partner teams.",
        "Spearheaded migration of 8,200 chargers through a scalable gateway architecture, decommissioning ~2,150 legacy servers (~$9,000/month savings) and reducing Datadog costs 60%.",
        "Architected a high-throughput Kafka consumer in NestJS and TypeScript, reliably processing 6M+ fleet charger messages daily at 99.9% data integrity.",
        "Drove development of a global OCPP simulator that modeled 2,000+ chargers, enabling fleet-scale gateway performance and reliability validation before production.",
        "Overhauled the ChargeBox charger/session simulator and its test automation, increasing simulation performance 30% and reducing testing time 40%.",
        "Owned L3 production support for critical services, maintaining 99.95% uptime and driving root-cause analysis for incident resolution.",
        "Authored foundational RFCs defining OCPP 2.x adoption and core platform services; mentored engineers through rigorous code reviews and technical guidance.",
      ],
    },
    {
      company: "Experion Technologies",
      role: "Software Engineer",
      dates: "Aug 2019 - Jul 2022",
      location: "Hybrid, Kochi, India",
      bullets: [
        "Directed technical delivery across 4 enterprise projects, spanning frontend and backend systems, while mentoring teams of up to 10 developers.",
        "Designed a .NET, Angular, and AWS inventory solution integrated with Sage ERP to track 2,000+ products, contributing to a 25% customer-satisfaction increase.",
        "Guided React frontend delivery for a B2B platform that scaled to 5,000+ users and supported product sales.",
        "Built a real-time logistics platform monitoring 1,000+ active shipments and optimizing warehouse scheduling with live dock availability.",
      ],
    },
  ],
  projects: [
    {
      name: "PhotonicOps",
      tech: "Go, gRPC, Protobuf, Docker",
      description:
        "Architected a zero-allocation Go ingestion pipeline processing 10,000 samples/sec of real-time sensor telemetry via gRPC, using ring buffers and pooled worker goroutines to limit GC-induced latency spikes.",
    },
    {
      name: "Fencelock",
      tech: "Go, etcd, Redis, PostgreSQL",
      description:
        "Built an open-source Go distributed-lock library around fencing tokens: etcd issues a monotonic token on acquire, and the resource rejects stale writes after a pause-past-TTL.",
    },
    {
      name: "Jiralyzer",
      tech: "React, Flask, GPT-4",
      description:
        "Built a full-stack AI analytics platform over 100,000+ Jira issues with intelligent caching and parallel LLM processing, cutting analysis response time 70%.",
    },
  ],
  education: "B.Sc. Computer Science, Mar Athanasius College of Engineering - GPA: 7.88 / 10",
  awards: ["Ford Pro Go that Extra Mile Award (2023)", "Ford Pro Hackathon Finalist (Q4 2025)"],
};

const requiredFacts = [
  "8,200 chargers migrated",
  "~2,150 servers",
  "6M+ messages/day",
  "99.9% data integrity",
  "99.95% uptime",
  "16 production services",
  "2,000+ chargers simulated",
  "30% performance boost",
  "40% testing time reduction",
  "4 diverse enterprise projects",
  "teams of up to 10 developers",
  "2,000+ products",
  "25% customer satisfaction",
  "5,000+ users",
  "1,000+ active shipments",
  "10,000 samples/sec",
  "100,000+ Jira issues",
  "70% faster analysis",
  "GPA: 7.88 / 10",
];

const databank = await fs.readFile(databankPath, "utf8");
for (const fact of requiredFacts) {
  if (!databank.includes(fact)) {
    throw new Error(`Databank verification failed: missing "${fact}".`);
  }
}

function list(items) {
  return `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>${resume.name} Resume</title>
    <style>
      @page { size: letter; margin: 0.42in 0.48in; }
      * { box-sizing: border-box; }
      body { color: #111; font-family: Arial, Helvetica, sans-serif; font-size: 9.5pt; line-height: 1.2; margin: 0; }
      header { border-bottom: 1.5px solid #111; margin-bottom: 7px; padding-bottom: 5px; text-align: center; }
      h1 { font-size: 18pt; letter-spacing: .9px; margin: 0; }
      .title { font-size: 10.25pt; font-weight: 700; margin: 2px 0; }
      .contact { font-size: 8.5pt; }
      section { margin: 0 0 7px; }
      h2 { border-bottom: 1px solid #111; font-size: 10pt; letter-spacing: .75px; margin: 0 0 4px; padding-bottom: 2px; text-transform: uppercase; }
      p { margin: 0; }
      .summary { line-height: 1.28; }
      .skill { margin: 1px 0; }
      .skill strong { display: inline-block; min-width: 104px; }
      .job { margin: 0 0 5px; }
      .job-head, .project-head { display: flex; justify-content: space-between; gap: 12px; }
      .job-company, .project-name { font-weight: 700; }
      .job-date { font-size: 8.5pt; white-space: nowrap; }
      .job-role, .project-tech { font-style: italic; }
      ul { margin: 2px 0 0; padding-left: 15px; }
      li { margin: 1px 0; padding-left: 1px; }
      .project { margin: 0 0 4px; }
      .project p { margin-top: 1px; }
      .education { font-weight: 700; }
    </style>
  </head>
  <body>
    <header>
      <h1>${resume.name}</h1>
      <p class="title">${resume.title}</p>
      <p class="contact">${resume.contact}</p>
    </header>
    <section><h2>Summary</h2><p class="summary">${resume.summary}</p></section>
    <section><h2>Technical Skills</h2>${resume.skills.map(([label, items]) => `<p class="skill"><strong>${label}:</strong> ${items}</p>`).join("")}</section>
    <section><h2>Experience</h2>${resume.experience.map((job) => `
      <article class="job">
        <div class="job-head"><span class="job-company">${job.company}</span><span class="job-date">${job.dates}</span></div>
        <div class="job-head"><span class="job-role">${job.role}</span><span>${job.location}</span></div>
        ${list(job.bullets)}
      </article>`).join("")}</section>
    <section><h2>Projects</h2>${resume.projects.map((project) => `
      <article class="project">
        <div class="project-head"><span class="project-name">${project.name}</span><span class="project-tech">${project.tech}</span></div>
        <p>${project.description}</p>
      </article>`).join("")}</section>
    <section><h2>Awards</h2><p>${resume.awards.join(" | ")}</p></section>
    <section><h2>Education</h2><p class="education">${resume.education}</p></section>
  </body>
</html>`;

await fs.mkdir(path.dirname(outputPath), { recursive: true });
const browser = await puppeteer.launch({ headless: true });
try {
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });
  await page.pdf({ path: outputPath, format: "Letter", printBackground: true, preferCSSPageSize: true });
} finally {
  await browser.close();
}

console.log(`Wrote ${outputPath}`);
