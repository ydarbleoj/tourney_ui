<template>
  <v-data-table
    :headers="headers"
    v-bind:items="moneyList"
    hide-actions
    hide-headers
    class='money-preview'
    item-key="username"
  >
    <template slot="items" slot-scope="props">
      <tr @click="props.expanded = !props.expanded" class="test">
        <td class="text-xs-center">{{ props.item.pos }}</td>
        <td class="text-xs-left">
          {{ props.item.username }}
        </td>
        <td class="text-xs-right pr-3">$ {{ props.item.total }}</span></td>
      </tr>
    </template>
    <template slot="expand" slot-scope="props">
      <v-layout row>
        <v-flex xs3>
          <v-card flat>
            <v-list two-line>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-sub-title class="text-xs-center">Stroke</v-list-tile-sub-title>
                  <v-list-tile-title class="text-xs-center">$ <span class="money_props"> {{ props.item.stroke }}</span></v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
        <v-flex xs3>
          <v-card flat>
            <v-list two-line>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-sub-title class="text-xs-center">Putting</v-list-tile-sub-title>
                  <v-list-tile-title class="text-xs-center">$ <span class="money_props"> {{ props.item.putting }}</span> </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
        <v-flex xs3>
          <v-card flat>
            <v-list two-line>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-sub-title class="text-xs-center">Team</v-list-tile-sub-title>
                  <v-list-tile-title class="text-xs-center">$ <span class="money_props"> {{ props.item.team }}</span> </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
        <v-flex xs3>
          <v-card flat>
            <v-list two-line>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-sub-title class="text-xs-center">Skins</v-list-tile-sub-title>
                  <v-list-tile-title class="text-xs-center">$ <span class="money_props">{{ props.item.skins }}</span> </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </template>
  </v-data-table>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MoneyPreview',
  props: ['current'],

  computed: mapState([
    'moneyList'
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
          text: 'Total',
          align: 'center',
          sortable: false,
          value: 'total_score'
        },
        {
          text: 'Strokes',
          align: 'center',
          sortable: false,
          value: 'net_total'
        }
      ]
    }
  },

  watch: {
    current: function () {
      this.$store.dispatch('LOAD_MONEY_PREVIEW', { tournId: this.current.id })
    }
  },

  created: function () {
    console.log('monelist', this.current)
    this.$store.dispatch('LOAD_MONEY_PREVIEW', { tournId: this.current.id })
  }
}
</script>
<style>
.money_props {
  color: #4CAF50;
}
table.table thead th {
  font-size: 10px;
}
table.table thead td:not(:nth-child(1)), table.table tbody td:not(:nth-child(1)), table.table thead th:not(:nth-child(1)), table.table tbody th:not(:nth-child(1)), table.table thead td:first-child, table.table tbody td:first-child, table.table thead th:first-child, table.table tbody th:first-child {
  padding: 0 10px;
  color: 'white';
}
</style>