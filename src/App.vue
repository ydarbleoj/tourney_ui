<template>
  <v-app v-if="$auth.ready()">
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
    },

    created () {
      var _this = this;

      this.$auth.ready(function () {
        console.log('ready ');
      });

      // Vue.http.interceptors.push(function (req, next) {
      //     next(function (res) {
      //         if ( ! res.ok) {
      //             _this.$router.push({name: 'error-502'})
      //         }
      //     });
      // });
    },

    unimpersonate() {
      this.$auth.unimpersonate({
        success() {
          console.log('success ' + this.context);
        },
        error() {
          console.log('error ' + this.context);
        }
      });
    }
  }

</script>
