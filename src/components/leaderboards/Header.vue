<template>
  <div class="pa-0">
    <v-row>
      <v-col cols="12" class="less-neutral-gray">
        <BackButton
          :routeName="'Tournament'"
          :routeParams="{ id: this.currentTournament.id }"
        />
        <h1 class="text-h3 pl-5 font-weight-regular"> {{ name }} Leaderboard</h1>
        <h1 class="text-h3 pl-5 font-weight-medium">{{ year }}</h1>
      </v-col>
    </v-row>
    <v-row class="ma-0">
      <v-col cols="12" class="text-right bandon-dark-color pr-5">
        <h2 class="font-weight-regular">Purse $
          <span style="font-size:20px;">{{ purse }}</span>
        </h2>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapState } from 'pinia'
import BackButton from '../BackButton.vue'
import { useTournamentStore } from "@/store/tournament";

export default {
  name: 'Header',
  props: ['purse', 'name'],
  components: {
    BackButton
  },

  data () {
    return {
      year: ""
    }
  },

  computed: {
		...mapState(useTournamentStore, ["currentTournament"]),
  },

  mounted: function () {
    this.year = this.currentTournament.year
  }
}
</script>