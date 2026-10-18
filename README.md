# Clint Mathews — portfolio

A VitePress portfolio with a custom Vue terminal-style interface. Inspired by
the terminal navigation and media-led case studies at [zui.ooo](https://www.zui.ooo/).

## Development

```sh
npm install
npm run docs:dev
npm run docs:build
npm run docs:preview
```

Pushes to `main` build and deploy to GitHub Pages.

## Editing the portfolio

- `docs/.vitepress/theme/data/files.ts`: project facts, links, metrics, status,
  case-study text, and optional media. Set `status` explicitly for ongoing work
  so it does not inherit the default “SHIPPED” label.
- `docs/.vitepress/theme/data/showcase.ts`: featured selections, architecture
  sketches, and problem / approach / outcome summaries. Keep benchmarks, design
  targets, and production outcomes clearly distinguished.
- `docs/.vitepress/theme/data/identity.ts`: bio, experience, and résumé content.
- `docs/.vitepress/theme/terminal/`: homepage, work browser, case studies,
  and interactive walkthroughs.
- `docs/.vitepress/theme/style.css`: global styling and responsive layouts.

Project links such as `/#FENCELOCK.lock` open a case study directly. `/#work`,
`/#dives`, and `/#writing` open the three browsable directories. Terminal commands
remain available; type `help` to see them.

### Adding screenshots and videos

Put your own screenshots, poster frames, recordings, and caption tracks in
`docs/public/` (or use a hosted media URL), then add `media` to the project's entry
in `files.ts`. Example field structure — replace these filenames with real assets:

```ts
media: [
  {
    kind: "video",
    src: "/project-demo.mp4",
    poster: "/project-demo-poster.jpg",
    alt: "A walkthrough of the project's main workflow",
    caption: "A recorded local demo, showing the request and its result.",
    captions: "/project-demo.en.vtt", // WebVTT, for spoken narration
  },
  {
    kind: "image",
    src: "/project-architecture.svg",
    alt: "Describe the components and connections in the diagram",
    caption: "The architecture and the key decision it illustrates.",
  },
],
```

Videos use native playback controls, inline mobile playback, and `preload="none"`.
They do not autoplay. Images open at full resolution. Architecture sketches and
the Fencelock walkthrough are explanatory visuals, not recordings or live metrics.
