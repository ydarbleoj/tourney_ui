<template>
  <v-data-table
    :headers="headers"
    :items="putting_leaderboard"
    hide-actions
    class='putting-table board-table'
    item-key="id"
  >
    <template slot="items" slot-scope="props" >
      <tr @click="props.expanded = !props.expanded">
        <td class="text-xs-center">{{ props.item.attributes.position }}</td>
        <td class="text-xs-left">{{ props.item.attributes.username }}</td>
        <td class="text-xs-center">{{ props.item.attributes.total_3_putts }}</td>
        <td class="text-xs-center">{{ props.item.attributes.rnd1_putts }}</td>
        <td class="text-xs-center">{{ props.item.attributes.rnd2_putts }}</td>
        <td class="text-xs-center">{{ props.item.attributes.rnd3_putts }}</td>
        <td class="text-xs-center">{{ props.item.attributes.total_putts }}</td>
      </tr>
    </template>
    <template slot="expand" slot-scope="props">
      <v-layout row wrap class="font-weight-regular pt-3 pb-3 pr-2" align-center>
        <v-flex xs12 mb-2 ml-3>
          <h3 class="text-xs-left grey--text font-weight-regular">Putting Average</h3>
        </v-flex>
        <v-flex xs4>
          <v-layout row align-center>
            <v-flex xs4 class="text-xs-right">
              <h4 class="font-weight-regular">R1</h4>
            </v-flex>
            <v-flex xs8>
              <h1 class="putting-avg">
                {{ props.item.attributes.rnd1_putting_avg }}<span class="putting-percent">%</span>
              </h1>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs4>
          <v-layout row align-center>
            <v-flex xs4 class="text-xs-right">
              <h4 class="font-weight-regular">R2</h4>
            </v-flex>
            <v-flex xs8>
              <h1 class="putting-avg">
                {{ props.item.attributes.rnd2_putting_avg }}<span class="putting-percent">%</span>
              </h1>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex xs4>
          <v-layout row align-center>
            <v-flex xs4 class="text-xs-right">
              <h4 class="font-weight-regular">R3</h4>
            </v-flex>
            <v-flex xs9>
              <h1 class="putting-avg">
                {{ props.item.attributes.rnd3_putting_avg }}<span class="putting-percent">%</span>
              </h1>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </template>
  </v-data-table>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Table',
  computed: {
    ...mapState(['putting_leaderboard'])
  },

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
          value: 'rnd1_putts',
          class: 'putting-rounds'
        },
        {
          text: 'R2',
          align: 'center',
          sortable: false,
          value: 'rnd2_putts',
          class: 'putting-rounds'
        },
        {
          text: 'R3',
          align: 'center',
          sortable: false,
          value: 'rnd3_putts',
          class: 'putting-rounds'
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
}
</script>

<style>
.putting-percent {
  font-weight: normal;
  color: #2E2F2F;
  font-size: 20px;
}
.putting-avg {
  color: #A8C256;
}
.board-table {
  overflow:hidden;
}
.putting-table table.theme--light thead {
  background-color: #A8C256;
}
.putting-table table.theme--light thead tr th {
  color: #f1f1f1;
  font-size: 14px;
  letter-spacing: 1px;
}

table.table thead td:not(:nth-child(1)), table.table tbody td:not(:nth-child(1)), table.table thead th:not(:nth-child(1)), table.table tbody th:not(:nth-child(1)), table.table thead td:first-child, table.table tbody td:first-child, table.table thead th:first-child, table.table tbody th:first-child {
  padding: 0;
}
</style>
