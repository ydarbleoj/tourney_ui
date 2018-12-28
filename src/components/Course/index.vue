<template>
  <v-card class="course-card" @click="isPreview = !isPreview; previewToggle();">
    <v-img
      :src="'/static/' + this.course['attributes']['new_course_id'] + 'course.jpg'"
      height='200px'
      class="course-header"
      ref="courseHeader"
    >
      <v-container fill-height pa-0 class=''>
        <v-layout>
          <v-flex xs8 flexbox>
            <div class="headline white--text mt-5">Round {{ this.course['attributes']['round_number'] }} </div>
            <span class="headline white--text">{{ this.course['attributes']['name'] }}</span>
            <div class="white--text">
              {{ this.course['attributes']['tee'] }} -
              {{ this.course['attributes']['rating'] }} /
              {{ this.course['attributes']['slope'] }}
            </div>
            <div class="white--text">
              par: {{ this.course['attributes']['par'] }}
            </div>
          </v-flex>
          <v-flex xs4 class="tee-time-container pa-0">
            <tee-time :current="teeTime" v-if="teeTime.length > 0" />
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>
    <v-card-text v-if="!isPreview" class="grey lighten-5" style="margin-top: 200px;padding:0;height:100%;" transition="slide-x-transition" >
      <stats :roundId="rndId" />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import Stats from './Stats'
import TeeTime from './TeeTime'
import Admin from './TeeTimes/Admin'

export default {
  name: 'index',
  props: ['course'],
  components: {
    Stats,
    TeeTime,
    Admin
  },

  data () {
    return {
      isPreview: true,
      show: false,
      showTime: false,
      rndId: this.course.id
    }
  },

  computed: {
    ...mapState(['currentRound', 'currentTournament', 'currentCourse', 'teeTime'])
  },

  methods: {
    previewToggle () {
      this.$emit('event')
      console.log('refs', this.$refs.courseHeader)
      this.$parent.$el.style.margin = this.isPreview ? '0 auto' : '0';
      this.$parent.$el.style.paddingTop = this.isPreview ? '20px' : '0';
      this.$parent.$el.style.width = this.isPreview ? '90%' : '100%';
      this.$el.classList.toggle('open')
      // this.$refs.courseHeader.$el.style.position = this.isPreview ? 'relative' : 'fixed'
      // this.$refs.courseHeader.$el.style.zIndex = this.isPreview ? '' : 'fixed'
    },
    // toggleTeeTimes: function() {
    //   console.log('clicked', this.showTime === false)
    //   if (this.showTime === false) {
    //     this.$store.dispatch('LOAD_ADMIN_TEE_TIME', { tourn_id: this.currentTournament.id, roundNumber: this.current.round_number })
    //     this.showTime = true
    //   } else if (this.showTime === true){
    //     this.showTime = false
    //   }
    // }
  },

  watch: {
    course: function () {
      this.$store.dispatch('LOAD_COURSE', { tourn_id: this.currentTournament.id, id: this.currentRound.course_id, roundNumber: this.currentRound.round_id })
    }
  },

  created: function (current) {
    // console.log('course created', this.currentCourse)
    // this.$store.dispatch('LOAD_COURSE', { tourn_id: this.currentTournament.id, id: this.currentRound.course_id, roundNumber: this.currentRound.round_id })
    console.log('tcourse', this.course)
  }
}
</script>
<style>
.course-card {
  position: relative;
  border-radius: 20px;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 0.2s ease, box-shadow 0.2s ease;
  z-index: 1;
}
.course-card.open {
  width: 100%;
  position: absolute;
  border-radius: 0;
  top: 0;
  left: 0;
  z-index: 1000 !important;
  transition: opacity 0.2s ease, box-shadow 0.2s ease;

}
.course-header {
  z-index: 1;
  position: relative;
}
.course-card.open .course-header {
  z-index: 1000;
  position: fixed;
  width: inherit;
}
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
