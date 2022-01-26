import axios from 'axios'
import { pitch } from 'file-loader'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'

const state = {
  courseStats: [],
  courseInfo: {},
  userCourseStats: {},
  currentCourse: {},
  teeTimes: []
}

const actions = {
  LOAD_COURSE: function ({ commit, state }, { id, roundNumber }) {
    let options = { round_number: roundNumber }
    return axios.get(
      `api/v3/tournaments/${id}/round/information.json`, { params: options }
    ).then((response) => {
      commit('SET_COURSE', { list: response.data })
    }, (err) => {
      console.log(err)
    })
  },
}

const mutations = {
  SET_COURSE: (state, { list }) => {
    Vue.set(state, 'courseInfo', keys(list.course_data))
    Vue.set(state, 'courseStats', keys(list.course_data))
    Vue.set(state, 'teeTimes', keys(list.tee_times))

    const userKeys = keys(list.user_data)
    if (userKeys !== null) {
      Vue.set(state, 'userCourseStats', userKeys)
    }
  },
}
const keys = ((object) => {
  return Object.keys(object).length == 0 ? {} : JSON.parse(object).data.attributes
})

const getters = {

}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}