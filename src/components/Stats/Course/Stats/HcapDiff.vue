<template>
  <v-card flat v-if="loading" class="white" color="white">
    loading...
  </v-card>
  <v-card flat v-else="!loading" style="margin:auto">
    <v-container fluid pa-0 class="font-weight-regular" style="height:inherit;">
      <h4 class="text-xs-left mt-1 mb-2 font-weight-regular ">Hcap Differential</h4>
      <v-layout row wrap align-center>
        <v-flex xs12>
          <v-card flat class="white">
            <v-layout>
              <v-flex xs6>
                <v-flex xs12>
                  <h1 class="personal-score font-weight-regular">{{ this.userDiff }}</h1>
                  <h4 class=" mb-3 font-weight-regular">Personal</h4>
                </v-flex>
              </v-flex>
              <v-flex xs6>
                <v-flex xs12>
                  <h1 class="overall-score font-weight-regular ma-0">{{ this.overallDiff }}</h1>
                  <h4 class=" font-weight-regular">Overall</h4>
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
  name: 'HcapDiff',
  data () {
    return {
      isNet: true,
      loading: true,
      userDiff: "",
      overallDiff: ""
    }
  },

  computed: {
     ...mapState({
      courseSummary: state => state.overallSummary.courseSummary,
      userSummary: state => state.overallSummary.userSummary
    })
  },

  methods: {},

  mounted: function () {
    this.userDiff = this.userSummary["avgs"][0]["hcap_diff"]
    this.overallDiff = this.courseSummary["avgs"][0]["hcap_diff"]
    this.loading = false
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

