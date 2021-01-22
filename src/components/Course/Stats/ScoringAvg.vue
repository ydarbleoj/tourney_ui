<template>
  <v-card flat v-if="loading" class="white" color="white">
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
                    <h4 class="text-xs-left mt-1 mb-2 font-weight-regular ">Scoring Avg</h4>
                    <label class="score-label mr-2" v-bind:class="{ record : isNet }" @click="isNet = true">NET </label>
                    <label class="score-label ml-2" v-bind:class="{ record : !isNet }" @click="isNet = false">GROSS</label>
                  </v-flex>
                  <v-flex xs12>
                    <h1 class="font-weight-regular" style="color:#9FB8CE">{{ this.personalBest }}</h1>
                    <h4 class=" mb-3 font-weight-regular">Personal</h4>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs6>
                <v-layout row wrap align-center justify-center fill-height>
                  <v-flex xs12>
                    <h2 class="ma-0 font-weight-regular" style="color: #FFCB47;">{{ this.yearsField }}</h2>
                    <h4 class=" font-weight-regular">This Year's Field</h4>
                  </v-flex>
                  <v-flex xs12>
                    <h2 class="font-weight-regular ma-0" style="color:#A8C256">{{ this.courseOverall }}</h2>
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
  name: 'ScoringAvg',
  data () {
    return {
      isNet: true,
      loading: true,
      userData: {},
      courseData: {},
      overallData: {},
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
    toggleFields () {
      let overall = this.overallData
      let course  = this.courseData
      let net     = this.isNet
      this.yearsField = net ? overall['net_avg'] : overall['gross_avg']
      this.courseOverall = net ? course['net_avg'] : course['gross_avg']
      this.personalBest = net ? this.userCourseStats.net_avg : this.userCourseStats.gross_avg
    },
  },
  watch: {
    isNet () {
      this.toggleFields()
      this.$el.classList.toggle('record')
    }
  },

  mounted: function () {
    let data = this.courseStats.included
    console.log('data', data)
    this.overallData = Object.assign(this.filterType(data, 'round_agg'))
    this.courseData = Object.assign(this.filterType(data, 'course_agg'))
    this.loading = false
    this.toggleFields()
  }
}
</script>
<style>
.scoring--stats {
  transition: opacity 1s ease, box-shadow 1s ease;
}

score-label.record {
  color: #F8C977;
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

