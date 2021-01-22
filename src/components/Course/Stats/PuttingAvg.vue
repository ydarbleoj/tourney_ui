<template>
  <v-card v-if="loading" class="white elevation-1" color="white">
    loading...
  </v-card>
  <v-card flat v-else>
    <v-container
      fluid
      class="font-weight-regular pa-4"
     >
      <v-layout row wrap align-center>
        <v-flex xs12>
          <v-card flat class="white">
            <v-layout>
              <v-flex xs6>
                <v-layout row wrap>
                  <v-flex xs12 class="mb-2">
                    <h4 class="text-xs-left mt-2 mb-2 font-weight-regular ">Putting Avg</h4>
                  </v-flex>
                  <v-flex xs12 >
                    <h1 class="font-weight-regular" style="color:#9FB8CE">{{ this.personalBest.putts_avg }}</h1>
                    <h4 class="font-weight-regular" style="color:#333;font-size:14px;">({{ this.personalBest.three_putts_avg }} <span class="font-weight-regular" style="font-size:12px;color:#F79256">3p</span>)</h4>
                    <h4 class=" mb-3 font-weight-regular">Personal</h4>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs6>
                <v-layout row wrap align-center justify-center fill-height>
                  <v-flex xs12>
                    <h2 class="ma-0 font-weight-regular" style="color: #FFCB47;">{{ this.yearsField.putts_avg }}
                     <span class="font-weight-regular" style="color:#333;font-size:14px;">({{ this.yearsField.three_putts_avg }} <span class="font-weight-regular" style="font-size:12px;color:#F79256">3p</span>)</span>
                    </h2>
                    <h4 class=" font-weight-regular">This Year's Field</h4>
                  </v-flex>
                  <v-flex xs12>
                    <h2 class="font-weight-regular ma-0" style="color:#A8C256">{{ this.courseOverall.putts_avg }}
                    <span class="font-weight-regular" style="color:#333;font-size:14px;">({{ this.courseOverall.three_putts_avg }} <span class="font-weight-regular" style="font-size:12px;color:#F79256">3p</span>)</span>

                    </h2>
                    <h4 class=" font-weight-regular">Overall </h4>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card>
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
      loading: true,
      userData: {},
      courseData: {},
      roundData: {},
      personalBest: '',
      yearsField: '',
      courseOverall: '',
    }
  },

  computed: {
     ...mapState({
      courseStats: state => state.course.courseStats,
      userCourseStats: state => state.course.userCourseStats
    })
  },

  methods: {
    filterType (data, type) {
      let d = data.filter(el => el['type'] === type);
      if (d === undefined || !d.length) return {};
      return d[0]['attributes']
    },
    loadFields () {
      let round = this.roundData
      let course  = this.courseData
      let net     = this.isNet
      this.yearsField = round
      this.courseOverall = course
      this.personalBest = this.userCourseStats
    },
  },

  mounted: function () {
    let data = this.courseStats.included
    this.roundData = Object.assign(this.filterType(data, 'round_agg'))
    this.courseData = Object.assign(this.filterType(data, 'course_agg'))
    this.loading = false
    this.loadFields()
  }
}
</script>
<style>
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
</style>
