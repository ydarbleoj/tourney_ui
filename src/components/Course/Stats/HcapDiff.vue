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
              <v-flex xs12>
                <v-layout row wrap>
                  <v-flex xs7 class="mb-2">
                    <h2 class="text-xs-left mt-1 mb-2 font-weight-regular">Hcap Differential</h2>
                  </v-flex>
                  <v-flex xs5>
                    <h1 class="font-weight-regular" style="color:#9FB8CE">{{ this.personalBest }}</h1>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12>
                <v-layout row wrap align-center justify-center fill-height>
                  <v-flex xs12>
                    <h2 class="ma-0 font-weight-regular" style="color: #FFCB47;">{{ this.yearsField }}</h2>
                    <h4 class=" font-weight-regular">This Year's Field</h4>
                  </v-flex>
                  <v-flex xs12>
                    <h2 class="font-weight-regular ma-0" style="color:#A8C256">{{ this.courseOverall }}</h2>
                    <h4 class="font-weight-regular">Overall </h4>
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
  name: 'HcapDiff',
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
      this.yearsField = round['hcap_diff']
      this.courseOverall = course['hcap_diff']
      this.personalBest = this.userCourseStats.hcap_diff
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

