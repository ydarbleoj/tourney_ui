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
    @click.native="goBack"
  >
    <v-icon color="white" style="font-size:32px;">
      mdi-chevron-left
    </v-icon>
  </v-btn>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'BackButton',
  props: ['routeName', 'routeParams'],
  computed: {
    ...mapGetters({
      getTournament: 'tournament/getTournament'
    })
  },

  methods: {
    goBack () {
      this.$store.commit("setPageTransition", "back");
      this.$router.push({
        name: this.routeName,
        params: this.routeParams
      })
    }
  },
}
</script>
<style scoped>
.back-button {
  border-color: transparent;
  background-color: transparent;
}
</style>
