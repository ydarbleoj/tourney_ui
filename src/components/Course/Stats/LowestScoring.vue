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
                    <h4 class="text-xs-left mt-2 mb-2 font-weight-regular ">Best Round</h4>
                  </v-flex>
                  <v-flex xs12>
                    <h1 class="font-weight-regular" style="color:#9FB8CE;font-size: 40px;">{{ this.personalBest ? this.personalBest.total_net : null }}
                      <span style="color: #666;font-size:12px;">{{ this.personalBest ? this.personalBest.year : null }}</span>
                    </h1>
                    <h4 class="font-weight-regular mb-3">Personal</h4>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs6>
                <v-layout row wrap align-center justify-center fill-height>
                  <v-flex xs12>

                    <h4 class="font-weight-regular" style="color: #999;">{{ this.yearsField ? this.yearsField.username : null}}</h4>
                     <h2 class="font-weight-regular" style="color: #FFCB47;">{{ this.yearsField ? this.yearsField.total_net : null }}
                    </h2>
                    <h4 class="font-weight-regular">This Year's Field</h4>
                  </v-flex>
                  <v-flex xs12>
                    <h4 class="font-weight-regular" style="color:#999;">{{ this.courseOverall ? this.courseOverall.username : null }}</h4>
                    <h2 class="font-weight-regular" style="color:#A8C256">{{ this.courseOverall ? this.courseOverall.total_net : null }}
                      <span style="color: #666;font-size:12px;">{{ this.courseOverall ? this.courseOverall.year : null }}</span>
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
      personalBest: '',
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

  created () {
    this.yearsField = this.roundStats.lowest_round
    this.courseOverall = this.courseStats.lowest_round
    this.personalBest = this.userCourseStats.lowest_round
    this.loading = false
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
