<template>
  <v-card v-if="loading" class="white elevation-1" color="white">
    loading...
  </v-card>
  <v-card flat v-else="!loading" style="margin:auto">
    <v-container fluid pa-0 class="font-weight-regular" style="height:inherit;">
      <v-layout row wrap align-center>
        <v-flex xs12>
          <v-card class="white scoring--stats">
            <v-layout>
              <v-flex xs6>
                <v-layout row wrap>
                  <v-flex xs12 class="mb-2">
                    <h2 class="text-xs-center mt-1 mb-2 font-weight-regular ">Lowest Scoring</h2>
                  </v-flex>
                  <v-flex xs12>
                    <h1 class="record font-weight-regular">{{ this.personalBest }}</h1>
                    <h4 class="grey--text mb-3">Personal</h4>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs6>
                <v-layout row wrap align-center justify-center fill-height>
                  <v-flex xs12>
                    <h2 class="record ma-0 font-weight-regular" >{{ this.yearsField }}</h2>
                    <h4 class="grey--text">This Year's Field</h4>
                  </v-flex>
                  <v-flex xs12>
                    <h2 class="record font-weight-regular ma-0">{{ this.courseOverall }}</h2>
                    <h4 class="grey--text">Overall </h4>
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
      overallData: {},
      personalBest: '',
      yearsField: '',
      courseOverall: '',
    }
  },

  computed: {
    ...mapState(['courseStats'])
  },

  methods: {
    filterType (data, type) {
      let d = data.filter(el => el['type'] === type);
      return d[0]['attributes']
    },
    loadFields () {
      let overall = this.overallData
      let course  = this.courseData
      let net     = this.isNet
      this.yearsField = overall['net_lowest']
      this.courseOverall = course['lowest_round']
      this.personalBest = 78
    },
  },

  mounted: function () {
    let data = this.courseStats.included
    this.overallData = Object.assign(this.filterType(data, 'round_agg'))
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
