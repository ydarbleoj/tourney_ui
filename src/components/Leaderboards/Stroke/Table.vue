<template>
  <v-data-table
    :headers="headers"
    :items="stroke_leaderboard"
    hide-actions
    class='stroke rounded-card stroke-preview'
    item-key="user_id"
    @click="preview"
  >
    <template slot="items" slot-scope="props">
      <tr v-if="isPreview ? displayRow(props) : ''">
        <td class="text-xs-center">{{ props.item.attributes.position }}</td>
        <td class="text-xs-left">
          {{ props.item.attributes.username }}
          <v-spacer></v-spacer>
          <span class="grey--text">handicap {{ props.item.attributes.handicap }}</span>
        </td>
        <td class="text-xs-center">{{ props.item.attributes.total_score }}</td>
        <td v-if="isPreview ? hide-row : ''" class="text-xs-center">{{ props.item.attributes.rnd1_score }}</td>
        <td v-if="isPreview ? hide-row : ''" class="text-xs-center">{{ props.item.attributes.rnd2_score }}</td>
        <td v-if="isPreview ? hide-row : ''" class="text-xs-center">{{ props.item.attributes.rnd3_score }}</td>
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
  computed: {
    ...mapState(['stroke_leaderboard']),
    ...mapGetters(['getStrokeLeaderboard'])
  },

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
          class: 'hide-row'
        },
        {
          text: 'R2',
          align: 'center',
          sortable: false,
          value: 'rnd2_score',
          class: "hide-row"
        },
        {
          text: 'R3',
          align: 'center',
          sortable: false,
          value: 'rnd3_score',
          class: 'hide-row'
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
      let klass = props.item.attributes.position < 6 || props.item.attributes.username == this.$auth.user().username ? 'hide-row' : ''
      return klass
    },
    preview: function () {
      console.log('his')
    }
  },

  created: function () {

  }

}
</script>
<style>
.hide-row {
  display: none;
}
.stroke-preview {
  background-color: #62bcfa;
}
.stroke thead {
  background-color: #62bcfa;
}
table.table thead th {
  font-size: 10px;
}
table.table thead td:not(:nth-child(1)), table.table tbody td:not(:nth-child(1)), table.table thead th:not(:nth-child(1)), table.table tbody th:not(:nth-child(1)), table.table thead td:first-child, table.table tbody td:first-child, table.table thead th:first-child, table.table tbody th:first-child {
  padding: 0 10px;
  color: 'white';
}
</style>