import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Clint Mathews",
  description:
    "Backend engineer for systems under load. 8,200 EV chargers, six million messages a day, 99.95% uptime. Open to full-time roles and select contract engagements.",

  // Direction A is a single dark palette, no toggle, no light variant.
  appearance: "force-dark",

  //  base: "/my-portfolio/", // repo name; omit ONLY if repo is <username>.github.io

  head: [
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    ["link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" }],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap",
      },
    ],
    ["meta", { name: "theme-color", content: "#0e1417" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:title", content: "Clint Mathews, backend engineer" }],
    [
      "meta",
      {
        property: "og:description",
        content:
          "Backend that holds when the load arrives. Open to full-time roles and select contract engagements.",
      },
    ],
  ],

  themeConfig: {
    nav: [
      { text: "Work", link: "/projects" },
      { text: "Deep Dives", link: "/architecture" },
      { text: "Writing", link: "/learning" },
      { text: "About", link: "/about" },
      { text: "Hire me", link: "/#contact" },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/Clint-Mathews" },
      { icon: "linkedin", link: "https://www.linkedin.com/in/clint-mathews/" },
    ],
    footer: {
      message: "Open to full-time roles and select contract engagements.",
      copyright: "Clint Mathews, built with VitePress",
    },
  },
});
