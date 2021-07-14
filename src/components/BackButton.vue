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
    <v-icon color="white">
      mdi-chevron-left
    </v-icon>
  </v-btn>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'BackButton',
  computed: {
  },

  computed: {
    ...mapGetters({
      getTournament: 'tournament/getTournament'
    })
  },

  methods: {
    goBack () {
      this.$store.commit("setPageTransition", "back");
      this.$router.push(
        {
          name: 'Tournament',
          params: {
            id: this.getTournament.id
          }
        }
      )
    }
  },
}
</script>
<style scoped>
.back-button {
  border-color: white;
  background-color: transparent;
}
</style>
