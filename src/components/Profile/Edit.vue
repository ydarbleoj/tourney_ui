<template>
  <form>
    <v-text-field
      v-model="first_name"
      label="First Name"
      :counter="10"
      required
    ></v-text-field>
    <v-text-field
      v-model="last_name"
      label="Last Name"
      :counter="10"
      required
    ></v-text-field>
    <v-text-field
      v-model="email"
      label="E-mail"
      required
    ></v-text-field>
    <v-text-field
      v-model="handicap"
      label="Handicap"
      required
    ></v-text-field>

    <v-btn @click="edit">submit</v-btn>
    <router-link :to="'/profile'">BACK</router-link>
  </form>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
import axios from 'axios'

export default {
  name: 'Edit',
  // mixins: [validationMixin],
  // validations: {
  //   first_name: { required, maxLength: maxLength(10)},
  //   last_name: { required, maxLength: maxLength(10) },
  //   email: { required, email },
  // },

  data () {
    return {
      first_name: this.$auth.user().first_name,
      last_name: this.$auth.user().last_name,
      email: this.$auth.user().email,
      home: this.$auth.user().home,
      handicap: this.$auth.user().handicap
    }
  },

  methods: {
    edit (load) {
      axios.put('/users/' + this.$auth.user().id + '.json', {
        user: {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          home: this.home,
          handicap: this.handicap
        }
      }).then((res) =>{
        this.$auth.user(res.data)
      })
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