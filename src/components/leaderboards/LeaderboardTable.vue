<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :disable-sort="true"
    :items-per-page="-1"
    class='default-bg leaderboard-table flex-table bandon-dark-color'
    item-key="id"
  >
    <template v-slot:item="{ item }">
      <tr @click="toPlayerPage(item.id)">
        <td style="font-size:16px" class="pa-0 pl-1">
          <div class="position-and-movement text-center pa-0">
            {{ item.attributes.current_position }}
            <h5 class="pl-1">
              <v-icon v-if="movementUp(item.attributes)" color="green">
                mdi-arrow-up
              </v-icon>
              <v-icon v-if="movementDown(item.attributes)" color="red">
                mdi-arrow-down
              </v-icon>
              <span class="font-weight-regular" style="color:#666">
                {{
                  (item.attributes.movement == 0 || item.attributes.dnf) ? '' : item.attributes.movement
                }}
              </span>
            </h5>
          </div>
        </td>
        <td class="text-left pt-1 pb-1" style="font-size:16px;">
          {{ item.attributes.username }}
          <v-spacer></v-spacer>
          <span style="font-size:12px;color:#666">
            handicap {{ item.attributes.handicap }}
          </span>
        </td>
        <td class="pl-0 pr-0">
          {{ item.attributes.total_score }}
        </td>
        <td class="pl-0 pr-0">
          {{ item.attributes.rnd1_score }}
        </td>
        <td class="pl-0 pr-0">
          {{ item.attributes.rnd2_score }}
        </td>
        <td class="pl-0 pr-0">
          {{ item.attributes.rnd3_score }}
        </td>
        <td class="pl-0 pr-1">
          <span>
            {{ item.attributes.total_net }}
          </span>
          <v-icon>
            mdi-chevron-right
          </v-icon>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "LeaderboardTable",
  props: {
    headers: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    playerPage: {
      type: String,
      required: true
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
    movementUp (pos) {
      if (pos.movement > 0) { return true }
    },
    movementDown (pos) {
      if (pos.dnf) { return false }
      if (pos.movement < 0) { return true }
    },
    toPlayerPage (id) {
      // this.$store.commit("setPageTransition");
      this.$router.push({
        name: this.playerPage,
        params: {
          id: this.$route.params.id,
          leaderboard_id: id
        }
      })
    },
  },
  mounted () {
    this.onMutate()
  }
}
</script>
<style>
.v-data-table-footer {
  display: none;
}
.v-data-table th.v-data-table__td.v-data-table-column--align-center.v-data-table__th {
  padding: 0 2px;
  text-align: center;
}

.players-header, .players-cell {
  text-align: left;
  padding: 0;
}

/* Additional styles for the position and movement icons */
.position-and-movement {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
