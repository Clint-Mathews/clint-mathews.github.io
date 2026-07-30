import { defineConfig } from "vitepress";

export default defineConfig({
 title: "Clint Mathews",
 description: "Personal portfolio",
 appearance: false,
//  base: "/my-portfolio/", // repo name; omit ONLY if repo is <username>.github.io
 themeConfig: {
   nav: [
     { text: "Home", link: "/" },
     { text: "Projects", link: "/projects" },
     { text: "About", link: "/about" },
   ],
   socialLinks: [
     { icon: "github", link: "https://github.com/Clint-Mathews" },
   ],

   footer: {
    //  message: "Clint Mathews. All rights reserved.",
     copyright: "Clint Mathews - Built with VitePress",
   }
 },
});

