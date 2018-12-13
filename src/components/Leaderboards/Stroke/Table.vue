<template>
  <v-data-table
    :headers="headers"
    :items="stroke_leaderboard"
    hide-actions
    class='stroke-table fixed-header board-table'
    item-key="user_id"
  >
    <template slot="items" slot-scope="props">
      <tr v-bind:class="displayRow(props)">
        <td class="text-xs-center">{{ props.item.attributes.position }}</td>
        <td class="text-xs-left">
          {{ props.item.attributes.username }}
          <v-spacer></v-spacer>
          <span class="grey--text">handicap {{ props.item.attributes.handicap }}</span>
        </td>
        <td class="text-xs-center">{{ props.item.attributes.total_score }}</td>
        <td v-bind:class="{ hidden_row : preview }" class="text-xs-center">{{ props.item.attributes.rnd1_score }}</td>
        <td v-bind:class="{ hidden_row : preview }" class="text-xs-center">{{ props.item.attributes.rnd2_score }}</td>
        <td v-bind:class="{ hidden_row : preview }" class="text-xs-center">{{ props.item.attributes.rnd3_score }}</td>
        <td class="text-xs-center">{{ props.item.attributes.net_total }}</td>
      </tr>
    </template>

    <template slot="expand" slot-scope="props">
    </template>
  </v-data-table>

</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Table',
  props: ['preview'],
  computed: {
    ...mapState(['stroke_leaderboard']),
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
          text: 'Total',
          align: 'center',
          sortable: false,
          value: 'total_score'
        },
        {
          text: 'R1',
          align: 'center',
          sortable: false,
          value: 'rnd1_score',
          class: 'rounds hidden_row'
        },
        {
          text: 'R2',
          align: 'center',
          sortable: false,
          value: 'rnd2_score',
          class: "rounds hidden_row"
        },
        {
          text: 'R3',
          align: 'center',
          sortable: false,
          value: 'rnd3_score',
          class: 'rounds hidden_row'
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
    displayRow: function (props) {
      let klass;
      if (this.preview) {
        klass = props.item.attributes.position < 6 || props.item.attributes.username == this.$auth.user().username ? '' : 'hidden_row'
      } else {
        klass = ''
      }
      return klass
    },
  },

  watch: {
    preview () {
      let headers = document.getElementsByClassName('rounds');
      [0, 1, 2].map(num => { headers[num].classList.toggle('hidden_row'); });
    }
  },

  mounted: function () {

  }

}
</script>
<style>

.board-table {
  overflow:hidden;
  border-radius: 0 0 20px 20px;
  transition: opacity 0.2s ease, box-shadow 0.2s ease;
}
.hidden_row {
  display: none;
}
.stroke-table table.theme--light thead {
  background-color: #30c9e8;
}
.stroke-table table.theme--light thead tr th {
  color: #f1f1f1;
  font-size: 14px;
  letter-spacing: 1px;
}

table.v-table thead td:not(:nth-child(1)), table.v-table tbody td:not(:nth-child(1)), table.v-table thead th:not(:nth-child(1)), table.v-table tbody th:not(:nth-child(1)), table.v-table thead td:first-child, table.v-table tbody td:first-child, table.v-table thead th:first-child, table.v-table tbody th:first-child {
  padding: 0;
}
</style>