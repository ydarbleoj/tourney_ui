<template>
  <v-container class="mt-5 mb-5">
    <v-row class="">
      <v-col cols="12" class="text-center">
        <h2 class="text-h4">{{ year }}</h2>
        <h2 class="text-h4">Mudder Cup</h2>
        <h1 class="neutral-gray text-center">
          <FontAwesomeIcon icon="trophy" />
        </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-right">
        <div v-if="nameOneMissing">
          <h2>{{ firstCaptain }}</h2>
          <h4 class="text-right bandon-orange-color">Captain</h4>
        </div>
        <div v-else>
          <h1 class="text-h3 stroke-color text-center">{{ teamOneScore }}</h1>
          <h2 class="text-center">{{ teamOneName }}</h2>
        </div>
      </v-col>
      <v-col cols="1" class="text-center pt-5">
        <h2></h2>
        <h3 class="pt-3">VS</h3>
      </v-col>
      <v-col class="text-left">
        <div v-if="nameTwoMissing">
          <h2>{{ secondCaptain }}</h2>
          <h4 class="text-right bandon-orange-color">Captain</h4>
        </div>
        <div v-else>
          <h1 class="text-h3 alt-putting-color text-center">{{ teamTwoScore }}</h1>
          <h2 class="text-center">{{ teamTwoName }}</h2>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <div class="text-left" @click="toTeamPage(firstCaptainId)">
          <v-icon color="#666"> mdi-chevron-left</v-icon>
          <span style="font-size:16px">Team Page</span>
        </div>
      </v-col>
      <v-col cols="6">
        <div class="text-right" @click="toTeamPage(secondCaptainId)">
          <span class="" style="font-size:16px">Team Page</span>
          <v-icon color="#666"> mdi-chevron-right</v-icon>
        </div>
      </v-col>
    </v-row>
    <v-divider class="mt-5" style="background-color:#cf8018"></v-divider>
    <v-row>
      <v-col cols="12" class="" v-if="!renderMatches">
        <h3 class="text-left mt-5 pb-5">This Year's Picks</h3>
        <PreTournament :players="plys" :captainIds="captIds" @playerAdded="removePlayer" v-if="loadPlayers"/>
      </v-col>
      <v-col cols="12" class="" v-else>
        <MainMatches />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { useMudderCupStore } from "../../store/mudderCup";
import PreTournament from "./PreTournament.vue";
import MainMatches from "./MainPageMatches.vue";

library.add(faTrophy);

export default {
  name: "MainPage",
  components: {
    FontAwesomeIcon,
    MainMatches,
    PreTournament
  },
  setup() {
    const mudderCupStore = useMudderCupStore();

    const router = useRouter();
    const route = useRoute();
    const tournamentId = route.params.id;

    function loadPreChoosingPlayers () {
      const players = mudderCupStore.players;

      year.value = players.year;
      firstCaptain.value = players.captain_one;
      firstCaptainId.value = players.captain_one_id;
      if (players.name_one !== null) {
        teamOneName.value = players.name_one;
        nameOneMissing.value = false;
      }
      if (players.name_two !== null) {
        teamTwoName.value = players.name_two;
        nameTwoMissing.value = false;
      }

      secondCaptain.value = players.captain_two;
      secondCaptainId.value = players.captain_two_id;

      captIds.value = [players.captain_one_id, players.captain_two_id];
      plys.value = players.players;
      loadPlayers.value = true;
    }

    function loadMatches () {
      const matches = mudderCupStore.matches;

      firstCaptainId.value = matches.captain_one_id;
      secondCaptainId.value = matches.captain_two_id;

      teamOneName.value = matches.name_one;
      teamTwoName.value = matches.name_two;
      nameOneMissing.value = false;
      nameTwoMissing.value = false;
      year.value = matches.year;
      teamOneScore.value = matches.team_one_points;
      teamTwoScore.value = matches.team_two_points;

      teamOneName.value = matches.name_one;
      teamTwoName.value = matches.name_two;
    }

    onMounted(() => {
      mudderCupStore.loadPlayers(tournamentId).then(() => {
        if (mudderCupStore.choosingOver) {
          loadMatches();
          renderMatches.value = true;
        } else {
          loadPreChoosingPlayers();
        }
      });
    });

    function removePlayer(playerId) {
      const players = mudderCupStore.players;

      plys.value = players.players;
    }

    function toTeamPage(captainId) {
      router.push({
        name: "MudderCupTeam",
        params: {
          id: tournamentId,
          team_id: captainId
        }
      });
    }

    const firstCaptain = ref("");
    const teamOneScore = ref(0);
    const teamTwoScore = ref(0);
    const firstCaptainId = ref("");
    const nameOneMissing = ref(true);
    const teamOneName = ref(null);
    const secondCaptain = ref("");
    const secondCaptainId = ref("");
    const teamTwoName = ref(null);
    const nameTwoMissing = ref(true);
    const year = ref("2020");
    const captIds = ref(null);
    const loadPlayers = ref(false);
    const renderMatches = ref(false);
    const oneMatches = ref([]);
    const twoMatches = ref([]);

    const plys = ref([]);
    return {
      captIds,
      loadPlayers,
      plys,
      firstCaptain,
      firstCaptainId,
      nameOneMissing,
      nameTwoMissing,
      oneMatches,
      removePlayer,
      renderMatches,
      secondCaptain,
      secondCaptainId,
      teamOneName,
      teamTwoName,
      teamOneScore,
      teamTwoScore,
      toTeamPage,
      twoMatches,
      year
    };

  }
}
</script>

<style scoped>
</style>
