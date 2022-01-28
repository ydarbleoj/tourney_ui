<template>
  <v-card flat>
    <v-container
      fluid
      class="font-weight-regular pa-4"
      style="background-color:#9FB8CE;"
     >
      <v-layout row wrap justify-center
        class="text-xs-center pb-2"
      >
        <v-flex xs12 class="text-xs-left">
          <h2 class="font-weight-regular">Putting Averages</h2>
        </v-flex>
        <v-layout row wrap align-center mt-3>
          <v-flex xs3 class="text-xs-center">
            <h1 class="font-weight-regular" style="color:#333;font-size:50px;">
              {{ puttingAvg }}
            </h1>
          </v-flex>
          <v-flex xs9>
            <v-layout row wrap>
              <v-flex xs4 class="font-weight-regular text-xs-center">
                <h1 class="font-weight-regular white--text">
                  {{ round1Avg }}
                </h1>
                <h4 class="font-weight-regular">
                  Round 1
                </h4>
              </v-flex>
              <v-flex xs4 class="font-weight-regular text-xs-center">
                <h1 class="font-weight-regular white--text">
                  {{ round2Avg }}
                </h1>
                <h4 class="font-weight-regular">
                  Round 2
                </h4>
              </v-flex>
              <v-flex xs4 class="font-weight-regular text-xs-center">
                <h1 class="font-weight-regular white--text">
                  {{ round3Avg }}
                </h1>
                <h4 class="font-weight-regular">
                  Round 3
                </h4>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-layout>

      <v-layout row wrap justify-center
        class="text-xs-center pb-2 mt-3"
      >
        <v-flex xs12 class="text-xs-left">
          <h2 class="font-weight-regular">3 Putts</h2>
        </v-flex>
        <v-layout row wrap align-center>
          <v-flex xs3 class="text-xs-center">
            <h1 class="font-weight-regular" style="color:#666;font-size:50px;">
              {{ threePuttingAvg }}
            </h1>
          </v-flex>
          <v-flex xs9>
            <v-layout row wrap>
              <v-flex xs4 class="font-weight-regular text-xs-center">
                <h1 class="font-weight-regular" style="color:#666">
                  {{ round1ThreeAvg }}
                </h1>
                <h4 class="font-weight-regular">
                  Round 1
                </h4>
              </v-flex>
              <v-flex xs4 class="font-weight-regular text-xs-center">
                <h1 class="font-weight-regular" style="color:#666">
                  {{ round2ThreeAvg }}
                </h1>
                <h4 class="font-weight-regular">
                  Round 2
                </h4>
              </v-flex>
              <v-flex xs4 class="font-weight-regular text-xs-center">
                <h1 class="font-weight-regular" style="color:#666">
                  {{ round3ThreeAvg }}
                </h1>
                <h4 class="font-weight-regular">
                  Round 3
                </h4>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
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
      puttingAvg: 0,
			round1Avg: 0,
			round2Avg: 0,
			round3Avg: 0,
      threePuttingAvg: 0,
			round1ThreeAvg: 0,
			round2ThreeAvg: 0,
			round3ThreeAvg: 0,
    }
  },

  computed: {
    ...mapState({
      tournamentSummary: state => state.overallSummary.tournamentSummary
    })
  },

  methods: {},

  mounted () {
    this.puttingAvg = this.tournamentSummary.attributes.putting_avg
		this.round1Avg = this.tournamentSummary.attributes.round1_putting_avg
		this.round2Avg = this.tournamentSummary.attributes.round2_putting_avg
		this.round3Avg = this.tournamentSummary.attributes.round3_putting_avg

    this.threePuttingAvg = this.tournamentSummary.attributes.three_putting_avg
		this.round1ThreeAvg = this.tournamentSummary.attributes.round1_3putting_avg
		this.round2ThreeAvg = this.tournamentSummary.attributes.round2_3putting_avg
		this.round3ThreeAvg = this.tournamentSummary.attributes.round3_3putting_avg
  }
}
</script>
<style scoped>
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

.border-card {
	border-radius: 20px;
  border: 2px solid #999;
  transition: all 0ms cubic-bezier(0.645, 0.045, 0.355, 1);
}
</style>
