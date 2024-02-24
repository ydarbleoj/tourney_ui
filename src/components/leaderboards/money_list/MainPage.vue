<template>
  <v-card class="lb-card">
    <Header :purse="'100'" :name="'Money List'" />
    <div v-if="!isLoading" class="pa-0 table-container">
      <MoneyTable
        :headers="headers"
        :items="moneyItems"
        :playerPage="'MoneyPlayerPage'"
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
import MoneyTable from '../LeaderboardTable.vue'

export default {
  name: "MainPage",
  components: {
    MoneyTable,
    Header
  },
  data () {
    return {
      strokePurse: 0,
      isLoading: true,
      year: "",
      moneyItems: [],
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
          title: 'Team',
          align: 'center',
          sortable: false,
          value: 'total_score',
          class: "pl-0 pr-0"
        },//62
        {
          title: 'Skins',
          align: 'center',
          sortable: false,
          value: 'rnd1_score',
          class: "pl-0 pr-0"
        },
        {
          title: 'Putting',
          align: 'center',
          sortable: false,
          value: 'rnd2_score',
          class: "pl-0 pr-0"
        },
        {
          title: 'Stroke',
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
		...mapActions(useLeaderboardsStore,["loadMoney"]),
	},
  computed: {
    ...mapState(useTournamentStore, ["currentTournament"]),
    ...mapState(useLeaderboardsStore, ["moneyList"]),
  },
  created () {
    this.year = this.currentTournament.year
    this.loadMoney(this.currentTournament.id).then(() => {
      console.log("hells yea", this.moneyList)
      this.moneyItems = this.moneyList
      this.isLoading = false
    })
  },
}
</script>
<style scoped>
.lb-card {
  background-color: #c4c1c1;
}
.table-container {
  display: flex;
  margin-top: 20px;
  flex-grow: 1;
  overflow: hidden;
}
</style>
