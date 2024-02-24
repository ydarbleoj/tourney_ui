<script>
import { reactive } from "vue";
import { onMounted } from "vue";
import { useAuth  } from "@websanova/vue-auth/src/v3.js";
import useAuthComp from "@/plugins/useAuthComp.js";

export default {
  setup() {
    const auth = useAuth();
    const authComp = useAuthComp();

    // email: "jacobajf@gmail.com",
    // password: "fain1234",
    // email: "grs@yurik.net",
    // password: "smith1234",
    const state = reactive({
      data: {
        btnMessage: "Submit",
        errorMessage: "",
        auth: {
          email: 'brady.joel@gmail.com',
          password: 'brady1234',
          remember: true,
          fetchUser: true,
          staySignedIn: true
        }
      }
    });

    onMounted(() => {
      console.log(auth.redirect());
    });

    function login() {
      authComp
        .login({ body: state.data.auth })
        .then(null, (res) => {
          state.data.btnMessage = 'Failed'
          state.data.errorMessage = 'Sorry, please try again.'
          state.data.auth.password = ''

          setTimeout(() => resetBtns(), 3000)
        });
    }

    function resetBtns() {
      state.data.btnMessage = "Submit";
      state.data.errorMessage = "";
    }

    return { state, login }
  }
};
</script>

<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="12 md-6 lg-4">
        <h1 style="color: #74c9d7" class="font-weight-regular mb-5">Login</h1>
        <form>
          <v-text-field
            color="#F8C977"
            label="Email"
            :value="state.data.email"
            required
          ></v-text-field>
          <v-text-field
            class="mt-3"
            color="#F8C977"
            label="Password"
            :value="state.data.password"
            placeholder="8 Characters Minumum"
            required
          ></v-text-field>
          <v-btn @click="login">
            {{ state.data.btnMessage }}
          </v-btn>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.admin--edit_button {
  background-color: #f8c977;
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
