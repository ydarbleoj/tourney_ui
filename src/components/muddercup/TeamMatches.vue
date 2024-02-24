<template>
  <div>
    <v-tabs v-model="tab" class="mt-5">
      <v-tab value="one" class="center-text">
        <h4 class="bandon-orange-color">Day One</h4>
      </v-tab>
      <v-tab value="two" class="custom-tab">
        <h4 class="bandon-orange-color">Day Two</h4>
      </v-tab>
      <v-tab value="three" class="custom-tab">
        <h4 class="bandon-orange-color">Day Three</h4>
      </v-tab>
    </v-tabs>

    <div>
      <v-divider class="mt-4" style="background-color:#cf8018"></v-divider>
      <v-window v-model="tab">
        <v-window-item value="one">
          <TeamMatchList
            v-if="roundOneId"
            :matches="dayOne"
            :players="dayOneAvail"
            :roundId="roundOneId"
          />
        </v-window-item>
        <v-window-item value="two">
          <TeamMatchList
            v-if="roundTwoId"
            :matches="dayTwo"
            :players="dayTwoAvail"
            :roundId="roundTwoId"
          />
        </v-window-item>
        <v-window-item value="three">
          <TeamMatchList
            v-if="roundThreeId"
            :matches="dayThree"
            :players="dayThreeAvail"
            :roundId="roundThreeId"
          />
        </v-window-item>
      </v-window>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useMudderCupStore } from '@/store/mudderCup'
import TeamMatchList from './TeamMatchList.vue'

export default {
  name: "TeamMatches",
  components: {
    TeamMatchList
  },
  setup() {
    const store = useMudderCupStore()
    const route = useRoute()

    const tournamentId = route.params.id
    const teamId = route.params.teamId

    const tab = ref('one')
    const sheet = ref(false)
    const dayOne = ref([])
    const dayOneAvail = ref([])
    const dayTwo = ref([])
    const dayTwoAvail = ref([])
    const dayThree = ref([])
    const dayThreeAvail = ref([])
    const roundOneId = ref(null)
    const roundTwoId = ref(null)
    const roundThreeId = ref(null)

    onMounted(() => {
      const team = store.cupTeam;
      const m = team.matches;

      const one = m.filter((match) => match.title === "Day One")[0]
      const two = m.filter((match) => match.title === "Day Two")[0]
      const three = m.filter((match) => match.title === "Day Three")[0]

      dayOne.value = one.matches
      dayOneAvail.value = one.avail_players
      roundOneId.value = one.round_id
      dayTwo.value = two.matches
      dayTwoAvail.value = two.avail_players
      roundTwoId.value = two.round_id
      dayThree.value = three.matches
      dayThreeAvail.value = three.avail_players
      roundThreeId.value = three.round_id
    })

    return {
      tab,
      sheet,
      dayOne,
      dayOneAvail,
      dayTwo,
      dayTwoAvail,
      dayThree,
      dayThreeAvail,
      roundOneId,
      roundTwoId,
      roundThreeId
    }
  },

}
</script>

<style scoped>
.info-span {
	font-size: 16px;
	color: #666;
}
.bx-shadow {
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
}
</style>
