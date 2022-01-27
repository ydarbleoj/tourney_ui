<template>
  <v-card class="skins-lb-card">
    <v-card-title class="skins--title pa-0 pt-2 pl-2">
      <Header :purse="totalPurse" :name="'Money List'" />
    </v-card-title>
    <v-card-text v-if="!isloading" class="pa-0">
			<Table />
    </v-card-text>
  </v-card>
</template>
<script>


import { mapState, mapGetters } from 'vuex'
import Table from './Table'
import Header from '../../Leaderboards/Header'

export default {
  name: 'index',
  props: ['current'],
  components: {
    Header,
		Table
  },
  data () {
    return {
      totalPurse: 0,
      isloading: true,
    }
  },

  computed: {
    ...mapState({
      currentTournament: state => state.tournament.currentTournament
    })
  },
  watch: {
    current: function () {
      this.$store.dispatch('leaderboards/LOAD_MONEY', {
				id: this.currentTournament.id
			}).then(response => {
				this.isloading = false
			})
    }
  },

  created: function () {
		this.totalPurse = this.currentTournament.total_purse
    this.$store.dispatch('leaderboards/LOAD_MONEY', {
			id: this.currentTournament.id
		}).then(response => {
      this.isloading = false
    })
  },
}
</script>
<style scoped>
.skins-lb-card {
  border-radius: 0;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  color: black;
  background-color: #f1f1f1;
}
</style>