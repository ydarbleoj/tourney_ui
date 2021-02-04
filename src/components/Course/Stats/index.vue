<template>
  <v-card flat>
    <h2 class="font-weight-regular pt-3">
      Course Statistics
    </h2>
    <v-container
      v-if="!loading"
      fluid
      pa-0
      class="font-weight-regular"
      style="height:inherit;"
    >
      <v-layout row wrap>
        <v-flex xs12 style="">
          <HcapDiff />
          <v-divider style="background-color:;"></v-divider>

          <ScoringAvg />
          <v-divider style="background-color:;"></v-divider>

          <LowestScoring />
          <v-divider style="background-color:;"></v-divider>

          <PuttingAvg />
          <v-divider style="background-color:;"></v-divider>

          <ParAvgs pars="3"/>
          <v-divider style="background-color:;"></v-divider>

          <ParAvgs pars="4"/>
          <v-divider style="background-color:;"></v-divider>

          <ParAvgs pars="5"/>
          <v-divider style="background-color:;"></v-divider>
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
import HcapDiff from '../Stats/HcapDiff'
import ParAvgs from '../Stats/ParAvgs'

export default {
  name: 'index',
  props: ['roundId'],
  components: {
    ScoringAvg,
    LowestScoring,
    PuttingAvg,
    ParAvgs,
    HcapDiff,
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
     ...mapState({
      currentTournament: state => state.tournament.currentTournament,
      courseStats: state => state.course.courseStats
    })
  },

  methods: {
    filterType (data, type) {
      let d = data.filter(el => el['type'] === type);
      if (d === undefined || !d.length) return {};
      return d[0]['attributes']
    }
  },

  created: function () {
    this.$store.dispatch('course/LOAD_COURSE_STATS', { tournId: this.currentTournament.id, roundId: this.roundId, })
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
  transition: opacity 1s ease, box-shadow 1s ease;
}
.record {
  color: #F8C977;
}
.field-score {
  color: #74C9D7;
}
.pers-record {
  color: #ED6C6C;
}
.personal-score {
  color: #F8C977;
}
.overall-score {
  color: #F7A072;
}
p.hide {
  display: none;
}

.name-list {
  color: #9ad3de;
}
</style>
