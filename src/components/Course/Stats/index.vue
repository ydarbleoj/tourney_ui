<template>
  <v-card flat>
    <v-container
      fluid
      pa-0
      class="font-weight-regular"
      style="height:inherit;"
      mb-5
    >
      <h2 class="font-weight-regular pt-3 pl-4">
        Course Statistics
      </h2>
      <v-layout row wrap v-if="!isLoading">
        <v-flex xs12 style="">
          <ScoringAvg />
          <PuttingAvg />
          <ParAvgs />

          <v-layout row wrap>
            <v-flex xs12>
              <h2 class="pl-3 mt-3 mb-4 font-weight-regular">
                More notable stats
              </h2>

              <HcapDiff />
            </v-flex>
          </v-layout>
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
    HcapDiff,
    LowestScoring,
    ParAvgs,
    PuttingAvg,
    ScoringAvg
  },

  data () {
    return {
      isLoading: true,
      userData: {},
      courseData: {},
      roundData: {},
      teeTimes: []
    }
  },

  computed: {
     ...mapState({
      currentTournament: state => state.tournament.currentTournament
    })
  },

  methods: {
  },

  created: function () {
    this.isLoading = false
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
