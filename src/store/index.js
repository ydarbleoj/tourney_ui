import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import scorecards from './modules/scorecards'
import createPersistedState from 'vuex-persistedstate'
// import * as Cookies from 'js-cookie'


Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ['currentTournament', 'tournaments']
    })

  ],
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
    teamLeaderboard: [],
    currentRound: '',
    teeTime: [],
    teeTimes: [],
    awaitingTees: [],
    adminMessage: '',
    adminTeeTimes: [],
    user: {},
    moneyList: [],
  },
  actions: {
    LOAD_TEAM_PREVIEW: function ({ commit, state }, { tournId }) {
      axios.get('/tournaments/' + tournId + '/leaderboards/teams/previews.json').then((response) => {
        commit('SET_TEAM_LEADERBOARD', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_TEAM_LEADERBOARD: function ({ commit, state }, { tournId }) {
      axios.get('/tournaments/' + tournId + '/leaderboards/teams/totals.json').then((response) => {
        commit('SET_TEAM_LEADERBOARD', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    },
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
        commit('CURRENT_TOURNAMENT', { list: response.data[0] })
        commit('SET_TOURNAMENT_LIST', { list: response.data })
        commit('SET_ROUNDS', { list: response.data[0].rounds })
        commit('CURRENT_ROUND', { list: [response.data[0].rounds[0]] })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_MONEY_LIST: function ({ commit, state }, { tournId }) {
      axios.get('/tournaments/' + tournId + '/info/money_list/totals.json').then((response) => {
        commit('SET_MONEY_LIST', { list: response.data })
      }, (err) => {
        console.log('money list error', err)
      })
    },
    LOAD_MONEY_PREVIEW: function ({ commit, state }, { tournId }) {
      axios.get('/tournaments/' + tournId + '/info/money_list/previews.json').then((response) => {
        commit('SET_MONEY_LIST', { list: response.data })
      }, (err) => {
        console.log('money list error', err)
      })
    },
    UPDATE_CURRENT_TOURNAMENT: function ({ commit }, payload) {
      console.log('update crr', payload)
      commit('CURRENT_TOURNAMENT', { list: payload })
      commit('SET_ROUNDS', { list: payload.rounds })
    },
    UPDATE_CURRENT_ROUND: function ({ commit }, payload) {
      commit('CURRENT_ROUND', { list: payload})
    },
    UPDATE_ROUNDS: function ({ commit }, payload) {
      commit('SET_ROUNDS', { list: payload.rounds })
    },
    LOAD_ADMIN_TEE_TIME: function ({ commit, state }, { tourn_id, roundNumber }) {
      let options = { round: roundNumber }
      axios.get('/tournaments/' + tourn_id + '/tee_times.json', { params: options }).then((response) => {
        commit('SET_ADMIN_TEE_TIME', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    CREATE_TEE_TIMES: function ({ commit, state }, { tournId, roundNumber, teeTimes }) {
      let options = { round: roundNumber, times: teeTimes }
      axios.post('/tournaments/' + tournId + '/tee_times.json', { params: options }).then((response) => {
        commit('SET_ADMIN_MESSAGE', { list: response.data })
      }, (err) => {
        commit('SET_ADMIN_MESSAGE', { list: response.data })
        console.log(err)
      })
    },
    UPDATE_ADMIN_TEE_TIME: function({ commit, state }, { tournId, roundNumber, teeTimes, id }) {
      let options = { round: roundNumber, times: teeTimes }
      axios.put('/tournaments/' + tournId + '/tee_times/' + id + '.json', { params: options }).then((response) => {
        commit('SET_ADMIN_MESSAGE', { list: response.data })
      }, (err) => {
        console.log('admin error', err)
        commit('SET_ADMIN_MESSAGE', { list: response.data })
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
      state.currentCourse = list[0]['course']
      state.teeTime = list[0]['tee_times']
    },
    SET_TOURNAMENT_LIST: (state, { list }) => {
      state.tournaments = list
    },
    SET_ADMIN_TEE_TIME: (state, { list }) => {
      state.adminTeeTimes = list[0]['times']
      state.awaitingTees = list[0]['awaiting']
    },
    SET_ADMIN_MESSAGE: (state, { list }) => {
      state.adminMessage = list
    },
    CURRENT_TOURNAMENT: (state, { list }) => {
      state.currentTournament = list
    },
    SET_TEAM_LEADERBOARD: (state, { list }) => {
      state.teamLeaderboard = list
    },
    SET_MONEY_LIST: (state, { list }) => {
      state.moneyList = list
    },
  },
  getters: {
    openNewCourses: state => {
      return state.courses
    },
    getTournament: state => {
      return state.currentTournament
    },
    adminTeeTimeGetter: state => {
      return state.adminTeeTimes
    },
    adminMessageGetter: state => {
      return state,adminMessage
    }


  },
  modules: {
    scorecards,
  }
})

export default store
