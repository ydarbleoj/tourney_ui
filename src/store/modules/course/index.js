import axios from 'axios'
import { pitch } from 'file-loader'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'

const state = {
  courseStats: [],
  roundStats: [],
  courseInfo: {},
  userCourseStats: {},
  currentCourse: {},
  teeTimes: []
}

const actions = {
  LOAD_COURSE: function ({ commit, state }, { id, roundNumber }) {
    console.log('soite', roundNumber)
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
    const courseData = keys(list.course_data)
    Vue.set(state, 'courseInfo', courseData.data)
    Vue.set(state, 'teeTimes', keys(list.tee_times).data)
    Vue.set(state, 'courseStats', filterType(courseData, 'course_agg'))
    Vue.set(state, 'roundStats', filterType(courseData, 'round_agg'))

    const userKeys = keys(list.user_data)
    if (userKeys !== null) {
      Vue.set(state, 'userCourseStats', userKeys)
    }0
  },
}
const keys = ((object) => {
  return Object.keys(object).length == 0 ? {} : JSON.parse(object)
})

const filterType = ((data, type) => {
  let d = data.included.filter(el => el['type'] === type);
  if (d === undefined || !d.length) return {};
  return d[0]['attributes']
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