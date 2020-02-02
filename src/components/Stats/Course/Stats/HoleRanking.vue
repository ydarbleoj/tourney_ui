<template>
  <v-card flat v-if="loading" class="white" color="white">
    loading...
  </v-card>
  <v-card flat v-else style="margin:auto">
    <v-container fluid pa-0 class="font-weight-regular mt-2 mb-2" style="height:inherit;">
      <h4 class="text-xs-left mt-2 mb-2 font-weight-regular ">
        Hole Rankings
      </h4>
      <v-layout row wrap align-center>
        <v-flex xs12>
          <v-card flat class="white">
            <v-layout>
              <v-flex xs6>
                <v-flex xs12>
                  <h1 class="font-weight-regular" style="color:#9FB8CE;font-size: 40px;">
                    {{ hardestHole.hole_number }}
                  </h1>
                   <h4 class="font-weight-regular" style="color:#999;"> Par
                     <span style="color:#FFCB47;font-size:18px;">{{ hardestHole.par }}</span>
                   </h4>
                  <p style="color:#999;">{{ hardestHole.course_name }}</p>
                  <v-spacer></v-spacer>
                  <h4 class="font-weight-regular mb-3">Hardest Hole</h4>
                </v-flex>
              </v-flex>
              <v-flex xs6>
                <v-flex xs12>
                  <h1 class="font-weight-regular" style="color:#A8C256;font-size: 40px;">
                    {{ easiestHole.hole_number }}
                  </h1>
                   <h4 class="font-weight-regular" style="color:#999;"> Par
                     <span style="color:#FFCB47;font-size:18px;">{{ easiestHole.par }}</span>
                   </h4>
                  <p style="color:#999;">{{ easiestHole.course_name }}</p>
                  <v-spacer></v-spacer>
                  <h4 class="font-weight-regular mb-3">Easiest Hole</h4>
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
  name: 'HoleRanking',
  data () {
    return {
      isNet: true,
      loading: true,
      easiestHole: {},
      hardestHole: {},
    }
  },

  computed: {
    ...mapState({
      courseSummary: state => state.overallSummary.courseSummary,
    })
  },

  methods: {
  },

  mounted: function () {
    this.hardestHole = this.courseSummary["hardest_hole"]
    this.easiestHole = this.courseSummary["easiest_hole"]
    this.loading     = false
  }
}
</script>
<style>
.scoring--stats {
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 1s ease, box-shadow 1s ease;
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
