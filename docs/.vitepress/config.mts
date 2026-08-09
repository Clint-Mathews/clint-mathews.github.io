import { defineConfig } from "vitepress";

export default defineConfig({
 title: "Clint Mathews",
 description: "Lead Backend Software Engineer specializing in distributed systems, microservices, and Golang. Building platforms that process millions of transactions with reliability at scale.",
 appearance: false,
//  base: "/my-portfolio/", // repo name; omit ONLY if repo is <username>.github.io
 themeConfig: {
   nav: [
     { text: "Home", link: "/" },
     { text: "Projects", link: "/projects" },
     { text: "Architecture", link: "/architecture" },
     { text: "Portfolio", link: "/portfolio-resilient-charging-consumer" },
     { text: "Learning", link: "/learning" },
     { text: "About", link: "/about" },
   ],
   socialLinks: [
     { icon: "github", link: "https://github.com/Clint-Mathews" },
     { icon: "linkedin", link: "https://www.linkedin.com/in/clint-mathews/" },
   ],

   footer: {
   //  message: "Clint Mathews. All rights reserved.",
     copyright: "Clint Mathews - Built with VitePress",
   }
 },
});
