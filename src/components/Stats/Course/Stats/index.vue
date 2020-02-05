<template>
  <v-card flat v-if="loading" class="white elevation-1" color="white">
    no, you're loading...
  </v-card>
  <v-card flat v-else>
    <v-container fluid pa-0 class="font-weight-regular mb-3" style="height:inherit;">
      <v-layout row wrap>
        <v-flex xs12 style="">
          <HcapDiff />
           <v-divider style="background-color:;"></v-divider>
          <ScoringAvg />
          <v-divider style="background-color:;"></v-divider>
          <PuttingAvg />
          <v-divider style="background-color:;"></v-divider>
          <CourseRanking />
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
import CourseRanking from '../Stats/CourseRanking'
import HcapDiff from '../Stats/HcapDiff'
import ParAvgs from '../Stats/ParAvgs'
import PuttingAvg from '../Stats/PuttingAvg'
import ScoringAvg from '../Stats/ScoringAvg'

export default {
  name: 'index',
  props: ['roundId'],
  components: {
    CourseRanking,
    HcapDiff,
    ParAvgs,
    PuttingAvg,
    ScoringAvg,
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
      currentTournament: state => state.currentTournament
    })
  },

  methods: {
  },

  created: function () {
    this.$store.dispatch('overallSummary/LOAD_SUMMARY_DATA', { tourn_id: this.currentTournament.id })
      .then(response => {
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
