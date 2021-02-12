<template>
  <v-card class="course-card" @click="coursePage">
    <v-img
      :src="'/static/' + this.course['attributes']['new_course_id'] + 'course.jpg'"
      height='200px'
      class="course-header"
    >
      <v-container fill-height pa-0 class=''>
        <v-layout>
          <v-flex xs6 class="pa-0">
            <div style='height:100%;'>
              <v-layout align-end row style="width:100%;height:inherit;">
                <v-flex xs12 class="text-xs-center white--text ma-2">
                  <h4>
                    <v-icon color="white" >access_time</v-icon>
                    <span class="font-weight-normal">
                      {{ roundTime }}
                    </span>
                  </h4>
                  <h2 class="white--text font-weight-regular">
                    {{ courseName }}
                  </h2>
                </v-flex>
              </v-layout>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>
  </v-card>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'Button',
  props: ['course'],
  data () {
    return {
      rndId: this.course.id,
      roundTime: '',
      courseName: ''
    }
  },
  computed: {
    ...mapState({
      userTeeTimes: state => state.userTeeTimes,
      currentRound: state => state.currentRound,
      currentTournament: state => state.tournament.currentTournament
    })
  },
  methods: {
    filterTeeTime (rndNum, list) {
      let n = list.filter(el => el.attributes.round_number === rndNum)
      if (n === undefined || !n.length) return '';

      return n[0].attributes
    },
    coursePage () {
      this.$router.push(
        {
          name: 'Course',
          params: {
            id: this.currentTournament.id,
            course_id: this.course['attributes']['new_course_id']
          }
        }
      )
    }
  },
  watch: {

  },

  created: function () {
    let course = this.course['attributes']
    let rndNum = course['round_number']
    let times = this.userTeeTimes
    console.log('times', times)
    let t = this.filterTeeTime(rndNum, times)

    if (t === undefined) return false;

    this.courseName = course['name']
    this.roundTime = t.tee_time
  }
}
</script>
<style scoped>
.course-card {
  position: relative;
  border-radius: 20px;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  background-color: #FBFCFD;
  z-index: 1;
}
</style>
