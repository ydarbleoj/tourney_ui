<template>
  <v-bottom-navigation>
    <v-btn
      icon
      :class="{ active: isActive('Tournament') }"
      @click="toPage('Tournament')"
    >
      <FontAwesomeIcon icon="home" />
    </v-btn>
    <v-btn
      icon
      :class="{ active: isActive('MudderCup') }"
      @click="toPage('MudderCup')"
    >
      <FontAwesomeIcon icon="trophy" />
    </v-btn>
    <v-btn
      icon
      :class="{ active: isActive('TournamentBreakdown') }"
      @click="toPage('TournamentBreakdown')"
    >
      <FontAwesomeIcon icon="flag" />
    </v-btn>
    <v-btn
      icon
      :class="{ active: isActive('TournamentGallery') }"
      @click="toPage('TournamentGallery')"
    >
      <FontAwesomeIcon icon="image" />
    </v-btn>
    <v-btn
      icon
      :class="{ active: isActive('TournamentDiscussion') }"
      @click="toPage('TournamentDiscussion')"
    >
      <FontAwesomeIcon icon="comments" />
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faTrophy, faFlag,faImage, faComments } from '@fortawesome/free-solid-svg-icons';

// Add each imported icon to the library
library.add(faHome, faTrophy, faImage, faFlag, faComments);
export default {
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      isNavbarVisible: true,
      id: this.$route.params.id
    };
  },
  methods: {
    isActive(routeName) {
      return this.$route.name === routeName;
    },
    toPage(page) {
      this.$router.push({
        name: page,
        params: {
          id: this.id
        }
      });
    }
  },
}
</script>

<style scoped>
.fa-icon {
  font-size: 30px; /* Adjust the icon size */
  vertical-align: middle;
}

.active {
  color: #cf8018;
}
/* Default icon color */
.fa-icon {
  color: #434949; /* Your defined black color */
}
.v-bottom-navigation {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f7f7f7;
}
</style>
