<template>
  <v-flex xs12 sm12 lg12>
    <v-card flat color="transparent" class="grey--text round-container" ref="roundCardContainer">
      <v-card-title primary-title>
        <h3>Round Info</h3>
      </v-card-title >
      <v-container fluid pt-0 class="transparent">
        <v-layout row wrap>
          <v-flex lg12>
            <course :current="currentRound" />
          </v-flex>
        </v-layout>
        <v-layout row >
          <v-flex lg12>
            <h4 class="text-xs-left mb-0 mt-1">Scorecard</h4>
            <scorecard :current="currentRound" v-if="currentRound.scorecard_id != null"/>
          </v-flex>
        </v-layout>
      </v-container>
      <v-card-actions class="trans">
        <v-spacer></v-spacer>
        <v-btn flat class="grey--text no-back ma-0 " value="rnd1" @click="updateRound(1)">
          <span>Rnd 1</span>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn flat class="grey--text no-back ma-0" value="rnd2" @click="updateRound(2)">
          <span>Rnd 2</span>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn flat class="grey--text no-back ma-0" value="rnd3" @click="updateRound(3)">
          <span>Rnd 3</span>
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
import Course from '../components/Course/index'
import Scorecard from '../components/Scorecard/index'
import TeeTime from '../components/Course/TeeTime'
import { mapState } from 'vuex'

export default {
  name: 'Rounds',
  props: ['current'],
  components: {
    Course,
    TeeTime,
    Scorecard
  },

  data () {
    return {
      roundValue: 1,
      currentCourse: 'current',

    }
  },

  computed: {
    ...mapState(['currentTournament', 'rounds', 'currentRound', 'roundOne',
      'roundTwo', 'roundThree', 'teeTime']),
  },

  methods: {
    updateRound: function (rnd) {
      if (rnd === 1) {
        this.$store.dispatch('UPDATE_CURRENT_ROUND', this.roundOne)
      } else if (rnd === 2){
        this.$store.dispatch('UPDATE_CURRENT_ROUND', this.roundTwo)
      } else {
        this.$store.dispatch('UPDATE_CURRENT_ROUND', this.roundThree)
      }
    },
    expandRound: function () {
     this.$refs.roundCardContainer.$el.classList.toggle('expand')
    }
  },

  watch: {
    current: function () {
    console.log('curr this round', this.currentRound.scorecard_id)
      this.$store.dispatch('UPDATE_CURRENT_ROUND', this.current.rounds[0])
    }
  },

  mounted: function (current) {
    this.$store.dispatch('UPDATE_CURRENT_ROUND', this.current.rounds[0])
  }
}
</script>
<style>
.rnd1 {
  color: white;
}
.expand {
  top: 0;
  left: 0;
  padding: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
}

</style>

