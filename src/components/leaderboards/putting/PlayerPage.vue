<template>
  <v-card flat v-if="loading" class="white" color="white"> loading... </v-card>
  <v-card flat v-else>
    <v-container class="bg">
      <v-row>
        <v-col cols="3">
          <BackButton
            :routeName="'PuttingLeaderboard'"
            :routeParams="{ id: currentTournament.id }"
          />
        </v-col>
        <v-col cols="6" class="text-center">
          <h2 style="font-weight:300;">Player Profile</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-row align="center">
            <v-col cols="8">
              <img src="/static/sand.jpg" class="profile-image" align="left" />
              <h3 class="wrap-info" style="color:#333">
                {{ playerName }}
                <br>
                <span class="info-span text-left">
                  Handicap {{ handicapIndex }}
                </span>
              </h3>
						</v-col>
            <v-col cols="3" class="text-center pr-5">
              <div class="place-wrap">
                <h1 style="font-weight:300;font-size:60px;color:#333">
                  {{ getPosition() }}
                  <span>{{ getOrdinal() }}</span>
                </h1>
                <h3 class="bandon-dark-color">Movement</h3>
                <h1 style="font-size: 30px" class="default-color font-weight-regular">
                  <v-icon v-if="movementUp()" color="green" style="font-size: 40px">
                    mdi-arrow-up
                  </v-icon>
                  <v-icon v-if="movementDown()" color="red" style="font-size: 40px">
                    mdi-arrow-down
                  </v-icon>
                  {{ movement }}
                </h1>
              </div>
            </v-col>
					</v-row>
          <v-row align="end">
             <v-col cols="7" class="text-left pt-2">
              <h2 style="font-weight:400;">
                3 Putt Pot Donations:
              </h2>
              <h1 class="font-weight-regular" style="font-size:40px;">
								<span style="font-size:28px;margin-right:-8px;color:#666;">$</span>
                {{ total3Putts }}
              </h1>
            </v-col>
						<v-col cols="5" class="text-center">
						</v-col>
          </v-row>
				</v-col>
			</v-row>
		</v-container>
    <v-row
			align="center"
			class="text-center pt-2 pb-4 mt-3 mr-3 ml-3"
		>
			<v-col cols="12" class="text-left ml-2">
				<h2 class="pl-2 mb-2 font-weight-regular">Historical Averages</h2>
			</v-col>
			<v-row align="center">
				<v-col cols="12">
					<v-row wrap ml-3>
						<v-col cols="4">
							<h1 class="font-weight-regular">
								{{ avg1 }}
							</h1>
							<h3 style="color:#444" class="font-weight-regular">Round 1</h3>
						</v-col>
						<v-col cols="4">
								<h1 class="font-weight-regular">
								{{ avg2 }}
							</h1>
							<h3 style="color:#444" class="font-weight-regular">Round 2</h3>
						</v-col>
						<v-col cols="4">
								<h1 class="font-weight-regular">
								{{ avg3 }}
							</h1>
							<h3 style="color:#444" class="font-weight-regular">Round 3</h3>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
    </v-row>
		<v-row
			align="center"
			class="border-card text-center pt-2 pb-2 mt-2 mb-4 mr-3 ml-3"
		>
			<v-col cols="12" class="text-left ml-2">
				<h2 class="pl-2 pt-2 font-weight-regular white--text">3 Putts a Round</h2>
			</v-col>
			<v-row wrap align="center">
				<v-col cols="3" class="text-center pl-3">
					<h1 class="font-weight-regular" style="color:#74C9D7;font-size:50px;">
						{{ threePuttAvg }}
					</h1>
				</v-col>
				<v-col cols="9">
					<v-row wrap>
						<v-col cols="4">
							<h1 class="font-weight-regular white--text">
								{{ threePuttAvg1 }}
							</h1>
							<h3 style="color:#999" class="font-weight-medium">Round 1</h3>
						</v-col>
						<v-col cols="4">
								<h1 class="font-weight-regular white--text">
								{{ threePuttAvg2 }}
							</h1>
							<h3 style="color:#999" class="font-weight-medium">Round 2</h3>
						</v-col>
						<v-col cols="4">
								<h1 class="font-weight-regular white--text">
								{{ threePuttAvg3 }}
							</h1>
							<h3 style="color:#999" class="font-weight-medium">Round 3</h3>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
    </v-row>
    <v-row
			align="center"
			class="text-center pt-2 pb-5 mt-2 mb-5 mr-3 ml-3"
		>
			<v-col cols="12" class="text-left ml-2">
				<h2 class="pl-2 mb-3 font-weight-regular">This Week's Scrambling</h2>
			</v-col>
			<v-row align="center">
				<v-col cols="3" class="text-right pl-3">
					<h1 class="font-weight-regular" style="color:#9FB8CE;font-size:45px;">
						{{ scramble }}%
					</h1>
				</v-col>
				<v-col cols="9">
					<v-row>
						<v-col cols="4">
							<h1 class="font-weight-regular">
								{{ scramble1 }}%
							</h1>
							<h3 style="color:#666" class="font-weight-regular">Round 1</h3>
						</v-col>
						<v-col cols="4">
								<h1 class="font-weight-regular">
								{{ scramble2 }}%
							</h1>
							<h3 style="color:#666" class="font-weight-regular">Round 2</h3>
						</v-col>
						<v-col cols="4">
								<h1 class="font-weight-regular">
								{{ scramble3 }}%
							</h1>
							<h3 style="color:#666" class="font-weight-regular">Round 3</h3>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
    </v-row>
  </v-card>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useTournamentStore } from "@/store/tournament";
