<template>
  <v-container fill-height style="background-color:white;height:100vh;">
    <v-layout row wrap align-center>
      <v-flex xs12 class="text-xs-center">
        <v-card flat tile>
          <div v-if="!loading" class="text-xs-center">
            <v-spacer></v-spacer>
            <h1 class="font-weight-regular">{{ invitation.tourn_name }}</h1>
            <h2 style="color:#74C9D7;">{{ invitation.tourn_year }}</h2>
          </div>
          <v-card-text>
            <v-layout row wrap class="pb-3">
              <v-flex xs12>
                  <p>Please enter your current handicap. </p>
                  <p>If you don't have one, consider your average strokes above par and then subtract 3. Your handicap for this year will be 90% of what you enter here.</p>
                  <p>You will not be able to edit this once you hit accept.</p>
              </v-flex>
            </v-layout>
            <v-layout row align-center justify-center class="pl-3 pr-3">
              <v-flex xs5>
                <label style="font-size:12px;color:#999;">
                  Handicap (max 36.2)
                </label>
                <v-text-field
                  class="centered-input pa-0 custom-field"
                  name="handicap"
                  v-model.number="handicap"
                  type="number"
                  color="#F8C977"
                  style="font-size:50px;"
                >
                </v-text-field>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs5>
                <label style="color:#999;font-size:12px;padding-top:0">Bandon Hcap</label>
                <h3 style="color:#F8C977;font-size:55px;" class="font-weight-regular pa-0" v-model="tournHandicap">{{ tournHandicap }}</h3>
              </v-flex>
            </v-layout>

          </v-card-text>
          <v-card-actions class="pa-3 pt-3">
            <div class="text-xs-center" style="width:100%;">
              <v-btn flat round class="admin--profile_button" @click="accept" v-bind:loading="btnLoading">{{ acceptMessage }}</v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'AcceptInvite',
  computed: {
    ...mapState({
      tournamentPlayers: state => state.tournamentPlayers,
      invitation: state => state.invitations.invitation,
      accepted: state => state.invitations.accepted
    })
  },

  data () {
    return {
      btnLoading: false,
      acceptMessage: 'Accept Invitation',
      loading: true,
      token: null,
      tournId: '',
      handicap: 20,
      tournHandicap: null,
      message: "Please enter your current handicap. If you don't have one, consider your average strokes above par and then subtract 3. Your handicap for this year will be 90% of what you enter here. "
    }
  },
  methods: {
    accept () {
      this.btnLoading = true
      this.$store.dispatch('invitations/ACCEPT_INVITATION',
        { tournId: this.tournId, id: this.invitation.id, handicap: this.tournHandicap })
        .then((response) => {
          if (response) {
            this.updateMessage = 'Success'
            this.$router.push('/profile')
          } else {
            this.updateMessage = 'Failed'
            this.handicap = 20
          }
          setTimeout(() => this.updateMessage = 'Accept Invitation', 3000)
          this.btnLoading = false
        })
    },
    factoredHcap () {
      let nn = this.handicap
      const fact = Math.round(nn * 0.9)
      this.tournHandicap = fact
    },
    inputStyle () {
      let el = document.getElementsByName('handicap')[0]
      let elSlot = document.getElementsByClassName('v-input__slot')[0]
      console.log('hsdhfksl', el)
      el.style.minHeight = '65px';
      el.style.textAlign = 'center';
      elSlot.style.position = "unset";
    }
  },

  mounted () {
    this.inputStyle()
  },
  created () {
    this.factoredHcap()
    let tok = this.$route.params.token

    if (!tok) {
      this.$router.push('/profile')
    } else {
      this.tournId = tok.split(':')[0]
      this.token = tok.split(':')[1]
      this.$store.dispatch('invitations/SET_INVITATION', { tournId: this.tournId, token: this.token })
        .then((response) => {
          if (this.accepted === true) {
            this.$router.push('/profile')
          }
        })
    }
  },
  watch: {
    handicap (){
      let hcap = this.handicap;
      if (!hcap && hcap !== 0) return;
      (hcap > 36.2) ? this.handicap = 36.2 : this.handicap
      this.factoredHcap()
    }
  }
}
</script>
<style scoped>
.v-input.centered-input.v-input__control.v-input__slot.v-text-field__slot.v-input input[name=handicap] {
  color: pink;
  padding: 0;
  text-align: center;
  max-height: 55px;
}
.admin--profile_button {
  background-color: #74C9D7;
  color: #FBFCFD;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 1s ease, box-shadow 1s ease;
}
.application--light .input-group:not(.input-group--error) label {
  color: #ffa726;
}
</style>