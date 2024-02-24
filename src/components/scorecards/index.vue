<template>
  <v-card flat class="cards-bg-color" style="overflow:inherit">
    <v-container>
      <v-row justify="start">
        <v-col class="pa-0">
          <BackButton
            :routeName="'Tournament'"
            :routeParams="{ id: this.currentTournament.id }" />
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col>
          <h2 class="white--text font-weight-regular">
            {{ course_name }}
          </h2>
          <h3 class="font-weight-regular white--text">
            <span style="color:#999;">Par</span> {{ course_par }}
          </h3>
        </v-col>
        <v-col>
          <h2
            :class="[teeName == 'Green' ? 'green-tee' : 'gold-tee']"
            class="font-weight-medium"
          >
            {{ teeName }} <span style="color:#999;padding-left:4px;">{{ teeRating }} / {{  teeSlope}}</span>
          </h2>
          <h3 class="mb-0 font-weight-regular white--text">
            Handicap <span style="padding-left:2px;">{{ handicap }}</span>
          </h3>
        </v-col>
      </v-row>
      <v-row class="d-flex justify-center pb-2">
        <v-col class="pa-0 text-center">
          <v-row>
            <v-col>
              <h1
                class="font-weight-regular ma-0"
                style="color: #a8c256; font-size: 30px"
              >
                {{ total_net }}
              </h1>
              <label class="scorecard-label">NET</label>
            </v-col>
            <v-col cols="2">
              <h1 style="color: #999; font-size: 30px">/</h1>
            </v-col>
            <v-col class="pa-0">
              <h1 class="ma-0 font-weight-regular" style="color: #999; font-size: 30px">
                {{ total_score }}
              </h1>
              <label class="scorecard-label">GROSS</label>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="2"></v-col>
        <v-col class="text-center">
          <v-row justify="center">
            <v-col class="pa-0">
              <h1
                style="color: #a8c256; font-size: 30px"
                class="ma-0 font-weight-regular"
              >
                {{ total_putts }}
              </h1>
              <label class="scorecard-label">PUTTS</label>
            </v-col>
            <v-col cols="3">
              <h1 class="font-weight-regular" style="color: #999; font-size: 30px">/</h1>
            </v-col>
            <v-col class="pa-0">
              <h1 class="pers-record ma-0 font-weight-regular" style="font-size: 30px">
                {{ total_3putts }}
              </h1>
              <label class="scorecard-label font-weight-regular">3PTS</label>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-card-text class="pa-0">
      <v-row style="color:white;">
        <score-list :card="this.playerScorecard" v-if="isLoaded" />
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapState } from 'pinia'
import { mapActions } from 'pinia'
import ScoreList from './ScoreList.vue'
import BackButton from '../BackButton.vue'
import { useTournamentStore } from "@/store/tournament";
import { useLeaderboardsStore } from "@/store/leaderboards";
import { useScorecardsStore } from "@/store/scorecards";

export default {
  name: "index",
  props: ['current', 'roundId'],
  components: {
    BackButton,
    ScoreList
  },

  computed: {
    ...mapState(useTournamentStore, ['currentTournament']),
    ...mapState(useLeaderboardsStore, ['currentRound']),
    ...mapState(useScorecardsStore, ['playerScorecard']),
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
      course_par: 0,
      total_net: 0,
      total_putts: 0,
      total_3putts: 0,
      handicap: 0,
      total_score: 0,
      scorecardId: this.$route.params.scorecard_id,
      out_net: 0,
      out_gross: 0,
      out_putts: 0,
      out_3putts: 0,
      in_net: 0,
      in_gross: 0,
      in_putts: 0,
      in_3putts: 0,
      teeName: 'Green',
      teeRating: 72.0,
      teeSlope: 113
    }
  },

  methods: {
    ...mapActions(useScorecardsStore, ['loadScorecard']),
    loadHeaderInfo () {
      let card = this.playerScorecard
      if (card == undefined) return;

      this.course_name = card.course_name
      this.total_net = card.total_net
      this.course_par = card.par
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
      this.teeName = card.tee_name
      this.teeRating = card.tee_rating
      this.teeSlope = card.tee_slope
    }
  },

  created () {
    this.loadScorecard(this.currentTournament.id, this.$route.params.scorecard_id).then(() => {
      this.loadHeaderInfo()
      this.isLoaded = true
    }, (err) => {
      console.log(err)
    })
  }
}
</script>
<style scoped>
.cards-bg-color {
  background-color: #424242;
}
.record {
  color: #A8C256;
}
.pers-record {
  color: #F79256;
}
label.scorecard-label {
  color: white;
  font-size: 14px;

}
.green-tee {
  color: #A8C256
}

.gold-tee {
  color: gold;
}
.white--text {
  color: white;
}
.grey--text {
  color: #999;
}
/* .scorecard-card {
  padding: 0;
  position: relative;
  z-index: 1;
} */


/*rgb(233,112,57)*/
/*rgb(7,127,137) blue*/
</style>
