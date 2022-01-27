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
                Status:
                <span class="white--text">{{ getStatus() }}</span>
              </h2>
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
		<h2 class="font-weight-regular pl-4 ml-2 pb-3 pt-2">Weekly Averages</h2>
		<v-layout
			row wrap
			align-center
			class="text-xs-center pt-2 pb-4 mt-2 mb-4 mr-3 ml-3"
			style="background-color:#999;border-radius: 10px;"
		>
			<v-flex xs12 class="text-xs-left ml-2">
				<h3 class="white--text pl-2 mb-2 font-weight-regular">Greens in Reg</h3>
			</v-flex>
			<v-layout row wrap align-center>
				<v-flex xs3 class="text-xs-right pl-3">
					<h1 class="font-weight-regular" style="color:#74C9D7;font-size:45px;">
						{{ gnr }}%
					</h1>
				</v-flex>
				<v-flex xs9>
					<v-layout row wrap ml-3>
						<v-flex xs4>
							<h1 class="font-weight-regular" style="color:white">
								{{ gnr1 }}%
							</h1>
							<h3 style="color:#444" class="font-weight-regular">Round 1</h3>
						</v-flex>
						<v-flex xs4>
								<h1 class="font-weight-regular" style="color:white">
								{{ gnr2 }}%
							</h1>
							<h3 style="color:#444" class="font-weight-regular">Round 2</h3>
						</v-flex>
						<v-flex xs4>
								<h1 class="font-weight-regular" style="color:white">
								{{ gnr3 }}%
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
			class="text-xs-center pt-2 pb-4 mt-2 mb-5 mr-3 ml-3"
		>
			<v-flex xs12 class="text-xs-left ml-2">
				<h3 class="pl-2 mb-2 font-weight-regular">Broken down by Par:</h3>
			</v-flex>
			<v-layout row wrap align-center>
				<v-flex xs12>
					<v-layout row wrap ml-3>
						<v-flex xs4>
							<h1 class="font-weight-regular" :class="[par3Avg < 3 ? 'under-par' : '']">
								{{ par3Avg }}
							</h1>
							<h3 style="color:#444" class="font-weight-regular">Par 3's</h3>
						</v-flex>
						<v-flex xs4>
								<h1 class="font-weight-regular" :class="[par4Avg < 4 ? 'under-par' : '']">
								{{ par4Avg }}
							</h1>
							<h3 style="color:#444" class="font-weight-regular">Par 4's</h3>
						</v-flex>
						<v-flex xs4>
								<h1 class="font-weight-regular" :class="[par5Avg < 5 ? 'under-par' : '']">
								{{ par5Avg }}
							</h1>
							<h3 style="color:#444" class="font-weight-regular">Par 5's</h3>
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
  name: "StrokePlayerPage",
  components: {
    BackButton
  },
  data () {
    return {
      playerName: "",
      handicapIndex: 0,
      position: 1,
			gnr: 0,
			gnr1: 0,
			gnr2: 0,
			gnr3: 0,
			par3Avg: 0,
			par4Avg: 0,
			par5Avg: 0,
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
    this.$store.dispatch('leaderboards/LOAD_STROKE_PLAYER', {
      tournId: this.currentTournament.id,
      id: this.$route.params.leaderboard_id
    }).then(response => {
      this.playerName = this.strokePlayer.username
      this.handicapIndex = this.strokePlayer.handicap
      this.position = this.strokePlayer.current_position
			this.gnr = this.strokePlayer.greens_in_reg
      this.gnr1 = this.strokePlayer.round1_gnr
      this.gnr2 = this.strokePlayer.round2_gnr
      this.gnr3 = this.strokePlayer.round3_gnr
      this.par3Avg = this.strokePlayer.par3_average
      this.par4Avg = this.strokePlayer.par4_average
      this.par5Avg = this.strokePlayer.par5_average
      this.avg1 = this.strokePlayer.round1_average
      this.avg2 = this.strokePlayer.round2_average
      this.avg3 = this.strokePlayer.round3_average

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
