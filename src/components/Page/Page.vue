<template>
  <v-card flat class="container">
    <v-container fluid>
      <h3>HELLO</h3>
    </v-container>
  </v-card>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Page',
  components: {

  },
  data () {
    return {
      isLoaded: false

    }
  }

}
</script>
<style scoped>
.container {
  background-color: rgb(242, 242, 234);
}
</style>
