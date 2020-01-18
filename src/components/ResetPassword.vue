<template>
  <v-container fill-height style="background-color:#fff;">
    <v-layout align-center justify-center row fill-height color="white">
      <v-flex xs12 class="text-xs-center">
        <h1 style="color:#74C9D7" class="font-weight-regular mb-5">Reset Password</h1>
        <v-form class="form-app form-reset-password" @submit.prevent="reset">
          <div class="alert alert-info" v-if="notice">{{ notice }}</div>
          <div class="alert alert-danger" v-if="error">{{ error }}</div>

          <v-text-field
            color="#74C9D7"
            label="Password"
            v-model="password"
            required
          ></v-text-field>

          <v-text-field
            color="#74C9D7"
            label="Password Confirmation"
            v-model="password_confirmation"
            required
          ></v-text-field>

          <v-btn flat round class="admin--edit_button font-weight-regular mt-5" @click="reset">
            Reset password
          </v-btn>
        </v-form>
         </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from "axios"

export default {
  name: 'ResetPassword',
  data () {
    return {
      password: '',
      password_confirmation: '',
      error: '',
      notice: ''
    }
  },
  created () {},
  methods: {
    reset () {
      return axios.patch('/password_resets/' + this.$route.params.token, { password: this.password, password_confirmation: this.password_confirmation })
        .then(response => {
          if (response.status === 200) {
            this.resetSuccessful(response)
          } else {
            this.resetFailed(response)
          }
        })
    },
    resetSuccessful (response) {
      console.log('res', response)
      this.$auth.login({
        data: {
          auth: {
            email: response.data.user.email.toLowerCase(),
            password: response.data.password
          }
        }
      })

      if ($auth.ready()) {
        this.$router.push({ name: "profile" })
      }
    },
    resetFailed (error) {
      this.error = 'Something went wrong'
      this.notice = ''
    }
  }
}
</script>
<style scoped>
.admin--edit_button {
  background-color: #999999;
  color: #f1f1f1;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 1s ease, box-shadow 1s ease;
}
.admin--edit_button:active {
  top: 1px;
  box-shadow: 0px 2px 10px 0px rgba(53, 51, 51, 0.1);
  transition: opacity 1s ease, box-shadow 1s ease;
}
.application--light .input-group:not(.input-group--error) label {
  color: #ffa726;
}
</style>