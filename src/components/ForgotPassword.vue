<template>
  <v-container fill-height style="background-color:#fff;">
    <v-layout align-center justify-center row fill-height color="white">
      <v-flex xs12 class="text-xs-center">
        <h1 style="color:#74C9D7" class="font-weight-regular mb-5">Forgot Password</h1>
        <v-form class="form-app form-forgot-password" @submit.prevent="submit">
          <div class="alert alert-info" v-if="notice">{{ notice }}</div>
          <div class="alert alert-danger" v-if="error">{{ error }}</div>
          <v-text-field
            color="#ED6C6C"
            label="Email"
            v-model="email"
            required
          ></v-text-field>

          <v-btn flat round class="admin--edit_button font-weight-regular mt-5" color="white" @click="submit">
            Submit
          </v-btn>
        </v-form>
        <div>
          <br />
          <router-link to="/login">Back</router-link>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex"
import axios from "axios"

export default {
  name: 'ForgotPassword',
  data () {
    return {
      email: '',
      error: '',
      notice: ''
    }
  },
  methods: {
    submit () {
      if (this.email) {
        return axios.post('/password_resets', { email: this.email })
          .then(() => this.submitSuccessful())
          .catch(error => this.submitFailed(error))
      } else {
        this.notice = "Must provide an email."
      }
    },
    submitSuccessful () {
      this.notice = 'Your password was reset to the original.'
      this.error = ''
      this.email = ''

      setTimeout(this.$router.push({ name: 'Login' }), 2000)
    },
    submitFailed (error) {
      const e = error.response
      this.error = e.data
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