<template>
  <v-data-table
    :headers="headers"
    :items="leaderboardArray"
    hide-actions
    class='leaderboard-table'
    item-key="id"
  >
    <template slot="items" slot-scope="props">
      <tr @click="toPlayerPage(props.item.attributes.id)">
        <td class="text-xs-center" style="font-size:14px;">
          {{ props.item.attributes.position }}
        </td>
        <td class="text-xs-left" style="font-size:16px;">
          {{ props.item.attributes.username }}
          <v-spacer></v-spacer>
          <span style="color:#666;">Earnings: $ {{ props.item.attributes.total_money }}</span>
        </td>
        <td class="text-xs-center" style="font-size:16px;">{{ props.item.attributes.average }}</td>
        <td class="text-xs-center" style="font-size:16px;">{{ props.item.attributes.round1 }}</td>
        <td class="text-xs-center" style="font-size:16px;">{{ props.item.attributes.round2 }}</td>
        <td class="text-xs-center" style="font-size:16px;">{{ props.item.attributes.round3 }}</td>
        <td class="text-xs-center" style="font-size:16px;">{{ props.item.attributes.total_wins }}</td>
        <td class="text-xs-center">
          <v-icon color="#999">
            mdi-chevron-right
          </v-icon>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>
<script>
export default {
	name: 'RoundTable',
  props: {
		leaderboardArray: Array,
		linkTo: String
	},

  data () {
    return {
			headers: [
        {
          text: '',
          align: 'left',
          sortable: false,
          value: 'pos',
          width: '8%'
        },
        {
          text: 'Players',
          align: 'left',
          sortable: false,
          value: 'username',
          width: '30%'
        },
        {
          text: 'Avg',
          align: 'center',
          sortable: false,
          value: 'rnd1_score',
          width: '7%'
        },
        {
          text: 'R1',
          align: 'center',
          sortable: false,
          value: 'rnd2_score',
          width: '7%'
        },
        {
          text: 'R2',
          align: 'center',
          sortable: false,
          value: 'rnd3_score',
          width: '7%'
        },
        {
          text: 'R3',
          align: 'center',
          sortable: false,
          value: 'net_total',
          width: '7%'
        },
        {
          text: 'Total',
          align: 'center',
          sortable: false,
          value: 'net_total',
          width: '7%'
        },
        {
          text: '',
          align: 'center',
          sortable: false,
          value: 'pos',
          width: '7%'
        },
      ],
    }
  },
	computed: {
		bgColor () {
			return this.title.toLowerCase().split(' ')[0];
		}
	},
  methods: {
		toPlayerPage (id) {
      // this.$store.commit("setPageTransition");
      // this.$router.push({
      //   name: this.linkTo,
      //   params: {
      //     user_id: id
      //   }
      // })
		}
  },

  mounted: function () {
    console.log('this', this.leaderboardArray)
  }
}
</script>
<style>

table.v-table thead th {
}

.leaderboard-table table {
  table-layout: fixed;
}
table.v-table thead td:not(:nth-child(1)), table.v-table tbody td:not(:nth-child(1)), table.v-table thead th:not(:nth-child(1)), table.v-table tbody th:not(:nth-child(1)), table.v-table thead td:first-child, table.v-table tbody td:first-child, table.v-table thead th:first-child, table.v-table tbody th:first-child {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 0;
  padding-left: 0;
}
table.v-table thead th {
  white-space: normal
}
</style>
