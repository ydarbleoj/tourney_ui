<template>
  <v-card
    flat
    class="grey darken-3 round-borders ma-2"
    @click="scorecardPage"
    v-if="userHasACard"
    :class="{ 'opacity-click': clicked }"
  >
    <v-card-title>
      <v-container class="pa-0">
        <v-layout row wrap justify-center >
          <v-layout row wrap>
            <v-flex xs6 mt-4>
              <h2 class="white--text font-weight-regular">{{ course_name }}</h2>
              <h3 class="font-weight-regular white--text"><span style="color:#999;">Par</span> {{ course_par }}</h3>
              <h4 class="mb-0 pt-2 white--text font-weight-regular">{{ handicap }} Handicap</h4>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <v-layout row wrap align-center justify-center>
                <v-flex xs4>
                  <h1 class="font-weight-regular ma-0" style="color:#A8C256;font-size:30px;">{{ total_net }}</h1>
                  <label class="scorecard-label">NET</label>
                </v-flex>
                <v-flex xs2>
                  <h1 class="grey--text" style="font-size:30px;">/</h1>
                </v-flex>
                <v-flex xs4>
                  <h1 class="grey--text ma-0 font-weight-regular" style="font-size:30px;" >{{ total_score }}</h1>
                  <label class='scorecard-label'>GROSS</label>
                </v-flex>
              </v-layout>
              <v-layout row wrap mt-2 align-center justify-center>
                <v-flex xs4>
                  <h1 style="color:#A8C256;font-size:30px;" class="ma-0 font-weight-regular">{{ total_putts }}</h1>
                  <label class="scorecard-label">PUTTS</label>
                </v-flex>
                <v-flex xs2>
                  <h1 class="grey--text font-weight-regular" style="font-size:30px;">/</h1>
                </v-flex>
                <v-flex xs4>
                  <h1 class="pers-record ma-0 font-weight-regular" style="font-size:30px;"> {{ total_3putts }}</h1>
                  <label class='scorecard-label font-weight-regular'>3 PUTTS</label>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-layout>
      </v-container>
    </v-card-title>
  </v-card>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Button',
  props: ['round'],
  computed: {
    ...mapState({
      currentTournament: state => state.tournament.currentTournament,
      currentRound: state => state.currentRound,
      scorecardPreviews: state => state.scorecardPreviews
    }),
    ...mapGetters(['getScorecardPreview'])
  },

  data () {
    return {
      isLoaded: false,
      course_name: "Scorecard",
      scorecardId: null,
      course_par: 0,
      total_net: 0,
      total_putts: 0,
      total_3putts: 0,
      handicap: 0,
      total_score: 0,
      roundId: null,
      userHasACard: true,
      clicked: false
    }
  },

  methods: {
    scorecardPage () {
      const id = this.scorecardId
      this.clicked = true
      this.$router.push({
        name: 'Scorecard',
        params: {
          id: this.currentTournament.id,
          scorecard_id: id
        }
      })
    }
  },

  created: function () {
    let preview = this.getScorecardPreview(this.round['attributes']['round_number'])

    if (preview.length == 0) {
      this.userHasACard = false
      return
    }
    let scorecard = preview[0].attributes
    this.scorecardId = scorecard.id
    this.course_name = scorecard.course_name
    this.total_net = scorecard.total_net
    this.total_putts = scorecard.total_putts
    this.total_3putts = scorecard.total_3putts
    this.handicap = scorecard.handicap
    this.total_score = scorecard.total_score
    this.roundId = scorecard.tournament_round_id
    this.course_par = scorecard.par
  }
}
</script>
<style scoped>
.round-borders {
  border-radius: 20px;
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
}
.record {
  color: #A8C256;
}
.pers-record {
  color: #F79256;
}
label.scorecard-label {
  color: #999;
  font-size: 12px;

}
.opacity-click {
  opacity: calc(0.7);
  margin: 5px 0 -5px 0;
  transition: all 0ms cubic-bezier(0.645, 0.045, 0.355, 1);
}
</style>
