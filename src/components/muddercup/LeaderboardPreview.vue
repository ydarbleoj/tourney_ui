<template>
  <div class="mb-5">
    <v-row justify="center">
      <v-col cols="12" class="text-center">
        <h2 class="text-h4">Mudder Cup</h2>
        <h1 class="neutral-gray text-center">
          <FontAwesomeIcon icon="trophy" />
        </h1>
      </v-col>
    </v-row>
    <v-row v-if="beforeChoosing">
      <v-col cols="5" class="text-right">
        <h2>{{ firstCaptain }}</h2>
        <h4 class="text-right less-neutral-gray">Captain</h4>
      </v-col>
      <v-col cols="2" class="text-center pt-5">
        <h2></h2>
        <h3 class="pt-3">VS</h3>
      </v-col>
      <v-col cols="5" class="text-left">
        <h2>{{ secondCaptain }}</h2>
        <h4 class="pa-0 less-neutral-gray">Captain</h4>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" class="text-center">
        <div v-if="beforeChoosing">
          <h1 class="bandon-orange-color">
            {{ countdownText }}
          </h1>
          <h3>Until</h3>
          <h1>The Choosing</h1>
        </div>
        <div v-else>
          <v-row>
            <v-col class="text-right">
              <div>
                <h1 class="text-h3 stroke-color text-center">{{ teamOnePoints }}</h1>
                <h3 class="text-center">{{ teamOneName }}</h3>
              </div>
            </v-col>
            <v-col cols="1" class="text-center pt-5">
              <h2></h2>
              <h3 class="pt-3">VS</h3>
            </v-col>
            <v-col class="text-left">
              <div>
                <h1 class="text-h3 alt-putting-color text-center">{{ teamTwoPoints }}</h1>
                <h3 class="text-center">{{ teamTwoName }}</h3>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <v-row justify="end">
      <v-col cols="12">
        <div class="text-right" @click="toMainPage">
          <span class="underline-text" style="font-size:16px">More Details</span><v-icon color="#666"> mdi-chevron-right </v-icon>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useTournamentStore } from "@/store/tournament";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";

library.add(faTrophy);
export default {
  name: "LeaderboardPreview",
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const now = ref(new Date());
    const countdownText = computed(() => {
      const diff = choosingDate.value - now.value;
      let days = Math.floor(diff / (1000 * 60 * 60 * 24));
      let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((diff % (1000 * 60)) / 1000);
      return days + "d " + hours + "h " + minutes + "m " + seconds + "s";
    });


    const router = useRouter();
    const route = useRoute();
    const tournamentId = route.params.id;

    const toMainPage = () => {
      router.push({ name: 'MudderCup', params: { id: tournamentId  } });
    };

    setInterval(() => {
      now.value = new Date();
    }, 1000);

    const tournamentStore = useTournamentStore();

    onMounted(() => {
      const cupPreview = tournamentStore.mudderCupPreview;
      console.log(cupPreview);
      firstCaptain.value = cupPreview.captain_one;
      secondCaptain.value = cupPreview.captain_two;
      beforeChoosing.value = !cupPreview.choosing_happen;
      choosingDate.value = new Date(cupPreview.choosing_date);
      teamOneName.value = cupPreview.team_one_name;
      teamOnePoints.value = cupPreview.team_one_points;
      teamTwoPoints.value = cupPreview.team_two_points;
      teamTwoName.value = cupPreview.team_two_name;
    });

    const firstCaptain = ref("");
    const secondCaptain = ref("");
    const teamOneName = ref("Team One");
    const teamTwoName = ref("Team Two");
    const teamOnePoints = ref(6);
    const teamTwoPoints = ref(4);
    const beforeChoosing = ref(true);
    const choosingDate = ref(new Date('Feb 22, 2024 19:00:00'));

    return {
      countdownText,
      beforeChoosing,
      choosingDate,
      firstCaptain,
      secondCaptain,
      teamOnePoints,
      teamTwoPoints,
      teamOneName,
      teamTwoName,
      toMainPage
    };
  },
};
</script>

<style scoped>
.points {
  font-size: 35px;
}
</style>
