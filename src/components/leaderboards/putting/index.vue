<template>
  <v-card class="putting-bg">
    <Header :purse="this.puttingPurse" :name="'Putting'" />
    <div v-if="!isLoading" class="pa-0 table-container">
      <PuttingTable
        :headers="headers"
        :items="puttingItems"
        :playerPage="'PuttingPlayerPage'"
      />
    </div>
  </v-card>
</template>
<script>
import { useTournamentStore } from "@/store/tournament";
import { useLeaderboardsStore } from "@/store/leaderboards";
import { mapState } from 'pinia'
import { mapActions } from 'pinia'
import Header from '../Header.vue'
import PuttingTable from '../LeaderboardTable.vue'

export default {
  name: 'index',
  components: {
    PuttingTable,
    Header
  },
  data () {
    return {
			headerPurse: 0,
      isLoading: true,
      year: "",
      puttingItems: [],
      headers: [
        {
          title: '',
          align: 'center',
          sortable: false,
          value: 'pos',
        },
        {
          title: 'Players',
          align: 'start',
          sortable: false,
          value: 'username',
          class: 'players-header',
        },
        {
          title: '3Putts',
          align: 'center',
          sortable: false,
          value: 'total_score',
          class: "pl-0 pr-0"
        },//62
        {
          title: 'R1',
          align: 'center',
          sortable: false,
          value: 'rnd1_score',
          class: "pl-0 pr-0"
        },
        {
          title: 'R2',
          align: 'center',
          sortable: false,
          value: 'rnd2_score',
          class: "pl-0 pr-0"
        },
        {
          title: 'R3',
          align: 'center',
          sortable: false,
          value: 'rnd3_score',
          class: "pl-0 pr-0"
        },
        {
          title: 'Total',
          align: 'center',
          sortable: false,
          value: 'net_total',
          class: "pl-0 pr-0"
        },
      ],
    }
  },

  methods: {
		...mapActions(useLeaderboardsStore,["loadPuttingLeaderboard"]),
	},

  computed: {
    ...mapState(useTournamentStore, ["currentTournament"]),
		...mapState(useLeaderboardsStore, ["puttingPurse", "puttingLeaderboard"])
  },
  created () {
    this.loadPuttingLeaderboard(this.currentTournament.id).then(() => {
      this.puttingItems = this.puttingLeaderboard
      this.headerPurse = this.puttingPurse
      this.isLoading = false
    })
  }
}
</script>
<style scoped>
.lb-card {
}
.table-container {
  display: flex;
  margin-top: 20px;
  flex-grow: 1;
  overflow: hidden;
}
</style>
