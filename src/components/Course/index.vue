<template>
  <v-card class="elevation-20">
    <v-card-media
      :src="'/static/' + this.currentRound.course_id + 'course.jpg'"
      height='200px'
    >
    <v-container fill-height fluid>
      <v-layout fill-height>
        <v-flex xs12 flexbox>
          <span class="headline white--text">{{ this.currentCourse[0]['course']['name'] }}</span>
          <div>
            <div class="subheading white--text">Round {{ this.currentRound.round_number }} </div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
    </v-card-media>
    <v-card-actions class='grey darken-3'>
      <v-btn flat color='white' @click.native="show = !show">
        <span>STATS</span>
        <v-icon>{{ !show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn flat color="white" @click="" :to="{name: 'Scorecard', params: {tournId: this.currentTournament.id, scorecardId: this.currentCourse[0]['scorecard_id'][0], currentCourse: currentCourse[0]['course'] }}">Scorecard</v-btn>
    </v-card-actions>
    <transition
     class='transistions-course'
     name='slide-fade'
    >
      <stats :current='currentCourse' v-show="show" />
    </transition>
  </v-card>
</template>

<script>
import Stats from './Stats'
import { mapState } from 'vuex'

export default {
  name: 'index',
  props: ['current', 'currentCourse'],
  components: {
    Stats
  },

  data () {
    return {
      show: false
    }
  },

  computed: {
    ...mapState(['currentRound', 'currentTournament', 'currentCourse'])
  },

  watch: {
    current: function () {
    console.log('course', this.currentCourse[0])
      this.$store.dispatch('LOAD_COURSE', { tourn_id: this.currentTournament.id, id: this.currentRound.course_id, roundNumber: this.currentRound.id })
    }
  },

  created: function (current) {
    this.$store.dispatch('LOAD_COURSE', { tourn_id: this.currentTournament.id, id: this.currentRound.course_id, roundNumber: this.currentRound.id })
  }
}
</script>
<style>
.slide-fade-enter-active {
  transition: all .8s ease;
}
.slide-fade-leave-active {
  transition: all .3s ease;
  opacity: 0;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(20px);
  opacity: 0;
}
</style>
