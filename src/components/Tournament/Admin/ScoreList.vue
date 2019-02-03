<template>
  <v-flex xs12 sm12>
    <v-list three-line class="on_expand pa-0">
      <template v-for="userScore in userscores.attributes.holes">
        <v-card class="score-display" ref="scoreDisplay">
          <v-list-tile v-bind:key="userScore.number"  @click.native="toggleScore(userScore.number)" >
            <v-list-tile-content >
              <h3 class="ma-0 font-weight-regular">{{ userScore.number}} </h3>
            </v-list-tile-content>
            <v-list-tile-content>
              <v-list-tile-title class="text-xs-center">
               Par {{ userScore.par }}
              </v-list-tile-title>
              <v-list-tile-sub-title class="text-xs-center">
                <span class="record"

                >
                  {{ userScore.net }}
                </span>
                  <span style="font-size:24px;" v-if="userScore.net">/</span>
                <span class="grey--text">{{ userScore.score }}</span>
             </v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-content>
              <v-list-tile-title class="text-xs-center">Putts</v-list-tile-title>
              <v-list-tile-sub-title class="text-xs-center" color="blue darken-1"
                 v-bind:style="{color: puttColor(userScore.putts)}"
              >{{ userScore.putts}}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-content>
               <v-list-tile-sub-title class="text-xs-center pa-0" v-if="getStroke" style="color:#F8C977;font-size:24px;height:24px;"><span>{{ strokes(userScore.handicap) }}</span></v-list-tile-sub-title>
              <v-list-tile-sub-title class="text-xs-center handicap-color"><span>{{ userScore.handicap }}</span> hcap</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <transition
          name="fade"
          v-on:enter="enter"
          >
            <v-card-text class="pa-0" v-if="type == userScore.number" >
              <user-score :cardData="userScore" :scorecardId="userscores.id" @event="removeType" />
            </v-card-text>
          </transition>
        </v-card>
        <v-divider></v-divider>
      </template>
    </v-list>
  </v-flex>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import UserScore from '../Admin/UserScore'


export default {
  name: 'ScoreList',
  props: ['userscores'],
  components: {
    UserScore
  },
  computed: {
    ...mapState([
    ]),
  },
  data () {
    return {
      twoPutt: 'two-putt',
      threePutt: 'three-putt',
      currentView: '',
      type: '',
      holeNumber: 1,
      thisComponent: '',
      getStroke: false,
    }
  },

  methods: {
    strokes: function (holeHcap) {
      let hcap =  this.userscores.attributes.handicap

      if (hcap < 19 && hcap >= holeHcap) return '*';
      if (hcap > 19) {
        let newHcap = hcap - 18
        return newHcap >= holeHcap ? '* *' : '*'
      }
    },
    puttColor: function (putts) {
      return putts > 2 ? '' : '#6CADED'
    },
    toggleScore: function (num) {
      this.holeNumber = num
      this.thisComponent = this.$refs.scoreDisplay[num - 1]

      if (num && this.type == '') {
        this.type = num
        this.$refs.scoreDisplay[num - 1].$el.classList.toggle('center-div')
      } else if (num == this.type) {
        this.type = ''
        this.$refs.scoreDisplay[num - 1].$el.classList.toggle('center-div')
      }
    },
    removeType: function(num) {
      let numVar = num === 0 ? this.holeNumber - 1 : this.holeNumber + 1
      this.type = ''
      this.thisComponent.$el.classList.toggle('center-div')
      if (this.holeNumber === 18) return;
      this.toggleScore(numVar)
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
  created: function () {
    console.log('here 55', this.userscores)
  },
  events: {
  }
}
</script>
<style>
 .two-putt {
    color: #6CADED;
  }
  .three-putt {
    color: #F7A072;
  }
  div.list__tile__sub-title.text-xs-center.handicap-color span {
    color: #6CADED;
  }
  .on_expand {
    padding-top: 130px;
/*    position: absolute;
    overflow: scroll;
*/  }
  .center-div {
    position: fixed;
    z-index: 1000;
    top: 126px; left: 0; bottom: 0; right: 0;
    transition: all 3s ease-out;
  }
.slide-fade-enter-active {
  transition: all 8s ease;
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
</style>