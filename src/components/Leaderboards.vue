<template>
  <v-flex xs12 sm12 lg6>
    <v-card flat color="transparent" class="grey--text">
      <v-card-title primary-title>
        <h5>Leaderboards</h5>
      </v-card-title >
      <p class="hidden-lg-only">{{ current }}</p>
      <v-container fluid>
        <v-layout>
          <v-flex xs12>
            <v-card>
              <v-card-title :class="currentView">
                <h5>{{ currentView.split('-')[0].toUpperCase() }}</h5>
                <v-spacer></v-spacer>
                purse $360
              </v-card-title>
              <component :is='currentView'></component>
              <v-card-actions class="white">
                <v-spacer></v-spacer>
                <v-btn flat color="light-blue lighten-1" :class="currentView" value="stroke" @click="currentView='stroke-leaderboard'">
                  <span>Stroke</span>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn flat :class="currentView" value="putting" @click="currentView='putting-leaderboard'">
                  <span>Putting</span>
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
import StrokeLeaderboard from '../components/StrokeLeaderboard'
import PuttingLeaderboard from '../components/PuttingLeaderboard'
import { mapState } from 'vuex'

export default {
  name: 'Leaderboards',
  props: ['current'],
  components: {
    StrokeLeaderboard,
    PuttingLeaderboard
  },

  data () {
    return {
      el: 'stroke',
      currentView: 'stroke-leaderboard',

    }
  },

  computed: {
    ...mapState(['currentTournament'])
  },

  beforeUpdate (current) {
    this.$store.dispatch('LOAD_STROKE_LEADERBOARD', { id: this.current.id })
    this.$store.dispatch('LOAD_PUTTING_LEADERBOARD', { id: this.current.id })
  },

  mounted: function (current) {
    this.$store.dispatch('LOAD_STROKE_LEADERBOARD', { id: this.current.id })
    this.$store.dispatch('LOAD_PUTTING_LEADERBOARD', { id: this.current.id })
  }
}
</script>
<style>
.putting-leaderboard {
  background-color: #ffa726;
}
.stroke-leaderboard {
  background-color: #29b6f6;
}
</style>
