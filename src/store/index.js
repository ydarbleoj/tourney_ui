import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import scorecards from './modules/scorecards'
import course from './modules/course'
import invitations from './modules/invitations'
import leaderboards from './modules/leaderboards'
import admin from './modules/admin'
import profile from './modules/profile'
import createPersistedState from 'vuex-persistedstate'
// import * as Cookies from 'js-cookie'


Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  plugins: [
    createPersistedState({
      paths: ['tournament', 'login', 'profile'],
    })

  ],
  state: {
    inviteList: [],
    invited: [],
    courseMenuList: [],
    tournamentPlayers: [],
    courses: [],
    rounds: [],
    roundOne: {},
    roundTwo: {},
    roundThree: {},
    tournaments: [],
    currentTournament: [],
    strokeLeaderboard: [],
    skins_leaderboard: [],
    putting_leaderboard: [],
    puttingPurse: 0,
    teamLeaderboard: [],
    teamRounds: [],
    currentRound: null,
    teeTime: [],
    awaitingTees: [],
    handicapMessage: '',
    adminTeeTimes: [],
    user: {},
    moneyList: [],
  },
  actions: {
    CREATE_TOURNAMENT: function ({ commit, state }, { payload }) {
      return axios.post('/api/v2/tournaments.json', { tournament: payload }).then((response) => {
        commit('ROUND_CREATE', { list: response.data })
        if (response.data.success) {
          return true
        } else {
          return false
        }
      })
    },
    LOAD_ADMIN_PLAYERS: function ({ commit, state }, { tournId }) {
      let options = { tournament_id: tournId }
      return axios.get('/api/v2/tournaments/admin/users.json', { params: options }).then((response) => {
        console.log('rep', response)
        commit('SET_ADMIN_PLAYERS', { list: response.data })
      })
    },
    CREATE_TOURNAMENT_ROUNDS: function ({ commit, state }, { tournId, payload }) {
      let options = { tournament_id: tournId, round: payload}
      return axios.post('/api/v2/tournaments/rounds.json', options).then((response) => {
        if (response.data.success) {
          commit('CURRENT_TOURNAMENT', { list: response.data })
          return true
        } else {
          return false
        }

      })
    },
    UPDATE_PLAYER_ADMIN: function ({ commit, state }, { tournId, opts, lbId }) {
      opts['tournament_id'] = tournId
      return axios.put('/api/v2/tournaments/admin/users/' + lbId + '.json',  opts).then((response) => {
        if (response.data.success) {
          return true
        } else {
          return false
        }
      })
    },
    INVITE_USERS: function ({ commit, state }, { tournId, invitees }) {
      let options = { tournament_id: tournId, invitation: invitees }
      console.log('options', options)
      return axios.post('/api/v2/tournaments/admin/invitations.json', options).then((response) => {
        if (response.data.success) {
          commit('SET_ADMIN_PLAYERS', { list: response.data })
          true
        } else {
          false
        }
      })
    },
    DELETE_INVITATION: function ({ commit, state }, { tournId, id }) {
      let options = { tournament_id: tournId }
      return axios.delete('/api/v2/tournaments/admin/invitations/' + id + '.json', { params: options}).then((response) => {
        if (response.data.success == true) {
          commit('REMOVE_INVITATION', { id: response.data.id })
        }
        return response.success
      })
    },
    DELETE_PLAYER: function ({ commit, state }, { tournId, id }) {
      let options = { tournament_id: tournId }
      return axios.delete('/api/v2/tournaments/admin/users/' + id + '.json', { params: options}).then((response) => {
        if (response.status == 200) {
          commit('REMOVE_PLAYER', { id: response.data.id })
        }
        return response.success
      })
    },
    UPDATE_HANDICAP: function ({ commit, state }, { tournId, leaderboardId, handicap }) {
      let options = { handicap: handicap }
      axios.put('/tournaments/' + tournId + '/leaderboards/' + leaderboardId + '.json', { params: options }).then((response) => {
        commit('SET_HANDICAP', { list: response.data })
      }, (err) => {
        commit('SET_HANDICAP', { list: response.data })
      })
    },
    LOAD_TEAM_LEADERBOARD: function ({ commit, state }, { tournId, roundId, preview }) {
      let options = { tournament_id: tournId, round_id: roundId, preview: preview }
      return axios.get('/api/v2/leaderboards/teams.json', { params: options }).then((response) => {
        commit('SET_TEAM_LEADERBOARD', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_SKINS: function ({ commit, state }, { id, preview }) {
      let options = { tournament_id: id, preview: preview  }
      return axios.get('/api/v2/leaderboards/skins.json', { params: options }).then((response) => {
        commit('SET_SKINS_LEADERBOARD', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_PUTTING_LEADERBOARD: function ({ commit, state }, { id, preview }) {
      let options = { tournament_id: id, preview: preview }
      return axios.get('/api/v2/leaderboards/putts.json', { params: options}).then((response) => {
        commit('SET_PUTTING_LEADERBOARD', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_STROKE_LEADERBOARD: function ({ commit, state }, { id, preview }) {
      let options = { tournament_id: id, preview: preview }
      return axios.get('/api/v2/leaderboards/strokes.json', { params: options }).then((response) => {
        commit('SET_STROKE_LEADERBOARD', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    LOAD_ROUNDS: function ({ commit, state }, { id }) {
      let options = { tournament_id: id }
      return axios.get('/api/v2/rounds/lists.json', { params: options }).then((response) => {
        commit('SET_ROUNDS', { list: response.data })
      }, (err) => {
        console.log('error in rounds', err)
      })
    },
    LOAD_TOURNAMENT_LIST: function ({ commit }) {
     return axios.get('/api/v2/tournaments.json').then((response) => {
        console.log('tournament', response.data)
        commit('CURRENT_TOURNAMENT', { list: response.data })
        commit('SET_TOURNAMENT_LIST', { list: response.data })
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
      return commit('RESET_CURRENT_TOURNAMENT', { list: payload })
    },
    UPDATE_ROUNDS: function ({ commit }, payload) {
      commit('SET_ROUNDS', { list: payload.rounds })
    },
    LOAD_ADMIN_TEE_TIME: function ({ commit, state }, { tournId, roundId }) {
      let options = { tournament_id: tournId, tournament_round_id: roundId }
      return axios.get('/api/v2/tournaments/admin/tee_times.json', { params: options }).then((response) => {
        if (response.status === 200) {
          commit('SET_ADMIN_TEE_TIME', { list: response.data })
        }
      }, (err) => {
        console.log(err)
      })
    },
    CREATE_TEE_TIMES: function ({ commit, state }, { tournId, teeTimes }) {
      let options = { tournament_id: tournId, tee_time: teeTimes }
      return axios.post('/api/v2/tournaments/admin/tee_times.json', options).then((response) => {
        if (response.data.status === 200) {
          commit('SET_ADMIN_MESSAGE', { list: response.data })
        }
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
    ROUND_CREATE: (state, { list }) => {
      Vue.set(state, 'userInviteList', JSON.parse(list.user_list).data)
      Vue.set(state, 'courseMenuList', JSON.parse(list.course_list).data)
      Vue.set(state, 'currentTournament', JSON.parse(list.tournament).data)
    },
    SET_ADMIN_PLAYERS: (state, { list }) => {
      let inv = JSON.parse(list.invited).data
      let users = JSON.parse(list.users).data
      let arr = []

      arr.push(inv, users)
      arr = arr.flat()
      Vue.set(state, 'invited', JSON.parse(list.invited).data)
      Vue.set(state, 'inviteList', list.invitees)
      Vue.set(state, 'tournamentPlayers', arr)
    },
    REMOVE_INVITATION: (state, { id }) => {
      const index = state.invited.findIndex(block => block.id === id)
      const index2 = state.tournamentPlayers.findIndex(block => block.id === id)
      state.tournamentPlayers.splice(index2, 1)
      state.invited.splice(index, 1)
    },
    REMOVE_PLAYER: (state, { id }) => {
      console.log('hitt', id)
      const index = state.tournamentPlayers.findIndex(block => block.id === id )
      console.log('index', index)
      console.log('stat', state.tournamentPlayers.length)
      state.tournamentPlayers.splice(index, 1)
      console.log('stat2', state.tournamentPlayers.length)

    },
    SET_HANDICAP: (state, { list }) => {
      state.handicapMessage = list
    },
    SET_SKINS_LEADERBOARD: (state, { list }) => {
      console.log('skins leader', list)
      Vue.set(state, 'skins_leaderboard', list.data)
    },
    SET_ROUNDS: (state, { list }) => {
      state.currentRound = 1
      state.roundOne = list.data[0]
      state.roundTwo = list.data[1]
      state.roundThree = list.data[2]
      state.rounds = list.data
    },
    SET_CURRENT_ROUND: (state, { list }) => {
      console.log('set curret', list)
      Vue.set(state, 'currentRound', list)
    },
    SET_STROKE_LEADERBOARD: (state, { list }) => {
      Vue.set(state, 'strokeLeaderboard', list.data)
    },
    SET_PUTTING_LEADERBOARD: (state, { list }) => {
      const reducer = (acc, currentValue) => acc + currentValue;
      const threePutts = list.data.map(el => el.attributes.total_3_putts)
      const total = threePutts.reduce(reducer)
      Vue.set(state, 'puttingPurse', total)
      Vue.set(state, 'putting_leaderboard', list.data)
    },
    SET_TOURNAMENT_LIST: (state, { list }) => {
      Vue.set(state, 'tournaments', JSON.parse(list.tournament).data)
    },
    SET_ADMIN_TEE_TIME: (state, { list }) => {
      state.adminTeeTimes = JSON.parse(list.times).data
      Vue.set(state, 'awaitingTees', JSON.parse(list.awaiting).data)
    },
    ADD_USER_TEE_TIME: (state, { user, index, group }) => {
      state.awaitingTees.splice(index, 1)
      state.adminTeeTimes[group].attributes.players.push(user)
    },
    ADD_USER_AWAITING: (state, { user, key, group }) => {
      state.adminTeeTimes = state.adminTeeTimes.map(tees => {
        if (tees.attributes.group === group) {
          tees.attributes.players.splice(key, 1)
        }
        return tees
      })
      state.awaitingTees.push(user)
    },
    SET_ADMIN_MESSAGE: (state, { list }) => {
      state.adminMessage = list
    },
    CURRENT_TOURNAMENT: (state, { list }) => {
      let tourn = JSON.parse(list.tournament).data.pop()
      Vue.set(state, 'currentTournament', tourn.attributes)
      Vue.set(state, 'teamRounds', tourn.attributes.round_info)
    },
    RESET_CURRENT_TOURNAMENT: (state, { list }) => {
      Vue.set(state, 'currentTournament', list.attributes)
      Vue.set(state, 'teamRounds', list.attributes.round_info)
    },
    SET_TEAM_LEADERBOARD: (state, { list }) => {
      state.teamLeaderboard = list.data
    },
    SET_MONEY_LIST: (state, { list }) => {
      state.moneyList = list
    },
  },
  getters: {
    openNewCourses: state => {
      return state.courses
    },
    getStrokeLeaderboard: state => {
      return state.strokeLeaderboard
    },
    getTournament: state => {
      return state.currentTournament
    },
    getTournaments: state => {
      return state.tournaments
    },
    userScorecardIds: state => userId => {
      return state.strokeLeaderboard
    },
    adminTeeTimeGetter: state => {
      return state.adminTeeTimes
    },
    adminMessageGetter: state => {
      return state.adminMessage
    }


  },
  modules: {
    scorecards,
    invitations,
    profile,
    course,

  }
})

export default store
