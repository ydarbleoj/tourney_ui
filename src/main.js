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
  VToolbar,
  VCheckbox,
  transitions
} from 'vuetify'
import './stylus/main.styl'

import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VExpansionPanel,
    VBottomNav,
    VSelect,
    VCheckbox,
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
new Vue({
  el: '#app',
  router,
  axios,
  store,
  template: '<App/>',
  components: { App }
})
