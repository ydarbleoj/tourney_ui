<template>
  <div>
    <v-row v-if="loadPlayers" class="mb-5">
      <v-col cols="6" v-for="player in players" :key="player.id">
        <v-card class="d-flex flex-row pa-3 box-shadow" style="border-radius: 25px;" flat>
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
              <v-btn
                v-if="showLink"
                @click="clickToConfirm(player)"
                class="bandon-orange-color underline-text"
                outlined
                flat
              >
                Add to Team
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-bottom-sheet v-model="sheet">
      <v-card class="stroke-bg pa-4" style="height:50vh;width: 100%;">
        <v-row justify="center">
          <v-col cols="12" class="bandon-dark-color text-center pt-5">
            <h2>If you want to add {{ confirmName }} to your team, just hit confirm.</h2>
          </v-col>
          <v-col cols="6" class="text-center bandon-dark-color">
            <v-btn class="default-bg" style="width:150px;height:75px;border-radius:25px;" @click="addToTeamLink(confirmId)">Confirm</v-btn>
          </v-col>
          <v-col cols="6" class="text-center bandon-dark-color">
            <v-btn class="putting-bg" style="width:150px;height:75px;border-radius:25px;" @click="sheet = false">Cancel</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import { mapState } from 'pinia'
import { useMudderCupStore } from '@/store/mudderCup'

export default {
  name: 'PreTournament',
  props: {
    players: {
      type: Array,
      required: true
    },
    captainIds: {
      type: Array,
      required: false
    }
  },

  data() {
    return {
      userId: this.$auth.user().id,
      showLink: false,
      loadPlayers: false,
      sheet: false,
      confirmName: '',
      confirmId: ''
    }
  },

  mounted() {
    this.loadPlayers = true

    if (this.captainIds.includes(12)) {
      this.showLink = true
    }
  },

  methods: {
    ...mapActions(useMudderCupStore, ['addPlayerToTeam']),
    addToTeamLink (playerId) {
      const tournamentId = this.$route.params.id
      const id = this.userId

      this.addPlayerToTeam(tournamentId, id, playerId).then(() => {
        this.$emit('playerAdded', playerId);
        this.sheet = false
      })
    },
    clickToConfirm (player) {
      this.confirmName = player.username
      this.confirmId = player.user_id
      this.sheet = true
    }
  }
}
</script>

<style scoped>
.profile-image {
  height: 75px;
  width: 75px;
  border-radius: 25px;
  margin-right: 10px;
}
.info-span {
	font-size: 16px;
	color: #666;
}
.bx-shadow {
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
}

</style>
