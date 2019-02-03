<template>
  <v-container style="width:100vw;height:100vh;background-color:#fff;" class="pa-0">
    <v-img
        src="/static/4course.jpg"
        style="height:100vh;"
      >
      <v-layout row wrap align-center justify-center fill-height class="text-xs-center">
        <v-flex xs12>
          <h1 class="font-weight-regular mb-5 white--text">TOURNEY</h1>
          <v-btn flat round class="login_button font-weight-regular" :to="'login'">LOGIN</v-btn>
        </v-flex>
      </v-layout>
    </v-img>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Tourney'
    }
  },

  created () {
    console.log('this user', this.$auth.user())
  }


}
</script>
<style scoped>
.login_button {
  color: #F7A072;
  background-color: #FBFCFD;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 2s ease, box-shadow 2s ease;
}
.login_button:active {
  top: 1px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 2s ease, box-shadow 1s ease;
}
</style>
