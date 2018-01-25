<template>
  <v-data-table
    :headers="headers"
    v-bind:items="putting_leaderboard"
    hide-actions
    hide-headers
    class='putting'
    item-key="username"
  >
    <template slot="items" slot-scope="props">
      <!-- <p class="hidden-xs">{{ current }}</p> -->
      <tr @click="props.expanded = !props.expanded">
        <td class="text-xs-center">{{ props.item.pos }}</td>
        <td class="text-xs-left">{{ props.item.username }}</td>
        <td class="text-xs-center">{{ props.item.total_3_putts }}</td>
        <td class="text-xs-center">{{ props.item.rnd1_putts }}</td>
        <td class="text-xs-center">{{ props.item.rnd2_putts }}</td>
        <td class="text-xs-center">{{ props.item.rnd3_putts }}</td>
        <td class="text-xs-center">{{ props.item.total_putts }}</td>
      </tr>
    </template>
    <template slot="expand" slot-scope="props">
      <v-card flat>
        <v-card-text>Peek-a-boo!</v-card-text>
      </v-card>
    </template>
  </v-data-table>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PuttingLeaderboard',
  props: ['current'],
  computed: mapState([
    'putting_leaderboard'
  ]),

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
          text: '3 Putts',
          align: 'center',
          sortable: false,
          value: 'total_3_putts'
        },
        {
          text: 'R1',
          align: 'center',
          sortable: false,
          value: 'rnd1_putts'
        },
        {
          text: 'R2',
          align: 'center',
          sortable: false,
          value: 'rnd2_putts'
        },
        {
          text: 'R3',
          align: 'center',
          sortable: false,
          value: 'rnd3_putts'
        },
        {
          text: 'Total',
          align: 'center',
          sortable: false,
          value: 'net_total'
        }
      ]
    }
  },

  watch: {
    current: function () {
      this.$store.dispatch('LOAD_PUTTING_LEADERBOARD', { id: this.current.id })
    }
  },

  created: function (current) {
    this.$store.dispatch('LOAD_PUTTING_LEADERBOARD', { id: this.current.id })
  }


}
</script>
<style>
div.table__overflow.putting {
  padding-top: 110px;
}
.putting thead {
  background-color: #ffa726;
}
table.table thead th {
  font-size: 12px;
}
table.table thead td:not(:nth-child(1)), table.table tbody td:not(:nth-child(1)), table.table thead th:not(:nth-child(1)), table.table tbody th:not(:nth-child(1)), table.table thead td:first-child, table.table tbody td:first-child, table.table thead th:first-child, table.table tbody th:first-child {
  padding: 0 3px;
}
</style>