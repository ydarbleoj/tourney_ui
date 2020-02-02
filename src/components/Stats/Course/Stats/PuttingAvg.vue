<template>
  <v-card v-if="loading" class="white elevation-1" color="white">
    no, you're loading...
  </v-card>
  <v-card flat v-else style="margin:auto">
    <v-container fluid pa-0 class="font-weight-regular mt-2 mb-2" style="height:inherit;">
      <h4 class="text-xs-left mt-2 mb-2 font-weight-regular ">Putting Avg</h4>
      <v-layout row wrap align-center>
        <v-flex xs12>
          <v-card flat class="white">
            <v-layout>
              <v-flex xs6>
                <v-flex xs12 >
                  <h1 class="font-weight-regular" style="color:#9FB8CE">{{ userAvg }}</h1>
                  <h4 class="font-weight-regular" style="color:#333;font-size:14px;">({{ userThreePutt }} <span class="font-weight-regular" style="font-size:12px;color:#F79256;">3p</span>)</h4>
                  <h4 class=" mb-3 font-weight-regular">Personal</h4>
                </v-flex>
              </v-flex>
              <v-flex xs6>
                <v-flex xs12>
                  <h1 class="font-weight-regular ma-0" style="color:#A8C256;">
                    {{ overallAvg }}
                  </h1>
                  <h4 class="font-weight-regular" style="color:#333;font-size:14px;">
                    ({{ overallThreePutt }}
                    <span class="font-weight-regular" style="font-size:12px;color:#F79256;">3p</span>)
                  </h4>
                  <h4 class=" font-weight-regular">Overall </h4>
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
  name: 'PuttingAvg',
  data () {
    return {
      isNet: true,
      loading: true,
      userAvg: "",
      userThreePutt: "",
      overallAvg: "",
      overallThreePutt: ""
    }
  },

  computed: {
     ...mapState({
      overallSummary: state => state.overallSummary.courseSummary,
      userSummary: state => state.overallSummary.userSummary
    })
  },

  methods: {
  },

  mounted: function () {
    if (this.userSummary['avgs']) {
      this.userAvg          = this.userSummary['avgs'][0]['putts_avg']
      this.userThreePutt    = this.userSummary['avgs'][0]['three_putts_avg']
    }
    if (this.overallSummary["avgs"]) {
      this.overallAvg       = parseFloat(this.overallSummary['avgs'][0]['putts_avg']).toFixed(2)
      this.overallThreePutt = this.overallSummary['avgs'][0]['three_putts_avg']
    }

    this.loading = false
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
