<template>
  <v-data-table
    :headers="headers"
    :items="items"
    hide-actions
    class='stroke-table board-table'
    item-key="id"
  >
    <template slot="items" slot-scope="">

    </template>
  </v-data-table>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Body',
  computed: {
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
          class: 'stroke-row hidden_row'
        },
        {
          text: 'R2',
          align: 'center',
          sortable: false,
          value: 'rnd2_score',
          class: "stroke-row hidden_row"
        },
        {
          text: 'R3',
          align: 'center',
          sortable: false,
          value: 'rnd3_score',
          class: 'stroke-row hidden_row'
        },
        {
          text: 'Score',
          align: 'center',
          sortable: false,
          value: 'net_total'
        }
      ],
    }
  },

  methods: {
    displayRow: function (props) {
      let klass;
      if (this.preview) {
        klass = props.index < 3 || props.item.attributes.username == this.$auth.user().username ? '' : 'hidden_row'
      } else {
        klass = ''
      }
      return klass
    },
  },

  watch: {
  },

  created () {
  }

}
</script>
<style>
.board-table {
  overflow:hidden;
  border-radius: 0 0 20px 20px;
  transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
}
.hidden_row {
  display: none;
}
.stroke-table table.theme--light thead {
  background-color: #9FB8CE;
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