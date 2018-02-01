<template>
  <v-container fill-height>
    <v-layout row wrap align-center>
      <v-flex xs12 class="text-xs-center">
        <h3>Tourney</h3>
        <form>
          <v-text-field
            label="Email"
            v-model="data.auth.email"
            :counter="10"
            required
          ></v-text-field>
          <v-text-field
            label="Password"
            v-model="data.auth.password"
            required
          ></v-text-field>

          <v-btn outline color="amber darken-2" @click="login">submit</v-btn>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      data: {
        auth: {
          id: '',
          email: '',
          password: ''
        },
        fetchUser: true
      },

    }
  },
  methods: {
    login () {
      var redirect = this.$auth.redirect()
      this.$auth.login({
        data: { auth: { email: this.data.auth.email, password: this.data.auth.password } },
        redirect: '/profile',
        fetchUser: true,
      }).then(res => {
        console.log('login', res)
      }, (res) => {
        console.log('error', res)
      })
    }
  }
}
</script>
<style>
.application--light .input-group:not(.input-group--error) label {
  color: #ffa726;
}
</style>