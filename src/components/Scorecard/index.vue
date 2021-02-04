<template>
  <v-card
   flat
   class="scorecard_container grey darken-3"
  >
    <v-card-title
      class="pa-0 pt-2 pl-2"
    >
      <v-container class="pa-4">
        <v-layout row wrap align-center justify-center>
          <v-flex xs5>
            <BackButton />
            <v-card class="text-xs-center grey darken-3" flat >
              <h3 class="mb-0 white--text font-weight-regular">{{ course_name }}</h3>
              <v-container pa-0>
                <v-layout row wrap>
                  <v-flex xs5>
                    <div>
                      <h1 class="font-weight-regular ma-0" style="color:#A8C256">{{ total_net }}
                      </h1>
                    </div>
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
          <v-flex xs2>
            <v-card flex class="text-xs-center grey darken-3" flat height="100%">
              <v-container class="pa-0">
                <v-layout row wrap flex>
                  <v-flex xs12>
                    <label class='scorecard-label'>OUT</label>
                    <div class="grey--text">
                      <span style="color:#A8C256">{{ out_net }}</span>
                      /
                      <span class="grey--text">{{ out_gross }}</span>
                    </div>
                    <label class="scorecard-label label-tight">{{ out_putts }} / <span class="pers-record">{{ out_3putts }} </span></label>
                  </v-flex>
                  <v-flex xs12>
                    <label class='scorecard-label'>IN</label>
                    <div class="grey--text">
                      <span style="color:#A8C256">{{ in_net }}</span>
                      /
                      <span class="grey--text">{{ in_gross }}</span>
                    </div>
                    <label class="scorecard-label label-tight">{{ in_putts }} / <span class="pers-record">{{ in_3putts }}</span></label>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
          <v-flex xs5>
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
    <v-card-text>

      <v-layout row wrap white v-if="currentView == 'fullCard'">
        <transition
          name="fade"
          v-on:enter="enter"
        >
          <score-list :card="playerScorecard" />
        </transition>
      </v-layout>

    </v-card-text>
  </v-card>
</template>
<script>
import ScoreList from './ScoreList'
import BackButton from '../BackButton'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Scorecard',
  props: ['current', 'roundId'],
  components: {
    ScoreList,
    BackButton
  },
  computed: {
    ...mapState({
      currentCourse: state => state.currentCourse,
      currentTournament: state => state.currentTournament,
      currentRound: state => state.currentRound,
    }),
    ...mapGetters({
      getScorecardPreview: 'getScorecardPreview',
      scorecard: 'scorecards/scorecard'
    }),
    target () {
      const value = '#scorecard-scroll'
      if (!isNaN(value)) return Number(value)
      else return value
    }
  },


  data () {
    return {
      isLoaded: false,
      preview: true,
       course_name: "Scorecard",
      total_net: 0,
      total_putts: 0,
      total_3putts: 0,
      handicap: 0,
      total_score: 0,
      scorecardId: null,
      out_net: 0,
      out_gross: 0,
      out_putts: 0,
      out_3putts: 0,
      in_net: 0,
      in_gross: 0,
      in_putts: 0,
      in_3putts: 0,
    }
  },

  methods: {
    loadHeaderInfo () {
      let card = this.scorecard
      if (card == undefined) return;

      this.course_name = card.course_name
      this.total_net = card.total_net
      this.total_putts = card.total_putts
      this.total_3putts = card.total_3putts
      this.handicap = card.handicap
      this.total_score = card.total_score
      this.scorecardId = card.id
      this.out_net = card.out_net
      this.out_gross = card.out_gross
      this.out_putts = card.out_putts
      this.out_3putts = card.out_3putts
      this.in_net = card.in_net
      this.in_gross = card.in_gross
      this.in_putts = card.in_putts
      this.in_3putts = card.in_3putts
    }
  },

  watch: {
  },

  created: function () {
    this.$store.dispatch(
      'scorecards/LOAD_SCORECARD',
      {
        tournId: this.$route.params.id,
        tournRoundId: this.$route.params.scorecard_id
      }
    ).then(response => {
      this.loadHeaderInfo()
      this.isLoaded = true
    })
  }
}
</script>
<style scoped>
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

/* .scorecard-card {
  padding: 0;
  position: relative;
  z-index: 1;
} */


/*rgb(233,112,57)*/
/*rgb(7,127,137) blue*/
</style>
