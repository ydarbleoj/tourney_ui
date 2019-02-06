<template>
  <v-container fill-height style="background-color:#fff;">
    <v-layout align-center justify-center row fill-height color="white">
      <v-flex xs12 class="text-xs-center" color="white">
        <h1 style="color:#74C9D7" class="font-weight-regular mb-5">Login</h1>
        <p style="color:red;" >{{ errorMessage }}</p>
        <form>
          <v-text-field
            color="#F8C977"
            label="Email"
            v-model="data.auth.email"
            required
          ></v-text-field>
          <v-text-field
            class="mt-3"
            color="#F8C977"
            label="Password"
            v-model="data.auth.password"
            placeholder='8 Characters Minumum'
            required
          ></v-text-field>

          <v-btn flat round class="admin--edit_button font-weight-regular mt-5" color="white" @click="login">{{ btnMessage }}</v-btn>
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
      errorMessage: '',
      btnMessage: 'Submit',
      data: {
        auth: {
          id: '',
          email: '',
          password: '',
          rememberMe: true,
        },
        fetchUser: true
      },

    }
  },
  methods: {
    login () {
      let redirect = this.setRedirect()
      this.$auth.login({
        data: { auth: { email: this.data.auth.email.toLowerCase(), password: this.data.auth.password } },
        redirect: redirect,
        fetchUser: true,
        rememberMe: this.data.auth.rememberMe,
      }).then(res => {
        console.log('login', res)
      }, (res) => {
        this.btnMessage = 'Failed'
        this.errorMessage = 'Sorry, please try again.'
        this.data.auth.password = ''
        console.log('error', res)
        setTimeout(() => this.resetBtns(), 3000)
      })
    },
    resetBtns () {
      this.btnMessage = 'Submit'
      this.errorMessage = ''
    },
    setRedirect () {
      return 'redirect' in this.$route.query ? this.$route.query.redirect : '/profile'
    }
  },

}
</script>
<style>
.admin--edit_button {
  background-color: #F8C977;
  color: #f1f1f1;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 1s ease, box-shadow 1s ease;
}
.admin--edit_button:active {
  top: 1px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 1s ease, box-shadow 1s ease;
}
.application--light .input-group:not(.input-group--error) label {
  color: #ffa726;
}
</style>