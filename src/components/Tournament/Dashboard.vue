<template>
  <v-app class="home-container">
    <main>
      <v-container height="100%" color="white" text-xs-center>
        <h4>Your Tournaments</h4>
        <v-card class="rounded-card elevation-24" @click="" :to="'tournament'">
          <v-card-media
            :src="'/static/2course.jpg'"
            height='300px'
          >
          </v-card-media>
          <v-card-text >
            <h4>Bandon</h4>
          </v-card-text>
        </v-card>
      </v-container>
    </main>
  </v-app>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  components: {
  },
  computed: {
    ...mapState([]),
    ...mapGetters([])
  },

  data () {
    return {
    }
  },

  created: function () {
  },

}

</script>
<style>
.rounded-card {
  border-radius: 9px;
}
.home-container {
  background-color: white;
}
</style>