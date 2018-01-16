<template>
  <v-flex xs12 sm12>
    <v-list three-line>
      <template v-for="userScore in scoreListGetter">
        <v-card >
          <v-list-tile v-bind:key="userScore.number" @click.native="toggleScore(userScore.number)">
            <v-list-tile-content >
              <h4 class="ma-0">{{ userScore.number}}</h4>
            </v-list-tile-content>
            <v-list-tile-content>
              <v-list-tile-title class="text-xs-center">
               <h5 class="text-xs-center ma-0">Par {{ userScore.par }}</h5>
              </v-list-tile-title>
              <v-list-tile-sub-title class="text-xs-center">
                <span class="record"> {{ userScore.net }}</span>
                    /
                <span class="grey--text">{{ userScore.score }}</span>
             </v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-content>
              <v-list-tile-title class="text-xs-center">Putts</v-list-tile-title>
              <v-list-tile-sub-title class="text-xs-center" color="blue darken-1">{{ userScore.putts}}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-content>
              {{ userScore.handicap }}
            </v-list-tile-content>
          </v-list-tile>
          <transition
          name="fade"
          v-on:enter="enter"
          >
            <v-card-text class="pa-0" v-if="type == userScore.number">
              <user-score :cardData="userScore" :scorecardId="cardId.id" />
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
import UserScore from './UserScore'

export default {
  name: 'ScoreList',
  props: ['cardId'],
  components: {
    UserScore
  },
  computed: {
    ...mapState([
      'scoreList'
    ]),
    ...mapGetters([
      'scoreListGetter'
    ])
  },
  data () {
    return {
      twoPutt: 'two-putt',
      threePutt: 'three-putt',
      currentView: '',
      type: '',
    }
  },

  methods: {
    toggleScore: function (event) {
      console.log('before', this.type)
      if (event && this.type != event) {
        this.type = event
        console.log('event', event)
        // this.currentView = 'show'
      } else if (event == this.type) {
        console.log('hi', this.type)
        this.type = ''
      }
    },
    removeType: function() {
      this.type = ''
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
  afterMount: function () {
    console.log('userScores', )
  },
  created: function () {
    console.log('here', this.cardId)
    this.$store.dispatch('LOAD_USER_SCORES', { scorecardId: this.cardId.id })
  }
}
</script>
<style>
  .two-putt {
    color: blue;
  }
  .three-putt {
    color: red;
  }
</style>