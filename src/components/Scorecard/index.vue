<template>
  <v-container class="pa-0" fluid white>
    <v-layout row wrap white>
      <v-flex xs6>
        <v-card class="text-xs-center" flat>
          <h5 class="mb-0">
            <v-btn flat light>
              <v-icon dark left>arrow_back</v-icon>
            </v-btn>
            {{ this.scorecard.name }}
          </h5>
          <span class="grey--text">
            {{ this.scorecard.tee }}
            {{ this.scorecard.rating }} /
            {{ this.scorecard.slope }}
          </span>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card flat>
          <span class="grey--text text-center">par: {{ this.scorecard.par }}</span>
          <v-spacer></v-spacer>
          <span class="grey--text">yardage: {{ this.scorecard.yardage }}</span>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap white>
      <v-flex xs4>
        <v-card class="text-xs-center" flat>
          <h5 class="mb-0">Score</h5>
          <p>
            {{ this.scorecard.total_score }} /
            {{ this.scorecard.total_net}}
          </p>
        </v-card>
      </v-flex>
      <v-flex xs4>
        <v-card class="text-xs-center pt-2" flat>
          <p class="mb-0">in: 66</p>
          <p>out: 66</p>
        </v-card>
      </v-flex>
      <v-flex xs4>
        <v-card class="text-xs-center" flat>
          <h5 class="mb-0">Putts</h5>
          <p>
            {{ this.scorecard.total_putts }} /
            {{ this.scorecard.total_3putts }}
          </p>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap blue>
      <scoreList :current="scoreList" :tournId="backToTourn" />
    </v-layout>
  </v-container>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import scoreList from './scoreList'

export default {
  name: 'Scorecard',
  components: {
    scoreList
  },
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
      courseScorecard: this.scorecard,
      backToTourn: this.$route.params.tournId
      // items: this.playerScorecard['scores']
    }
  },

  afterMount: function() {
  },

  created: function () {
    console.log('before', this.$route.params.tournId)

    this.$store.dispatch('LOAD_SCORECARD', { tournId: this.$route.params.tournId, id: this.$route.params.scorecardId })
  }
}
</script>
<style>

</style>
