<template>
  <!-- <v-flex xs12 sm12>
    <v-card>
      <v-card-title class='orange lighten-1'>
        Putting
        <v-spacer></v-spacer>
        purse $360
      </v-card-title>
      <template> -->
        <v-data-table
          :headers="headers"
          v-bind:items="putting_leaderboard"
          hide-actions
          class='putting'
          item-key="username"
        >
          <template slot="items" slot-scope="props">
            <tr @click="props.expanded = !props.expanded">
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
     <!--  </template>
    </v-card>
  </v-flex> -->
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PuttingLeaderboard',
  computed: mapState([
    'putting_leaderboard'
  ]),

  data () {
    return {
      current: '',
      headers: [
        {
          text: 'Players',
          align: 'left',
          sortable: false,
          value: 'username'
        },
        {
          text: 'Total 3 Putts',
          align: 'center',
          sortable: false,
          value: 'total_3_putts'
        },
        {
          text: 'R1',
          align: 'center',
          sortable: false,
          value: 'rn1_putts'
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
          text: 'Putts',
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
.putting thead {
  background-color: #ffa726;
}
</style>