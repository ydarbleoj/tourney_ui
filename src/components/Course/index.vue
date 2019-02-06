<template>
  <v-card class="course-card" @click="isPreview ? previewToggle() : null">
    <v-img
      :src="'/static/' + this.course['attributes']['new_course_id'] + 'course.jpg'"
      height='200px'
      class="course-header"
      ref="courseHeader"
    >
      <v-container fill-height pa-0 class=''>
        <v-layout>
          <v-flex xs7 flexbox>
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
          <v-flex class="pa-0 mt-3">
            <div class="text-xs-right">
              <span v-if="!preview" class="text-xs-right mr-3" @click="closeCourse()">
                <v-icon color="white">clear</v-icon>
              </span>
            </div>
            <div style='height:100%;'>
              <v-layout v-if="preview" align-end row style="width:100%;height:inherit;">
                <v-flex xs12 class="text-xs-center white--text">
                  <v-icon color="white" >access_time</v-icon>
                  <h3 class="font-weight-medium">{{ roundGroup }}  -  {{ roundTime }}</h3>
                </v-flex>
              </v-layout>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>
    <v-card-text style="background-color:white;" transition="slide-x-transition" v-if="!preview">
      <stats :roundId="rndId" />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import Stats from './Stats/index'

export default {
  name: 'index',
  props: ['course'],
  components: {
    Stats,
  },

  data () {
    return {
      isPreview: true,
      preview: true,
      show: false,
      rndId: this.course.id,
      roundTime: '',
      roundGroup: ''
    }
  },

  computed: {
    ...mapState(['userTeeTimes'])
  },

  methods: {
    previewToggle () {
      this.preview = !this.preview
    },
    closeCourse () {
      this.preview = !this.preview
    },
    filterTeeTime (rndNum, list) {
      let n = list.filter(el => el.attributes.round_number === rndNum)
      if (n === undefined || !n.length) return '';
      console.log('nnn', n)
      return n[0].attributes
    }

  },

  watch: {
    course: function () {
      this.$store.dispatch('course/LOAD_COURSE', { tourn_id: this.currentTournament.id, id: this.currentRound.course_id, roundNumber: this.currentRound.round_id })
    },
    preview () {
      this.isPreview = !this.isPreview
      this.$el.classList.toggle('open')
    }
  },

  created: function () {
    let rndNum = this.course['attributes']['round_number']
    let times = this.userTeeTimes
    let t = this.filterTeeTime(rndNum, times)
    console.log('hitting here', t)
    if (t === undefined || !t.length) return false;
    this.roundTime = t.tee_time
    this.roundGroup = 'Group ' + t.group
  }

}
</script>
<style>
.hide {
  display: none;
}
.course-card {
  position: relative;
  border-radius: 20px;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 0.2s ease, box-shadow 0.2s ease;
  background-color: #FBFCFD;
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
