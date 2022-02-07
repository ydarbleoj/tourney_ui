<template>
  <v-card
    class="lb-card"
   >
    <v-card-title class="pa-0 pt-2 pl-2">
      <Header :purse="teamPurse" :name="'Teams'" />
    </v-card-title>
    <v-card-text v-if="!isLoading" class="pa-0">
      <Table />
    </v-card-text>
  </v-card>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import Table from './Table'
import Header from '../../Header'

export default {
  name: 'TeamPlayersLeaderboard',
  components: {
    Table,
    Header
  },
  data () {
    return {
      teamPurse: 0,
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
  },

  mounted: function () {
    this.$store.dispatch(
      'leaderboards/team/LOAD_TEAM_PLAYERS_LEADERBOARD',
      { id: this.currentTournament.id }
    ).then(response => {
      this.teamPurse = this.currentTournament.num_players * 30
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
  height: 100vh;
  overflow: scroll;
  width: 100vw;
  background-color: #9FB8CE;
  color: #f1f1f1;
}
</style>
