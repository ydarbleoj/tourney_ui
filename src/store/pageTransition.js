// store/pageTransition.js
import { defineStore } from "pinia";

export const usePageTransitionStore = defineStore("pageTransition", {
  state: () => ({
    name: "slide-fade",
    mode: "in-out",
  }),
  actions: {
    setTransition(type) {
      if (type === "default") {
        this.name = "slide-fade";
        this.mode = "in-out";
      } else if (type === "back") {
        this.name = "slide-fade-back";
        this.mode = "";
      }
    },
  },
});
