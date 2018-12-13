<template>
  <v-card v-if="loading" class="white elevation-1" color="white">
    loading...
  </v-card>
  <v-card flat v-else="!loading" style="width: 95%;margin:auto">
    <v-container fluid pa-0 class="font-weight-regular" style="height:inherit;">
      <v-layout row wrap>
        <v-flex xs12>
          <v-card class="elevation-1 white scoring--stats">
            <v-layout>
              <v-flex xs6>
                <div class="mb-3">
                  <h2 class="text-xs-left ml-1 mt-1 font-weight-regular ">Scoring Avgs</h2>
                  <label class="score-label record">NET</label>
                  <label class='score-label grey--text'>GROSS</label>
                </div>
                <v-layout row wrap>
                  <v-flex xs5>
                    <h1 class="record font-weight-regular ma-0">78.2</h1>
                    <h4 class="grey--text mb-3">Personal</h4>
                  </v-flex>
                  <v-flex xs2>
                    <h1 class="grey--text">/</h1>
                  </v-flex>
                  <v-flex xs5>
                    <h1 class="grey--text ma-0 font-weight-regular" >87.3</h1>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs6>
                <v-layout row wrap align-center justify-center row fill-height>
                  <v-flex xs12>
                    <h4 class="grey--text mb-3">This Year</h4>
                  </v-flex>
                  <v-flex xs3>
                    <h3 class="record font-weight-regular ma-0">{{ this.courseData['net_avg']}}</h3>
                  </v-flex>
                  <v-flex xs2>
                    <h3 class="grey--text">-</h3>
                  </v-flex>
                  <v-flex xs3>
                    <h4 class="grey--text ma-0 font-weight-regular" >{{ this.courseData['gross_avg']}}</h4>
                  </v-flex>
                  <v-flex xs12>
                    <h4 class="grey--text mb-3">Overall </h4>
                  </v-flex>
                  <v-flex xs3>
                    <h3 class="record font-weight-regular ma-0">{{ this.overallData['net_avg']}}</h3>
                  </v-flex>
                  <v-flex xs2>
                    <h3 class="grey--text">-</h3>
                  </v-flex>
                  <v-flex xs3>
                    <h4 class="grey--text ma-0 font-weight-regular" >{{ this.overallData['gross_avg']}}</h4>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-card flat>
            <v-layout row wrap align-center justify-center row fill-height>
              <v-flex xs>

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
import StatsColumn from './StatsColumn'

export default {
  name: 'Stats',
  props: ['roundId'],
  components: {
    StatsColumn
  },

  data () {
    return {
      loading: true,
      userData: {},
      courseData: {},
      overallData: {},
    }
  },

  computed: {
    ...mapState(['currentRound', 'currentTournament', 'courseStats'])
  },

  methods: {
    filterType (data, type) {
      let d = data.filter(el => el['type'] === type);
      return d[0]['attributes']
    }
  },

  // watch: {
  //   current: function () {
  //     console.log('stats', this.courseStats)
  //     this.$store.dispatch('LOAD_COURSE_STATS', { tournId: this.currentTournament.id, courseId: this.currentCourse.id })
  //   }
  // },

  created: function () {
    this.$store.dispatch('LOAD_COURSE_STATS', { tournId: this.currentTournament.id, roundId: this.roundId, })
      .then(response => {
        let data = this.courseStats.included
        this.overallData = Object.assign(this.filterType(data, 'round_agg'))
        this.courseData = Object.assign(this.filterType(data, 'course_agg'))
        this.loading = false
      })
  }
}
</script>
<style>
label.score-label {

}
.record {
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
