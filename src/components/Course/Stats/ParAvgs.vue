<template>
  <v-card flat v-if="loading" class="white " color="white">
    loading...
  </v-card>
  <v-card flat v-else>
    <v-layout row wrap justify-center>
      <v-flex xs12 style="background-color:#666;">
        <h2 class="white--text pl-3 mt-3 mb-4 font-weight-regular">Broken Down by Par:</h2>
        <v-layout row wrap justify-center
          class="text-xs-center pb-4"
          style="background-color:#666;"
        >
          <v-flex xs12 class="text-xs-left ml-2 mb-2">
            <h2 class="text pl-2 mb-3 font-weight-regular personal">
              Par 3's
            </h2>
          </v-flex>
          <v-flex xs4 v-if="personalBest">
            <h1 class="font-weight-regular white--text">
              {{ playerPar3 }}
            </h1>
            <h3 class="font-weight-medium" style="color:#999">Personal</h3>
          </v-flex>
            <v-flex xs4>
            <h1 class="font-weight-regular white--text">
              {{ fieldPar3 }}
            </h1>
            <h3 class="font-weight-medium" style="color:#999">This Week</h3>
          </v-flex>
            <v-flex xs4>
            <h1 class="font-weight-regular white--text">
              {{ roundPar3 }}
            </h1>
            <h3 class="font-weight-medium" style="color:#999">Historically</h3>
          </v-flex>
        </v-layout>
        <v-layout row wrap justify-center
          class="text-xs-center pb-4"
          style="background-color:#666;"
        >
          <v-flex xs12 class="text-xs-left ml-2 mb-2">
            <h2 class="text pl-2 mb-3 font-weight-regular weeks">
              Par 4's
            </h2>
          </v-flex>
          <v-flex xs4 v-if="personalBest">
            <h1 class="font-weight-regular white--text">
              {{ playerPar4 }}
            </h1>
            <h3 class="font-weight-medium" style="color:#999">Personal</h3>
          </v-flex>
            <v-flex xs4>
            <h1 class="font-weight-regular white--text">
              {{ fieldPar4  }}
            </h1>
            <h3 class="font-weight-medium" style="color:#999">This Week</h3>
          </v-flex>
            <v-flex xs4>
            <h1 class="font-weight-regular white--text">
              {{ roundPar4 }}
            </h1>
            <h3 class="font-weight-medium" style="color:#999">Historically</h3>
          </v-flex>
        </v-layout>
        <v-layout row wrap justify-center
          class="text-xs-center pb-4"
          style="background-color:#666;"
        >
          <v-flex xs12 class="text-xs-left ml-2 mb-2">
            <h2 class="text pl-2 mb-3 font-weight-regular historical">
              Par 5's
            </h2>
          </v-flex>
          <v-flex xs4 v-if="personalBest">
            <h1 class="font-weight-regular white--text">
              {{ playerPar5 }}
            </h1>
            <h3 class="font-weight-medium" style="color:#999">Personal</h3>
          </v-flex>
            <v-flex xs4>
            <h1 class="font-weight-regular white--text">
              {{ fieldPar5 }}
            </h1>
            <h3 class="font-weight-medium" style="color:#999">This Week</h3>
          </v-flex>
            <v-flex xs4>
            <h1 class="font-weight-regular white--text">
              {{ roundPar5 }}
            </h1>
            <h3 class="font-weight-medium" style="color:#999">Historically</h3>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
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
      personalBest: null,
      yearsField: '',
      courseOverall: '',
      fieldPar3: '',
      fieldPar4: '',
      fieldPar5: '',
      roundPar3: '',
      roundPar4: '',
      roundPar5: '',
      playerPar3: null,
      playerPar4: null,
      playerPar5: null
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

  mounted () {
    const round = this.roundStats
    const course = this.courseStats
    const player = this.userCourseStats

    this.fieldPar3 = course['par3_avg']
    this.fieldPar4 = course['par4_avg']
    this.fieldPar5 = course['par5_avg']

    this.roundPar3 = round['par3_avg']
    this.roundPar4 = round['par4_avg']
    this.roundPar5 = round['par5_avg']

    this.playerPar3 = player.length == undefined ? null : player['par3_avg']
    this.playerPar4 = player.length == undefined ? null : player['par4_avg']
    this.playerPar5 = player.length == undefined ? null : player['par5_avg']
    this.loading = false
  }
}
</script>
<style scoped>
.scoring--stats {
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 1s ease, box-shadow 1s ease;
}

score-label.record {
  }
.pers-record {
  color: #ED6C6C;
}
.personal {
  color:#A8C256;
}
.weeks {
  color: #F79256;
}
.historical {
  color: #9FB8CE;
}
p.hide {
  display: none;
}

  .name-list {
    color: #9ad3de;
  }
</style>
