<template>
  <v-card class="elevation-20 grey darken-3 scorecard_container" ref="scorecardCard">
    <v-card-title class="scorecard-card pa-0" ref="cardHeader">
      <v-container class="pa-0" fluid @click="toggleView(currentView)">
        <v-layout row wrap class="grey darken-3">
          <v-flex xs5>
            <v-card class="text-xs-center grey darken-3 mt-2" flat >
              <h4 class="mb-0 white--text">Score</h4>
              <v-container pa-0 fluid>
                <v-layout row wrap>
                  <v-flex xs5>
                    <div><h2 class="record ma-0">{{ this.scorecard.total_net}}</h2></div>
                    <label class="scorecard-label">NET</label>
                  </v-flex>
                  <v-flex xs1>
                    <div><h2 class="grey--text">/</h2></div>
                  </v-flex>
                  <v-flex xs5>
                    <div><h2 class="grey--text ma-0" >{{ this.scorecard.total_score }}</h2></div>
                    <label class='scorecard-label'>GROSS</label>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
          <v-flex xs2>
            <v-card flex class="text-xs-center grey darken-3" flat height="100%">
              <v-container class="pa-0" fluid fill-height>
                <v-layout row wrap flex>
                  <v-flex xs12>
                    <label class='scorecard-label'>OUT</label>
                    <div class="grey--text">
                      <span class="record">{{ this.scorecard.out_net }}</span>
                      /
                      <span class="grey--text">{{ this.scorecard.out_gross }}</span>
                    </div>
                    <label class="scorecard-label label-tight">{{ this.scorecard.out_putts }} / <span class="pers-record">{{ this.scorecard.out_3putts }} </span></label>
                  </v-flex>
                  <v-flex xs12>
                    <label class='scorecard-label'>IN</label>
                    <div class="grey--text">
                      <span class="record">{{ this.scorecard.in_net }}</span>
                      /
                      <span class="grey--text">{{ this.scorecard.in_gross }}</span>
                    </div>
                    <label class="scorecard-label label-tight">{{ this.scorecard.in_putts }} / <span class="pers-record">{{ this.scorecard.in_3putts }}</span></label>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
          <v-flex xs5>
            <v-card class="text-xs-center grey darken-3 ma-2" flat>
              <h5 class="mb-0 pt-2 white--text">{{ this.scorecard.handicap }} Handicap</h5>
              <v-container class="pa-0 pl-3" fluid>
                <v-layout row wrap>
                  <v-flex xs5>
                    <div><h4 class="record ma-0">{{ this.scorecard.total_putts }}</h4></div>
                    <label class="scorecard-label">PUTTS</label>
                  </v-flex>
                  <v-flex xs1>
                    <div><h4 class="grey--text">/</h4></div>
                  </v-flex>
                  <v-flex xs5>
                    <div><h4 class="pers-record ma-0" > {{ this.scorecard.total_3putts }}</h4></div>
                    <label class='scorecard-label'>3 PUTTS</label>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-title>
    <v-card-text class="pa-0">

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
  props: ['current', 'cardId'],
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
      courseScorecard: this.scorecard,
      currentView: 'preview',
    }
  },

  methods: {
    toggleView: function (event) {
      if (event == 'preview') {
        this.$parent.$el.classList.toggle('expand')
        this.$refs.scorecardCard.$el.classList.toggle('expand')
        this.$refs.cardHeader.classList.toggle('fix_header')
        this.currentView = 'fullCard'
      } else if (event == 'fullCard') {
        this.$parent.$el.classList.toggle('expand')
        this.$refs.scorecardCard.$el.classList.toggle('expand')
        this.$refs.cardHeader.classList.toggle('fix_header')
        this.currentView = 'preview'

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
    console.log('here', this.scorecard)
    this.$store.dispatch('LOAD_SCORECARD', { tournId: this.currentTournament.id, id: this.currentRound.scorecard_id})
  }
}
</script>
<style>
div.card.scorecard-card {
  background-color: rgba(98, 188, 250, 1);
  position: fixed;
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
  z-index: 2000;
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: auto;
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
