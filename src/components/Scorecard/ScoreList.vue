<template>
  <v-flex xs12 sm12>
    <v-list three-line class="on_expand pa-0">
      <template
        v-for="userScore in card.holes"
      >
        <v-card
          class="score-display" ref="scoreDisplay"
          v-bind:key="userScore.number"
          @click="holePage(userScore.number)"
        >
          <v-list-tile style="padding-top:5px;">
            <v-list-tile-content >
              <h3 class="ma-0 font-weight-regular">{{ userScore.number}}</h3>
            </v-list-tile-content>
            <v-list-tile-content>
              <v-list-tile-title class="text-xs-center ma-0">
                Par {{ userScore.par }}
              </v-list-tile-title>
              <v-list-tile-sub-title class="text-xs-center">
                <span style="font-size:24px;padding-right:5px;color:#A8C256;"> {{ userScore.net }}</span>
                    <span style="font-size:24px;" v-if="userScore.net">/</span>
                <span class="grey--text" style="font-size:24px;padding-left:5px;">{{ userScore.score }}</span>
             </v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-content>
              <v-list-tile-title class="text-xs-center" >Putts</v-list-tile-title>
              <v-list-tile-sub-title class="text-xs-center" style="font-size:24px;" v-bind:style="{color: puttColor(userScore.putts)}">{{ userScore.putts}}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-content>
               <v-list-tile-sub-title class="text-xs-center pa-0" style="color:#F8C977;font-size:24px;height:24px;"><span>{{ strokes(userScore.handicap) }}</span></v-list-tile-sub-title>
              <v-list-tile-sub-title class="text-xs-center handicap-color"><span>{{ userScore.handicap }}</span> hcap</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-card-text class="pa-0" v-if="type == userScore.number" >
            <transition
            name="fade"
            >
              <user-score :cardData="userScore" :scorecardId="card.id" @event="removeType" />
            </transition>
          </v-card-text>
          <v-divider></v-divider>
        </v-card>
      </template>
    </v-list>
  </v-flex>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import UserScore from './UserScore'


export default {
  name: 'ScoreList',
  props: ['card'],
  components: {
    UserScore
  },

  data () {
    return {
      currentView: '',
      type: '',
      thisComponent: '',
      holeNumber: 1,
    }
  },

  methods: {
    holePage (number) {
      this.$router.push(
        {
          name: 'ScorecardHole',
          params: {
            id: this.card.id,
            number: number
          }
        }
      )
    },
    strokes: function (holeHcap) {
      let hcap =  this.card.handicap

      if (hcap < 19 && hcap >= holeHcap) return '*';
      if (hcap > 19) {
        let newHcap = hcap - 18
        return newHcap >= holeHcap ? '* *' : '*'
      }
    },
    puttColor: function (putts) {
      return putts > 2 ? '#F79256' : ''
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
  }
}
</script>
<style>
  .two-putt {
    color: #9FB8CE;
  }
  .three-putt {
    color: #F79256;
  }
  div.list__tile__sub-title.text-xs-center.handicap-color span {
    color: #9FB8CE;
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