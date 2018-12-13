<template>
  <v-card v-if="isLoaded" class="lb-scorecard scorecard_container round-borders" ref="scorecardCard">
    <v-card-title class="scorecard-card pa-0" ref="cardHeader">
      <v-container class="pa-0" @click="toggleView(currentView)">
        <v-layout row wrap align-center justify-center class="grey darken-3 round-borders">
          <v-flex xs5>
            <v-card class="text-xs-center grey darken-3" flat >
              <h3 class="mb-0 white--text font-weight-regular">Score</h3>
              <v-container pa-0>
                <v-layout row wrap>
                  <v-flex xs5>
                    <div><h1 class="record font-weight-regular ma-0">{{ this.courseScorecard.total_net}}</h1></div>
                    <label class="scorecard-label">NET</label>
                  </v-flex>
                  <v-flex xs1>
                    <div><h1 class="grey--text">/</h1></div>
                  </v-flex>
                  <v-flex xs5>
                    <div><h1 class="grey--text ma-0 font-weight-regular" >{{ this.courseScorecard.total_score }}</h1></div>
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
                      <span class="record">{{ this.courseScorecard.out_net }}</span>
                      /
                      <span class="grey--text">{{ this.courseScorecard.out_gross }}</span>
                    </div>
                    <label class="scorecard-label label-tight">{{ this.courseScorecard.out_putts }} / <span class="pers-record">{{ this.courseScorecard.out_3putts }} </span></label>
                  </v-flex>
                  <v-flex xs12>
                    <label class='scorecard-label'>IN</label>
                    <div class="grey--text">
                      <span class="record">{{ this.courseScorecard.in_net }}</span>
                      /
                      <span class="grey--text">{{ this.courseScorecard.in_gross }}</span>
                    </div>
                    <label class="scorecard-label label-tight">{{ this.courseScorecard.in_putts }} / <span class="pers-record">{{ this.courseScorecard.in_3putts }}</span></label>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
          <v-flex xs5>
            <v-card class="text-xs-center grey darken-3" flat>
              <h5 class="mb-0 pt-2 white--text">{{ this.courseScorecard.handicap }} Handicap</h5>
              <v-container class="pa-0 pl-3">
                <v-layout row wrap>
                  <v-flex xs5>
                    <div><h1 class="record ma-0 font-weight-regular">{{ this.courseScorecard.total_putts }}</h1></div>
                    <label class="scorecard-label">PUTTS</label>
                  </v-flex>
                  <v-flex xs1>
                    <div><h1 class="grey--text font-weight-regular">/</h1></div>
                  </v-flex>
                  <v-flex xs5>
                    <div><h1 class="pers-record ma-0 font-weight-regular" > {{ this.courseScorecard.total_3putts }}</h1></div>
                    <label class='scorecard-label font-weight-regular'>3 PUTTS</label>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-title>
    <v-card-text class="pa-0" ref="scorecardList">

      <v-layout row wrap white v-if="currentView == 'fullCard'">
        <transition
          name="fade"
          v-on:enter="enter"
        >
          <score-list :cardId="scorecard" />
        </transition>
      </v-layout>

    </v-card-text>
  </v-card>
</template>
<script>
import ScoreList from './ScoreList'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Scorecard',
  props: ['current', 'roundId'],
  components: {
    ScoreList
  },
  computed: {
    ...mapState([
      'playerScorecard',
      'currentCourse',
      'currentTournament',
      'currentRound'
    ]),
    ...mapGetters([
      'scorecard'
    ]),
  },


  data () {
    return {
      isLoaded: false,
      courseScorecard: {},
      currentView: 'preview',
    }
  },

  methods: {
    expandParent: function(event) {
      event.scorecardCard.$el.style.width = '100%';
      event.scorecardCard.$el.style.position = 'fixed';
      event.scorecardCard.$el.style.left = '0';
      event.scorecardCard.$el.style.top = '0';
      event.scorecardCard.$el.style.height = '100%';
      event.scorecardCard.$el.style.overflow = 'scroll';
      event.scorecardCard.$el.style.zIndex = '8888';
      event.scorecardCard.$el.style.transitionDelay = '0.5s';
    },
    closeParent: function(event) {
      event.scorecardCard.$el.style.cssText = null;
    },
    toggleView: function (event) {
      if (event == 'preview') {
        this.$refs.scorecardCard.$el.classList.toggle('expand')
        this.$refs.cardHeader.classList.toggle('fix_header')
        this.currentView = 'fullCard'
        this.expandParent(this.$refs)
      } else if (event == 'fullCard') {
        this.$refs.scorecardCard.$el.classList.toggle('expand')
        this.$refs.cardHeader.classList.toggle('fix_header')
        this.currentView = 'preview'
        this.closeParent(this.$refs)
      }
    },
    beforeEnter: function(el) {
      el.style.opacity = 0
    },
    enter: function(el) {
      el.style.opacity = 1
    },
    afterEnter: function(el) {
      el.style.opacity = 1
    },
  },

  watch: {
    current: function () {
      this.$store.dispatch('LOAD_SCORECARD', { tournId: this.currentTournament.id, id: this.currentRound.scorecard_id})
    }
  },

  created: function () {
    this.$store.dispatch('LOAD_SCORECARD', { tournId: this.currentTournament.id, tournRoundId: this.roundId['id'] })
      .then(response => {
        this.isLoaded = true
        this.courseScorecard = Object.assign(this.scorecard)
      })
  }
}
</script>
<style>
.round-borders {
  border-radius: 20px;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 0.2s ease, box-shadow 0.2s ease;
}
.record {
  color: #6CADED;
}
.pers-record {
  color: #ED6C6C;
}
label.scorecard-label {
  color: white;
  font-size: 10px;

}

div.card.scorecard_container.expand {
  top: 0;
  left: 0;
  padding: 0;
  z-index: 8888;
  width: 100%;
  height: 100%;
}
div.card__title.scorecard-card.pa-0.fix_header {
  position: fixed;
  z-index: 100;
  width: 100%;
  box-shadow: 0 10px 13px -6px rgba(0,0,0,0.2), 0 20px 31px 3px rgba(0,0,0,0.14), 0 8px 38px 7px rgba(0,0,0,0.12) !important;
}

.slide-fade-enter-active {
  transition: all .8s ease;
}
.slide-fade-leave-active {
  transition: all .0s;
  opacity: 0;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translate(200px);
  opacity: 0;
}


/*rgb(233,112,57)*/
/*rgb(7,127,137) blue*/
</style>
