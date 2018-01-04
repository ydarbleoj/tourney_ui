<template>
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

    <v-btn @click="login">submit</v-btn>
  </form>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      data: {
        auth: {
          id: '',
          email: 'brady.joel@gmail.com',
          password: 'gonzaga2004'
        },
        fetchUser: true
      },

    }
  },
  methods: {
    login () {
      console.log(this.data.auth.email)
      console.log(this.data.auth.password)
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
