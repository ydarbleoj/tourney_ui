<template>
  <v-card class="course-card">
    <v-img
      :src="'/static/' + this.currentRound['attributes']['new_course_id'] + 'course.jpg'"
      height='300px'
      class="course-header"
    >
      <v-container fill-height pa-0>
        <v-row>
          <v-flex xs12>
            <v-btn
              class="ma-2 back-button"
              small
              fab
              color="transparent"
            >
              <span color="white">
              go
              </span>
            </v-btn>
            <!-- <h3 class="headline text-center white--text">{{ this.currentRound['attributes']['name'] }}</h3>
            <span class="white--text mt-5">Round {{ this.currentRound['attributes']['round_number'] }} </span> -->

          </v-flex>
        </v-row>
        <!-- <v-layout row>
          <v-flex xs12>
            <div class="white--text">
              {{ this.currentRound['attributes']['tee'] }} -
              {{ this.currentRound['attributes']['rating'] }} /
              {{ this.currentRound['attributes']['slope'] }}
            </div>
            <div class="white--text">
              par: {{ this.currentRound['attributes']['par'] }}
            </div>

          </v-flex>
        </v-layout> -->
      </v-container>
    </v-img>
    <v-card-text style="background-color:white;" transition="fade-transition">
      <stats
        :roundId="this.currentRound['attributes']['round_number']"
      />
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
    Stats
  },

  data () {
    return {
      show: false,
      roundTime: '',
      roundGroup: ''
    }
  },

  computed: {
    ...mapState(['userTeeTimes', 'currentRound'])
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
  }
}
</script>
<style>
.course-card {
  transition: opacity 0.2s ease, box-shadow 0.2s ease;
}
.back-button {
  border-color: white;
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
