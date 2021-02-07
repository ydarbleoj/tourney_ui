<template>
  <v-card class="lb-scorecard scorecard_container round-borders" ref="scorecardCard">
    <v-card-title class="scorecard-card pa-0" ref="cardHeader"
      :class="{ openCard : !preview }"
    >
      <v-container class="pa-0" @click="toggleView(currentView)">
        <v-layout row wrap align-center justify-center class="grey darken-3 " >
          <v-flex xs5>
            <v-card class="text-xs-center grey darken-3" flat >
              <h4 class="mb-0 white--text font-weight-regular"> {{ card.attributes.course_name }} </h4>
              <v-container pa-0>
                <v-layout row wrap>
                  <v-flex xs5>
                    <div><h1 class="record font-weight-regular ma-0">{{ card.attributes.total_net}}</h1></div>
                    <label class="scorecard-label">NET</label>
                  </v-flex>
                  <v-flex xs1>
                    <div><h1 class="grey--text">/</h1></div>
                  </v-flex>
                  <v-flex xs5>
                    <div><h1 class="grey--text ma-0 font-weight-regular" >{{ card.attributes.total_score }}</h1></div>
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
                      <span class="record">{{ card.attributes.out_net }}</span>
                      /
                      <span class="grey--text">{{ card.attributes.out_gross }}</span>
                    </div>
                    <label class="scorecard-label label-tight">{{ card.attributes.out_putts }} / <span class="pers-record">{{ card.attributes.out_3putts }} </span></label>
                  </v-flex>
                  <v-flex xs12>
                    <label class='scorecard-label'>IN</label>
                    <div class="grey--text">
                      <span class="record">{{ card.attributes.in_net }}</span>
                      /
                      <span class="grey--text">{{ card.attributes.in_gross }}</span>
                    </div>
                    <label class="scorecard-label label-tight">{{ card.attributes.in_putts }} / <span class="pers-record">{{ card.attributes.in_3putts }}</span></label>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
          <v-flex xs5>
            <v-card class="text-xs-center grey darken-3" flat>
              <h5 class="mb-0 pt-2 white--text">{{ card.attributes.handicap }} Handicap</h5>
              <v-container class="pa-0 pl-3">
                <v-layout row wrap>
                  <v-flex xs5>
                    <div><h1 class="record ma-0 font-weight-regular">{{ card.attributes.total_putts }}</h1></div>
                    <label class="scorecard-label">PUTTS</label>
                  </v-flex>
                  <v-flex xs1>
                    <div><h1 class="grey--text font-weight-regular">/</h1></div>
                  </v-flex>
                  <v-flex xs5>
                    <div><h1 class="pers-record ma-0 font-weight-regular" > {{ card.attributes.total_3putts }}</h1></div>
                    <label class='scorecard-label font-weight-regular'>3 PUTTS</label>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-title>
    <v-card-text class="pa-0 mb-5" :style="{ marginTop: userScoreMargin + 'px' }" ref="scorecardList">

      <v-layout row wrap white v-if="currentView == 'fullCard'">
        <transition
          name="fade"
          v-on:enter="enter"
        >
          <score-list :userscores="card" />
        </transition>
      </v-layout>

    </v-card-text>
  </v-card>
</template>
<script>
import ScoreList from '../Admin/ScoreList'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Scorecard',
  props: ['card'],
  components: {
    ScoreList
  },

  data () {
    return {
      isLoaded: false,
      courseScorecard: {},
      currentView: 'preview',
      preview: true,
      cardHeight: '',
      userScoreMargin: '',
    }
  },

  methods: {
    expandParent: function(event) {
      event.scorecardCard.$el.style.width = '100%';
      event.scorecardCard.$el.style.position = 'absolute';
      event.scorecardCard.$el.style.left = '0';
      event.scorecardCard.$el.style.top = '0';
      event.scorecardCard.$el.style.height = '100%';
      event.scorecardCard.$el.style.overflow = 'scroll';
      event.scorecardCard.$el.style.zIndex = '8888';
      event.scorecardCard.$el.style.transitionDelay = '10s';
    },
    closeParent: function(event) {
      event.scorecardCard.$el.style.cssText = null;
    },
    toggleView: function (event) {
      if (event == 'preview') {
        this.preview = !this.preview
        this.listMargin()
        this.$emit('open')
        this.$refs.scorecardCard.$el.classList.toggle('expand')
        this.currentView = 'fullCard'
        this.expandParent(this.$refs)
      } else if (event == 'fullCard') {
        this.preview = !this.preview
        this.listMargin()
        this.$emit('open')
        this.$refs.scorecardCard.$el.classList.toggle('expand')
        this.currentView = 'preview'
        this.closeParent(this.$refs)
      }
    },
    listMargin () {
      this.userScoreMargin = this.preview ? '0' : this.cardHeight
    },
    fixedHeader () {
      this.$refs.cardHeader.style.width = '100%';
      this.$refs.cardHeader.style.position = 'fixed';
      this.$refs.cardHeader.style.zIndex = '9999';
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


  mounted: function () {
    console.log('card', this.card)
    this.cardHeight = this.$refs.scorecardCard.$el.clientHeight
  }
}
</script>
<style>
.round-borders {
  overflow:hidden;
  border-radius: 20px;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 0.2s ease, box-shadow 0.2s ease;
}
.record {
  color: #F8C977;
  color: #74C9D7;
  color: #6CADED;
}
.pers-record {
  color: #F7A072;
  color: #ED6C6C;
}
label.scorecard-label {
  color: white;
  font-size: 10px;

}
.card.scorecard_container {
  position: relative;
}
div.card.scorecard_container.expand {
  position: absolute;
  top: 0;
  left: 0;
  padding: 0;
  z-index: 8888;
  width: 100%;
  height: 100%;
  border-radius: 0;
}
.scorecard-card {
  position: relative;
  z-index: 1;

}
.openCard {
  border-radius: 0;
  margin: 0;
  position: fixed;
  z-index: 9999;
  width: 100vw;
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
