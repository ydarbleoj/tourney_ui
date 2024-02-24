<template>
  <v-btn
    variant="outlined"
    class="ma-2 back-button"
    style="top:0;left:0;"
    size="medium"
    @click="goBack"
  >
    <v-icon style="font-size:32px">mdi-chevron-left</v-icon>
  </v-btn>
</template>
<script setup>
import { useRouter } from "vue-router";
import { usePageTransitionStore } from "@/store/pageTransition";

const router = useRouter();
const store = usePageTransitionStore();
const props = defineProps({
  routeName: String,
  routeParams: Object,
});

function goBack() {
  store.setTransition("back"); // Set the transition to 'back'
  router.push({
    name: props.routeName,
    params: props.routeParams,
  });
}
</script>

<style scoped>
.back-button {
  border-color: transparent;
  background-color: transparent;
}
.white-btn {
  color: #f7f7f7;
}
</style>