import { useLeaderboardsStore } from "@/store/leaderboards";
import BackButton from "@/components/BackButton.vue";

const route = useRoute();
const tournamentStore = useTournamentStore();
const leaderboardsStore = useLeaderboardsStore();

const player = ref(null);
const loading = ref(true);
const playerName = ref("");
const movement = ref(0);
const handicapIndex = ref(0);
const position = ref(1);
const total3Putts = ref(0);
const threePuttAvg = ref(0);
const threePuttAvg1 = ref(0);
const threePuttAvg2 = ref(0);
const threePuttAvg3 = ref(0);
const scramble = ref(0);
const scramble1 = ref(0);
const scramble2 = ref(0);
const scramble3 = ref(0);
const avg1 = ref(0);
const avg2 = ref(0);
const avg3 = ref(0);

const currentTournament = tournamentStore.currentTournament;

const getOrdinal = () => {
  let newString = position.value.toString().replace(/[0-9]/g, "");
  return newString;
};
const getPosition = () => {
  return parseInt(position.value);
};
const movementUp = () => {
  if (player.value && player.value.movement > 0) {
    return true;
  }
  return false;
};

const movementDown = () => {
  if (player.value) {
    if (player.value.dnf) {
      return false;
    }
    if (player.value.movement < 0) {
      return true;
    }
  }
  return false;
};

onMounted(() => {
  leaderboardsStore
    .loadPuttingPlayer(currentTournament.id, route.params.leaderboard_id)
    .then((response) => {
      const puttingPlayer = leaderboardsStore.puttingPlayer;
      player.value = puttingPlayer;

      playerName.value = puttingPlayer.username;
      handicapIndex.value = puttingPlayer.handicap;
      position.value = puttingPlayer.current_position;
      threePuttAvg.value = puttingPlayer.three_putt_average;
      threePuttAvg1.value = puttingPlayer.round1_3putt_average;
      threePuttAvg2.value = puttingPlayer.round2_3putt_average;
      threePuttAvg3.value = puttingPlayer.round3_3putt_average;
      scramble.value = puttingPlayer.scrambling;
      scramble1.value = puttingPlayer.round1_scrambling;
      scramble2.value = puttingPlayer.round2_scrambling;
      scramble3.value = puttingPlayer.round3_scrambling;
      avg1.value = puttingPlayer.round1_putting_average;
      avg2.value = puttingPlayer.round2_putting_average;
      avg3.value = puttingPlayer.round3_putting_average;
      total3Putts.value = puttingPlayer.total_3_putts;
      movement.value = puttingPlayer.movement;
    })
    .finally(() => {
      loading.value = false;
    });
});
</script>
<style scoped>
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
</style>
