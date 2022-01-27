<template>
  <v-card flat style="background-color:#A8C256;" tile class="pa-0 pb-4">
    <v-layout row align-center mt-3>
      <v-flex xs6 v-if="playerOneName">
        <h3 class="font-weight-regular">{{ playerOneName }}</h3>
        <span style="font-size:14px;">
          Handicap {{ playerOneHandicap }}
        </span>
      </v-flex>
      <v-flex xs6 v-if="playerTwoName">
        <h3 class="font-weight-regular">{{ playerTwoName }}</h3>
        <span style="font-size:14px;">
          Handicap {{ playerTwoHandicap }}
        </span>
      </v-flex>
    </v-layout>
    <v-layout row align-center mt-3>
      <v-flex xs6 v-if="playerThreeName">
        <h3 class="font-weight-regular">{{ playerThreeName }}</h3>
        <span style="font-size:14px;">
          Handicap {{ playerThreeHandicap }}
        </span>
      </v-flex>
      <v-flex xs6 v-if="playerFourName">
        <h3 class="font-weight-regular">{{ playerFourName }}</h3>
        <span style="font-size:14px;">
          Handicap {{ playerFourHandicap }}
        </span>
      </v-flex>
    </v-layout>
    <v-flex
      class="text-xs-center mt-4"
      :class="{ clicked: 'opacity-click' }"
      @click="scorecardPage()"
    >
      <h2 class="font-weight-regular">
        Scorecard
        <span>
          <v-icon color="#666" style="font-size:24px;">
            mdi-chevron-right
          </v-icon>
        </span>
      </h2>
    </v-flex>
  </v-card>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'Group',
  props: ['group'],

  computed: {
    ...mapState({
      currentTournament: state => state.tournament.currentTournament,
      currentRound: state => state.currentRound
    }),
  },

  data () {
    return {
      playerOneName: null,
      playerTwoName: null,
      playerThreeName: null,
      playerFourName: null,
      playerOneHandicap: 0,
      playerTwoHandicap: 0,
      playerThreeHandicap: 0,
      playerFourHandicap: 0,
      clicked: false
    }
  },

  methods: {
    scorecardPage () {
      this.clicked = true
      this.$store.commit("setPageTransition");
      this.$router.push(
          {
              name: 'TeamScorecard',
          params: {
              id: this.currentTournament.id,
            team_id: this.group.id
          }
        }
      )
    },
  },

  created () {
    const group = this.group.attributes
    const players = group.players

    this.playerOneName = players[0]['username']
    this.playerOneHandicap = players[0]['handicap']
    this.playerTwoName = players[1]['username']
    this.playerTwoHandicap = players[1]['handicap']

    this.playerThreeName = players[2] == undefined ? null : players[2]['username']
    this.playerThreeHandicap = players[2] == undefined ? '' : players[2]['handicap']

    this.playerFourName = players[3] == undefined ? null : players[3]['username']
    this.playerFourHandicap = players[3] == undefined ? '' : players[3]['handicap']
  },
}
</script>
<style >
.opacity-click {
  opacity: 0.9;
}
</style>