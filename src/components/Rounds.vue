<template>
  <v-flex xs12 sm12 lg6>
    <v-card flat color="transparent" class="grey--text">
      <v-card-title primary-title>
        <p class="hidden-xs-only">{{ current }}</p>
        <h3>Round Info</h3>
      </v-card-title >
      <v-container fluid grid-list-lg pt-0 class="transparent">
        <v-layout row wrap>
          <v-flex lg12>
            <course :current="currentRound" />
          </v-flex>
          <v-flex xs12>
            TEE TIMES
            <tee-time :current="currentRound" />

          </v-flex>
        </v-layout>
      </v-container>
      <v-card-actions class="trans">
        <v-spacer></v-spacer>
        <v-btn flat color="light-blue lighten-1" :class="" value="rnd1" @click="updateRound(1)">
          <span>Rnd 1</span>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn flat :class="" value="rnd2" @click="updateRound(2)">
          <span>Rnd 2</span>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn flat :class="" value="rnd3" @click="updateRound(3)">
          <span>Rnd 3</span>
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
import Course from '../components/Course/index'
import TeeTime from '../components/TeeTime'
import { mapState } from 'vuex'

export default {
  name: 'Rounds',
  props: ['current'],
  components: {
    Course,
    TeeTime
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
    }
  },

  watch: {
    current: function () {
      this.$store.dispatch('UPDATE_CURRENT_ROUND', this.current.rounds[0])
    }
  },

  mounted: function (current) {
  }
}
</script>


