// stores/profile.js
import { defineStore } from "pinia";
import axios from "axios";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    userProfile: {},
    profileData: {},
    playerScorecards: [],
    scorecard: {},
    scorecardScores: [],
    menuData: []
  }),

  actions: {
    loadProfileData() {
      return axios.get("/api/v2/users/profiles").then((response) => {
        if (response.status === 200) {
          const data = response.data;
          this.profileData = JSON.parse(data.user_data).data;
          this.userProfile = JSON.parse(data.user).data.attributes;
          this.menuData = data.menu_data
          return true;
        } else {
          return false;
        }
      }).catch((err) => {
        console.error("Error loading profile data:", err);
        return false;
      });
    },

    loadScorecards() {
      return axios.get("/api/v3/profile/scorecards").then(response => {
        if (response.status === 200) {
          const attrs = response.data.data.attributes;
          this.playerScorecards = attrs.grouped_scorecards;
          return true;
        } else {
          return false;
        }
      }).catch((err) => {
        console.error("Error loading scorecards:", err);
        return false;
      });
    },

    loadScorecard(id) {
      return axios.get(`/api/v3/profile/scorecards/${id}`).then(response => {
        if (response.status === 200) {
          this.scorecard = response.data.data.attributes;
          this.scorecardScores = response.data.data.attributes.holes;
          return true;
        } else {
          return false;
        }
      }).catch((err) => {
        console.error("Error loading scorecard:", err);
        return false;
      });
    },
  },

  persist: true,
})
