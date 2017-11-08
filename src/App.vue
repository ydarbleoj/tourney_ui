<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        links: [
          'login', 'Courses', 'Home'
        ],
        menuItems: [
          'All', 'Family', 'Friends', 'Coworkers'
        ],
        items: [{
          icon: 'bubble_chart',
          title: 'Inspire'
        }],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Vuetify.js'
      }
    }
  }

</script>
