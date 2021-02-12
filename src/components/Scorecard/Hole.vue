<template>
  <v-card flat class="hole-container">
    <v-layout column>
      <v-flex xs12>
        <h2 class="pl-4 pt-4">
          Hole {{ holeNumber }}
        </h2>
      </v-flex>
      <v-flex xs6 class="pl-4 pb-2">
        <span class="pr-2">Par {{ par }}</span> <span> Hcap {{ handicap }}</span>
      </v-flex>
    </v-layout>
    <v-card-text class="pa-0" v-if="isLoaded">
      <Player :card="scorecard" :holeNumber="holeNumber" />

      <v-divider class="pa-4"></v-divider>

      <Player :card="this.teamCardOne" :holeNumber="holeNumber" v-if="cardPresent(this.teamCardOne)" />

      <v-divider class="pa-4"></v-divider>

      <Player :card="this.teamCardTwo" :holeNumber="holeNumber" v-if="cardPresent(this.teamCardTwo)" />

      <v-divider class="pa-4"></v-divider>

      <Player :card="this.teamCardThree" :holeNumber="holeNumber" v-if="cardPresent(this.teamCardThree)" />

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
      par: '',
      handicap: ''
    }
  },

  computed: {
    ...mapState({
      currentRound: state => state.currentRound,
      currentTournament: state => state.tournament.currentTournament,
      teamCardOne: state => state.scorecards.teamCardOne,
      teamCardTwo: state => state.scorecards.teamCardTwo,
      teamCardThree: state => state.scorecards.teamCardThree

    }),
    ...mapGetters({
      scorecard: 'scorecards/scorecard'
    })
  },

  methods: {
     holeInfo () {
      return this.scorecard.holes.filter(hole => this.holeNumber == hole.number)[0]
    },
    cardPresent (card) {
      return Object.keys(card).length !== 0
    }
  },

  created () {
    if (this.scorecard.length == 0) {
      this.$store.dispatch(
      'scorecards/LOAD_SCORECARD',
      {
        tournId: this.currentTournament.id,
        tournRoundId: this.currentRound.id
      }).then(response => {
        this.handicap = this.holeInfo().handicap
        this.par      = this.holeInfo().par
        this.isLoaded = true
      })
    } else {
      this.handicap = this.holeInfo().handicap
      this.par      = this.holeInfo().par
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
