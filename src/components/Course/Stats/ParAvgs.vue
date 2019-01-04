<template>
  <v-card v-if="loading" class="white elevation-1" color="white">
    loading...
  </v-card>
  <v-card flat v-else="!loading" style="margin:auto;background-color:#6AA5DA;">
    <v-container fluid pa-0 class="font-weight-regular" style="height:inherit;">
      <v-layout row wrap align-center>
        <v-flex xs12>
          <v-card class="scoring--stats">
            <v-layout>
              <v-flex xs6>
                <v-layout row wrap>
                  <v-flex xs12 class="">
                    <h3 class="text-xs-left ml-2 mt-1 mb-2 font-weight-regular ">Par Avgs</h3>
                  </v-flex>
                  <v-flex xs12 class="pl-5">
                    <h4 class="grey--text text-xs-left font-weight-regular">Personal</h4>
                    <h2 class="blue--text text-xs-left font-weight-medium">{{ this.personalBest }}</h2>
                  </v-flex>
                  <v-flex xs12 class="pl-5">
                    <h4 class="grey--text text-xs-left font-weight-regular">This Years Field</h4>
                    <h2 class="blue--text text-xs-left font-weight-medium">{{ this.yearsField }}</h2>
                  </v-flex>
                  <v-flex xs12 class="pl-5">
                    <h4 class="grey--text text-xs-left font-weight-regular">Overall</h4>
                    <h2 class="blue--text text-xs-left font-weight-medium">{{ this.courseOverall }}</h2>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs6>
                <v-layout row wrap align-center justify-center fill-height>

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
      this.yearsField = overall['par3_avg']
      this.courseOverall = course['par3_avg']
      this.personalBest = this.yearsField
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
