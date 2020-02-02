<template>
  <v-card flat v-if="loading" class="white" color="white">
    loading...
  </v-card>
  <v-card flat v-else style="margin:auto">
    <v-container fluid pa-0 class="font-weight-regular mt-2 mb-2" style="height:inherit;">
      <h4 class="text-xs-left mt-1 mb-2 font-weight-regular ">Scoring Avg</h4>
      <v-flex xs12 class="mb-2">
        <label class="score-label mr-2" v-bind:class="{ record : isNet }" @click="isNet = true">NET </label>
        <label class="score-label ml-2" v-bind:class="{ record : !isNet }" @click="isNet = false">GROSS</label>
      </v-flex>
      <v-layout row wrap align-center>
        <v-flex xs12>
          <v-card flat class="white">
            <v-layout>
              <v-flex xs6>
                <v-flex xs12>
                  <h1 class="font-weight-regular" style="color:#9FB8CE">{{ this.userScoringAvg }}</h1>
                  <h4 class=" mb-3 font-weight-regular">Personal</h4>
                </v-flex>
              </v-flex>
              <v-flex xs6>
                <v-flex xs12>
                  <h1 class="font-weight-regular ma-0" style="color:#A8C256;">
                    {{ parseFloat(this.overallScoringAvg).toFixed(2) }}
                  </h1>
                  <h4 class="font-weight-regular">Overall</h4>
                </v-flex>
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
  name: 'ScoringAvg',
  data () {
    return {
      isNet: true,
      loading: true,
      overallScoringAvg: "",
      userScoringAvg: ""
    }
  },

  computed: {
     ...mapState({
      overallSummary: state => state.overallSummary.courseSummary,
      userSummary: state => state.overallSummary.userSummary
    })
  },

  methods: {
    toggleFields () {
      let overall = this.overallSummary
      let user    = this.userSummary
      let net     = this.isNet
      this.userScoringAvg = net ? user["avgs"][0]['net_avg'] : user["avgs"][0]['gross_avg']
      this.overallScoringAvg = net ? overall["avgs"][0]['net_avg'] : overall["avgs"][0]['gross_avg']
    },
  },
  watch: {
    isNet () {
      this.toggleFields()
      this.$el.classList.toggle('record')
    }
  },

  mounted: function () {
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
  color: #FFCB47;
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

