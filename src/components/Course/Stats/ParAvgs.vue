<template>
  <v-card flat v-if="loading" class="white " color="white">
    loading...
  </v-card>
  <v-card flat v-else>
    <v-container
      fluid
      class="font-weight-regular pa-4"
     >
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

  methods: {
    loadFields () {
      let overall = this.roundStats
      let course  = this.courseStats
      this.yearsField = overall['par' + this.pars + '_avg']
      this.courseOverall = course['par' + this.pars + '_avg']
      this.personalBest = this.userCourseStats['par' + this.pars + '_avg']
    },
  },

  mounted () {
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
