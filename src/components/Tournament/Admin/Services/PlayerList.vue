<template>
  <v-card flat>
    <v-card-text v-if="!loading" class="pa-0">
      <players-table />
    </v-card-text>
  </v-card>
</template>
<script>
import { mapState } from 'vuex'
import PlayersTable from './Table'

export default {
  name: 'PlayerList',
  components: {
    PlayersTable,
  },
  computed: {
    ...mapState({
      currentTournament: state => state.tournament.currentTournament,
      services: state => state.admin.services
    })
  },

  data () {
    return {
      loading: true,
    }
  },

  created () {
    this.$store.dispatch(
      'admin/LOAD_SERVICES', { tournId: this.currentTournament.id }
    ).then(response => {
      console.log("services", this.services)
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
