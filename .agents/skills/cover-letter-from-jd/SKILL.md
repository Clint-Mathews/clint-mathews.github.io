---
name: cover-letter-from-jd
description: Generate a job-description-tailored cover letter for Clint Mathews from master-resume-databank.md, render it as a styled HTML page matching the resume's visual identity, and export it to PDF. Use when the user asks for a cover letter, tailored cover letter, or explicitly invokes /cover-letter-from-jd. Pairs with the resume-from-jd skill — run that one too if the user wants a matching resume for the same JD.
---

# /cover-letter-from-jd — JD-tailored cover letter, HTML + PDF

Takes a job description as input, cross-references it against
`master-resume-databank.md` (repo root — the source of truth for every fact,
bullet, and metric about Clint), and produces three artifacts at repo root
(never scratch/tmp):

1. `cover-letter-<slug>.md` — the tailored letter in Markdown, plus a
   "Notes for you" section (same convention as `resume-<slug>.md` files):
   why this framing was chosen, and an honest-gaps list.
2. `cover-letter-<slug>.html` — the same content rendered in the house
   visual style, matching the paired resume's look.
3. `cover-letter-<slug>.pdf` — rendered via headless Chromium
   (`scripts/render-pdf.mjs`) — **this is the deliverable to actually send**,
   same as the resume pipeline's default output.

`<slug>` must match the slug used for the paired resume for this role if one
exists (`ls resume-*.md` at repo root) — e.g. if `resume-software-engineer-auth-supabase.md`
exists, this produces `cover-letter-software-engineer-auth-supabase.*`. If no
matching resume exists yet, ask the user whether to also run `resume-from-jd`
first — a resume+letter pair for the same role should tell a consistent
story, not diverge.

## Step 1 — get the job description and check for a paired resume

If the user pasted a JD in their message, use it directly; otherwise ask them
to paste it — never fabricate role requirements. If a `resume-<slug>.md`
already exists for this role, **read it first**: reuse its framing decisions
and, critically, its "honest gaps" list — the cover letter must never claim
something the paired resume's notes already flagged as unsupported by the
databank. Consistency across the two documents matters more than either
document individually.

## Step 2 — read the databank

Read `master-resume-databank.md` in full (skip if just read for the paired
resume in this same conversation). Identify the JD's top 2-3 actual
requirements/emphasis — not a keyword list, the *emphasis* — same approach as
the resume skill's Step 2.

## Step 3 — draft the letter (Markdown)

Structure, ~300-450 words (one page):

- **Opening (1-2 sentences):** which role, and a genuine, specific reason for
  interest — tie to something real about the company/role from the JD, not
  generic enthusiasm ("I'm excited to apply because..." with no specifics is
  a tell — avoid it).
- **Body (2-3 short paragraphs):** map the JD's top 2-3 requirements to real
  databank evidence — prefer one paragraph per requirement-cluster, each
  grounded in a specific project/metric/RFC from the databank (same
  never-invent rule as the resume: no skill, tool, or metric that isn't in
  the databank). Don't just restate the resume in prose — add the "why this
  matters to me" or "here's the specific tradeoff I navigated" texture that a
  bullet list can't carry.
- **Close (1-2 sentences):** direct, low-key call to action (e.g. welcoming a
  conversation), sign-off.
- **No em dashes anywhere in the letter** — use a plain hyphen (`-`) instead,
  same rule as `resume-from-jd`. Grep the drafted `.md` for `—` before moving
  to Step 4 and fix any hits.

If the paired resume's notes flagged a significant gap (e.g. a required
qualification not in the databank), do **not** try to paper over it with
vaguer language in the letter — either address it honestly in one sentence if
it's central to the role, or simply don't raise it and let the resume's own
honest framing stand. Never claim the missing qualification.

Write to repo root as `cover-letter-<slug>.md`, followed by a `---` divider
and a "Notes for you (not part of the letter — application prep)" section
explaining the framing choices, mirroring the resume skill's convention.

## Step 4 — build the HTML

Copy `.Codex/skills/cover-letter-from-jd/assets/cover-letter-template.html`
to `cover-letter-<slug>.html` at repo root, replace every `{{PLACEHOLDER}}`:

- `{{DATE}}` — today's date, written out (e.g. "August 9, 2026").
- `{{COMPANY_NAME}}` — only include this line if the user has given a company
  name or the JD names one; otherwise delete the `<div>{{COMPANY_NAME}}</div>`
  line entirely rather than leaving a placeholder or guessing.
- `{{SALUTATION}}` — `Dear Hiring Team,` unless a specific hiring manager name
  is known.
- Body paragraphs — one `<p>` per paragraph from Step 3.
- `{{CLOSING_LINE}}` — e.g. `Sincerely,` or `Best regards,`.

Keep the CSS as-is — it shares the resume template's visual tokens
(Material Design colors, Roboto/Google Sans) so the pair looks like one
consistent packet. Do not add a print/download button or `window.print()`
call (doesn't work reliably in sandboxed iframes).

## Step 5 — render PDF

```bash
node .Codex/skills/cover-letter-from-jd/scripts/render-pdf.mjs cover-letter-<slug>.html cover-letter-<slug>.pdf
```

Requires Node + `puppeteer` (already a project dependency via the paired
resume skill's usage — if missing, `npm install puppeteer`).

## Step 6 — wrap up

- Confirm the three file paths written (`.md`, `.html`, `.pdf`), all at repo
  root, all real files — not scratchpad, not an Artifact.
- Summarize the honest-gaps handling from Step 3 in the chat response (what
  was addressed head-on vs. left alone), so the user isn't surprised.
- If a paired `resume-<slug>.pdf` exists, mention both files together as the
  application packet.
- These are personal working documents, not site content — do not add them
  to `docs/`. Do not commit or push unless the user explicitly asks.
