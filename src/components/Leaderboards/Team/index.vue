<template>
  <v-card
    class="lb-card"
   >
    <v-card-title class="pa-0 pt-2 pl-2">
      <Header :purse="purse" :name="'Team'" />
    </v-card-title>
    <v-card-text v-if="!isLoading" class="pa-0">
      <team-table />
    </v-card-text>
  </v-card>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import teamTable from './Table'
import Header from '../Header'

export default {
  name: 'index',
  components: {
    teamTable,
    Header
  },
  data () {
    return {
      purse: 0,
      isLoading: true,
      year: ""
    }
  },

  computed: {
    ...mapState({
     currentTournament: state => state.tournament.currentTournament
    }),
  },
  methods: {
    closeLeaderboard () {
      this.isPreview = true
    }
  },

  mounted: function () {
    this.$store.dispatch(
      'leaderboards/team/LOAD_TEAM_LEADERBOARD',
      { tournamentId: this.currentTournament.id, roundId: "" }
    ).then(() => {
      this.purse = 160//this.currentTournament.num_players * 30
      this.isLoading = false
      this.year = this.currentTournament.year
    })
  }
}
</script>
<style scoped>
.lb-card {
  border-radius: 0;
  top: 0;
  left: 0;
  z-index: 1000 !important;
  height: 100vh;
  overflow: scroll;
  width: 100vw;
  background-color: #ACA885;
  color: #f1f1f1;
  transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
}
</style>
