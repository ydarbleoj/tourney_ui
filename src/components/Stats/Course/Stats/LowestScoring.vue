<template>
  <v-card flat v-if="loading" class="white" color="white">
    loading...
  </v-card>
  <v-card flat v-else style="margin:auto">
    <v-container fluid pa-0 class="font-weight-regular mt-2 mb-2" style="height:inherit;">
      <h4 class="text-xs-left mt-2 mb-2 font-weight-regular ">
        Best Round
      </h4>
      <v-layout row wrap align-center>
        <v-flex xs12>
          <v-card flat class="white">
            <v-layout>
              <v-flex xs6>
                <v-flex xs12>
                  <h1 class="personal-score font-weight-regular" style="font-size: 40px;">
                    {{ this.userData[0].score }}
                  </h1>
                  <ul style="color: #666;font-size:12px;" class="pa-0" v-for="item in userData" :key="item.id">
                    {{ item.course }}
                  </ul>
                  <h4 class="font-weight-regular mb-3">Personal</h4>
                </v-flex>
              </v-flex>
              <v-flex xs6>
                <v-flex xs12>
                  <h1 class="overall-score font-weight-regular" style="font-size: 40px;">{{ this.courseData ?  this.courseData[0].score : null }}</h1>
                  <div style="color: #666;font-size:12px;" v-if="courseLimit">{{ this.overallSize }} T</div>
                  <ul style="color: #666;font-size:12px;" class="pa-0" v-for="item in courseData" :key="item.id" v-else>
                    {{ item.username }} - {{ item.course}}
                  </ul>
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
  name: 'LowestScoring',
  data () {
    return {
      isNet: true,
      loading: true,
      userData: [],
      courseData: [],
      courseLimit: false,
      overallSize: 0
    }
  },

  computed: {
    ...mapState({
      courseSummary: state => state.overallSummary.courseSummary,
      userSummary: state => state.overallSummary.userSummary
    })
  },

  methods: {
  },

  mounted: function () {
    this.userData    = this.userSummary["lowest_round"]
    this.courseData  = this.courseSummary["lowest_round"]
    this.courseLimit = this.courseData.length > 1
    this.overallSize = this.courseData.length
    this.loading     = false
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
