<template>
  <v-card flat style="height:100vh;" class="pa-3">
    <v-row wrap align="center">
      <v-col cols="3">
        <BackButton
          :routeName="'profile'"
          :routeParams="{ id: $auth.user().id }"
        />
      </v-col>
       <v-col cols="6">
        <h4 class="font-weight-regular grey--text text-center">Your Account</h4>
       </v-col>
       <v-col cols="3"></v-col>
    </v-row>
    <v-card-text>
      <form v-if="!updatePassword" >
        <v-text-field
          :value="first_name"
          label="First Name"
          :counter="25"
          required
        ></v-text-field>
        <v-text-field
          :value="last_name"
          label="Last Name"
          :counter="25"
          required
        ></v-text-field>
        <v-text-field
          :value="email"
          label="E-mail"
          required
        ></v-text-field>
        <v-text-field
          :value="home"
          label="Home"
          placeholder="Portland, Or"
          required
        ></v-text-field>
      </form>
      <v-card flat class="pb-3 pl-0">
        <v-card-title class="pa-0 text-center">
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
      <v-card-title class="pa-0 text-center">
        <h3 class="font-weight-medium">Create Tournament</h3>
        <v-spacer></v-spacer>
        <span @click="toCreatePage">
          <v-icon color="#F8C977" style="font-size:35px;">
             arrow_forward
          </v-icon>
        </span>
      </v-card-title>
    </v-card>
     <v-card-actions class="pa-3 text-center" align="center">
      <v-row wrap fill-height align="center" style="" class="text-center pt-4 pb-4">
        <v-col cols="12">
          <div class="text-center pt-5">
            <v-btn flat round class="admin--profile_button font-weight-regular" @click="edit()" v-bind:loading="btnLoading">{{ updateMessage }}</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>
<script>
import axios from 'axios'
import BackButton from "../BackButton.vue";

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
    },
    logout () {
      this.$auth.logout({
        params: {},
        data: {},
        redirect: '/login'
      })
    },
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