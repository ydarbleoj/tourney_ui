<template>
  <v-btn
    absolute
    class="ma-2 back-button"
    style="top:0;left:0;"
    outline
    color="white"
    depressed
    small
    fab
    @click="$router.back(-1)"
  >
    <v-icon color="white">
      mdi-chevron-left
    </v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'BackButton'
}
</script>
<style scoped>
.back-button {
  border-color: white;
  background-color: transparent;
}
</style>