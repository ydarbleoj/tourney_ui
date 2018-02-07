<template>
  <v-data-table
    :headers="headers"
    v-bind:items="skins_leaderboards"
    hide-actions
    hide-headers
    class='skins-preview'
    item-key="username"
  >
    <template slot="items" slot-scope="props">
      <tr @click="props.expanded = !props.expanded">
        <td class="text-xs-center">{{ props.item.pos}}</td>
        <td class="text-xs-left">{{ props.item.username }}</td>
        <td class="text-xs-center">$ {{ props.item.money[0].money_total }}</td>
        <td class="text-xs-center">{{ props.item.total }}</td>
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
                  <v-list-tile-title class="text-xs-center">$ {{ props.item.money[0].round_one }} </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
        <v-flex xs-4>
          <v-card flat>
            <v-list two-line>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-sub-title class="text-xs-center">ROUND 2</v-list-tile-sub-title>
                  <v-list-tile-title class="text-xs-center">$ {{ props.item.money[0].round_two }} </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
        <v-flex xs-4>
          <v-card flat>
            <v-list two-line>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-sub-title class="text-xs-center">ROUND 3</v-list-tile-sub-title>
                  <v-list-tile-title class="text-xs-center">$ {{ props.item.money[0].round_three }} </v-list-tile-title>
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
  name: 'SkinsPreview',
  props: ['current'],
  computed: mapState([
    'skins_leaderboards'
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
          text: 'Money',
          align: 'center',
          sortable: false,
          value: ''
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

  watch: {
    current: function () {
      this.$store.dispatch('LOAD_SKINS_PREVIEW', { id: this.current.id })
    }
  },

  created: function (current) {
    this.$store.dispatch('LOAD_SKINS_PREVIEW', { id: this.current.id })
  }


}
</script>
<style>
.skins thead {
  background-color: #6534ff;
}
table.table thead th {
  font-size: 12px;
}
table.table thead td:not(:nth-child(1)), table.table tbody td:not(:nth-child(1)), table.table thead th:not(:nth-child(1)), table.table tbody th:not(:nth-child(1)), table.table thead td:first-child, table.table tbody td:first-child, table.table thead th:first-child, table.table tbody th:first-child {
  padding: 0 10px;
}
</style>