<template>
  <v-data-table
    :headers="headers"
    :items="leaderboardArray"
    hide-actions
    class='leaderboard-table'
    item-key="id"
  >
    <template slot="items" slot-scope="props">
      <tr @click="toPlayerPage(props.item.attributes.id)" style="background-color:#f1f1f1">
        <td class="text-xs-center">
          {{ props.item.attributes.position }}</td>
        <td class="text-xs-left" style="font-size:16px;">
          {{ props.item.attributes.username }}
          <v-spacer></v-spacer>
          <span style="color:#666;">3 putts -$ {{ props.item.attributes.three_putt_pot }}</span>
        </td>
        <td class="text-xs-center" style="font-size:16px;">{{ props.item.attributes.total_skins }}</td>
        <td class="text-xs-center" style="font-size:16px;">{{ props.item.attributes.total_team }}</td>
        <td class="text-xs-center" style="font-size:16px;">{{ props.item.attributes.total_putting }}</td>
        <td class="text-xs-center" style="font-size:16px;">{{ props.item.attributes.total_stroke }}</td>
        <td class="text-xs-center" style="font-size:16px;">{{ props.item.attributes.total_money }}</td>
        <td class="text-xs-center">
          <v-icon color="#999">
            mdi-chevron-right
          </v-icon>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MoneyTable',
  props: {
		leaderboardArray: Array,
		linkTo: String
	},

  data () {
    return {
      headers: [
        {
          text: '',
          class: 'header-color',
          align: 'left',
          sortable: false,
          value: 'pos',
          width: '8%',
        },
        {
          text: 'Players',
          class: 'header-color',
          align: 'left',
          sortable: false,
          value: 'username',
          width: '36%',
        },
        {
          text: 'Skins',
          class: 'header-color',
          align: 'center',
          sortable: false,
          value: 'total_score',
          width: '10%'
        },//62
        {
          text: 'Team',
          class: 'header-color',
          align: 'center',
          sortable: false,
          value: 'rnd1_score',
          width: '10%'
        },
        {
          text: 'Putting',
          class: 'header-color',
          align: 'center',
          sortable: false,
          value: 'rnd2_score',
          width: '10%'
        },
        {
          text: 'Stroke',
          class: 'header-color',
          align: 'center',
          sortable: false,
          value: 'rnd3_score',
          width: '10%'
        },
        {
          text: 'Total',
          class: 'header-color',
          align: 'center',
          sortable: false,
          value: 'net_total',
          width: '10%'
        },
        {
          text: '',
          class: 'header-color',
          align: 'center',
          sortable: false,
          value: 'pos',
          width: '6%'
        },
      ],
    }
  },
  methods: {
    onMutate () {
      let height = 0
      const toolbar = this.$refs.toolbar
      if (toolbar) {
        height = `${toolbar.$el.offsetHeight}px`
      }
      document.documentElement.style.setProperty('--headerHeight', height)
    },
    toPlayerPage (id) {
      // this.$store.commit("setPageTransition");
       // this.$router.push({
      //   name: this.linkTo,
      //   params: {
      //     user_id: id
      //   }
      // })
    },
  },
  mounted () {
    this.onMutate()
  }
}
</script>
<style>
.stroke-percent {
  font-weight: normal;
  color: #2E2F2F;
  font-size: 20px;
}
.stroke-stats {
  color: #9FB8CE;
}
.board-table {
  overflow:hidden;
  transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
}
.stroke-table table.theme--light thead {
  background-color: #9FB8CE;
}
.stroke-table table.theme--light thead tr th {
  color: #f1f1f1;
  font-size: 14px;
  letter-spacing: 1px;
}
.header-color {
  background-color: #9FB8CE;
}

.leaderboard-table table {
  table-layout: fixed;
}
table.v-table thead td:not(:nth-child(1)), table.v-table tbody td:not(:nth-child(1)), table.v-table thead th:not(:nth-child(1)), table.v-table tbody th:not(:nth-child(1)), table.v-table thead td:first-child, table.v-table tbody td:first-child, table.v-table thead th:first-child, table.v-table tbody th:first-child {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 0;
  padding-left: 0;
}
table.v-table thead th {
  white-space: normal
}
</style>