<template>
  <v-card
    class="course-card ma-2"
  >
    <v-img
      :src="'/static/' + courseId + 'course.jpg'"
      height='200px'
      class="course-header"
      @click="coursePage()"
      :class="{ 'opacity-click': clicked }"
    >
      <v-container fill-height pa-0 class=''>
        <v-layout>
          <v-flex xs6 class="pa-0">
            <div style='height:100%;'>
              <v-layout align-end row style="width:100%;height:inherit;">
                <v-flex xs12 class="text-xs-center white--text ma-2">
                  <h2 class="white--text font-weight-regular">
                    {{ courseName }}
                  </h2>
                   <h2 style="color:#f1f1f1;" class="font-weight-regular">
                    Round {{ roundNumber }}
                  </h2>
                </v-flex>
              </v-layout>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>
  </v-card>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'Button',
  props: ['course'],
  data () {
    return {
      rndId: this.course.id,
      courseName: '',
      roundNumber: 1,
      clicked: false,
      courseId: 2
    }
  },
  computed: {
    ...mapState({
      userTeeTimes: state => state.userTeeTimes,
      currentRound: state => state.currentRound,
      currentTournament: state => state.tournament.currentTournament
    })
  },
  methods: {
    coursePage () {
      this.clicked = true;
      this.$store.commit("setPageTransition");
      this.$router.push({
        name: 'Course',
        params: {
          id: this.currentTournament.id,
          roundNumber: this.roundNumber
        }
      });
    }
  },

  created () {
    const c = this.course.attributes
    this.courseId = c.new_course_id
    this.roundNumber = c.round_number
    this.courseName = c.name
  }
}
</script>
<style>
.course-card {
  border-radius: 20px;
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
  background-color: #FBFCFD;
}
.opacity-click {
  opacity: calc(0.7);
  margin: 5px 0 -5px 0;
  transition: all 0ms cubic-bezier(0.645, 0.045, 0.355, 1);
}
</style>
