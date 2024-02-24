<template>
  <v-card class="lb-card">
    <Header :purse="strokePurse" :name="'Stroke'" />
    <div v-if="!isLoading" class="pa-0 table-container">
      <StrokeTable
        :headers="headers"
        :items="strokeItems"
        :playerPage="'StrokePlayerPage'"
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
import StrokeTable from '../LeaderboardTable.vue'

export default {
  name: 'index',
  components: {
    StrokeTable,
    Header
  },
  data () {
    return {
      strokePurse: 0,
      isLoading: true,
      year: "",
      strokeItems: [],
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
          title: 'Total',
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
          title: 'Strokes',
          align: 'center',
          sortable: false,
          value: 'net_total',
          class: "pl-0 pr-0"
        },
      ],
    }
  },
  methods: {
		...mapActions(useLeaderboardsStore,["loadStrokeLeaderboard"]),
	},
  computed: {
    ...mapState(useTournamentStore, ["currentTournament"]),
    ...mapState(useLeaderboardsStore, ["strokeLeaderboard"]),
  },
  created () {
    this.loadStrokeLeaderboard(this.currentTournament.id).then(() => {
      this.strokeItems = this.strokeLeaderboard
      this.strokePurse = this.currentTournament.num_players * 30
      this.year = this.currentTournament.year
      this.isLoading = false
    })
  },
}
</script>
<style scoped>
.lb-card {
  background-color: #9FB8CE;
}
.table-container {
  display: flex;
  margin-top: 20px;
  flex-grow: 1;
  overflow: hidden;
}
</style>
