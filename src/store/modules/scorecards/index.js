import axios from 'axios'

const state = {
  playerScorecard: [],
  scoreList: [],
  courseScorecard: {},
  userScore: {},
}

const actions = {
  LOAD_SCORECARD: function ({ commit, state }, { tournId, id }) {
    axios.get('/tournaments/' + tournId + '/scorecards/' + id + '.json').then((response) => {
      commit('SET_SCORECARD', { list: response.data })
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
  CREATE_USER_SCORE: function ({ commit, state }, { scorecardId, options }) {
    axios.post('/scorecards/' + scorecardId + '/user_scores.json', { user_score: options })
    .then((response) => {
      commit('SET_SCORECARD', { list: response.data[0]['sc'] })
      commit('SET_SCORE_LIST', { list: response.data[0]['us'] })
    }, (err) => {
      console.log('send score error', err)
    })
  },
  SEND_USER_SCORE: function ({ commit, state }, { scorecardId, scoreId, options, tournId }) {
    axios.put('/scorecards/' + scorecardId + '/user_scores/' + scoreId + '.json', { params: options })
    .then((response) => {
      commit('SET_SCORECARD', { list: response.data[0]['sc'] })
      commit('SET_SCORE_LIST', { list: response.data[0]['us'] })
    }, (err) => {
      console.log('send score error', err)
    })
  },
}

const mutations = {
  SET_SCORECARD: (state, { list }) => {
    state.playerScorecard = list
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
  scoreListGetter: state => {
    return state.scoreList
  },
  scorecard: state => {
    return state.playerScorecard
  },
  score: state => {
    return state.userScore
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}

