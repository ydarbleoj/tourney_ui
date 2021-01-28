<template>
  <v-card class="course-card">
    <v-img
      :src="'/static/' + this.currentRound['attributes']['new_course_id'] + 'course.jpg'"
      height='300px'
      class="course-header"
    >
      <v-container fill-height pa-0>
        <BackButton />
        <v-layout row align-end>
          <v-flex xs12 ma-4>
            <h3 class="headline ml-2 text-right white--text">
              {{ this.currentRound['attributes']['name'] }}
            </h3>
            <h3 class="white--text ml-2 text-center">Round {{ this.currentRound['attributes']['round_number'] }} </h3>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>
    <v-card-text style="background-color:white;" transition="fade-transition">
      <v-card flat class="mb-2 text-right">
        <v-container>
        <v-layout row>
          <v-flex xs6>
            <h2 class="font-weight-regular">Green Tees</h2>
            <h3 class="font-weight-regular pa-2">
              {{ this.currentRound['attributes']['yardage'] }}
              <span class="grey--text font-weight-medium">yards</span>
            </h3>
          </v-flex>
          <v-flex xs6>
            <h2 class="font-weight-regular">
              Par {{ this.currentRound['attributes']['par'] }}
            </h2>
            <h3 class="font-weight-regular pa-2">
              {{ this.currentRound['attributes']['rating'] }} /
              {{ this.currentRound['attributes']['slope'] }}
            </h3>
          </v-flex>
        </v-layout>
        </v-container>
        <h3 class="font-weight-medium pr-2 pl-2 pb-4" style="color:#FFCB47">
          Currently, ranked as the third most difficult.
        </h3>
      </v-card>
      <v-divider class="mb-4" style="background-color:;"></v-divider>
      <stats
        :roundId="this.currentRound['attributes']['round_number']"
        v-if="!isloading"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import Stats from './Stats/index'
import BackButton from '../BackButton'

export default {
  name: 'index',
  props: ['course'],
  components: {
    Stats,
    BackButton
  },

  data () {
    return {
      show: false,
      roundTime: '',
      roundGroup: '',
      isloading: true,

    }
  },

  computed: {
    ...mapState(['userTeeTimes', 'currentRound', 'currentTournament'])
  },

  methods: {
    filterTeeTime (rndNum, list) {
      let n = list.filter(el => el.attributes.round_number === rndNum)
      if (n === undefined || !n.length) return '';

      return n[0].attributes
    }
  },
  watch: {
    course: function () {
      this.$store.dispatch(
        'course/LOAD_COURSE', {
          tourn_id: this.currentTournament.id,
          id: this.currentRound.course_id,
          roundNumber: this.currentRound.round_id
        }
      )
    }
  },

  created: function () {
    let rndNum = this.currentRound['attributes']['round_number']
    let times = this.userTeeTimes
    let t = this.filterTeeTime(rndNum, times)

    if (t === undefined) return false;

    this.roundTime = t.tee_time
    this.roundGroup = 'Group ' + t.group

    this.$store.dispatch(
      'course/LOAD_COURSE', {
        tourn_id: this.currentTournament.id,
        id: this.currentRound.course_id,
        roundNumber: this.currentRound.round_id
      }
    ).then(response => {
      this.isloading = false
    })
  }
}
</script>
<style>
.course-card {
  transition: opacity 0.2s ease, box-shadow 0.2s ease;
}
.back-button {
  border-color: white;
  background-color: transparent;
}
.slide-fade-enter-active {
  /* transition: all .8s ease; */
}
.slide-fade-leave-active {
  /* transition: all .3s ease;
  opacity: 0; */
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  /* transform: translateY(20px);
  opacity: 0; */
}
</style>
