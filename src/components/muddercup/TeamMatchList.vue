<template>
  <div class="mb-5 pa-2">
    <div v-for="match in setMatches" :key="match.number">
      <v-row class="pa-2">
        <v-col cols="12" class="text-left pa-2 mt-2 border-for-match">
          <h4 class="">Match {{ match.number }}
            <span class="less-neutral-gray" style="font-size:14px;">{{ match.tee_time }}</span>
          </h4>
        </v-col>
        <v-col cols="9" class="text-center pt-5">
          <div v-if="match.players">
            <h4 v-if="match.round_three">{{ match.players.player1 }}</h4>
            <h4 v-else>{{ match.players.player1 }} / {{ match.players.player2 }}</h4>
          </div>
          <div v-else >
            <h4 class="">No Players</h4>
          </div>
        </v-col>
        <v-col cols="3" class="text-center" v-if="currentUserCaptain">
          <v-btn @click="resetMatch(match)" class="default-color" flat v-if="match.players">
            <h4 class="bandon-orange-color">reset</h4>
          </v-btn>
          <v-btn @click="showMatchForm(match)" class="default-color" flat v-else>
            <v-icon class="bandon-orange-color">mdi-pencil</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <v-bottom-sheet v-model="sheetForm">
      <v-card class="stroke-bg pa-2" style="z-index:5000">
        <v-row class="pa-2 default-bg">
          <v-col cols="12" class="text-left pa-2 mt-2 default-bg border-for-match">
            <h4 class="">Match {{ formNumber }}
              <span class="less-neutral-gray" style="font-size:14px;">{{ formTeeTime }}</span>
            </h4>
          </v-col>
          <v-col cols="12" class="text-center pt-0">
            <div v-if="roundThree">
              <h4 class="text-center">
                {{ playerOneName }}
              </h4>
            </div>
            <div v-else>
              <h4 class="text-center">
                {{ playerOneName }} / {{ playerTwoName }}
              </h4>
            </div>
          </v-col>
        </v-row>

        <v-row class="mb-5 mt-5">
          <v-col cols="12">
            <h3>Players to choose:</h3>
          </v-col>
          <v-col cols="6" v-for="player in availablePlayers" :key="player.id">
            <v-card class="d-flex flex-row pa-3 box-shadow" style="border-radius: 25px;" flat @click="addPlayer(player)">
              <v-row>
                <v-col cols="12">
                  <img
                    :src="'https://cdn.vuetifyjs.com/images/john.jpg'"
                    class="profile-image"
                    align="left"
                  />
                  <h4 class="pt-2">
                    {{ player.username }}
                  </h4>
                  <span class="text-left">
                    Hcap {{ player.handicap }}
                  </span>
                </v-col>
                <v-col cols="12">
                  <v-row>
                    <v-col cols="6" class="pa-0">
                      <h4 class="text-center">Cups</h4>
                      <h3 class="bandon-orange-color text-center">{{ player.appearances }}</h3>
                    </v-col>
                    <v-col cols="6" class="pa-0">
                      <h4 class="text-center">Record</h4>
                      <h3 class="bandon-orange-color text-center">{{ player.record }}</h3>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" class="text-center">
                  <h4 class="bandon-orange-color underline-text">Add to Match</h4>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>

        <v-row align="center" justify="center">
          <v-col cols="6" class="text-center">
            <v-btn class="default-bg" style="width:100px;height:55px;border-radius:25px;" @click="update()">Create</v-btn>
          </v-col>
          <v-col cols="6" class="text-center">
            <v-btn class="putting-bg" style="width:100px;height:55px;border-radius:25px;" @click="cancelUpdate()">Cancel</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useMudderCupStore } from '@/store/mudderCup'

export default {
  name: "TeamMatchList",
  props: {
    matches: {
      type: Array,
      required: true
    },
    players: {
      type: Array,
      required: true
    },
    roundId: {
      type: Number,
      required: true,
      default: 0
    }
  },
  setup(props) {
    const store = useMudderCupStore()
    const route = useRoute()
    const teamId = ref(null)
    const playerOneId = ref(null)
    const playerOneName = ref(null)
    const playerTwoId = ref(null)
    const playerTwoName = ref(null)
    const roundThree = ref(false)
    const formNumber = ref(null)
    const formTeeTime = ref(null)
    const availablePlayers = ref([])
    const currentUserCaptain = ref(true)
    const setMatches = ref(props.matches)

    const tournamentId = route.params.id
    const sheetForm = ref(false)

    function showMatchForm (match) {
      formNumber.value = match.number
      formTeeTime.value = match.tee_time
      teamId.value = match.team_id
      roundThree.value = match.round_three

      if (match.players) {
        playerOneId.value = match.players.player1_id
        playerOneName.value = match.players.player1
        playerTwoId.value = match.players.player2_id
        playerTwoName.value = match.players.player2
      }

      sheetForm.value = true
    }

    function resetMatch(match) {
      store.resetMatch(tournamentId, props.roundId, match.team_id).then(() => {
        const team = store.cupTeam
        const m = team.matches
        const round = m.filter((match) => match.round_id === props.roundId)[0]
        console.log(round.avail_players.length, "round")

        setMatches.value = round.matches
        availablePlayers.value = round.avail_players
      })
    }

    function update() {
      const ids = [playerOneId.value, playerTwoId.value]

      store.updateMatch(tournamentId, props.roundId, teamId.value, ids).then(() => {
        const team = store.cupTeam
        const m = team.matches
        const round = m.filter((match) => match.round_id === props.roundId)[0]

        console.log(round.avail_players, "round")
        playerOneId.value = null;
        playerTwoId.value = null;
        playerOneName.value = null;
        playerTwoName.value = null;
        setMatches.value = round.matches
        availablePlayers.value = round.avail_players
        sheetForm.value = false;
      })
    }

    function cancelUpdate() {
      playerOneId.value = null;
      playerTwoId.value = null;
      playerOneName.value = null;
      playerTwoName.value = null;
      sheetForm.value = false;
    }

    onMounted(() => {
      availablePlayers.value = props.players
      store.updateTeamTab("two")
    })

    function removePlayer() {
      const plys = props.players.filter(p => p.user_id !== playerOneId.value && p.user_id !== playerTwoId.value)
      console.log(plys, "plys")
      availablePlayers.value = plys
    }

    function addPlayer(player) {
      console.log(props.players, "players")
      if (playerOneId.value === null || playerOneId.value === undefined) {
        playerOneId.value = player.user_id;
        playerOneName.value = player.username;
      } else if (playerTwoId.value === null && playerOneId.value !== player.user_id || playerTwoId.value === undefined) {
        playerTwoId.value = player.user_id;
        playerTwoName.value = player.username;
      }
      removePlayer()
    }

    return {
      addPlayer,
      availablePlayers,
      cancelUpdate,
      formNumber,
      formTeeTime,
      playerOneId,
      playerOneName,
      playerTwoId,
      playerTwoName,
      resetMatch,
      roundThree,
      setMatches,
      sheetForm,
      showMatchForm,
      currentUserCaptain,
      update
    }
  }
}
</script>

<style scoped>
.border-for-match {
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  margin-bottom: 10px;
}
.profile-image {
  height: 75px;
  width: 75px;
  border-radius: 25px;
  margin-right: 10px;
}
</style>
