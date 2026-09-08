import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Clint Mathews",
  description:
    "Backend engineer for systems under load. 8,200 EV chargers, six million messages a day, 99.95% uptime. Open to full-time roles and select contract engagements.",

  appearance: "force-dark",

  //  base: "/my-portfolio/", // repo name; omit ONLY if repo is <username>.github.io

  head: [
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    ["link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" }],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600;700&display=swap",
      },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/geist@1.4.1/dist/fonts/geist-mono/style.min.css",
      },
    ],
    ["meta", { name: "theme-color", content: "#050a07" }],
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
    nav: [],
    socialLinks: [],
    sidebar: false,
  },
});
