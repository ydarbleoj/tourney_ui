<template>
  <v-card flat v-if="loading" class="white" color="white"> loading... </v-card>
  <v-card flat v-else>
    <v-container class="bg">
      <v-row>
        <v-col cols="3">
          <BackButton
            :routeName="'SkinsLeaderboard'"
            :routeParams="{ id: currentTournament.id }"
          />
        </v-col>
        <v-col cols="6" class="text-center white--text">
          <h2 style="font-weight:300;">Player Profile</h2>
        </v-col>
      </v-row>
      <v-row>
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
             <v-col cols="7" class="text-left">
              <h2 class="font-weight-regular">Winnings:</h2>
							<h1 class="font-weight-regular" style="font-size:40px;">
								<span style="font-size:28px;margin-right:-7px;color:#666;">$</span>
                {{ totalMoney }}
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
			class="text-center pt-2 pb-4 mt-3 mr-3 ml-3">
			<v-col cols="12" class="text-left ml-2">
				<h2 class="pl-2 mb-2 font-weight-regular">Historical Averages</h2>
			</v-col>
			<v-row align="center">
				<v-col cols="12">
					<v-row>
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
		<h2 class="font-weight-regular pl-4 ml-2 pb-2">This Week</h2>
		<v-row
			align="center"
			class="text-center pt-2 pb-4 mt-2 mb-4 mr-3 ml-3"
			style="background-color:#999;border-radius: 10px;"
		>
			<v-col cols="12" class="text-left ml-2">
				<h3 class="white--text pl-2 mb-2 font-weight-regular">Percentage Won</h3>
			</v-col>
			<v-row align="center">
				<v-col cols="3" class="text-right pl-3">
					<h1 class="font-weight-regular" style="color:#A8C256;font-size:45px;">
						{{ gnr }}%
					</h1>
				</v-col>
				<v-col cols="9">
					<v-row>
						<v-col cols="4">
							<h1 class="font-weight-regular" style="color:white">
								{{ gnr1 }}%
							</h1>
							<h3 style="color:#444" class="font-weight-regular">Round 1</h3>
						</v-col>
						<v-col cols="4">
								<h1 class="font-weight-regular" style="color:white">
								{{ gnr2 }}%
							</h1>
							<h3 style="color:#444" class="font-weight-regular">Round 2</h3>
						</v-col>
						<v-col cols="4">
								<h1 class="font-weight-regular" style="color:white">
								{{ gnr3 }}%
							</h1>
							<h3 style="color:#444" class="font-weight-regular">Round 3</h3>
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
				<h3 class="pl-2 mb-2 font-weight-regular">Holes where magic happend:</h3>
			</v-col>
			<v-row align="center">
				<v-col cols="12">
					<v-row>
						<v-col cols="4">
							<div v-for="(item, index) in round1Holes" :key="index">
								{{ item }}
							</div>
							<h3 style="color:#444" class="font-weight-regular">Round 1</h3>
						</v-col>
						<v-col cols="4">
							<div v-for="(item, index) in round2Holes" :key="index">
								{{ item }}
							</div>
							<h3 style="color:#444" class="font-weight-regular">Round 2</h3>
						</v-col>
						<v-col cols="4">
								<div v-for="(item, index) in round3Holes" :key="index">
									{{ item }}
								</div>
							<h3 style="color:#444" class="font-weight-regular">Round 3</h3>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
    </v-row>
  </v-card>
</template>
<script setup>
import { useTournamentStore } from "@/store/tournament";
import { useLeaderboardsStore } from "@/store/leaderboards";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import BackButton from "@/components/BackButton.vue";

const route = useRoute();
const tournamentStore = useTournamentStore();
const leaderboardsStore = useLeaderboardsStore();

const loading = ref(true);
const playerName = ref("");
const handicapIndex = ref(0);
const position = ref(0);
const movement = ref(0);
const totalMoney = ref(0);
const gnr = ref(0);
const gnr1 = ref(0);
const gnr2 = ref(0);
const gnr3 = ref(0);
const round1Holes = ref([]);
const round2Holes = ref([]);
const round3Holes = ref([]);
const avg1 = ref(0);
const avg2 = ref(0);
const avg3 = ref(0);
const dnf = ref(false);

const currentTournament = tournamentStore.currentTournament;

const getOrdinal = () => {
  let newString = position.value.toString().replace(/[0-9]/g, '');
  return newString
}
const getPosition = () => {
  return position.value
}
const movementUp = () => {
  if (movement.value > 0) {
    return true;
  }
  return false;
};
const movementDown = () => {
  if (!dnf.value) {
    return false;
  }
  if (movement.value < 0) {
    return true;
  }

  return false;
};

onMounted(() => {
  leaderboardsStore
    .loadSkinsPlayer(currentTournament.id, route.params.leaderboard_id)
    .then((response) => {
      playerName.value = leaderboardsStore.skinsPlayer.username;
      handicapIndex.value = leaderboardsStore.skinsPlayer.handicap;
      position.value = leaderboardsStore.skinsPlayer.current_position;
      movement.value = leaderboardsStore.skinsPlayer.movement;
      totalMoney.value = leaderboardsStore.skinsPlayer.total_money;
      gnr.value = leaderboardsStore.skinsPlayer.percentage_won;
      gnr1.value = leaderboardsStore.skinsPlayer.round1_percentage_won;
      gnr2.value = leaderboardsStore.skinsPlayer.round2_percentage_won;
      gnr3.value = leaderboardsStore.skinsPlayer.round3_percentage_won;
      round1Holes.value = leaderboardsStore.skinsPlayer.round1_holes_won;
      round2Holes.value = leaderboardsStore.skinsPlayer.round2_holes_won;
      round3Holes.value = leaderboardsStore.skinsPlayer.round3_holes_won;
      avg1.value = leaderboardsStore.skinsPlayer.round1_skins_average;
      avg2.value = leaderboardsStore.skinsPlayer.round2_skins_average;
      avg3.value = leaderboardsStore.skinsPlayer.round3_skins_average;
      dnf.value = leaderboardsStore.skinsPlayer.dnf;
    })
    .finally(() => {
      loading.value = false;
    });
});
</script>
<style scoped>
.bg {
	background-color: #A8C256;
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
</style>
