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
  LOAD_USER_SCORE: function ({ commit, state }, { scorecard_id, score_id }) {
    axios.get('/scorecards/' + scorecard_id + '/user_scores/' + score_id + '.json').then((response) => {
      commit('SET_SCORE', { list: response.data })
    }, (err) => {
      console.log('set score', err)
    })
  }
}

const mutations = {
  SET_SCORECARD: (state, { list }) => {
    console.log('list', list[0].scorecard)
    state.playerScorecard = list
  },
  SET_SCORE: (state, { list }) => {
    state.userScore = list
  }
}

const getters = {
  scoreList: state => {
    return state.playerScorecard[0].scores
  },
  scorecard: state => {
    return state.playerScorecard[0].scorecard
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

