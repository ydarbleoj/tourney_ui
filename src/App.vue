<template>
  <v-app v-if="$auth.ready()">
    <transition
      :name="$store.state.pageTransition.name"
      :mode="$store.state.pageTransition.mode"
      v-on:after-enter="afterEnter"
      v-on:after-leave="afterLeave"
    >
      <router-view class="transition"/>
    </transition>
  </v-app>
</template>

<script>
import Store from "./store/index";
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
  methods: {
    afterEnter: () => {
      window.scrollTo(0, 0);
    },
    afterLeave: () => {
      Store.commit("setPageTransition", "default");
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
<style lang="scss">
$duration: 0.7s;
.transition {
  overflow: hidden;
}
.router-view,
.router-view-back {
  &-enter-active,
  &-leave-active {
    position: fixed;
    width: 100%;
    background: white;
    min-height: 100vh;
    top: 0;
  }
}
.router-view-enter-active {
  transition: transform $duration ease-in-out;
  z-index: 2;
  transform: translateX(100%);
}
.router-view-enter-to {
  z-index: 2;
  transform: translateX(0%);
}
.router-view-leave-active {
  z-index: -1;
}
.router-view-leave-to {
  z-index: -1;
}
// router view back

.router-view-back-leave-active {
  transition: transform $duration ease-in-out;
  z-index: 2;
  transform: translateX(0%);
}
.router-view-back-leave-to {
  z-index: 2;
  transform: translateX(100%);
}
</style>