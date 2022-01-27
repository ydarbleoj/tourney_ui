<template>
  <v-card flat v-if="loading" class="white" color="white">
    loading...
  </v-card>
  <v-card flat v-else>
    <v-container
      fluid
      class="font-weight-regular pa-4"
    >
      <v-layout row wrap justify-center
        class="text-xs-center pt-2 pb-4"
        style="background-color:#666;border-radius: 10px;">
        <v-flex xs12 class="text-xs-left ml-2 mb-2">
          <h2 class="white--text pl-2 mb-2 font-weight-regular">Scoring Average
            <br>
            <span class="font-weight-regular" style="font-size:15px;">
              <label class="score-label mr-2" v-bind:class="{ record : isNet }" @click="isNet = true">NET </label>
              <label class="score-label ml-2" v-bind:class="{ record : !isNet }" @click="isNet = false">GROSS</label>
            </span>
          </h2>
        </v-flex>
        <v-flex xs4 v-if="personalBest">
          <h1 class="font-weight-regular white--text">
            {{ personalBest }}
          </h1>
          <h3 class="font-weight-medium" style="color:#999">Personal</h3>
        </v-flex>
         <v-flex xs4>
          <h1 class="font-weight-regular white--text">
            {{ yearsField }}
          </h1>
          <h3 class="font-weight-medium" style="color:#999">This Week</h3>
        </v-flex>
         <v-flex xs4>
          <h1 class="font-weight-regular white--text">
            {{ courseOverall }}
          </h1>
          <h3 class="font-weight-medium" style="color:#999">Historically</h3>
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
      personalBest: null,
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
    toggleFields () {
      let overall = this.roundStats
      let course  = this.courseStats
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

  mounted () {
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
.record {
  color: #9FB8CE;
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

