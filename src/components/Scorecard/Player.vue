<template>
  <v-card flat>
    <v-layout row class="pl-2 pt-2 pb-2" fill-height align-center @click="updateDisplayScore">
      <v-flex xs8 class="text-xs-left  text--black">
        <h2 class="pl-2 font-weight-regular">
          {{ name }}
          <span
            class="text-xs-center pa-0"
            style="color:#F8C977;font-size:24px;height:24px;"
          >
            {{ strokes(handicap) }}
          </span>
        </h2>
      </v-flex>
      <v-flex xs3 class="text-xs-right pr-2" v-if="newScore">
        <v-layout row align-center>
          <v-flex>
            <h1 style="font-size:36px;">
              {{ gross }}
            </h1>
          </v-flex>
          <v-flex xs1
            class="pb-4 pl-1"
            v-bind:style="{color: puttColor(putts)}"
          >
            <h3>
              {{ putts }}
            </h3>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs1 v-if="newScore" class="pt-1 pb-1">
        <v-layout column align-center>
          <v-flex xs12>
            {{ net }}
          </v-flex>
          <v-flex xs12>
            {{ net - gross }}
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs3 v-else>
        <span><v-icon>arrow_forward</v-icon></span>
      </v-flex>
    </v-layout>
    <v-card-text
      class="pa-0"
      v-if="displayScore"
    >
      <transition
      name="fade"
      >
        <user-score
          :cardData="holeInfo()"
          :scorecardId="card.id"
          @onUpdate="updateHoles"
        />
      </transition>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import UserScore from './UserScore'

export default {
  name: "Player",
  props: ['card', 'holeNumber'],

  components: {
    UserScore
  },

  data () {
    return {
      name: "Joel Brady",
      gross: 4,
      net: 3,
      putts: 2,
      newScore: true,
      handicap: null,
      displayScore: false
    }
  },

  methods: {
    playerName () {
      return this.card.player_name
    },
    holeInfo () {
      return this.card.holes.filter(hole => this.holeNumber == hole.number)[0]
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
    updateDisplayScore () {
      this.displayScore = !this.displayScore
    },
    updateHoles () {
      let hole = this.holeInfo()
      if (hole === undefined) return;

      this.gross = hole.score
      this.net   = hole.net
      this.putts = hole.putts
      this.updateDisplayScore()
    }
  },

  created () {
    let hole = this.holeInfo()
    if (hole === undefined) return;

    this.name  = this.playerName()
    this.gross = hole.score
    this.net   = hole.net
    this.putts = hole.putts
    this.handicap = hole.handicap
  }
}
</script>
<style scoped>
.overlay {
}
</style>
