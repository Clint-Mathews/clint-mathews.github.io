<script setup lang="ts">
import { RESUME_PAGE } from "../data/identity";
</script>

<template>
  <div class="pane resume-pane">
    <p class="cmd-line"><span class="cmd-ps">$</span> cat resume.txt</p>
    <p class="resume-pdf">
      PDF
      <a :href="RESUME_PAGE.pdf" download>CLINT-MATHEWS.pdf</a>
    </p>
    <section class="resume-sec">
      <h2 class="case-h">// EXPERIENCE</h2>
      <div v-for="job in RESUME_PAGE.experience" :key="job.title" class="resume-block">
        <p class="resume-title">{{ job.title }}</p>
        <p class="resume-dates">{{ job.dates }}</p>
        <ul>
          <li v-for="b in job.bullets" :key="b">{{ b }}</li>
        </ul>
      </div>
    </section>
    <section class="resume-sec">
      <h2 class="case-h">// EDUCATION</h2>
      <div v-for="ed in RESUME_PAGE.education" :key="ed.title" class="resume-block">
        <p class="resume-title">{{ ed.title }}</p>
        <p class="resume-dates">{{ ed.dates }}</p>
      </div>
    </section>
    <section class="resume-sec">
      <h2 class="case-h">// SKILLS</h2>
      <p class="pane-body">{{ RESUME_PAGE.skills.join("\n") }}</p>
    </section>
  </div>
</template>
