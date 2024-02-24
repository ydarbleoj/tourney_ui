<template>
  <v-card flat class="hole-container">
    <v-row column>
      <v-col cols="12">
        <h2 class="pl-4 pt-4">
          Hole {{ holeNumber }}
        </h2>
      </v-col>
      <v-col cols="6">
        <h4 class="pl-3">
          <span>Par {{ par }}</span> <span> Hcap {{ handicap }}</span>
        </h4>
      </v-col>
    </v-row>
    <v-row v-if="isLoaded">
      <Player :card="this.playerScorecard" :holeNumber="holeNumber" />
    </v-row>
    <v-card-actions v-if="isLoaded">
      <HoleFooter />
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from 'pinia'
import Player from './Player.vue'
import HoleFooter from './HoleFooter.vue'
import { useTournamentStore } from "@/store/tournament";
import { useLeaderboardsStore } from "@/store/leaderboards";
import { useScorecardsStore } from '../../store/scorecards';

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
      handicap: '',
      hideCard: false,
      scorecardId: this.$route.params.id,
    }
  },

  computed: {
    ...mapState(useTournamentStore, ['currentTournament']),
		...mapState(useLeaderboardsStore, ['rounds', 'currentRound']),
    ...mapState(useScorecardsStore, ['playerScorecard'])
  },

  methods: {
    holeInfo () {
      return this.playerScorecard.holes.filter(hole => this.holeNumber == hole.number)[0]
    },
    cardPresent (card) {
      return Object.keys(card).length !== 0
    }
  },

  created () {
    const scorecard = this.playerScorecard
    if (scorecard.length == 0) {
      this.loadScorecard(this.currentTournament.id, scorecard.id).then(() => {
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
