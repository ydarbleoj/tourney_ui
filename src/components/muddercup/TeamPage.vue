<template>
  <v-container class="mb-5">
    <v-row>
      <div>
        <BackButton
          :routeName="'MudderCup'"
          :routeParams="{ id: tournamentId }"
        />
      </div>
    </v-row>
    <v-row>
      <v-col cols="8" class="">
        <h2 class="bandon-dark-color text-left">Team</h2>
        <h1 class="stroke-color" @click="showForm">
          {{ teamName }}
        </h1>
      </v-col>
      <v-col cols="4" class="text-center pt-5 mt-5">
        <h2 class="bandon-orange-color text-h2">{{ points }}</h2>
        <h4 class="text-center">Points</h4>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" class="text-left">
        <h3 class="text-left">Capt: {{ captain }}</h3>
      </v-col>
      <v-col cols="6" class="text-left">
        <h3 class="">Record: {{ record }}</h3>
      </v-col>
    </v-row>

    <v-divider class="mt-5" style="background-color:#cf8018"></v-divider>
    <v-tabs v-model="tab" class="mt-5 custom-tabs" align-tabs="center">
      <v-tab value="one" class="mr-5 custom-tab">
        <h3>Players</h3>
      </v-tab>
      <v-tab value="two" class="ml-5 custom-tab">
        <h3>Matches</h3>
      </v-tab>
    </v-tabs>
    <v-divider class="mt-4" style="background-color:#cf8018"></v-divider>

    <div>
      <v-window v-model="tab">
        <v-window-item value="one">
          <TeamPagePlayers :players="plys" v-if="loadPlayers" />
        </v-window-item>
        <v-window-item value="two">
          <TeamMatches />
        </v-window-item>
      </v-window>
    </div>

    <v-bottom-sheet v-model="sheet">
      <v-card class="money-bg pa-4" style="height:50vh;width: 100%;">
        <v-form @submit.prevent="" class="message-form">
          <v-row align="center" justify="center">
            <v-col cols="12" class="pa-0">
              <v-textarea
                v-model="newName"
                ref="messageInput"
                :placeholder="`Wacka-a-moles`"
                maxlength="27"
                class="pa-0 message-input"
                row="1"
                variant="outlined"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row align="center" justify="center" class="mb-5">
            <v-col cols="12" class="less-neutral-gray">
              <h3 class="underline-text default-color">Available Past Names</h3>

              <h4>John The Baptist</h4>
              <h4>Jacob's Articulating Ladder</h4>
            </v-col>
          </v-row>

          <v-row align="center" justify="center">
            <v-col cols="6" class="text-center">
              <v-btn class="default-bg" style="width:150px;height:75px;border-radius:25px;" @click="updateName">Name It!</v-btn>
            </v-col>
            <v-col cols="6" class="text-center">
              <v-btn class="putting-bg" style="width:150px;height:75px;border-radius:25px;" @click="sheet = false">Cancel</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-bottom-sheet>
  </v-container>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { useMudderCupStore } from "../../store/mudderCup";
import TeamPagePlayers from "./TeamPagePlayers.vue";
import TeamMatches from "./TeamMatches.vue";
import BackButton from '../BackButton.vue'

library.add(faTrophy);

export default {
  name: "TeamPage",
  components: {
    BackButton,
    FontAwesomeIcon,
    TeamPagePlayers,
    TeamMatches
  },
  setup() {
    const mudderCupStore = useMudderCupStore();

    const router = useRouter();
    const route = useRoute();
    const tournamentId = route.params.id;
    const captainId = route.params.team_id;

    onMounted(() => {
      const captainId = route.params.team_id
      mudderCupStore.loadCupTeam(tournamentId, captainId).then(() => {
        const team = mudderCupStore.cupTeam;
        const name = team.team_name

        if (name !== null) {
          teamName.value = name;
        }

        year.value = team.year;
        plys.value = team.players;
        captain.value = team.captain;
        record.value = team.record;
        loadPlayers.value = true;
      });
    });

    function updateName () {
      mudderCupStore.updateTeamName(tournamentId, captainId, newName.value).then(() => {
        teamName.value = newName.value;
        sheet.value = false;
      });
    }

    function showForm() {
      sheet.value = true;
    }

    const captain = ref("");
    const teamName = ref("Can I interest you in Jacob's Articulating Ladder?");
    const year = ref("2020");
    const points = ref(0);
    const record = ref("")
    const loadPlayers = ref(false);
    const loadMatches = ref(false);
    const viewPlayers = ref(true);
    const viewMatches = ref(false);
    const tab = ref(null);
    const sheet = ref(false);
    const showNameLink = ref(false);
    const newName = ref("");

    const plys = ref([]);
    return {
      captain,
      loadMatches,
      loadPlayers,
      newName,
      plys,
      points,
      record,
      sheet,
      showForm,
      showNameLink,
      teamName,
      tournamentId,
      viewPlayers,
      viewMatches,
      updateName,
      tab,
      year
    };
  }
}
</script>

<style scoped>
.custom-tabs .v-tab {
  color: grey;
}

.v-tab__slider {
  background-color: #cf8018;
}
.custom-tabs .v-tab--active {
  border-color: transparent;
}
</style>
