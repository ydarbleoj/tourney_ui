<template>
  <v-card>
    <v-card-title flat class="pa-0 pt-2 pl-2">
      <h2 class="text-xs-center font-weight-medium" >Players</h2>
      <v-spacer></v-spacer>
      <v-btn fab flat small class="admin--add_button">
        <v-icon>add</v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text v-if="!loading" class="pa-0">
      <players-table />
    </v-card-text>
  </v-card>
</template>
<script>
import { mapState } from 'vuex'
import PlayersTable from '../Admin/PlayersTable'

export default {
  name: 'PlayersList',
  components: {
    PlayersTable
  },
  computed: {
    ...mapState(['currentTournament', 'tournamentPlayers'])
  },

  data () {
    return {
      loading: true,
    }
  },

  created () {
    this.$store.dispatch('LOAD_ADMIN_PLAYERS', { tournId: this.currentTournament.id })
      .then(response => {
        this.loading = false
      })
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