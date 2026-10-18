import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Clint Mathews",
  description:
    "Technical lead and backend engineer. Leading four team members, owning 20 services, and translating product needs into reliable systems. Open to full-time roles and select contract engagements.",

  appearance: "force-dark",

  //  base: "/my-portfolio/", // repo name; omit ONLY if repo is <username>.github.io

  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
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
    ["meta", { property: "og:title", content: "Clint Mathews, technical lead & backend engineer" }],
    [
      "meta",
      {
        property: "og:description",
        content:
          "Technical leadership across 20 services and four team members. Connecting product requirements, feature delivery, and continuous improvement.",
      },
    ],
  ],

  themeConfig: {
    nav: [],
    socialLinks: [],
    sidebar: false,
  },
});
