import { h } from "vue";
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

// @ts-ignore File is present
import ReloadPrompt from "./components/ReloadPrompt.vue";

export default {
 extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      "layout-bottom": () => h(ReloadPrompt),
    });
  },
} satisfies Theme