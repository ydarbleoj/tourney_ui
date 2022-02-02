<template>
  <v-card
   flat
   class="scorecard_container grey darken-3"
  >
    <v-card-title
      class="pa-0 pt-2"
    >
      <v-container class="pa-4">
        <v-layout row wrap align-center justify-center>
          <v-flex xs3>
            <BackButton
              :routeName="'ProfileScorecards'"
              :routeParams="{ }"
            />
          </v-flex>
        </v-layout>
        <v-layout row wrap justify-center >
          <v-layout row wrap>
            <v-flex xs6 mt-4>
              <h2 class="white--text font-weight-regular">{{ course_name }}</h2>
              <h3 class="font-weight-regular white--text"><span style="color:#999;">Par</span> {{ course_par }}</h3>

              <div class="mt-3">
                <h2
                  :class="[teeName == 'Green' ? 'green-tee' : 'gold-tee']"
                  class="font-weight-medium"
                >
                  {{ teeName }} <span style="color:#999;padding-left:4px;">{{ teeRating }} / {{  teeSlope}}</span>
                </h2>
                <h3 class="mb-0 font-weight-regular white--text">
                  Handicap <span style="padding-left:2px;">{{ handicap }}</span>
                </h3>
              </div>
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
    <v-card-text class="pa-0">
      <v-layout row wrap white>
        <transition name="fade">
          <score-list :card="scorecard" :disableLink="true" v-if="isLoaded" />
        </transition>
      </v-layout>
    </v-card-text>
  </v-card>
</template>
<script>
import ScoreList from '../../Scorecard/ScoreList'
import BackButton from '../../BackButton'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'ProfileScorecard',
  components: {
    ScoreList,
    BackButton
  },
  computed: {
    ...mapGetters({
      scorecard: 'profile/getScorecard'
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
      course_par: 0,
      total_net: 0,
      total_putts: 0,
      total_3putts: 0,
      handicap: 0,
      total_score: 0,
      scorecardId: this.$route.params.id,
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
    loadHeaderInfo () {
      let card = this.scorecard
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

  watch: {
  },

  created () {
    this.$store.dispatch('profile/LOAD_SCORECARD', {
      id: this.$route.params.id,
    }).then(response => {
      console.log('after', this.scorecard)
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
  font-size: 14px;

}
.green-tee {
  color: #A8C256
}

.gold-tee {
  color: gold;
}

/* .scorecard-card {
  padding: 0;
  position: relative;
  z-index: 1;
} */


/*rgb(233,112,57)*/
/*rgb(7,127,137) blue*/
</style>
