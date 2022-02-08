import axios from 'axios'

const state = {
  invToken: '',
  tournamentId: '',
  invUser: {},
  invitation: {},
  accepted: false
}

const actions = {
  SET_INVITATION: function ({ commit, _ }, { tournId, token }) {
    let options = { tournament_id: tournId, token: token }
    return axios.get('/api/v2/tournaments/admin/invitations/accept.json', { params: options })
      .then((response) => {
        if (response.status == 200) {
          commit('SET_INVITATION', { list: response.data })
        }
      }, (err) => {
        console.log('invitation error', err)
      })
  },
  ACCEPT_INVITATION: function ({ commit, state }, { tournId, id, handicap }) {
    let options = { tournament_id: tournId, handicap: handicap }
    return axios.patch('/api/v2/tournaments/admin/invitations/' + id + '/accepted.json', options)
      .then((response) => {
        if (response.status == 200) {
          return true
        } else {
          return false
        }
      }, (err) => {
        console.log('invitation error', err)
      })
  }
}

const mutations = {
  SET_INVITATION: (state, {list }) => {
    state.invitation = list.data.attributes
    state.accepted   = list.data.attributes.accepted
  }
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