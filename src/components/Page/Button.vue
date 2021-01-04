<template>
  <v-container>
    <v-layout row justify="space-around">
      <v-card
        rounded
        class="mx-auto"
        height="100"
        width="150"
      >
        <router-link
          :to="{
            name: 'StrokeLeaderboard',
            params: {
              id: currentTournament.id
            }
          }"
        >
          {{ title }}
        </router-link>
      </v-card>
    </v-layout>
  </v-container>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'PageButton',
  props: ['title'],
  computed: {
    ...mapState(['currentTournament']),
  },
  components: {

  },
  data () {
    return {
      isLoaded: true,
      dialog: false
    }
  }

}
</script>
<style scoped>
.container {
  background-color: rgb(132, 211, 186);
}
</style>