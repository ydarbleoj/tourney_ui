<template>
  <v-card flat class="hole-container">
    <v-layout row>
      <v-flex xs12>
        <h2 class="pa-4">
          Hole {{ holeNumber }}
        </h2>
      </v-flex>
    </v-layout>
    <v-card-text class="pa-0" v-if="isLoaded">
       <Player :card="scorecard" :holeNumber="holeNumber" />

      <v-divider class="pa-4"></v-divider>

      <Player :card="this.teamCardOne" :holeNumber="holeNumber" v-if="cardPresent(this.teamCardOne)" />

      <Player :card="this.teamCardTwo" :holeNumber="holeNumber" v-if="cardPresent(this.teamCardTwo)" />

      <v-divider class="pa-4"></v-divider>

      <Player :card="this.teamCardThree" :holeNumber="holeNumber" v-if="cardPresent(this.teamCardThree)" />

      <v-divider class="pa-4"></v-divider>
    </v-card-text>
    <v-card-actions v-if="isLoaded">
      <HoleFooter />
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Player from '@/components/TeamScorecard/Player'
import HoleFooter from '@/components/TeamScorecard/HoleFooter'

export default {
  name: "TeamScorecardHole",
  components: {
    HoleFooter,
    Player
  },

  data () {
    return {
      isLoaded: false,
      holeNumber: this.$route.params.number,
    }
  },

  computed: {
    ...mapState({
      currentRound: state => state.currentRound,
      currentTournament: state => state.tournament.currentTournament,
      teamCardOne: state => state.scorecards.teamCardOne,
      teamCardTwo: state => state.scorecards.teamCardTwo,
      teamCardThree: state => state.scorecards.teamCardThree,
    }),
    ...mapGetters({
      teamCard: 'scorecards/getTeamCard',
      scorecard: 'scorecards/scorecard'
    })
  },

  created () {
    if (this.teamCard.length == 0) {
      this.$store.dispatch(
      'scorecards/LOAD_TEAM_SCORECARD',
      {
        tournId: this.currentTournament.id,
        team_id: this.teamCard.id
      }).then(response => {
        this.isLoaded = true
      })
    } else {
      this.isLoaded = true
    }
  }
}
</script>
<style scoped>
.hole-container {
  width: 100%;
  height: 100%;
  background-color: whitesmoke;
}
</style>
