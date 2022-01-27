<template>
  <v-card flat height="100vh">
    <v-container class="bg">
      <v-layout row>
        <v-flex xs3>
          <BackButton
            :routeName="'MoneyList'"
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
              <h3 class="wrap-info">
                {{ playerName }}
                <br>
                <span class="info-span text-xs-left">
                  Handicap {{ handicapIndex }}
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
                Week's earnings:
                <span>${{  weeksEarnings }}</span>
              </h2>
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
			<v-flex xs6>
				<h3 style="color:#444" class="font-weight-regular">Overall Earnings</h3>
				<h1 class="font-weight-regular">
					${{ overallEarnings }}
				</h1>
			</v-flex>
			<v-flex xs6>
				<h3 style="color:#444" class="font-weight-regular">Every 3 Putts</h3>
				<h1 class="font-weight-regular">
					- ${{ overall3Putts }}
				</h1>
			</v-flex>
    </v-layout>
		<v-layout
			row wrap
			align-center
			class="text-xs-center pt-2 pb-4 mt-2 mb-4 mr-3 ml-3"
			style="background-color:#9FB8CE;border-radius: 10px;"
		>
			<v-flex xs12 class="text-xs-left ml-2">
				<h3 class="white--text pl-2 mb-2 font-weight-regular">Historical Averages</h3>
			</v-flex>
			<v-layout row wrap align-center>
				<v-flex xs12>
					<v-layout row wrap ml-3>
						<v-flex xs3>
							<h1 class="font-weight-regular" style="color:white">
								${{ skins_avg }}
							</h1>
							<h3 style="color:#444" class="font-weight-regular">Skins</h3>
						</v-flex>
						<v-flex xs3>
							<h1 class="font-weight-regular" style="color:white">
								${{ team_avg }}
							</h1>
							<h3 style="color:#444" class="font-weight-regular">Teams</h3>
						</v-flex>
						<v-flex xs3>
							<h1 class="font-weight-regular" style="color:white">
								${{ putting_avg }}
							</h1>
							<h3 style="color:#444" class="font-weight-regular">Putting</h3>
						</v-flex>
						<v-flex xs3>
							<h1 class="font-weight-regular" style="color:white">
								${{ stroke_avg }}
							</h1>
							<h3 style="color:#444" class="font-weight-regular">Stroke</h3>
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
  name: "MoneyPlayerPage",
  components: {
    BackButton
  },
  data () {
    return {
      playerName: "",
      handicapIndex: 0,
      position: 1,
			weeksEarnings: 0,
			skins_avg: 0,
			team_avg: 0,
			putting_avg: 0,
			stroke_avg: 0,
			overallEarnings: 0,
			overall3Putts: 0,
    }
  },

  computed: {
    ...mapState({
      currentTournament: state => state.tournament.currentTournament,
      moneyPlayer: state => state.leaderboards.moneyPlayer,
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
  },

  mounted () {
    this.$store.dispatch('leaderboards/LOAD_MONEY_PLAYER', {
      tournId: this.currentTournament.id,
      id: this.$route.params.leaderboard_id
    }).then(response => {
      this.playerName = this.moneyPlayer.username
      this.handicapIndex = this.moneyPlayer.handicap
      this.position = this.moneyPlayer.money_position
			this.weeksEarnings = this.moneyPlayer.total_money
			this.overallEarnings = this.moneyPlayer.total_winnings
			this.overall3Putts = this.moneyPlayer.overall_three_putts
      this.skins_avg = this.moneyPlayer.skins_avg
			this.team_avg = this.moneyPlayer.team_avg
			this.putting_avg = this.moneyPlayer.putting_avg
			this.stroke_avg = this.moneyPlayer.stroke_avg
    })
  }
}
</script>
<style scoped>
.bg {
  background-color: #f1f1f1;
}
.under-par {
  color: red
}
.wrap-info {
  margin-top: 10px;
  font-weight: 400;
  font-size: 20px;
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
