// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'

import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VExpansionPanel,
  VBottomNav,
  VList,
  VBtn,
  VIcon,
  VCard,
  VMenu,
  VDataTable,
  VDivider,
  VGrid,
  VTextField,
  VSelect,
  VSubheader,
  VToolbar,
  VCheckbox,
  transitions
} from 'vuetify'
import './stylus/main.styl'

import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuth from '@websanova/vue-auth'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)

// axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.baseURL = 'http://www.tourney-app.com'


Vue.use(VueAxios, axios)
Vue.router = router

Vue.use(VueAuth, {
    auth: {
      request: function (req, token) {
        this.options.http._setHeaders.call(this, req, {Authorization: 'Bearer ' + token});
      },
      response: function (res) {
        var headers = this.options.http._getHeaders.call(this, res),
            token = headers.Authorization || res.data.jwt;

        if (token) {
          token = token.split(/Bearer\:?\s?/i);

          return token[token.length > 1 ? 1 : 0].trim();
        }
      }
    },
    http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
    router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
    loginData: { url: 'user_token' },
    rolesVar: 'role',
    fetchData: { url: 'users', enabled: true },
    parseUserData: function (data) {
      return data;
    },
    refreshData: { url: '', method: 'GET', enabled: false, interval: 0 }
})

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VExpansionPanel,
    VBottomNav,
    VSelect,
    VSubheader,
    VCheckbox,
    Vuelidate,
    VList,
    VCard,
    VMenu,
    VDataTable,
    VDivider,
    VBtn,
    VIcon,
    VGrid,
    VTextField,
    VToolbar,
    transitions
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
  // router,
new Vue({
  el: '#app',
  router,
  axios,
  store,
  template: '<App/>',
  components: { App }
})
