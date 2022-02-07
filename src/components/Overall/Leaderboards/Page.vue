<template>
  <v-card
    class="lb-card"
		:class="bgColor"
   >
    <v-card-title class="pa-0 pt-2 pl-2">
      <Header :purse="money" :name="title" />
    </v-card-title>
    <v-card-text class="pa-0">
      <RoundTable :leaderboardArray="leaderboard" :linkTo="link" v-if="tableRound" />
      <MoneyTable :leaderboardArray="leaderboard" :linkTo="link" v-else-if="tableMoney" />
			<Table :leaderboardArray="leaderboard" :linkTo="link" v-else />
    </v-card-text>
  </v-card>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import Header from './Header'
import Table from './Table'
import RoundTable from './RoundTable'
import MoneyTable from './MoneyTable'

export default {
	name: 'Page',
  props: {
		leaderboard: Array,
		title: String,
    money: String,
		link: String
	},

  components: {
    Header,
    MoneyTable,
    RoundTable,
		Table
  },
  data () {
    return {
      isLoading: true,
      tableRound: false,
      tableMoney: false
    }
  },
	computed: {
		bgColor () {
			return this.title.toLowerCase().split(' ')[0];
		}
	},
  methods: {
  },

  mounted() {
    if (this.title == 'Skins' || this.title == 'Team') {
      this.tableRound = true
    }
     if (this.title == 'Money List') {
      this.tableMoney = true
    }
  }
}
</script>
<style scoped>
.lb-card {
  border-radius: 0;
  top: 0;
  left: 0;
  height: 100vh;
  overflow: scroll;
  width: 100vw;
  color: #f1f1f1;
}
.stroke {
  background-color: #9FB8CE;
  color: #fff;
}
.putting {
	background-color: #FFCB47;
  color: #fff;
}
.skins {
	background-color: #A8C256;
  color: #fff;
}
.team {
	background-color: #ACA885;
  color: #fff;
}
.money {
  background-color: #f1f1f1;
  color: rgba(0, 0, 0, .93);
}
.reg-divide {
  color: white;
  background-color: #333;
}
.money-divide {
  padding-top: 1px;
  color: rgba(0, 0, 0, .93);
  background-color: #9FB8CE;
}
</style>
