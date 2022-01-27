<template>
  <v-card flat>
    <v-container
      fluid
      class="font-weight-regular pa-4"
     >
      <v-layout row wrap justify-center
        class="text-xs-center pt-2 pb-4"
      >
        <v-flex xs12 class="text-xs-left ml-2 mb-2">
          <h2 class="text pl-2 mb-2 font-weight-regular">
            Putting Averages
          </h2>
        </v-flex>
        <v-flex xs4 v-if="personalBest">
          <h1 class="font-weight-regular">
            {{ personalBest.putts_avg }}
          </h1>
          <h3 class="font-weight-medium" style="color:#666">Personal</h3>
        </v-flex>
         <v-flex xs4>
          <h1 class="font-weight-regular">
            {{ yearsField.putts_avg }}
          </h1>
          <h3 class="font-weight-medium" style="color:#666">This Week</h3>
        </v-flex>
         <v-flex xs4>
          <h1 class="font-weight-regular">
            {{ courseOverall.putts_avg }}
          </h1>
          <h3 class="font-weight-medium" style="color:#666">Historically</h3>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-center
        class="text-xs-center pt-2 pb-4 mb-5 border-card"
      >
        <v-flex xs12 class="text-xs-left ml-2 mb-2">
          <h2 class="text pl-2 mb-2 font-weight-regular">
            Three Putts
          </h2>
        </v-flex>
        <v-flex xs4 v-if="personalBest">
          <h1 class="font-weight-regular" style="color:#A8C256;">
            {{ personalBest.three_putts_avg }}
          </h1>
          <h3 class="font-weight-medium" style="color:#666">Personal</h3>
        </v-flex>
         <v-flex xs4>
          <h1 class="font-weight-regular" style="color:#F79256;">
            {{ yearsField.three_putts_avg }}
          </h1>
          <h3 class="font-weight-medium" style="color:#666">This Week</h3>
        </v-flex>
         <v-flex xs4>
          <h1 class="font-weight-regular" style="color:#9FB8CE;">
            {{ courseOverall.three_putts_avg }}
          </h1>
          <h3 class="font-weight-medium" style="color:#666">Historically</h3>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PuttingAvg',
  data () {
    return {
      isNet: true,
      personalBest: null,
      yearsField: '',
      courseOverall: '',
    }
  },

  computed: {
    ...mapState({
      courseStats: state => state.course.courseStats,
      roundStats: state => state.course.roundStats,
      userCourseStats: state => state.course.userCourseStats
    })
  },

  methods: {},

  mounted () {
    console.log("slakjfd", this.userCourseStats.length == undefined)
    this.yearsField = this.roundStats
    this.courseOverall = this.courseStats
    this.personalBest = this.userCourseStats.length == undefined ? null : this.userCourseStats
  }
}
</script>
<style scoped>
.scoring--stats {
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 1s ease, box-shadow 1s ease;
}

score-label.record {
  color: #6CADED;
}
.pers-record {
  color: #ED6C6C;
}
.personal {
  color: #999;
  font-size: 18px;
}
p.hide {
  display: none;
}

.name-list {
  color: #9ad3de;
}

.border-card {
	border-radius: 20px;
  border: 2px solid #999;
  transition: all 0ms cubic-bezier(0.645, 0.045, 0.355, 1);
}
</style>
