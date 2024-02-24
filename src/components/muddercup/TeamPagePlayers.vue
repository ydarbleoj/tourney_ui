<template>
  <div>
    <v-row class="mb-5 mt-5">
      <v-col cols="6" v-for="player in players" :key="player.id">
        <v-card class="d-flex flex-row pa-3 box-shadow" style="border-radius: 25px;" flat>
          <v-row>
            <v-col cols="12">
              <img
                :src="'https://cdn.vuetifyjs.com/images/john.jpg'"
                class="profile-image"
                align="left"
              />
              <h4 class="pt-2">
                {{ player.username }}
              </h4>
              <span class="text-left">
                Hcap {{ player.handicap }}
              </span>
            </v-col>
            <v-col cols="12">
              <v-row>
                <v-col cols="6" class="pa-0">
                  <h4 class="text-center">Cups</h4>
                  <h3 class="bandon-orange-color text-center">{{ player.appearances }}</h3>
                </v-col>
                <v-col cols="6" class="pa-0">
                  <h4 class="text-center">Record</h4>
                  <h3 class="bandon-orange-color text-center">{{ player.record }}</h3>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import { mapState } from 'pinia'
import { useMudderCupStore } from '@/store/mudderCup'

export default {
  name: 'TeamPlayerPage',
  props: {
    players: {
      type: Array,
      required: true
    },
  },

  data() {
    return {
      userId: this.$auth.user().id,
    }
  },
}
</script>

<style scoped>
.profile-image {
  height: 75px;
  width: 75px;
  border-radius: 25px;
  margin-right: 10px;
}
.info-span {
	font-size: 16px;
	color: #666;
}
.bx-shadow {
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
}

</style>
