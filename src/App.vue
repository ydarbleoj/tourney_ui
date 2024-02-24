<template>
  <v-app>
    <div>
      <router-view v-slot="{ Component, route }">
        <transition :name="transitionName">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </div>
  </v-app>
</template>

<script setup>
import { computed } from "vue";
import { RouterView } from "vue-router";
import { usePageTransitionStore } from "./store/pageTransition";

const store = usePageTransitionStore();
const transitionName = computed(() => store.name);
</script>

<style>
/* .slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.2s ease-out;
}

.slide-fade-enter-from, .slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.slide-fade-enter-to, .slide-fade-leave-from {
  transform: translateX(0);
  opacity: 1; */
/* } */
</style>
