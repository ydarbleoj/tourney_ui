<template>
  <v-card flat height="100vh">
    <v-container class="bg">
      <v-layout row>
        <v-flex xs3>
          <BackButton
            :routeName="'PuttingLeaderboard'"
            :routeParams="{ id: this.currentTournament.id }"
          />
        </v-flex>
        <v-flex xs6 class="text-xs-center">
          <h2 style="font-weight:300;">Player Profile</h2>
        </v-flex>
      </v-layout>
      <v-layout row mt-3>
        <v-flex xs12>
          <v-layout row align-center>
            <v-flex xs9>
              <img src="/static/sand.jpg" class="profile-image" align="left" />
              <h3 class="wrap-info" style="color:#333">
                {{ this.playerName }}
                <br>
                <span class="info-span text-xs-left">
                  Handicap {{ this.handicapIndex }}
                </span>
              </h3>
						</v-flex>
            <v-flex xs3 class="text-xs-center pr-5">
              <div class="place-wrap">
                <h1 style="font-weight:300;font-size:60px;color:#333">
                  {{ getPosition() }}
                  <span>{{ getOrdinal() }}</span>
                </h1>
              </div>
            </v-flex>
					</v-layout>
          <v-layout row align-end mt-3>
             <v-flex xs7 class="text-xs-left pt-2">
              <h2 style="font-weight:400;">
                3 Putt Pot Donations:
              </h2>
              <h1 class="font-weight-regular" style="font-size:40px;">
								<span style="font-size:28px;margin-right:-8px;color:#666;">$</span>
                {{ total3Putts }}
              </h1>
            </v-flex>
						<v-flex xs5 class="text-xs-center">
							<h1 style="color:#fff;font-size:40px;" class="font-weight-regular">
								<v-icon v-if="movementUp()" color="green" style="font-size:50px;">
									mdi-arrow-up
								</v-icon>
								<v-icon v-if="movementDown()" color="red" style="font-size:50px;">
									mdi-arrow-down
								</v-icon>
								{{
									( this.strokePlayer.movement == 0 || this.strokePlayer.dnf) ? '' : this.strokePlayer.movement
								}}
							</h1>
						</v-flex>
          </v-layout>
				</v-flex>
			</v-layout>
		</v-container>
    <v-layout
			row wrap
			align-center
			class="text-xs-center pt-2 pb-4 mt-3 mr-3 ml-3"
		>
			<v-flex xs12 class="text-xs-left ml-2">
				<h2 class="pl-2 mb-2 font-weight-regular">Historical Averages</h2>
			</v-flex>
			<v-layout row wrap align-center>
				<v-flex xs12>
					<v-layout row wrap ml-3>
						<v-flex xs4>
							<h1 class="font-weight-regular">
								{{ avg1 }}
							</h1>
							<h3 style="color:#444" class="font-weight-regular">Round 1</h3>
						</v-flex>
						<v-flex xs4>
								<h1 class="font-weight-regular">
								{{ avg2 }}
							</h1>
							<h3 style="color:#444" class="font-weight-regular">Round 2</h3>
						</v-flex>
						<v-flex xs4>
								<h1 class="font-weight-regular">
								{{ avg3 }}
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
			class="border-card text-xs-center pt-2 pb-2 mt-2 mb-4 mr-3 ml-3"
		>
			<v-flex xs12 class="text-xs-left ml-2">
				<h2 class="pl-2 pt-2 font-weight-regular white--text">3 Putts a Round</h2>
			</v-flex>
			<v-layout row wrap align-center>
				<v-flex xs3 class="text-xs-center pl-3">
					<h1 class="font-weight-regular" style="color:#74C9D7;font-size:50px;">
						{{ threePuttAvg }}
					</h1>
				</v-flex>
				<v-flex xs9>
					<v-layout row wrap>
						<v-flex xs4>
							<h1 class="font-weight-regular white--text">
								{{ threePuttAvg1 }}
							</h1>
							<h3 style="color:#999" class="font-weight-medium">Round 1</h3>
						</v-flex>
						<v-flex xs4>
								<h1 class="font-weight-regular white--text">
								{{ threePuttAvg2 }}
							</h1>
							<h3 style="color:#999" class="font-weight-medium">Round 2</h3>
						</v-flex>
						<v-flex xs4>
								<h1 class="font-weight-regular white--text">
								{{ threePuttAvg3 }}
							</h1>
							<h3 style="color:#999" class="font-weight-medium">Round 3</h3>
						</v-flex>
					</v-layout>
				</v-flex>
			</v-layout>
    </v-layout>
    <v-layout
			row wrap
			align-center
			class="text-xs-center pt-2 pb-5 mt-2 mb-5 mr-3 ml-3"
		>
			<v-flex xs12 class="text-xs-left ml-2">
				<h2 class="pl-2 mb-3 font-weight-regular">This Week's Scrambling</h2>
			</v-flex>
			<v-layout row wrap align-center>
				<v-flex xs3 class="text-xs-right pl-3">
					<h1 class="font-weight-regular" style="color:#9FB8CE;font-size:45px;">
						{{ scramble }}%
					</h1>
				</v-flex>
				<v-flex xs9>
					<v-layout row wrap ml-3>
						<v-flex xs4>
							<h1 class="font-weight-regular">
								{{ scramble1 }}%
							</h1>
							<h3 style="color:#666" class="font-weight-regular">Round 1</h3>
						</v-flex>
						<v-flex xs4>
								<h1 class="font-weight-regular">
								{{ scramble2 }}%
							</h1>
							<h3 style="color:#666" class="font-weight-regular">Round 2</h3>
						</v-flex>
						<v-flex xs4>
								<h1 class="font-weight-regular">
								{{ scramble3 }}%
							</h1>
							<h3 style="color:#666" class="font-weight-regular">Round 3</h3>
						</v-flex>
					</v-layout>
				</v-flex>
			</v-layout>
    </v-layout>
  </v-card>
