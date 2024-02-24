<template>
  <v-card class="skins-bg">
    <Header :purse="this.headerPurse" :name="'Skins'" />
    <div v-if="!isLoading" class="pa-0 table-container">
      <SkinsTable
        :headers="headers"
        :items="skinsItems"
        :playerPage="'SkinsPlayerPage'"
      />
    </div>
  </v-card>
</template>
<script>
import { useTournamentStore } from "@/store/tournament";
import { useLeaderboardsStore } from "@/store/leaderboards";
import { mapState } from 'pinia'
import { mapActions } from 'pinia'
import SkinsTable from '../LeaderboardTable.vue'
import Header from '../Header.vue'

export default {
  name: 'index',
  components: {
    SkinsTable,
    Header
  },
  data () {
    return {
			headerPurse: 0,
      isLoading: true,
      year: "",
      skinsItems: [],
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
          title: 'Money',
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
		...mapActions(useLeaderboardsStore,["loadSkins"]),
	},

  computed: {
    ...mapState(useTournamentStore, ["currentTournament"]),
		...mapState(useLeaderboardsStore, ["skinsLeaderboard"]),
  },
  created() {
    this.year = this.currentTournament.year;
    this.loadSkins(this.currentTournament.id).then(() => {
      this.isLoading = false;
      this.skinsItems = this.skinsLeaderboard;
      this.headerPurse = this.skinsItems[0].total_score;
    });
  },
}
</script>
<style scoped>
.table-container {
  display: flex;
  margin-top: 20px;
  flex-grow: 1;
  overflow: hidden;
}
</style>
