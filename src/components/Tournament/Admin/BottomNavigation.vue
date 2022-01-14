<template>
  <v-bottom-nav
    fixed
    :active.sync="view"
    value="false"
    shift
    color="white"
    style="height:8vh;"
  >
    <v-btn
      flat
      color="#74C9D7"
      dark
      value="player-list"
      @click="goToPage('TournamentAdmin')"
    >
      <span>
        Players
      </span>
      <v-icon>people_outline</v-icon>
    </v-btn>
    <v-btn
      flat
      color="#FF9D72"
      dark
      value="tee-times"
      @click="goToPage('TournamentAdminTeeTimes')"
    >
      <span>Tee Times</span>
      <v-icon>access_time</v-icon>
    </v-btn>
    <v-btn
      flat
      color="#F8C977"
      dark
      value="monitor"
      @click="goToPage('TournamentAdminServices')"
    >
      <span>Services</span>
      <v-icon>mdi-hexagon-multiple</v-icon>
    </v-btn>
  </v-bottom-nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'BottomNavigation',
  computed: {
    ...mapState({
      currentTournament: state => state.tournament.currentTournament
    }),
  },

   data () {
    return {
      view: 'player-list'
    }
  },

  methods: {
    goToPage (name) {
      this.$store.commit("setPageTransition");
      this.$router.push({
        name: name,
        params: {
          id: this.currentTournament.id
        }
      })
    }
  },
}
</script>
<style scoped>
</style>
