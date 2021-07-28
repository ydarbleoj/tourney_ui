<template>
  <v-card
    flat
    class="grey darken-3 round-borders"
    @click="scorecardPage"
    v-if="userHasACard">
    <v-card-title>
      <v-container class="pa-0">
        <v-layout row wrap align-center justify-center >
          <v-flex xs6>
            <v-card class="text-xs-center grey darken-3" flat >
              <h3 class="white--text font-weight-regular">
                {{ course_name }}
              </h3>
              <v-container pa-0>
                <v-layout row wrap>
                  <v-flex xs5>
                    <div><h1 class="font-weight-regular ma-0" style="color:#A8C256">{{ total_net }}</h1></div>
                    <label class="scorecard-label">NET</label>
                  </v-flex>
                  <v-flex xs1>
                    <div><h1 class="grey--text">/</h1></div>
                  </v-flex>
                  <v-flex xs5>
                    <div><h1 class="grey--text ma-0 font-weight-regular" >{{ total_score }}</h1></div>
                    <label class='scorecard-label'>GROSS</label>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
          <v-flex xs6>
            <v-card class="text-xs-center grey darken-3" flat>
              <h5 class="mb-0 pt-2 white--text">{{ handicap }} Handicap</h5>
              <v-container class="pa-0 pl-3">
                <v-layout row wrap>
                  <v-flex xs5>
                    <div><h1 style="color:#A8C256" class="ma-0 font-weight-regular">{{ total_putts }}</h1></div>
                    <label class="scorecard-label">PUTTS</label>
                  </v-flex>
                  <v-flex xs1>
                    <div><h1 class="grey--text font-weight-regular">/</h1></div>
                  </v-flex>
                  <v-flex xs5>
                    <div><h1 class="pers-record ma-0 font-weight-regular" > {{ total_3putts }}</h1></div>
                    <label class='scorecard-label font-weight-regular'>3 PUTTS</label>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
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
      total_net: 0,
      total_putts: 0,
      total_3putts: 0,
      handicap: 0,
      total_score: 0,
      roundId: null,
      userHasACard: true
    }
  },

  methods: {
    scorecardPage () {
      this.$router.push(
        {
          name: 'Scorecard',
          params: {
            id: this.currentTournament.id,
            scorecard_id: this.roundId
          }
        }
      )
    }
  },

  created: function () {
    let preview = this.getScorecardPreview(this.round['attributes']['round_number'])

    if (preview.length == 0) {
      this.userHasACard = false
      return
    }
    let scorecard = preview[0].attributes
    this.course_name = scorecard.course_name
    this.total_net = scorecard.total_net
    this.total_putts = scorecard.total_putts
    this.total_3putts = scorecard.total_3putts
    this.handicap = scorecard.handicap
    this.total_score = scorecard.total_score
    this.roundId = scorecard.tournament_round_id
  }
}
</script>
<style scoped>
.round-borders {
  position: relative;
  border-radius: 20px;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  z-index: 1;
}
.record {
  color: #A8C256;
}
.pers-record {
  color: #F79256;
}
label.scorecard-label {
  color: white;
  font-size: 10px;

}
</style>
