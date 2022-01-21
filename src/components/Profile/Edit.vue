<template>
  <v-card flat style="height:100vh;" class="pa-3">
    <v-layout row wrap align-center>
      <v-flex x3>
        <BackButton
          :routeName="'Profile'"
          :routeParams="{ id: $auth.user().id }"
        />
      </v-flex>
       <v-flex xs6>
        <h4 class="font-weight-regular grey--text text-xs-center">Your Account</h4>
       </v-flex>
       <v-flex xs3></v-flex>
    </v-layout>
    <v-card-text>
      <form v-if="!updatePassword" >
        <v-text-field
          v-model="first_name"
          label="First Name"
          :counter="25"
          required
        ></v-text-field>
        <v-text-field
          v-model="last_name"
          label="Last Name"
          :counter="25"
          required
        ></v-text-field>
        <v-text-field
          v-model="email"
          label="E-mail"
          required
        ></v-text-field>
        <v-text-field
          v-model="home"
          label="Home"
          placeholder="Portland, Or"
          required
        ></v-text-field>
      </form>
      <v-card flat class="pb-3 pl-0" v-if="$auth.user().role === 'admin'">
        <v-card-title class="pa-0 text-xs-center">
          <h3 class="font-weight-medium">Change Password</h3>
          <v-spacer></v-spacer>
          <span ><v-icon color="#F7A072" style="font-size:35px;" @click="changePassword()" v-if="!updatePassword">arrow_forward</v-icon></span>
          <span ><v-icon color="#F7A072" style="font-size:35px;" @click="changePassword()" v-if="updatePassword">clear</v-icon></span>
          <v-card flat style="width:100%;" v-if="updatePassword">
            <v-text-field
              v-model="password"
              label="Password"
              placeholder="Min 8 characters"
              required
            ></v-text-field>
            <v-text-field
              v-model="password_confirmation"
              label="Confrim"
              required
            ></v-text-field>
          </v-card>
        </v-card-title>
      </v-card>
    </v-card-text>
    <v-divider></v-divider>
    <v-card flat class="pl-0 pt-2 pb-3" v-if="$auth.user().role === 'admin'">
      <v-card-title class="pa-0 text-xs-center">
        <h3 class="font-weight-medium">Create Tournament</h3>
        <v-spacer></v-spacer>
        <span @click="toCreatePage">
          <v-icon color="#F8C977" style="font-size:35px;">
             arrow_forward
          </v-icon>
        </span>
      </v-card-title>
    </v-card>
     <v-card-actions class="pa-3text-xs-center align-center">
      <v-layout row wrap fill-height align-center style="" class="text-xs-center pt-4 pb-4">
        <v-flex xs12>
          <div class="text-xs-center pt-5">
            <v-btn flat round class="admin--profile_button font-weight-regular" @click="edit()" v-bind:loading="btnLoading">{{ updateMessage }}</v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
import axios from 'axios'
import BackButton from '../BackButton'

export default {
  name: 'Edit',
  components: {
    BackButton
  },

  data () {
    return {
      btnLoading: false,
      updatePassword: false,
      updateMessage: "Update",
      first_name: this.$auth.user().first_name,
      last_name: this.$auth.user().last_name,
      email: this.$auth.user().email,
      home: this.$auth.user().home,
      handicap: this.$auth.user().handicap,
      password: null,
      password_confirmation: null
    }
  },

  methods: {
    toCreatePage () {
      this.$router.push({ name: "TournamentCreate" })
    },
    edit () {
      this.btnLoading = true
      let user = {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          home: this.home,
        }
      let pass = this.setPassword()
      const options = Object.assign({}, user, pass)

      return axios.put('/api/v2/users/profiles/' + this.$auth.user().id + '.json', { user: options })
        .then((response) => {
        if (response.status === 200) {
          this.$auth.user(response.data.data.attributes);
          this.updateMessage = 'Success'
        } else {
          this.updateMessage = 'Failed'
        }
        setTimeout(() => this.updateMessage = 'Update', 3000)
        this.btnLoading = false
        this.updatePassword = false
      })
    },
    changePassword () {
      this.updatePassword = !this.updatePassword
    },
    setPassword () {
      if (this.password === null) return {};
      return {
        password: this.password,
        password_confirmation: this.password_confirmation
      }
    }
  },

  computed: {
    // nameErrors () {
    //   const errors = []
    //   if (!this.$v.name.$dirty) return errors
    //   !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
    //   !this.$v.name.required && errors.push('Name is required.')
    //   return errors
    // },
    // emailErrors () {
    //   const errors = []
    //   if (!this.$v.email.$dirty) return errors
    //   !this.$v.email.email && errors.push('Must be valid e-mail')
    //   !this.$v.email.required && errors.push('E-mail is required')
    //   return errors
    // }
  },

  created: function () {
    console.log('edit', this.$auth.user())
  }
}
</script>
<style>
a {
  text-decoration: none;
}
.admin--profile_button {
  background-color: #74C9D7;
  color: #FBFCFD;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 2s ease, box-shadow 2s ease;
}
.admin--profile_button:active {
  top: 1px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 2s ease, box-shadow 1s ease;
}
</style>