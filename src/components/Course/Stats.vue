<template>
  <v-container fluid class="pt-0">
    <v-layout row>
      <v-flex xs6>
        <v-card flat>
          <v-list two-lines class="pa-0">
            <v-subheader>Course Average</v-subheader>
            <v-list-tile-content>
              <h3 class="text-xs-center record mb-0">
              {{ courseStats.course.course_avg }}
              </h3>
              <label><span class="personal">putts </span> {{ courseStats.course.avg_putts}}</label>
            </v-list-tile-content>

          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card flat>
          <v-list two-lines class="pa-0" >
            <v-subheader>Personal</v-subheader>
            <v-list-tile-content>
              <h3 class="mb-0 pers-record">
              {{ courseStats.user.course_avg }}
              </h3>
              <label><span class="personal">putts </span> {{ courseStats.user.avg_putts}}</label>
            </v-list-tile-content>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
    <v-layout row>
      <v-flex xs6>
        <v-card flat>
          <v-list two-lines class="pa-0" >
            <v-subheader>Course Record</v-subheader>
            <v-list-tile-content>
              <h3 class="text-xs-center record mb-0">
              {{ courseStats.course.lowest_round.total }} <span class="personal">{{ courseStats.course.lowest_round.username }}</span>
              </h3>
            </v-list-tile-content>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card flat>
          <v-list two-lines class="pa-0" >
            <v-subheader>Personal </v-subheader>
            <v-list-tile-content>
              <h3 class="mb-0 pers-record">
              {{ courseStats.user.lowest_round }} <span class="personal">2016</span>
              </h3>
            </v-list-tile-content>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
    <v-layout row>
      <v-flex xs6>
        <v-card flat>
          <v-list two-lines class="pa-0" >
            <v-subheader>Fewest Putts</v-subheader>
            <v-list-tile-content>
              <h3 class="text-xs-center record mb-0">
              {{ courseStats.course.fewest_putts.total }} <span class="personal">{{ courseStats.course.fewest_putts.username }}</span>
              </h3>
            </v-list-tile-content>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card flat>
          <v-list two-lines class="pa-0" >
            <v-subheader>Personal</v-subheader>
            <v-list-tile-content>
              <h3 class="mb-0 pers-record">
              {{ courseStats.user.fewest_putts }} <span class="personal">2016</span>
              </h3>
            </v-list-tile-content>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
     <v-layout row>
      <v-flex xs6>
        <v-card flat>
          <v-list two-lines class="pa-0" >
            <v-subheader>Pars</v-subheader>
            <v-subheader>Course Avg</v-subheader>
            <v-list-tile-title class='text-xs-left'>par 3</v-list-tile-title>
            <v-list-tile-content>
              <h3 class="text-xs-center record mb-0">
                {{ courseStats.course.par3_avg }}
              </h3>
            </v-list-tile-content>
            <v-list-tile-title class='text-xs-left'>par 4</v-list-tile-title>
            <v-list-tile-content>
              <h3 class="text-xs-center record mb-0">
                {{ courseStats.course.par4_avg }}
              </h3>
            </v-list-tile-content>
            <v-list-tile-title class='text-xs-left'>par 5</v-list-tile-title>
            <v-list-tile-content>
              <h3 class="text-xs-center record mb-0">
                {{ courseStats.course.par5_avg }}
              </h3>
            </v-list-tile-content>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card flat >
          <v-list two-lines class="pa-0" >
            <v-subheader></v-subheader>
            <v-subheader>Personal</v-subheader>
            <v-list-tile-title class='text-xs-left'>par 3</v-list-tile-title>
            <v-list-tile-content>
              <h3 class="text-xs-center pers-record mb-0">
                {{ courseStats.user.par3_avg }}
              </h3>
            </v-list-tile-content>
            <v-list-tile-title class='text-xs-left'>par 4</v-list-tile-title>
            <v-list-tile-content>
              <h3 class="text-xs-center pers-record mb-0">
                {{ courseStats.user.par4_avg }}
              </h3>
            </v-list-tile-content>
            <v-list-tile-title class='text-xs-left'>par 5</v-list-tile-title>
            <v-list-tile-content>
              <h3 class="text-xs-center pers-record mb-0">
                {{ courseStats.user.par5_avg }}
              </h3>
            </v-list-tile-content>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Stats',
  props: ['current'],
  components: {
  },

  computed: {
    ...mapState(['currentRound', 'currentTournament', 'currentCourse', 'courseStats'])
  },

  watch: {
    current: function () {
      console.log('stats', this.courseStats)
      this.$store.dispatch('LOAD_COURSE_STATS', { tournId: this.currentTournament.id, courseId: this.currentCourse.id })
    }
  },

  mounted: function (current) {
    console.log('')
    this.$store.dispatch('LOAD_COURSE_STATS', { tournId: this.currentTournament.id, courseId: this.currentCourse.id })
  }
}
</script>
<style>
.record {
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
