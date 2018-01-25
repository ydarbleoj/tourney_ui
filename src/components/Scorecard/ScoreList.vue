<template>
  <v-flex xs12 sm12>
    <v-list three-line class="on_expand">
      <template v-for="userScore in scoreListGetter">
        <v-card class="score-display" ref="scoreDisplay">
          <v-list-tile v-bind:key="userScore.number"  @click.native="toggleScore(userScore.number)" >
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
            <v-card-text class="pa-0" v-if="type == userScore.number" >
              <user-score :cardData="userScore" :scorecardId="cardId.id" @event="removeType" />
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
      thisComponent: ''
    }
  },

  methods: {
    toggleScore: function (num) {
      this.thisComponent = this.$refs.scoreDisplay[num - 1]

      if (num && this.type == '') {
        this.type = num
        this.$refs.scoreDisplay[num - 1].$el.classList.toggle('center-div')
      console.log('before', [num, this.type] )
      } else if (num == this.type) {
        this.type = ''
        this.$refs.scoreDisplay[num - 1].$el.classList.toggle('center-div')
      }
    },
    removeType: function() {
      this.type = ''
      this.thisComponent.$el.classList.toggle('center-div')
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
    console.log('here', this.cardId)
    this.$store.dispatch('LOAD_USER_SCORES', { scorecardId: this.cardId.id })
  },
  events: {
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
  .on_expand {
    padding-top: 130px;
  }
  .center-div {
    position: fixed;
    z-index: 1000;
    top: 130px; left: 0; bottom: 0; right: 0;
    transition: all 3s ease-out;
  }

</style>