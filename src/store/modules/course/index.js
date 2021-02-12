import axios from 'axios'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'

const state = {
  courseStats: [],
  userCourseStats: {},
  currentCourse: {},
  teeTimes: []
}

const actions = {
  LOAD_COURSE: function ({ commit, state }, { tourn_id, id, roundNumber }) {
    let options = { round: roundNumber }
    return axios.get('/tournaments/' + tourn_id + '/new_courses/' + id + '.json', { params: options }).then((response) => {
      commit('SET_COURSE', { list: response.data })
    }, (err) => {
      console.log(err)
    })
  },
  LOAD_COURSE_STATS: function ({ commit, state }, {tournId, roundId }) {
    let options = { tournament_id: tournId, tournament_round_id: roundId }
    return axios.get('/api/v2/rounds/courses.json', { params: options }).then((response) => {
      commit('SET_COURSE_STATS', { list: response.data })
    }, (err) => {
      console.log(err)
    })
  },
}

const mutations = {
  SET_COURSE: (state, { list }) => {
    state.currentCourse = list[0]['course']
    state.teeTime = list[0]['tee_times']
  },
  SET_COURSE_STATS: (state, { list }) => {
    Vue.set(state, 'courseStats', JSON.parse(list.course_data))

    let userStats =  Object.keys(list.user_data).length === 0 ? null : JSON.parse(list.user_data)
    if (userStats !== null && userStats.data !== null) {
      Vue.set(state, 'userCourseStats', JSON.parse(list.user_data).data.attributes)
    }
    Vue.set(state, 'teeTimes', JSON.parse(list.tee_times).data)
  },
}

const getters = {

}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}