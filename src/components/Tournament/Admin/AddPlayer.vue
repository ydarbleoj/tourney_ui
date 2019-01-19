<template>
  <v-card flat v-if="tournamentPlayers.length !== currentTournament.num_players">
    <v-container>
      <v-layout row wrap>
        <v-flex x12 md6>
          <v-select
            v-model="invitees"
            :items="inviteList"
            label="Invite Players"
            item-value="user_email"
            multiple
            chips
            top
            item-text="username"
          ></v-select>
        </v-flex>
      </v-layout>
    </v-container>
    <v-btn
      v-if="invitees.length > 0"
      flat
      round
      class="admin--add_button"
      @click="sendInvites"
      v-bind:loading="btnLoading"
    >
      Invite
    </v-btn>
  </v-card>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'AddPlayer',
  components: {
  },
  computed: {
    ...mapState(['currentTournament', 'tournamentPlayers', 'inviteList'])
  },

  data () {
    return {
      loading: true,
      invitees: [],
      btnLoading: false
    }
  },

  methods: {
    buttonLoading () {

    },
    sendInvites () {
      this.btnLoading = true
      this.$store.dispatch('INVITE_USERS', { tournId: this.currentTournament.id, invitees: this.invitees })
        .then((response) => {
          this.btnLoading = false
          this.invitees = []
        })
    },
  }

}
</script>
<style>
.admin--add_button {
  background-color: #74C9D7;
  color: #FBFCFD;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 1s ease, box-shadow 1s ease;
}
</style>