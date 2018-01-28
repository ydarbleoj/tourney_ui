<template>
  <v-card class="elevation-20">
    <v-card-media
      :src="'/static/' + this.currentRound.course_id + 'course.jpg'"
      height='200px'
    >
      <v-container fill-height fluid pa-0 class='round-container'>
        <v-layout>
          <v-flex xs8 flexbox>
            <div class="headline white--text mt-5">Round {{ this.currentRound.round_number }} </div>
            <span class="headline white--text">{{ this.currentCourse['name'] }}</span>
            <div class="white--text">
              {{ this.currentCourse.tee }} -
              {{ this.currentCourse.rating }} /
              {{ this.currentCourse.slope }}
            </div>
            <div class="white--text">
              par: {{ this.currentCourse.par }}
            </div>
          </v-flex>
          <v-flex xs4 class="tee-time-container pa-0">
            <tee-time :current="teeTime" />
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
import { mapState } from 'vuex'
import Stats from './Stats'
import TeeTime from './TeeTime'

export default {
  name: 'index',
  props: ['current'],
  components: {
    Stats,
    TeeTime
  },

  data () {
    return {
      show: false
    }
  },

  computed: {
    ...mapState(['currentRound', 'currentTournament', 'currentCourse', 'teeTime'])
  },

  watch: {
    current: function () {

      this.$store.dispatch('LOAD_COURSE', { tourn_id: this.currentTournament.id, id: this.currentRound.course_id, roundNumber: this.currentRound.round_id })
    }
  },

  created: function (current) {
    console.log('course created', this.currentCourse)
    this.$store.dispatch('LOAD_COURSE', { tourn_id: this.currentTournament.id, id: this.currentRound.course_id, roundNumber: this.currentRound.round_id })

  }
}
</script>
<style>
div.flex.tee-time-container {
  /*background-color: rgba(153, 153, 153, .4);*/
  background-color: rgba(98, 188, 250, .4);
}
.card, .tee-times {
  background-color: rgba(255, 255, 255, 0.1);
}
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
