<template>
  <v-card class="elevation-20 grey darken-3" ref="scorecardCard">
    <v-card-title class="scorecard-card" ref="cardHeader">
      <v-container class="pa-0" fluid @click="toggleView(currentView)">
        <v-layout row wrap class="grey darken-3">
          <v-flex xs5>
            <v-card class="text-xs-center grey darken-3" flat >
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
                <v-layout row wrap flex pt-2>
                  <v-flex xs12>
                    <label class='scorecard-label'>OUT</label>
                    <div class="grey--text">
                      <span class="record">{{ this.scorecard.out_net }}</span>
                      /
                      <span class="grey--text">{{ this.scorecard.out_gross }}</span>
                    </div>
                  </v-flex>
                  <v-flex xs12>
                    <label class='scorecard-label'>IN</label>
                    <div class="grey--text">
                      <span class="record">{{ this.scorecard.in_net }}</span>
                      /
                      <span class="grey--text">{{ this.scorecard.in_gross }}</span>
                    </div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
          <v-flex xs5>
            <v-card class="text-xs-center grey darken-3" flat>
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
        console.log('this', this.$parent.$el)
        this.$parent.$el.classList.toggle('expand')
        this.$refs.scorecardCard.$el.classList.toggle('expand')
        this.currentView = 'fullCard'
      } else if (event == 'fullCard') {
        this.$parent.$el.classList.toggle('expand')
        this.$refs.scorecardCard.$el.classList.toggle('expand')
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
div.card.expand {
  top: 0;
  left: 0;
  padding: 0;
  z-index: 2000;
  width: 100%;
  height: 100%;
  /*display: block;*/
  position: fixed;
  overflow: auto;
}
div.card__title.scorecard-card.expand {
  /*align-items: center;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  position: fixed;
  /*width: 100%;*/
  /*z-index: 2;*/
  /*top: 0;
  left: 0;
  z-index: 100;
  position: fixed;*/
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
