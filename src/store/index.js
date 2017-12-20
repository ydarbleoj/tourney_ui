import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import scorecards from './modules/scorecards'


Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    courses: [],
    currentCourse: [],
    courseStats: [],
    rounds: [],
    roundOne: {},
    roundTwo: {},
    roundThree: {},
    currentRound: [],
    tournaments: [],
    currentTournament: [],
    stroke_leaderboard: [],
    skins_leaderboards: [],
    putting_leaderboard: [],
    currentRound: '',
    teeTime: [],
    teeTimes: [],
    user: {},
  },
  actions: {
    LOAD_COURSE_STATS: function ({ commit, state }, { tournId, courseId }) {
      let options = { course_id: courseId }
      axios.get('/tournaments/' + tournId + '/stats/courses.json', { params: options }).then((response) => {
        commit('SET_COURSE_STATS', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_SKINS_PREVIEW: function ({ commit, state }, { id }) {
      axios.get('/tournaments/' + id + '/leaderboards/skins/previews.json').then((response) => {
        commit('SET_SKINS_LEADERBOARD', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_SKINS_FULL: function ({ commit, state }, { id }) {
      axios.get('/tournaments/' + id + '/leaderboards/skins/totals.json').then((response) => {
        commit('SET_SKINS_LEADERBOARD', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_PUTTING_PREVIEW: function ({ commit, state }, { id }) {
      axios.get('/tournaments/' + id + '/leaderboards/putting_previews.json').then((response) => {
        commit('SET_PUTTING_LEADERBOARD', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_PUTTING_LEADERBOARD: function ({ commit, state }, { id }) {
      axios.get('/tournaments/' + id + '/putting_leaderboard.json').then((response) => {
        commit('SET_PUTTING_LEADERBOARD', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_STROKE_PREVIEW: function ({ commit, state }, { id }) {
      axios.get('/tournaments/' + id + '/leaderboards/stroke_previews.json').then((response) => {
        commit('SET_STROKE_LEADERBOARD', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_STROKE_LEADERBOARD: function ({ commit, state }, { id }) {
      axios.get('/tournaments/' + id + '/stroke_leaderboard.json').then((response) => {
        commit('SET_STROKE_LEADERBOARD', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_COURSE: function ({ commit, state }, { tourn_id, id, roundNumber }) {
      let options = { round: roundNumber }
      axios.get('/tournaments/' + tourn_id + '/new_courses/' + id + '.json', { params: options }).then((response) => {
        commit('SET_COURSE', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_TOURNAMENT_LIST: function ({ commit }) {
      axios.get('/tournaments.json').then((response) => {
        console.log('one', response.data)
        commit('CURRENT_TOURNAMENT', { list: response.data[0] })
        commit('SET_TOURNAMENT_LIST', { list: response.data })
        console.log('three', response.data)
        commit('SET_ROUNDS', { list: response.data[0].rounds })
        commit('CURRENT_ROUND', { list: [response.data[0].rounds[0]] })
      }, (err) => {
        console.log(err)
      })
    },
    UPDATE_CURRENT_TOURNAMENT: function ({ commit }, payload) {
      console.log('update curr', payload)
      commit('CURRENT_TOURNAMENT', { list: payload })
      commit('SET_ROUNDS', { list: payload.rounds })
      // commit('CURRENT_ROUND', { list: [payload.rounds[0]]})
    },
    UPDATE_CURRENT_ROUND: function ({ commit }, payload) {
      commit('CURRENT_ROUND', { list: payload})
    },
    UPDATE_ROUNDS: function ({ commit }, payload) {
      commit('SET_ROUNDS', { list: payload.rounds })
    },
    LOAD_USER_TEE_TIME: function ({ commit, state }, { tourn_id, roundNumber }) {
      let options = { round: roundNumber }
      axios.get('/tournaments/' + tourn_id + '/round_tee_times.json', { params: options }).then((response) => {
        commit('SET_USER_TEE_TIME', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    UPDATE_PROFILE_EDIT: function ({ commit }, payload) {
      console.log('edit pay', payload)
      // axios.get('/users/')
    },
  },
  mutations: {
    SET_COURSE_STATS: (state, { list }) => {
      state.courseStats = list
    },
    SET_SKINS_LEADERBOARD: (state, { list }) => {
      state.skins_leaderboards = list
    },
    SET_ROUNDS: (state, { list }) => {
      state.roundOne = list[0]
      state.roundTwo = list[1]
      state.roundThree = list[2]
      state.rounds = list
    },
    CURRENT_ROUND: (state, { list }) => {
      state.currentRound = list
    },
    SET_PUTTING_LEADERBOARD: (state, { list }) => {
      state.putting_leaderboard = list
    },
    SET_STROKE_LEADERBOARD: (state, { list }) => {
      state.stroke_leaderboard = list
    },
    SET_COURSE: (state, { list }) => {
      state.currentCourse = list
    },
    SET_TOURNAMENT_LIST: (state, { list }) => {
      state.tournaments = list
    },
    CURRENT_TOURNAMENT: (state, { list }) => {
      state.currentTournament = list
    },
    SET_USER_TEE_TIME: (state, { list }) => {
      state.teeTime = list['user']
      state.teeTimes = list['round']
    },
  },
  getters: {
    openNewCourses: state => {
      return state.courses
    },
    getTournament: state => {
      return state.currentTournament
    },


  },
  modules: {
    scorecards
  }
})

export default store
