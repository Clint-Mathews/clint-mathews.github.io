# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Clint Mathews' personal resume/portfolio site, built with VitePress and deployed to GitHub Pages at `clint-mathews.github.io`. It is a static content site (no application code, no backend, no tests) — content lives in Markdown under `docs/`, and site-wide look/behavior is customized via a thin VitePress theme override.

## Commands

```bash
npm install        # install deps (vitepress only)
npm run docs:dev      # local dev server with hot reload
npm run docs:build    # production build -> docs/.vitepress/dist
npm run docs:preview  # preview the production build locally
```

There is no lint or test setup (`npm test` is a stub that exits non-zero).

## Architecture

- **Content pages** are Markdown files directly under `docs/`: `index.md` (home, uses VitePress's `layout: home` hero/features frontmatter), `projects.md`, `architecture.md`, `learning.md`, `about.md`. Nav/routing is not file-based auto-discovery — new pages must be added to the `nav` array in `docs/.vitepress/config.mts` to be reachable from the header.
- **Site config**: `docs/.vitepress/config.mts` defines the VitePress config — title/description, `appearance: false` (no dark/light toggle), nav links, and social links. `base` is commented out because this is a `<username>.github.io` root-domain repo; if this config is ever reused for a project-scoped Pages repo, `base` must be set to the repo name.
- **Theme override**: `docs/.vitepress/theme/index.ts` extends VitePress's `DefaultTheme` and just imports a custom stylesheet — there is no custom Vue component layer. All visual customization (colors, hero styling, custom sections like `.bio-section`/`.bio-links`) lives in `docs/.vitepress/theme/style.css`.
- **Static assets**: `docs/public/` holds images (architecture diagrams referenced from `architecture.md`) and `CLINT-MATHEWS.pdf` (linked from the homepage "Download Resume" action and referenced directly as `/CLINT-MATHEWS.pdf`).
- **Deployment**: `.github/workflows/deploy.yml` builds on every push to `main` (`npm ci` → `npm run docs:build`) and publishes `docs/.vitepress/dist` to GitHub Pages via `actions/upload-pages-artifact` + `actions/deploy-pages`. There is no separate staging environment — pushing to `main` deploys to production.

## Working in this repo

- Editing content is just editing Markdown in `docs/`; VitePress frontmatter (e.g., `layout: home`, `hero`, `features`) drives the homepage layout.
- Adding a new page requires both the `.md` file in `docs/` and a corresponding entry in the `nav` array in `docs/.vitepress/config.mts`.
- Styling changes go in `docs/.vitepress/theme/style.css`; there's no CSS preprocessor or component-scoped styling — it's one global stylesheet.
