import axios from 'axios'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'


const state = {
  playerScorecard: [],
  scoreList: [],
  courseScorecard: {},
  userScore: {},
  userScorecards: [],
  teamCard: [],
  teamCardOne: [],
  teamCardTwo: [],
  teamCardThree: [],
  teamCardFour: []
}

const plugins = [
  createPersistedState({
    paths: [
      'scorecards.playerScorecard',
      'scorecards.scorecard',
      'scorecards.getHoleInfo',
      'scorecards.teamCard',
      'scorecards.teamCardOne',
      'scorecards.teamCardTwo',
      'scorecards.teamCardThree',
      'scorecards.teamCardFour'
    ]
  })
]

const actions = {
  LOAD_SCORECARD: function ({ commit, state }, { tournId, tournRoundId, teamId }) {
    let options = {
      tournament_id: tournId,
      tournament_round_id: tournRoundId,
      team_id: teamId
    }

    return axios.get(
      '/api/v2/rounds/scorecards.json',
      { params: options}
    ).then((response) => {
      commit('SET_SCORECARD', { list: response.data })
    }, (err) => {
      console.log(err)
    })
  },
  LOAD_TEAM_SCORECARD: function ({ commit, state }, { tournId, team_id }) {
    let options = {
      tournament_id: tournId
    }

    return axios.get(
      '/api/v2/rounds/team_scorecards/' + team_id + '.json',
      { params: options}
    ).then((response) => {
      commit('SET_TEAM_SCORECARD', { list: response.data })
    }, (err) => {
      console.log(err)
    })
  },
  LOAD_USER_SCORES: function ({ commit, state }, { scorecardId }) {
    axios.get('/scorecards/' + scorecardId + '/user_scores.json').then((response) => {
      commit('SET_SCORE_LIST', { list: response.data })
    }, (err) => {
      console.log('set score', err)
    })
  },
  LOAD_USER_SCORE: function ({ commit, state }, { scorecard_id, score_id }) {
    axios.get('/scorecards/' + scorecard_id + '/user_scores/' + score_id + '.json').then((response) => {
      commit('SET_SCORE', { list: response.data })
    }, (err) => {
      console.log('set score', err)
    })
  },
  CREATE_USER_SCORE: function ({ commit, state }, { scorecardId, scores }) {
    let options = { scorecard_id: scorecardId, user_score: scores}
    return axios.post('/api/v2/user_scores.json', options)
      .then((response) => {
        if (response.status == 200) {
          commit('SET_SCORECARD', { list: response.data })
          return true
        } else {
          return false
        }
      }, (err) => {
        console.log('send score error', err)
    })
  },
  UPDATE_USER_SCORE: function ({ commit, state }, { scorecardId, scoreId, scores }) {
    let options = { scorecard_id: scorecardId, user_score_id: scoreId, user_score: scores }
    return axios.put('/api/v2/user_scores/' + scoreId + '.json', options).then((response) => {
      if (response.status === 200) {
        commit('SET_SCORECARD', { list: response.data })
        return true
      } else {
        return false
      }
    }, (err) => {
      console.log('send score error', err)
      return false
    })
  },
  FINISH_SCORECARD: function({ commit, state }, { tournId, scorecardId, opts }) {
    let options = { tournament_id: tournId, scorecard: { finished: opts } }
    return axios.put('/api/v2/rounds/scorecards/' + scorecardId + '.json', options)
      .then((response) => {
        if (response.status === 200) {
          return true
        } else {
          return false
        }
      })
  },
  USER_SCORECARD_LIST: function ({ commit, state }, { tournId, lbId }) {
    let options = { tournament_id: tournId, leaderboard_id: lbId }
    return axios.get('/api/v2/tournaments/admin/user_scorecards.json', { params: options }).then((response) => {
        commit('SET_USER_SCORECARDS', { list: response.data })
      })
  },
  ADMIN_CREATE_USER_SCORE: function ({ commit, state }, { scorecardId, scores }) {
    let options = { scorecard_id: scorecardId, user_score: scores}
    return axios.post('/api/v2/user_scores.json', options)
      .then((response) => {
        if (response.status == 200) {
          commit('UPDATE_ADMIN_SCORECARD', { list: response.data })
          return true
        } else {
          return false
        }
      }, (err) => {
        console.log('send score error', err)
    })
  },
  ADMIN_UPDATE_USER_SCORE: function ({ commit, state }, { scorecardId, scoreId, scores }) {
    let options = { scorecard_id: scorecardId, user_score_id: scoreId, user_score: scores }
    return axios.put('/api/v2/user_scores/' + scoreId + '.json', options).then((response) => {
      if (response.status === 200) {
        commit('UPDATE_ADMIN_SCORECARD', { list: response.data })
        return true
      } else {
        return false
      }
    }, (err) => {
      console.log('send score error', err)
    })
  },
}

const mutations = {
  SET_USER_SCORECARDS: (state, { list }) => {
    Vue.set(state, 'userScorecards', list.included)
  },
  UPDATE_ADMIN_SCORECARD: (state, { list }) => {
    state.userScorecards = state.userScorecards.map(scorecard => {
      if (scorecard.id === list.data.id) {
        return Object.assign({}, scorecard, list.data)
      }
      return scorecard
    })
  },
  SET_SCORECARD: (state, { list }) => {
    let player      = JSON.parse(list.player_card)
    let player_data = Object.keys(player).length === 0 ? {} : player.data.attributes

    Vue.set(state, 'playerScorecard', player_data)
  },
  SET_TEAM_SCORECARD: (state, { list }) => {
    let team_scorecard = JSON.parse(list.team)
    let player      = JSON.parse(list.player_card)
    let team        = JSON.parse(list.team_cards)
    let team_data   = Object.keys(team).length === 0 ? {} : team.data
    let player_data = Object.keys(player).length === 0 ? {} : player.data.attributes
    let team_card_data = Object.keys(team_scorecard).length === 0 ? {} : team_scorecard.data.attributes

    let cardOne = Object.keys(team_data[0]).length === 0 ? {} : team_data[0].attributes
    let cardTwo = Object.keys(team_data[1]).length === 0 ? {} : team_data[1].attributes

    if (team_data[2] !== undefined) {
      let cardThree = Object.keys(team_data[2]).length === 0 ? {}: team_data[2].attributes
      Vue.set(state, 'teamCardThree', cardThree)
    }

    Vue.set(state, 'teamCardOne', cardOne)
    Vue.set(state, 'teamCardTwo', cardTwo)
    Vue.set(state, 'playerScorecard', player_data)
    Vue.set(state, 'teamCard', team_card_data)
  },
  SET_SCORE_LIST: (state, { list }) => {
    state.scoreList = list
  },
  SET_SCORE: (state, { list }) => {
    state.userScore = list
  },
  SET_LOADING: (state, { list }) => {
    state.loading = list
  }
}

const getters = {
  roundScorecard: (state) => (num) => {
  },
  scorecard: state => {
    return state.playerScorecard
  },
  getTeamCard: state => {
    return state.teamCard
  },
  score: state => {
    return state.userScore
  },
  getHoleInfo: state => num => {
    return state.playerScorecard.holes.filter(hole => num == hole.number)
  }
}

export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  plugins,
  state
}

