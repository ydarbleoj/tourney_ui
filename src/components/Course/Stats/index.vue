<template>
  <v-card v-if="loading" class="white elevation-1" color="white">
    loading...
  </v-card>
  <v-card flat v-else="!loading" style="width: 95%;margin:auto">
    <v-container fluid pa-0 class="font-weight-regular" style="height:inherit;">
      <v-layout row wrap>
        <v-flex xs12 style="margin:10px 0;">
          <ScoringAvg />
          <v-spacer style="margin: 10px 0;"></v-spacer>
          <LowestScoring />
          <v-spacer style="margin: 10px 0;"></v-spacer>
          <PuttingAvg />
          <v-spacer style="margin: 10px 0;"></v-spacer>
          <ParAvgs />
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import ScoringAvg from '../Stats/ScoringAvg'
import LowestScoring from '../Stats/LowestScoring'
import PuttingAvg from '../Stats/PuttingAvg'
import ParAvgs from '../Stats/ParAvgs'

export default {
  name: 'index',
  props: ['roundId'],
  components: {
    ScoringAvg,
    LowestScoring,
    PuttingAvg,
    ParAvgs
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
.scoring--stats {
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 1s ease, box-shadow 1s ease;
}
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
