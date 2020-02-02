<template>
  <v-card flat v-if="loading" class="white " color="white">
    loading...
  </v-card>
  <v-card flat v-else style="margin:auto">
    <v-container fluid pa-0 class="font-weight-regular mt-2 mb-2" style="height:inherit;">
      <v-layout row wrap align-center>
        <v-flex xs12>
          <v-card flat>
            <v-layout>
              <v-flex xs>
                <v-layout row wrap>
                  <v-flex xs12 class="">
                    <h4 class="text-xs-left mt-2 mb-2 font-weight-regular ">Par {{ this.pars }} Avgs</h4>
                  </v-flex>
                  <v-flex xs4 class="">
                    <h2 class="text-xs-center font-weight-regular" style="color:#9FB8CE">{{ this.personalBest }}</h2>
                    <h4 class="font-weight-regular text-xs-center">Personal</h4>
                  </v-flex>
                  <v-flex xs4 class="">
                    <h2 class="text-xs-center font-weight-regular" style="color: #FFCB47;">{{ this.yearsField }}</h2>
                    <h4 class="text-xs-center font-weight-regular">This Years Field</h4>
                  </v-flex>
                  <v-flex xs4 class="">
                    <h2 class="text-xs-center font-weight-regular" style="color:#A8C256">{{ this.courseOverall }}</h2>
                    <h4 class="text-xs-center font-weight-regular">Overall</h4>
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
import Bars from 'vuebars'

export default {
  name: 'ParAvgs',
  props: ['pars'],
  components: {
    Bars
  },

  data () {
    return {
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
    loadFields () {
      let overall = this.overallData
      let course  = this.courseData
      this.yearsField = overall['par' + this.pars + '_avg']
      this.courseOverall = course['par' + this.pars + '_avg']
      this.personalBest = this.userCourseStats['par' + this.pars + '_avg']
    },
  },

  mounted: function () {
    let data = this.courseStats.included
    this.overallData = Object.assign(this.filterType(data, 'round_agg'))
    this.courseData = Object.assign(this.filterType(data, 'course_agg'))
    this.loading = false
    this.loadFields()
    console.log('pars', this.pars + '_avg')
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
