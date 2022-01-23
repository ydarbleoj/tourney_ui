<template>
  <v-data-table
    :headers="headers"
    :items="skins_leaderboard"
    hide-actions
    class='skins-table board-table'
    item-key="id"
  >
    <template slot="items" slot-scope="props" >
      <tr>
        <td class="text-xs-center">{{ props.item.attributes.position }}</td>
        <td class="text-xs-left">{{ props.item.attributes.username }}
          <v-spacer></v-spacer>
          <span class="grey--text">handicap {{ props.item.attributes.handicap }}</span>
        </td>
        <td class="text-xs-center">${{ props.item.attributes.skins_money ? props.item.attributes.skins_money.total : null }}</td>
        <td class="text-xs-center">{{ cardFilter(props.item.attributes.cards, 'round_1')['total'] }}</td>
        <td class="text-xs-center">{{ cardFilter(props.item.attributes.cards, 'round_2')['total'] }}</td>
        <td class="text-xs-center">{{ cardFilter(props.item.attributes.cards, 'round_3')['total'] }}</td>
        <td class="text-xs-center">{{ props.item.attributes.total_skins }}</td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Table',
  computed: mapState(['skins_leaderboard']),

  data () {
    return {

      headers: [
        {
          text: 'Pos',
          align: 'center',
          sortable: false,
          value: 'pos'
        },
        {
          text: 'Players',
          align: 'left',
          sortable: false,
          value: 'username'
        },
        {
          text: 'Money',
          align: 'center',
          sortable: false,
          value: ''
        },
        {
          text: 'R1',
          align: 'center',
          sortable: false,
          value: 'rnd1'
        },
        {
          text: 'R2',
          align: 'center',
          sortable: false,
          value: 'rnd2'
        },
        {
          text: 'R3',
          align: 'center',
          sortable: false,
          value: 'rnd3'
        },
        {
          text: 'Total',
          align: 'center',
          sortable: false,
          value: 'total'
        },
      ]
    }
  },

  methods: {
    cardFilter (cards, rnd) {
      let nn = cards.filter(el => el[rnd])
      if (nn === undefined || !nn.length) return {};
      return nn[0][rnd]

    }
  },
}
</script>
<style lang="sss" scoped>
.skins-total {
  color: #FFCB47;
}
.dollar-sign {
  font-weight: 200;
  color: #2E2F2F;
  font-size: 20px;
}
.board-table {
  overflow:hidden;
  transition: opacity 0.2s ease, box-shadow 0.2s ease;
}
.skins-table table.theme--light thead {
  background-color: #FFCB47;
}
.skins-table table.theme--light thead tr th {
  color: #f1f1f1;
  font-size: 14px;
  letter-spacing: 1px;
}
table.v-table thead td:not(:nth-child(1)), table.v-table tbody td:not(:nth-child(1)), table.v-table thead th:not(:nth-child(1)), table.v-table tbody th:not(:nth-child(1)), table.v-table thead td:first-child, table.v-table tbody td:first-child, table.v-table thead th:first-child, table.v-table tbody th:first-child {
  padding: 10px 0 10px 0;
}
</style>
