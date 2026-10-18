<script setup lang="ts">
import AsciiBanner from "./AsciiBanner.vue";
import { HOME_TIP, STATUS_ROWS } from "../data/identity";
import { site } from "../site";
import { featuredFiles } from "../data/showcase";
import ProjectCard from "./ProjectCard.vue";
</script>


<template>
  <div class="pane home-pane">
    <AsciiBanner />
    <p class="cmd-line"><span class="cmd-ps">$</span> whoami</p>
    <h1 class="home-headline">Backend that holds<br />when the load arrives<span>.</span></h1>
    <p class="home-intro">{{ site.name }} — backend engineer, 7+ years. I build distributed systems and Go services, from EV charging infrastructure at Ford Pro to local AI pipelines. I write the RFC, ship the system, and work through the failure modes.</p>
    <div class="home-actions">
      <a class="primary-link" href="#work">Explore the work <span aria-hidden="true">↗</span></a>
      <a :href="site.resume" target="_blank" rel="noopener">Download résumé ↓</a>
    </div>
    <div class="home-proof" aria-label="Production experience">
      <div><strong>8,200</strong><span>chargers migrated</span></div>
      <div><strong>6M+</strong><span>messages / day</span></div>
      <div><strong>99.95%</strong><span>production uptime</span></div>
    </div>
    <section class="featured-section" aria-labelledby="featured-heading">
      <div class="section-heading">
        <h2 id="featured-heading" class="cmd-line"><span class="cmd-ps">$</span> ls ./featured</h2>
        <a href="#work">All projects →</a>
      </div>
      <p class="section-intro">Selected builds. The problem, the tradeoffs, and what actually shipped.</p>
      <div class="featured-grid">
        <ProjectCard v-for="file in featuredFiles" :key="file.filename" :file="file" />
      </div>
    </section>
    <p class="cmd-line"><span class="cmd-ps">$</span> cat status.txt</p>
    <div class="kv-table">
      <div v-for="row in STATUS_ROWS" :key="row.k" class="kv-row">
        <span class="kv-k">{{ row.k }}</span>
        <a v-if="row.k === 'CONTACT'" class="kv-v" :href="`mailto:${site.email}`">{{ row.v }}</a>
        <span v-else class="kv-v">{{ row.v }}</span>
      </div>
    </div>
    <p class="home-tip">{{ HOME_TIP }}</p>
  </div>
</template>
