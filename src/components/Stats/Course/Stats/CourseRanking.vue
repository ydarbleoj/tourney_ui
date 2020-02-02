<template>
  <v-card flat v-if="loading" class="white" color="white">
    loading...
  </v-card>
  <v-card flat v-else style="margin:auto">
    <v-container fluid pa-0 class="font-weight-regular mt-2 mb-2" style="height:inherit;">
      <h4 class="text-xs-left mt-2 mb-2 font-weight-regular ">
        Course Rankings
      </h4>
      <v-layout row wrap align-center>
        <v-flex xs12>
          <v-card flat class="white">
            <v-layout>
              <v-flex xs6>
                <v-flex xs12>
                  <h1 class="font-weight-regular" style="color:#9FB8CE;font-size: 40px;">
                    {{ hardestCourse ? hardestCourse.avg : '' }}
                  </h1>
                  <p style="color:#999;">{{ hardestCourse ? hardestCourse.name : '' }}</p>
                  <v-spacer></v-spacer>
                  <h4 class="font-weight-regular mb-3">Hardest Course</h4>
                </v-flex>
              </v-flex>
              <v-flex xs6>
                <v-flex xs12>
                   <h1 class="font-weight-regular" style="color:#A8C256;font-size: 40px;">
                    {{ easiestCourse ? easiestCourse.avg : '' }}
                  </h1>
                  <p style="color:#999;">{{ easiestCourse ? easiestCourse.name : '' }}</p>
                  <v-spacer></v-spacer>
                  <h4 class="font-weight-regular">Easiest Course</h4>
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
  name: 'CourseRanking',
  data () {
    return {
      isNet: true,
      loading: true,
      easiestCourse: {},
      hardestCourse: {},
      courseLimit: false,
      overallSize: 0
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
    this.hardestCourse = this.courseSummary["hardest_course"]
    this.easiestCourse = this.courseSummary["easiest_course"]
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
