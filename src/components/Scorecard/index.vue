<template>
  <v-card v-if="isLoaded" flat class="lb-scorecard scorecard_container" ref="scorecardCard">
    <v-card-title
      class="scorecard-card pa-0"
      :class="{ openCard : !preview }"
    >
      <v-container class="pa-0"  @click="toggleView(currentView); $vuetify.goTo(target, options)">
        <v-layout row wrap align-center justify-center class="grey darken-3 round-borders" ref="cardHeader" >
          <v-flex xs5>
            <v-card class="text-xs-center grey darken-3" flat >
              <h3 class="mb-0 white--text font-weight-regular">{{ playerScorecard.course_name }}</h3>
              <v-container pa-0>
                <v-layout row wrap>
                  <v-flex xs5>
                    <div><h1 class="font-weight-regular ma-0" style="color:#A8C256">{{ playerScorecard.total_net}}</h1></div>
                    <label class="scorecard-label">NET</label>
                  </v-flex>
                  <v-flex xs1>
                    <div><h1 class="grey--text">/</h1></div>
                  </v-flex>
                  <v-flex xs5>
                    <div><h1 class="grey--text ma-0 font-weight-regular" >{{ playerScorecard.total_score }}</h1></div>
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
                      <span style="color:#A8C256">{{ playerScorecard.out_net }}</span>
                      /
                      <span class="grey--text">{{ playerScorecard.out_gross }}</span>
                    </div>
                    <label class="scorecard-label label-tight">{{ playerScorecard.out_putts }} / <span class="pers-record">{{ playerScorecard.out_3putts }} </span></label>
                  </v-flex>
                  <v-flex xs12>
                    <label class='scorecard-label'>IN</label>
                    <div class="grey--text">
                      <span style="color:#A8C256">{{ playerScorecard.in_net }}</span>
                      /
                      <span class="grey--text">{{ playerScorecard.in_gross }}</span>
                    </div>
                    <label class="scorecard-label label-tight">{{ playerScorecard.in_putts }} / <span class="pers-record">{{ playerScorecard.in_3putts }}</span></label>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
          <v-flex xs5>
            <v-card class="text-xs-center grey darken-3" flat>
              <h5 class="mb-0 pt-2 white--text">{{ playerScorecard.handicap }} Handicap</h5>
              <v-container class="pa-0 pl-3">
                <v-layout row wrap>
                  <v-flex xs5>
                    <div><h1 style="color:#A8C256" class="ma-0 font-weight-regular">{{ playerScorecard.total_putts }}</h1></div>
                    <label class="scorecard-label">PUTTS</label>
                  </v-flex>
                  <v-flex xs1>
                    <div><h1 class="grey--text font-weight-regular">/</h1></div>
                  </v-flex>
                  <v-flex xs5>
                    <div><h1 class="pers-record ma-0 font-weight-regular" > {{ playerScorecard.total_3putts }}</h1></div>
                    <label class='scorecard-label font-weight-regular'>3 PUTTS</label>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-title>
    <v-card-text class="pa-0" style="margin-bottom:5vh;" ref="scorecardList" :style="{ marginTop: userScoreMargin + 'px' }">

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
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Scorecard',
  props: ['current', 'roundId'],
  components: {
    ScoreList
  },
  computed: {
    ...mapState({
      playerScorecard: state => state.scorecards.playerScorecard,
      currentCourse: state => state.currentCourse,
      currentTournament: state => state.currentTournament,
      currentRound: state => state.currentRound,
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
      cardHeight: '',
      userScoreMargin: '',
      currentView: 'preview',
      cardPos: 0,
      duration: 1000,
      offset: 0,
      easing: 'easeInOutCubic',
    }
  },

  methods: {
    expandParent: function(event) {
      this.listMargin(event)
      event.scorecardCard.$el.style.width = '100%';
      event.scorecardCard.$el.style.position = 'absolute';
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
    origPosition () {
      let card = this.$refs.scorecardCard.$el
      let position = {
        top: card.getBoundingClientRect().top,
        left: card.getBoundingClientRect().left,
        bottom: card.getBoundingClientRect().bottom,
        scbottom: screen.bottom,
      }
      return this.cardPos = position.top;
    },
    options () {
      return {
        duration: this.duration,
        offset: this.offset,
        easing: this.easing
      }
    },
    toggleView: function (event) {
      if (event == 'preview') {
        this.$refs.cardHeader.classList.toggle('round-borders')
        this.preview =!this.preview
        this.$emit('open')
        this.currentView = 'fullCard'
        this.expandParent(this.$refs)
      } else if (event == 'fullCard') {
        this.$refs.cardHeader.classList.toggle('round-borders')
        this.preview = !this.preview
        this.currentView = 'preview'
        this.listMargin(this.$refs)
        this.closeParent(this.$refs)
        this.$emit('open')
      }
    },
    listMargin (card) {
      let h = card.scorecardCard.$el.clientHeight
      this.cardHeight = h
      this.userScoreMargin = this.preview ? '0' : this.cardHeight
    },
    beforeEnter: function(el) {
      el.style.opacity = 0
    },
    enter: function(el) {
      el.style.opacity = 0
    },
    afterEnter: function(el) {
      el.style.opacity = 0
    },
  },

  watch: {
    current: function () {
      this.$store.dispatch('scorecards/LOAD_SCORECARD', {
        tournId: this.currentTournament.id, id: this.currentRound.scorecard_id
      }).then((response) => {
        this.isLoaded = true
      })
    }
  },

  mounted: function() {
  },

  created: function () {
    this.$store.dispatch('scorecards/LOAD_SCORECARD', {
      tournId: this.currentTournament.id, tournRoundId: this.roundId['id']
    }).then(response => {
      this.isLoaded = true
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
  color: #A8C256;
}
.pers-record {
  color: #F79256;
}
label.scorecard-label {
  color: white;
  font-size: 10px;

}
div.card.scorecard_container {
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  transition: all 600ms cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: all 600ms cubic-bezier(0.6, 0.04, 0.98, 0.335);
  position: relative;
}
.v-card__title.scorecard-card.openCard {
  margin: 0;
  position: fixed;
  z-index: 9999;
  width: 100vw;
  transition: all 600ms cubic-bezier(0.6, 0.04, 0.98, 0.335);
}
.scorecard-card {
  padding: 0;
  position: relative;
  z-index: 1;
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
