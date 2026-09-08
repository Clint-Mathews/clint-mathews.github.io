---
name: resume-from-jd
description: Generate a job-description-tailored resume for Clint Mathews from master-resume-databank.md, render it as a styled HTML page, and export it to a .docx file (opens directly in Google Docs) saved in the repo. Use when the user pastes a job description/posting and asks for a resume, tailored resume, resume doc, or a file they can open/edit in Google Docs, or explicitly invokes /resume-from-jd.
---

# /resume-from-jd — JD-tailored resume, HTML + editable .docx

Takes a job description as input, cross-references it against
`master-resume-databank.md` (repo root — the source of truth for every fact,
bullet, and metric about Clint), and produces three artifacts, all written
to the repo (never scratch/tmp):

1. `resume-<slug>.md` — the tailored resume in Markdown, plus an "honest gaps"
   notes section (same convention as existing `resume-*.md` files at repo root).
2. `resume-<slug>.html` — the same content rendered in the house visual style,
   for a quick styled preview.
3. `resume-<slug>.docx` — a real Word document converted from the Markdown via
   Pandoc, with proper heading/paragraph styles — opens directly in Google
   Docs (Drive → File → Open → Upload, or "Open with Google Docs") and stays
   fully editable there. **This is the primary deliverable** — it's what the
   user asked for when they want something they can open and keep tweaking in
   Google Docs. (A PDF/print pipeline exists too, in `scripts/render-pdf.mjs`,
   for when a locked, non-editable file is wanted instead — but `.docx` is the
   default output, not PDF.)

`<slug>` is a short kebab-case tag for the role, e.g. `senior-backend-lead-ev-charging`
or `forward-deployed-ai-engineer-bcg` — match the style of existing files in
the repo root (`ls resume-*.md` to see prior examples and avoid colliding with
one still in use).

## Step 1 — get the job description

If the user pasted a JD in their message, use it directly. If they only
reference "the JD" or "that posting" without pasting it, ask them to paste it
— do not fabricate or guess at role requirements.

## Step 2 — read the databank

Read `master-resume-databank.md` in full. It's organized for exactly this:
header/summary variants, grouped skills, tagged experience bullets, detailed
projects, RFC deep-dives, and a "quick-selection cheat sheet by JD focus"
table at the end. Match the JD's actual requirements and emphasis (not every
keyword — the *emphasis*) against the `[tags]` on bullets/projects and the
cheat-sheet table to decide what to lead with.

## Step 3 — draft the tailored resume (Markdown)

Follow the structure and tone of the existing files in repo root
(`resume-senior-backend-lead-ev-charging.md`, `resume-forward-deployed-ai-engineer-bcg.md`)
as the reference format:

- Header (name/contact), Summary (written fresh for this JD's emphasis, not
  copy-pasted from a prior resume), Skills (subset relevant to the JD),
  Experience (pick ~4-7 bullets per role, prioritizing tag overlap with the
  JD), Selected Projects (2-4 most relevant), Education, Awards.
- Only use facts that exist in the databank. **Never invent a skill,
  technology, or metric to match a JD requirement.** If the JD wants
  something not in the databank (a language, a tool, a certification), it
  simply doesn't appear in the resume.
- **Bullet formula:** write experience/project bullets in the "XYZ" formula —
  *Accomplished [X], as measured by [Y], by doing [Z]* — outcome/metric
  first, not task first.
- **No em dashes anywhere in resume content** (summary, bullets, project
  descriptions, notes section) — use a plain hyphen (`-`) instead. This is a
  deliberate stylistic choice to avoid the resume reading as visibly
  AI-generated. En dashes in date ranges (e.g. `Aug 2022 – Present`) are fine
  and unaffected — only the em dash (—) used as a sentence-joining
  punctuation mark is banned. Before finishing Step 3, grep the drafted `.md`
  for `—` and fix any hits.
- After the resume content, add a `---` divider and a "Notes for you
  (not part of the resume — application prep)" section: why this framing was
  chosen, and an explicit **honest gaps** list — JD requirements the databank
  doesn't support. This is the established pattern for this user; don't skip it.

Write this file to the repo root as `resume-<slug>.md`.

## Step 4 — build the HTML

Copy `.Codex/skills/resume-from-jd/assets/resume-template.html` to
`resume-<slug>.html` in the repo root, then replace every `{{PLACEHOLDER}}`
with the tailored content from Step 3 (same section order: Summary, Skills,
Experience, Selected Projects, Education, Awards). The template comment block
explains the repeat-per-item sections (skills groups, experience entries,
bullets, projects).

Keep the CSS as-is — it's the established "Google Docs" visual identity
(Material Design tokens, Roboto/Google Sans stack, paper-sheet-on-grey-canvas
layout) used across this user's resumes. Don't redesign per-JD; consistency
across versions is the point. The only acceptable structural change is adding
a section the JD specifically calls for (e.g. a Certifications section) —
match the existing `<section>`/`<h2>` pattern if so.

Do **not** add a print/download button or any `window.print()` call to the
HTML — that was tried in a published Artifact and doesn't work reliably in
the sandboxed iframe.

## Step 5 — convert to .docx via Pandoc

The `.docx` is generated from the **Markdown resume content only** (Step 3),
not the HTML — Pandoc's Markdown→docx conversion maps `##` headings and lists
straight to real Word styles (Heading 1/2, List Paragraph), which is exactly
what makes the result cleanly editable in Google Docs. Converting the styled
HTML instead would drag its CSS/layout into the docx and produce a messier,
harder-to-edit file.

Strip the "Notes for you" appendix first — it's application-prep for the
user, not resume content, and shouldn't ship in the doc:

```bash
awk '/^---$/{c++; if(c==1) exit} {print}' resume-<slug>.md > /tmp/_resume_body.md
pandoc /tmp/_resume_body.md -o resume-<slug>.docx --metadata title="Clint Mathews — Resume"
```

(Requires `pandoc` on PATH — it's a system tool, not an npm dependency; check
with `which pandoc` and tell the user to install it, e.g. `brew install
pandoc`, if missing.) Write the output to the repo root, then remove the
`/tmp` scratch file.

## Step 6 — wrap up

- Confirm the three file paths written (`.md`, `.html`, `.docx`), all at repo
  root, all real files the user can open/attach/commit — not scratchpad, not
  an Artifact.
- Summarize the honest-gaps list from Step 3 in the chat response too, so the
  user sees it without opening the file.
- Offer to send the `.docx` via the file-sending tool if available, since
  that's the actual deliverable the user asked for. Mention it opens directly
  via Google Drive's "Open with Google Docs" / upload flow.
- These are personal working documents, not site content — do not add them to
  `docs/` (that directory is what gets built and deployed to GitHub Pages).
  Do not commit or push unless the user explicitly asks.
