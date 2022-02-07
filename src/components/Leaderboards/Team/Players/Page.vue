<template>
  <v-card flat height="100vh">
    <v-container class="bg">
      <v-layout row>
        <v-flex xs3>
          <BackButton
            :routeName="'StrokeLeaderboard'"
            :routeParams="{ id: this.currentTournament.id }"
          />
        </v-flex>
        <v-flex xs6 class="text-xs-center white--text">
          <h2 style="font-weight:300;">Player Profile</h2>
        </v-flex>
      </v-layout>
      <v-layout row mt-3>
        <v-flex xs12>
          <v-layout row align-center>
            <v-flex xs9>
              <img src="/static/sand.jpg" class="profile-image" align="left" />
              <h3 class="wrap-info">
                {{ this.playerName }}
                <br>
                <span class="info-span text-xs-left">
                  Handicap {{ this.handicapIndex }}
                </span>
              </h3>
						</v-flex>
            <v-flex xs3 class="text-xs-center pr-5">
              <div class="place-wrap">
                <h1 style="font-weight:300;font-size:60px;color:#F8C977">
                  {{ getPosition() }}
                  <span>{{ getOrdinal() }}</span>
                </h1>
              </div>
            </v-flex>
					</v-layout>
          <v-layout row align-end mt-3>
             <v-flex xs7 class="text-xs-left">
              <h2 style="font-weight:400;">
                Wins this year:
                <span class="white--text">{{ totalWins }}</span>
              </h2>
            </v-flex>
						<v-flex xs5 class="text-xs-center">
						</v-flex>
          </v-layout>
				</v-flex>
			</v-layout>
		</v-container>
		<v-layout
        row wrap
        align-center
        class="text-xs-center pt-2 pb-4"
      >
        <v-flex xs6>
          <h3 class="font-weight-regular">Average Wins</h3>
          <h1 style="color:#666">{{ avgWins }}</h1>
        </v-flex>
        <v-flex xs6>
          <h3 class="font-weight-regular">Avg Impact</h3>
          <h1 style="color:#666">{{ avgImpact }}%</h1>
        </v-flex>
    </v-layout>
		<v-layout
			row wrap
			align-center
			class="text-xs-center pt-2 pb-4 mt-2 mb-4 mr-3 ml-3"
			style="background-color:#999;border-radius: 10px;"
		>
			<v-flex xs12 class="text-xs-left ml-2">
				<h3 class="white--text pl-2 mb-2 font-weight-regular">Week's Impact</h3>
			</v-flex>
			<v-layout row wrap align-center>
				<v-flex xs3 class="text-xs-right pl-3">
					<h1 class="font-weight-regular" style="color:#74C9D7;font-size:45px;">
						{{ yearsImpact }}%
					</h1>
				</v-flex>
				<v-flex xs9>
					<v-layout row wrap ml-3>
						<v-flex xs4>
							<h1 class="font-weight-regular" style="color:white">
								{{ round1Impact }}%
							</h1>
							<h3 style="color:#444" class="font-weight-regular">Round 1</h3>
						</v-flex>
						<v-flex xs4>
								<h1 class="font-weight-regular" style="color:white">
								{{ round2Impact }}%
							</h1>
							<h3 style="color:#444" class="font-weight-regular">Round 2</h3>
						</v-flex>
						<v-flex xs4>
								<h1 class="font-weight-regular" style="color:white">
								{{ round3Impact }}%
							</h1>
							<h3 style="color:#444" class="font-weight-regular">Round 3</h3>
						</v-flex>
					</v-layout>
				</v-flex>
			</v-layout>
    </v-layout>
		<v-layout
			row wrap
			align-center
			class="text-xs-center pt-2 pb-4 mt-3 mr-3 ml-3"
		>
			<v-flex xs12 class="text-xs-left ml-2">
				<h2 class="pl-2 mb-2 font-weight-regular">Historical Impact by Course: </h2>
			</v-flex>
			<v-layout row wrap align-center>
				<v-flex xs12>
					<v-layout row wrap ml-3>
						<v-flex xs4>
							<h1 class="font-weight-regular">
								{{ course1Impact }}
							</h1>
							<h3 style="color:#444" class="font-weight-regular">{{ round1CourseName }}</h3>
						</v-flex>
						<v-flex xs4>
								<h1 class="font-weight-regular">
								{{ course2Impact }}
							</h1>
							<h3 style="color:#444" class="font-weight-regular">{{ round2CourseName }}</h3>
						</v-flex>
						<v-flex xs4>
								<h1 class="font-weight-regular">
								{{ course3Impact }}
							</h1>
							<h3 style="color:#444" class="font-weight-regular">{{ round3CourseName }}</h3>
						</v-flex>
					</v-layout>
				</v-flex>
			</v-layout>
    </v-layout>
  </v-card>
</template>
<script>
import { mapState } from 'vuex'
import BackButton from '../../../BackButton'

export default {
  name: "PlayerTeamPage",
  components: {
    BackButton
  },
  data () {
    return {
      playerName: "",
      handicapIndex: 0,
      position: 1,
			totalWins: 0,
			avgWins: 0,
			avgImpact: 0,
			round1Impact: 0,
			round2Impact: 0,
			round3Impact: 0,
			course1Impact: 0,
			course2Impact: 0,
			course3Impact: 0,
			round1CourseName: '',
			round2CourseName: '',
			round3CourseName: ''
    }
  },

  computed: {
    ...mapState({
      currentTournament: state => state.tournament.currentTournament,
      playerTeamPage: state => state.leaderboards.team.playerTeamPage,
    })
  },

  methods: {
    getOrdinal () {
      let newString = this.position.toString().replace(/[0-9]/g, '');
      return newString
    },
    getPosition () {
      return parseInt(this.position)
    },
		movementUp () {
      if (this.strokePlayer.movement > 0) { return true }
    },
    movementDown () {
      if (this.strokePlayer.dnf) { return false }
      if (this.strokePlayer.movement < 0) { return true }
    },
  },

  mounted () {
    this.$store.dispatch('leaderboards/team/LOAD_PLAYER_TEAM_PAGE', {
      tournId: this.currentTournament.id,
      id: this.$route.params.leaderboard_id
    }).then(response => {
      this.playerName = this.playerTeamPage.username
      this.handicapIndex = this.playerTeamPage.handicap
      this.position = this.playerTeamPage.team_position
			this.avgWins = this.playerTeamPage.average_wins
			this.avgImpact = this.playerTeamPage.average_impact

    })
  }
}
</script>
<style lang="scss" scoped>
.bg {
  background-color: #449ce9;
	background-color: #9FB8CE;
}
.under-par {
  color: red
}
.wrap-info {
  margin-top: 10px;
  font-weight: 400;
  font-size: 20px;
  color: white;
}
.info-span {
  font-size: 15px;
}
.profile-image {
  height: 75px;
  width: 75px;
  border-radius: 25px;
  margin-right: 10px;
}
.place-wrap {
  position: relative;
  display: inline-block;
}
.place-wrap span {
  position: absolute;
  font-size: 35px;
  margin-top: 10px;
}
</style>
