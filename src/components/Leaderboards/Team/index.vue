<template>
  <v-card
    class="lb-card"
   >
    <v-card-title class="pa-0 pt-2 pl-2 team-color">
      <Header :purse="purse" :name="'Team'" />
    </v-card-title>
    <v-card-text v-if="!isLoading" class="pa-0 team-color">
      <team-table />
    </v-card-text>
    <v-bottom-nav
      absolute
      active.sync="roundNumber"
      style="background-color:#ACA885;margin-bottom:56px;"
    >
      <v-btn
        fixed
        flat
        value="1"
        style="color:#fff;"
        @click="loadLeaderboard(1)">
        <h3>RND 1</h3>
      </v-btn>
      <v-btn
        flat
        value="2"
        style="color:#fff;"
        @click="loadLeaderboard(2)">
        <h3>RND 2</h3>
      </v-btn>
      <v-btn
        flat
        value="3"
        style="color:#fff;"
        @click="loadLeaderboard(3)">
        <h3>RND 3</h3>
      </v-btn>
    </v-bottom-nav>
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
      roundNumber: 1,
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
    },
    loadLeaderboard (value) {
      let val = value;
      this.$store.dispatch(
        'leaderboards/team/LOAD_TEAM_LEADERBOARD',
        { tournamentId: this.currentTournament.id, roundNum: val }
      ).then(() => {
        this.roundNumber = this.val;
        this.purse = 160//this.currentTournament.num_players * 30
        this.isLoading = false
        this.year = this.currentTournament.year
      })
    }
  },

  mounted: function () {
    this.loadLeaderboard(this.roundNumber);
  }
}
</script>
<style scoped>
.lb-card {
  height: 100vh;
  overflow: scroll;
  width: 100vw;
  color: #f1f1f1;
  transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.team-color {
  background-color: #ACA885;
}
</style>
