<template>
  <v-card
    flat
		class="rounded-card pt-4 pb-4"
    style="background-color:#FFF;"
	>
    <div class="pl-4 pr-4 mb-5">
      <h1 style="font-weight:500">
      	{{ courseName }}
      </h1>
      <p style="font-size:18px;color:#444;">Round {{ roundNumber }}</p>
    </div>
    <div class="pl-4 pr-4 mr-3 ml-3 border-card">
			<v-card flat class="mb-3 mt-2">
				<v-layout row wrap align-center>
					<v-flex xs12 class="text-xs-left">
						<h2 class="mb-2 pt-2 font-weight-regular">{{ teeName }} Tees</h2>
					</v-flex>
					<v-flex xs3>
						<h1 style="color:#A8C256;">
							{{ yardage }}
						</h1>
						<h4 class="font-weight-regular">
							Yardage
						</h4>
					</v-flex>
					<v-flex xs6 class="text-xs-center">
						<h1 style="color:#F79256;">
							{{ rating }} / {{ slope }}
						</h1>
						<h4 class="font-weight-regular">
							Rating / Slope
						</h4>
					</v-flex>
					<v-flex xs3 class="text-xs-center">
						<h1 style="color:#9FB8CE;">
							{{ par }}
						</h1>
						<h4 class="font-weight-regular">
							Par
						</h4>
					</v-flex>
				</v-layout>
			</v-card>
    </div>
  </v-card>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Container',
  components: {
  },
  data () {
    return {
      isLoading: true,
      imageId: 2,
      courseName: "Bandon",
			roundNumber: 1,
			par: 72,
			yardage: 7000,
			slope: 0,
			rating: 0.0,
			teeName: "Green",
    }
  },
  computed: {
    ...mapState({
     currentTournament: state => state.tournament.currentTournament,
		 courseInfo: state => state.course.courseInfo
    }),
  },
  mounted: function () {
		const info = this.courseInfo.course_info

		this.courseName = this.courseInfo.course_info.name
		this.roundNumber = this.courseInfo.round_number
		this.par = info.par
		this.yardage = info.yardage
		this.slope = info.slope
		this.rating = info.rating
		this.teeName = info.tee_name
  }
}
</script>
<style scoped>
.team-text-color {
	color: #ACA885;
}
.team-background-color {
  background-color: #ACA885;
}
.stroke-text-color {
  color: #9FB8CE;
}
.rounded-card {
  margin-top: -25px;
	border-radius: 20px;
  transition: all 0ms cubic-bezier(0.645, 0.045, 0.355, 1);
}
.border-card {
	border-radius: 20px;
  border: 2px solid #999;
  transition: all 0ms cubic-bezier(0.645, 0.045, 0.355, 1);
}
</style>