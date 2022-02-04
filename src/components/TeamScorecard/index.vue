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
          <v-flex xs3>
            <BackButton
              :routeName="'Course'"
              :routeParams="{
                id: this.currentTournament.id,
                course_id: this.currentRound.round_number
              }"
            />
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs6 mt-4>
            <h2 class="white--text font-weight-regular">{{ course_name }}</h2>
            <h3 class="font-weight-regular white--text"><span style="color:#999;">Par</span> {{ course_par }}</h3>
          </v-flex>
          <v-flex xs6 class="text-xs-center">
            <v-layout row wrap>
              <v-flex xs5>
                <h1 class="font-weight-regular ma-0" style="color:#A8C256">{{ total_net }}</h1>
                <label class="scorecard-label">NET</label>
              </v-flex>
              <v-flex xs2>
                <h1 class="grey--text">/</h1>
              </v-flex>
              <v-flex xs5>
                <h1 class="grey--text ma-0 font-weight-regular" >{{ total_score }}</h1>
                <label class='scorecard-label'>GROSS</label>
              </v-flex>
            </v-layout>
            <v-layout row wrap flex mt-4>
              <v-flex xs6>
                <div class="grey--text">
                  <span style="color:#A8C256">{{ out_net }}</span>
                  /
                  <span class="grey--text">{{ out_gross }}</span>
                </div>
                <label class='scorecard-label'>OUT</label>
              </v-flex>
              <v-flex xs6>
                <div class="grey--text">
                  <span style="color:#A8C256">{{ in_net }}</span>
                  /
                  <span class="grey--text">{{ in_gross }}</span>
                </div>
                <label class='scorecard-label'>IN</label>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-title>
    <v-card-text class="pa-0">
      <v-layout row wrap white>
        <transition name="fade">
          <score-list :card="teamCard" v-if="isLoaded" />
        </transition>
      </v-layout>
    </v-card-text>
  </v-card>
</template>
<script>
import ScoreList from '@/components/TeamScorecard/ScoreList'
import BackButton from '../BackButton'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'TeamScorecard',
  props: ['current', 'roundId'],
  components: {
    ScoreList,
    BackButton
  },
  computed: {
    ...mapState({
      currentCourse: state => state.currentCourse,
      currentTournament: state => state.tournament.currentTournament,
      currentRound: state => state.currentRound,
    }),
    ...mapGetters({
      teamCard: 'scorecards/getTeamCard'
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
      course_par: 0,
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
      let card = this.teamCard
      if (card == undefined) return;

      this.course_name = card.course_name
      this.total_net = card.total_net
      this.total_putts = card.total_putts
      this.total_3putts = card.total_3putts
      this.course_par = +card.course_par * 2
      this.total_score = card.gross
      this.scorecardId = card.id
      this.out_net = card.out_net
      this.out_gross = card.out_gross
      this.out_putts = card.out_putts
      this.out_3putts = card.out_3putts
      this.in_net = card.in_net
      this.in_gross = card.in_gross
      this.in_putts = card.in_putts
      this.in_3putts = card.in_3putts
    },
  },

  created: function () {
    this.$store.dispatch('scorecards/LOAD_TEAM_SCORECARD', {
      tournId: this.$route.params.id,
      team_id: this.$route.params.team_id
    }).then(response => {
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
  font-size: 12px;
}

/* .scorecard-card {
  padding: 0;
  position: relative;
  z-index: 1;
} */


/*rgb(233,112,57)*/
/*rgb(7,127,137) blue*/
</style>
