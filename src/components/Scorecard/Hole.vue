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
    </v-card-text>
    <v-card-actions v-if="isLoaded">
      <HoleFooter />
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Player from './Player'
import HoleFooter from './HoleFooter'

export default {
  name: "ScorecardHole",
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
      currentTournament: state => state.tournament.currentTournament
    }),
    ...mapGetters({
      scorecard: 'scorecards/scorecard'
    })
  },

  created () {
    if (this.scorecard.length == 0) {
      this.$store.dispatch(
      'scorecards/LOAD_SCORECARD',
      {
        tournId: this.currentTournament.id,
        tournRoundId: this.currentRound.id
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
