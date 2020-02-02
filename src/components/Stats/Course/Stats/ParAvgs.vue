<template>
  <v-card flat v-if="loading" class="white " color="white">
    loading...
  </v-card>
  <v-card flat v-else style="margin:auto">
    <v-container fluid pa-0 class="font-weight-regular mt-2 mb-2" style="height:inherit;">
      <v-layout row wrap align-center>
        <v-flex xs12>
          <v-card flat>
            <v-layout>
              <v-flex xs>
                <v-layout row wrap>
                  <v-flex xs12 class="">
                    <h4 class="text-xs-left mt-2 mb-2 font-weight-regular">Par {{ pars }} Avgs</h4>
                  </v-flex>
                  <v-flex xs6 class="">
                    <h2 class="font-weight-regular" style="color:#9FB8CE">{{ userAvg }}</h2>
                    <h4 class="text-xs-center font-weight-regular">Personal</h4>
                  </v-flex>
                  <v-flex xs6 class="">
                    <h2 class="text-xs-center font-weight-regular" style="color:#A8C256;">{{ overallAvg }}</h2>
                    <h4 class="text-xs-center font-weight-regular">Overall</h4>
                  </v-flex>
                </v-layout>
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
import Bars from 'vuebars'

export default {
  name: 'ParAvgs',
  props: ['pars'],
  components: {
    Bars
  },

  data () {
    return {
      loading: true,
      userAvg: '',
      overallAvg: '',
    }
  },

  computed: {
     ...mapState({
      overallSummary: state => state.overallSummary.courseSummary,
      userSummary: state => state.overallSummary.userSummary
    })
  },

  methods: {
    filterAvgs (list, par) {
      const p = par;
      let n = list.filter(el => el.par == p);
      if (n === undefined || !n.length) return {};

      return n[0].avg
    }
  },

  mounted: function () {
    let courseAvg = this.overallSummary["avgs"]
    let userSum   = this.userSummary["par_avgs"]

    if (courseAvg[0]) {
      let course = courseAvg[0]["par" + this.pars + "_avg"]
      this.overallAvg   = parseFloat(course).toFixed(2)
    }

    if (userSum) {
      let user = this.filterAvgs(userSum, this.pars)
      this.userAvg = parseFloat(user).toFixed(2)
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
