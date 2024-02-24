<template>
  <v-container class="pa-0">
    <v-row align="center" style="background-color:#999;opacity:0.6">
      <v-col cols="6" class="text-center text--black">
        <h2 class="pl-3 font-weight-regular">
          {{ name }}
          <span
            class="text-center"
            style="color:#F8C977;font-size:24px;height:24px;"
          >
            {{ strokes(handicap) }}
          </span>
        </h2>
      </v-col>
      <v-col class="text-right" v-if="newScore">
        <h1 style="font-size:36px;">
          {{ gross }}
        </h1>
      </v-col>
      <v-col :style="{color: puttColor(putts)}">
        <h3>
          {{ putts }} pts
        </h3>
      </v-col>
    </v-row>
    <transition name="fade">
      <user-score
        :cardData="holeInfo()"
        :scorecardId="card.id"
        @onUpdate="updateHoles"
      />
    </transition>
  </v-container>
</template>

<script>
import UserScore from './UserScore.vue'

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
      let hcap =  19//this.card.handicap

      if (hcap < 19 && hcap >= holeHcap) return '*';
      if (hcap > 19) {
        let newHcap = hcap - 18
        return newHcap >= holeHcap ? '* *' : '*'
      }
    },
    puttColor: function (putts) {
      return putts > 2 ? '#F79256' : ''
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
</style>
