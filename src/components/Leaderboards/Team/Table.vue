<template>
  <v-data-table
    :headers="headers"
    :items="teamLeaderboard"
    hide-actions
    class='team-table fixed-header board-table'
    item-key="id"
  >
    <template slot="items" slot-scope="props">
      <tr @click="preview ? null : props.expanded = !props.expanded" v-bind:style="setStyle">
        <td class="text-xs-center">{{ props.item.attributes.position }}</td>
        <td class="text-xs-left mt-5">
          <h4 class="font-weight-medium mb-2">
            {{ props.item.attributes.group }}
          </h4>
          <v-layout row wrap v-bind:class="{ hidden_row : preview }">
            <v-flex xs12 style="width:100%;">
              <ul
                style="width:100%;padding:0;"
              >
                <li
                  v-for="(item, i) in props.item.attributes.players"
                  id="this"
                  :key="i"
                  d-inline-flex
                  style="display:inline-block;margin:0;width:50%"

                >
                  {{ item.username }}
                  <v-spacer></v-spacer>
                  <span class="grey--text">handicap {{ item.handicap }}</span>
                </li>
              </ul>
            </v-flex>
          </v-layout>
        </td>
        <td class="text-xs-center">{{ props.item.attributes.total }}</td>
        <td class="text-xs-center">{{ props.item.attributes.total_net }}</td>
      </tr>
    </template>

    <template slot="expand" slot-scope="props">
      <v-layout row wrap class="font-weight-regular pt-3 pb-3 pr-2" align-center>

      </v-layout>
    </template>
  </v-data-table>

</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Table',
  props: ['preview'],
  computed: {
    ...mapState(['teamLeaderboard']),
  },

  data () {
    return {
      setStyle: {},
      headers: [
        {
          text: 'Pos',
          align: 'center',
          sortable: false,
          value: 'pos'
        },
        {
          text: 'Group',
          align: 'left',
          sortable: false,
          value: 'group',
        },
        {
          text: 'Total',
          align: 'center',
          sortable: false,
          value: 'total'
        },
        {
          text: 'Score',
          align: 'center',
          sortable: false,
          value: 'net_total'
        }
      ]
    }
  },

  methods: {
  },

  watch: {
    preview () {
      let h = this.preview ? {} : { height: '18vh' }
      this.setStyle = Object.assign(h)
    }
  },

  created () {
  }

}
</script>
<style>
.team-stats {
  color: #FE8202;
}
.board-table {
  overflow:hidden;
  border-radius: 0 0 20px 20px;
  transition: opacity 0.2s ease, box-shadow 0.2s ease;
}
.hidden_row {
  display: none;
}
.team-table table.theme--light thead {
  background-color: #FF9D72;
}
.team-table table.theme--light thead tr th {
  color: #f1f1f1;
  font-size: 14px;
  letter-spacing: 1px;
}

table.v-table thead td:not(:nth-child(1)), table.v-table tbody td:not(:nth-child(1)), table.v-table thead th:not(:nth-child(1)), table.v-table tbody th:not(:nth-child(1)), table.v-table thead td:first-child, table.v-table tbody td:first-child, table.v-table thead th:first-child, table.v-table tbody th:first-child {
  padding: 1px;
}
</style>