<template>
   <v-card flat v-if="loading" class="white" color="white"> loading... </v-card>
  <v-card flat v-else>
    <v-container class="">
      <v-row>
        <v-col cols="3">
          <BackButton
            :routeName="'MoneyList'"
            :routeParams="{ id: this.currentTournament.id }"
          />
        </v-col>
        <v-col cols="6" class="text-center">
          <h2 style="font-weight:300;">Player Profile</h2>
        </v-col>
      </v-row>
      <v-row class="mt-3">
        <v-col cols="12">
          <v-row align="center">
            <v-col cols="9">
              <img src="/static/sand.jpg" class="profile-image" align="left" />
              <h3 class="wrap-info">
                {{ playerName }}
                <br>
                <span class="info-span text-left">
                  Handicap {{ handicapIndex }}
                </span>
              </h3>
						</v-col>
            <v-col cols="3" class="text-center pr-5">
              <div class="place-wrap">
                <h1 style="font-weight:300;font-size:60px;color:#F8C977">
                  {{ getPosition() }}
                  <span>{{ getOrdinal() }}</span>
                </h1>
              </div>
            </v-col>
					</v-row>
          <v-row align="end">
             <v-col cols="7" class="text-left">
              <h2 style="font-weight:400;">
                Week's earnings:
                <span>${{  weeksEarnings }}</span>
              </h2>
            </v-col>
          </v-row>
				</v-col>
			</v-row>
		</v-container>
    <v-row
			row wrap
			align="center"
			class="text-center pt-2 pb-4 mt-3 mr-3 ml-3"
		>
			<v-col cols="6">
				<h3 style="color:#444" class="font-weight-regular">Overall Earnings</h3>
				<h1 class="font-weight-regular">
					${{ overallEarnings }}
				</h1>
			</v-col>
			<v-col cols="6">
				<h3 style="color:#444" class="font-weight-regular">Every 3 Putts</h3>
				<h1 class="font-weight-regular">
					- ${{ overall3Putts }}
				</h1>
			</v-col>
    </v-row>
		<v-row
			row wrap
			align="center"
			class="text-center pt-2 pb-4 mt-2 mb-4 mr-3 ml-3"
			style="background-color:#9FB8CE;border-radius: 10px;"
		>
			<v-col cols="12" class="text-left ml-2">
				<h3 class="white--text pl-2 mb-2 font-weight-regular">Historical Averages</h3>
			</v-col>
			<v-row wrap align="center">
				<v-col cols="12">
					<v-row wrap ml-3>
						<v-col cols="3">
							<h1 class="font-weight-regular" style="color:white">
								${{ skins_avg }}
							</h1>
							<h3 style="color:#444" class="font-weight-regular">Skins</h3>
						</v-col>
						<v-col cols="3">
							<h1 class="font-weight-regular" style="color:white">
								${{ team_avg }}
							</h1>
							<h3 style="color:#444" class="font-weight-regular">Teams</h3>
						</v-col>
						<v-col cols="3">
							<h1 class="font-weight-regular" style="color:white">
								${{ putting_avg }}
							</h1>
							<h3 style="color:#444" class="font-weight-regular">Putting</h3>
						</v-col>
						<v-col cols="3">
							<h1 class="font-weight-regular" style="color:white">
								${{ stroke_avg }}
							</h1>
							<h3 style="color:#444" class="font-weight-regular">Stroke</h3>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
    </v-row>
  </v-card>
</template>
<script>
import { mapState } from "pinia";
import { mapActions } from "pinia";
import { useTournamentStore } from "@/store/tournament";
import { useLeaderboardsStore } from "@/store/leaderboards";
import BackButton from "@/components/BackButton.vue";

export default {
  name: "MoneyPlayerPage",
  components: {
    BackButton
  },
  data () {
    return {
      loading: true,
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
    ...mapState(useTournamentStore, ["currentTournament"]),
    ...mapState(useLeaderboardsStore, ["moneyPlayer"]),
  },

  methods: {
    ...mapActions(useLeaderboardsStore, ["loadMoneyPlayer"]),
    getOrdinal () {
      let newString = this.position.toString().replace(/[0-9]/g, '');
      return newString
    },
    getPosition () {
      return parseInt(this.position)
    },
  },

  mounted () {
    const tournId = this.$route.params.id
    const id = this.$route.params.leaderboard_id

    this.loadMoneyPlayer(tournId, id).then(response => {
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
      this.loading = false
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