</template>
<script>
import { mapState } from 'vuex'
import BackButton from '../../BackButton'

export default {
  name: "PuttingPlayerPage",
  components: {
    BackButton
  },
  data () {
    return {
      playerName: "",
      handicapIndex: 0,
      position: 1,
      total3Putts: 0,
			threePuttAvg: 0,
			threePuttAvg1: 0,
			threePuttAvg2: 0,
			threePuttAvg3: 0,
			scramble: 0,
			scramble1: 0,
			scramble2: 0,
			scramble3: 0,
      avg1: 0,
      avg2: 0,
      avg3: 0
    }
  },

  computed: {
    ...mapState({
      currentTournament: state => state.tournament.currentTournament,
      strokePlayer: state => state.leaderboards.strokePlayer,
    })
  },

  methods: {
    getStatus () {
      const status = this.strokePlayer.dnf ? "DNF" : "Active";
      return status
    },
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
    this.$store.dispatch('leaderboards/LOAD_PUTTING_PLAYER', {
      tournId: this.currentTournament.id,
      id: this.$route.params.leaderboard_id
    }).then(response => {
      console.log("hi", this.strokePlayer)
      this.playerName = this.strokePlayer.username
      this.handicapIndex = this.strokePlayer.handicap
      this.position = this.strokePlayer.current_position
			this.threePuttAvg = this.strokePlayer.three_putt_average
      this.threePuttAvg1 = this.strokePlayer.round1_3putt_average
      this.threePuttAvg2 = this.strokePlayer.round2_3putt_average
      this.threePuttAvg3 = this.strokePlayer.round3_3putt_average
      this.scramble = this.strokePlayer.scrambling
      this.scramble1 = this.strokePlayer.round1_scrambling
      this.scramble2 = this.strokePlayer.round2_scrambling
      this.scramble3 = this.strokePlayer.round3_scrambling
      this.avg1 = this.strokePlayer.round1_putting_average
      this.avg2 = this.strokePlayer.round2_putting_average
      this.avg3 = this.strokePlayer.round3_putting_average
      this.total3Putts = this.strokePlayer.total_3_putts
    })
  }
}
</script>
<style lang="scss" scoped>
.bg {
	 background-color: #FFCB47;
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
  height: 100px;
  width: 100px;
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
.border-card {
	background-color: #666;
	border-radius: 15px;
}
  // border: 3px solid #999;
</style>
