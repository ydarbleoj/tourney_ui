<template>
  <v-card flat v-if="loading" class="white" color="white">
    loading...
  </v-card>
  <v-card flat v-else="!loading" style="margin:auto">
    <v-container fluid pa-0 class="font-weight-regular mt-2 mb-2" style="height:inherit;">
      <v-layout row wrap align-center>
        <v-flex xs12>
          <v-card flat class="white">
            <v-layout>
              <v-flex xs6>
                <v-layout row wrap>
                  <v-flex xs12 class="mb-2">
                    <h4 class="text-xs-left mt-2 mb-2 font-weight-regular ">Best Round</h4>
                  </v-flex>
                  <v-flex xs12>
                    <h1 class="personal-score font-weight-regular" style="font-size: 40px;">{{ this.personalBest.total_net }}
                      <span style="color: #666;font-size:12px;">{{ this.personalBest.year }}</span>
                    </h1>
                    <h4 class="font-weight-regular mb-3">Personal</h4>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs6>
                <v-layout row wrap align-center justify-center fill-height>
                  <v-flex xs12>
                    <h4 class="field-score font-weight-regular">{{ this.yearsField.username }}</h4>
                     <h2 class="field-score font-weight-regular">{{ this.yearsField.total_net }}
                    </h2>
                    <h4 class="font-weight-regular">This Year's Field</h4>
                  </v-flex>
                  <v-flex xs12>
                    <h4 class="overall-score font-weight-regular">{{ this.courseOverall.username }}</h4>
                    <h2 class="overall-score font-weight-regular">{{ this.courseOverall.total_net }}
                      <span style="color: #666;font-size:12px;">{{ this.courseOverall.year }}</span>
                    </h2>
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
  name: 'LowestScoring',
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
      return d[0]['attributes']
    },
    loadFields () {
      let overall = this.courseData
      let course  = this.roundData
      this.yearsField = course['lowest_round']
      this.courseOverall = overall['lowest_round']
      this.personalBest = this.userCourseStats.lowest_round
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
