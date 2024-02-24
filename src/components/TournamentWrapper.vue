<template>
  <v-container class="pa-0">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
   </router-view>
   <BottomNav />
  </v-container>
</template>

<script>
import BottomNav from "./BottomNav.vue"

export default {
  name: "TournamentWrapper",
  components: {
    BottomNav
  }
}
</script>
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1); /* This is the equivalent to the "ease-in-out" timing function */
}
</style>
