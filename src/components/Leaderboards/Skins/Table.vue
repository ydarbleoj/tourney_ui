<template>
  <v-data-table
    :headers="headers"
    :items="skins_leaderboard"
    hide-actions
    class='skins rounded-card'
    item-key="username"
  >
    <template slot="items" slot-scope="props" >
      <tr @click="props.expanded = !props.expanded" v-if"isPreview ? displayRow(props) : '">
        <td class="text-xs-center">{{ props.item.attributes.position }}</td>
        <td class="text-xs-center">{{ props.item.attributes.username }}</td>
        <td class="text-xs-center">${{ props.item.attributes.money[0].money_total}}</td>
        <td v-if="isPreview ? hide-row : ''" class="text-xs-center">{{ props.item.attributes.rnd1 }}</td>
        <td v-if="isPreview ? hide-row : ''" class="text-xs-center">{{ props.item.attributes.rnd2 }}</td>
        <td v-if="isPreview ? hide-row : ''" class="text-xs-center">{{ props.item.attributes.rnd3 }}</td>
        <td class="text-xs-center">{{ props.item.attributes.total }}</td>
      </tr>
    </template>
    <template slot="expand" slot-scope="props">
      <v-layout row>
        <v-flex xs-4>
          <v-card flat>
            <v-list two-line>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-sub-title class="text-xs-center">ROUND 1</v-list-tile-sub-title>
                  <v-list-tile-title class="text-xs-center">$ {{ props.item.attributes.money[0].round_one }} </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
        <v-flex xs-8>
          <v-card flat>
            <v-list two-line>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-sub-title class="text-xs-center">Hole / Score</v-list-tile-sub-title>
                  <v-list-tile-title class="text-xs-center">{{ props.item.attributes.rnd1holes }} </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
        </v-layout>
        <v-layout row>
        <v-flex xs-4>
          <v-card flat>
            <v-list two-line>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-sub-title class="text-xs-center">ROUND 2</v-list-tile-sub-title>
                  <v-list-tile-title class="text-xs-center">$ {{ props.item.attributes.money[0].round_two }} </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
        <v-flex xs-8>
          <v-card flat>
            <v-list two-line>
              <v-list-tile>
                <v-list-tile-content>
                    <v-list-tile-sub-title class="text-xs-center">Hole / Score</v-list-tile-sub-title>
                    <v-list-tile-title class="text-xs-center">{{ props.item.attributes.rnd2holes }} </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
        <v-layout row>
        <v-flex xs-4>
          <v-card flat>
            <v-list two-line>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-sub-title class="text-xs-center">ROUND 3</v-list-tile-sub-title>
                  <v-list-tile-title class="text-xs-center">$ {{ props.item.attributes.money[0].round_three }} </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
        <v-flex xs-8>
          <v-card flat>
            <v-list two-line>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-sub-title class="text-xs-center">Hole / Score</v-list-tile-sub-title>
                  <v-list-tile-title class="text-xs-center">{{ props.item.attributes.rnd3holes }} </v-list-tile-title>
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
  name: 'Table',
  props: ['current'],

  data () {
    return {
      isPreview: true,
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

  computed: mapState(['skins_leaderboards']),

  methods: {
    displayRow: function (props) {
      let klass = props.item.attributes.position < 6 || props.item.attributes.username == this.$auth.user().username ? 'hide-row' : ''
      return klass
    }
  },

  created: function (current) {
  }


}
</script>
<style>
.hide-row {
  display: none;
}
.skins thead {
  background-color: #6534ff;
}
table.table thead th {
  font-size: 14px;
  color: white;
}
table.table thead td:not(:nth-child(1)), table.table tbody td:not(:nth-child(1)), table.table thead th:not(:nth-child(1)), table.table tbody th:not(:nth-child(1)), table.table thead td:first-child, table.table tbody td:first-child, table.table thead th:first-child, table.table tbody th:first-child {
  padding: 0 3px;
}
</style>