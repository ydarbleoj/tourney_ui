<template>
  <v-layout row>
    <v-flex xs12 sm12>
      <v-list three-line>
        <template v-for="userScore in scoreList">
          <v-list-tile v-bind:key="userScore.number" @click="" :to="{name: 'UserScore', params: {scorecardId: scorecard.id, scoreId: userScore.id, user_sc: userScore, tournamentId: tournId }}">
            <v-list-tile-content >
              {{ userScore.number}}
            </v-list-tile-content>
            <v-list-tile-content>
              <v-list-tile-title class="text-xs-center">Par {{ userScore.par }}</v-list-tile-title>
              <v-list-tile-sub-title class="text-xs-center">{{ userScore.score}} / {{ userScore.net }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-content>
              <v-list-tile-title class="text-xs-center">Putts</v-list-tile-title>
              <v-list-tile-sub-title class="text-xs-center" color="blue darken-1">{{ userScore.putts}}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-content>
              18 hcap
            </v-list-tile-content>
          </v-list-tile>
        <v-divider></v-divider>
        </template>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'ScoreList',
  props: ['current', 'tournId'],
  computed: {
    ...mapState([
      'playerScorecard',
    ]),
    ...mapGetters([
      'scoreList',
      'scorecard'
    ])
  },
  data () {
    return {
      twoPutt: 'two-putt',
      threePutt: 'three-putt',
    }
  },

  afterMount: function () {
    console.log('userScores', this)
  }
}
</script>
<style>
  .two-putt {
    color: blue;
  }
  .three-putt {
    color: red;
  }
</style>