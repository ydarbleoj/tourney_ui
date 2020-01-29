<template>
  <v-container fluid class="pa-0">
    <v-layout row>
      <v-flex xs12>
        <v-card flat v-if="loading">
          loading...
        </v-card>
        <v-card flat v-else="!loading">
          <v-card-title primary-title class="pa-0">
            <v-container fluid pa-0 >
              <v-layout row wrap>
                <v-flex xs12>
                  <v-card color="primary">
                    <v-container fluid pa-0>
                      <v-layout row wrap>
                        <v-flex xs3>
                          <v-card flat>
                            <v-card-text>
                              Stats
                            </v-card-text>
                          </v-card>
                        </v-flex>
                        <v-flex xs3>
                          <v-card flat>
                            <v-card-text>
                              Personal
                            </v-card-text>
                          </v-card>
                        </v-flex>
                        <v-flex xs3>
                          <v-card flat>
                            <v-card-text>
                              This Year
                            </v-card-text>
                          </v-card>
                        </v-flex>
                        <v-flex xs3>
                          <v-card flat>
                            <v-card-text>
                              Overall
                            </v-card-text>
                          </v-card>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-title>
          <v-card-text>

          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Stats',
  props: ['roundId'],
  components: {
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
    ...mapState(['currentRound', 'currentTournament', 'courseStats'])
  },

  methods: {
    filterType: function (data, type) {
      let d = data.filter(el => el['type'] === type);
      return d[0]['attributes']
    }
  },

  // watch: {
  //   current: function () {
  //     console.log('stats', this.courseStats)
  //     this.$store.dispatch('LOAD_COURSE_STATS', { tournId: this.currentTournament.id, courseId: this.currentCourse.id })
  //   }
  // },

  created: function () {
    // this.$store.dispatch('LOAD_COURSE_STATS', { tournId: this.currentTournament.id, roundId: this.roundId, })
    //   .then(response => {
    //     let data = this.courseStats.included
    //     this.overallData = Object.assign(this.filterType(data, 'round_agg'))
    //     this.courseData = Object.assign(this.filterType(data, 'course_agg'))
    //     this.loading = false
    //   })
  }
}
</script>
<style>
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
