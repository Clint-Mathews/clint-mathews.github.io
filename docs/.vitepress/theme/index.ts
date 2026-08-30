import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import "./style.css";

import HeroBlock from "./components/HeroBlock.vue";
import AvailabilityStrip from "./components/AvailabilityStrip.vue";
import StatBar from "./components/StatBar.vue";
import FitCards from "./components/FitCards.vue";
import WorkPreview from "./components/WorkPreview.vue";
import MethodBlock from "./components/MethodBlock.vue";
import ContactBlock from "./components/ContactBlock.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("HeroBlock", HeroBlock);
    app.component("AvailabilityStrip", AvailabilityStrip);
    app.component("StatBar", StatBar);
    app.component("FitCards", FitCards);
    app.component("WorkPreview", WorkPreview);
    app.component("MethodBlock", MethodBlock);
    app.component("ContactBlock", ContactBlock);
  },
} satisfies Theme;
