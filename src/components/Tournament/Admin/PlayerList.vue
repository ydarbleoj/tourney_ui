<template>
  <v-card flat>
    <v-card-text v-if="!loading" class="pa-0">
      <players-table @toggleView="playerCard"/>
      <add-player />
    </v-card-text>
  </v-card>
</template>
<script>
import { mapState } from 'vuex'
import PlayersTable from '../Admin/PlayersTable'
import AddPlayer from '../Admin/AddPlayer'

export default {
  name: 'PlayersList',
  components: {
    PlayersTable,
    AddPlayer
  },
  computed: {
    ...mapState({
      currentTournament: state => state.tournament.currentTournament,
      tournamentPlayers: state => state.admin.tournamentPlayers
    })
  },

  data () {
    return {
      loading: true,
    }
  },

  methods: {
    playerCard (v) {
      this.$emit('toggleView', v)
    }
  },

  created () {
    this.$store.dispatch(
      'admin/LOAD_ADMIN_PLAYERS', { tournId: this.currentTournament.id }
    ).then(response => {
      console.log("his", this.tournamentPlayers)
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