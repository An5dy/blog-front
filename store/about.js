export const state = () => {
  return {
    about: {
      main: ''
    }
  }
}

export const mutations = {
  SET_ABOUT: (state, action) => {
    state.about.main = action
  }
}

export const actions = {
  async fetchAbout({ commit }) {
    const response = await this.$axios.get('/api/about')
    const { main } = response.data
    commit('SET_ABOUT', main)
    return response
  },
  async fetchAdminAbout({ commit }) {
    const response = await this.$axios.get('/api/admin/about')
    const { main } = response.data
    commit('SET_ABOUT', main)
    return response
  },
  async handleUpdate({ commit }, payload) {
    const response = await this.$axios.post('/api/admin/about', payload)
    commit('SET_ABOUT', payload.main)
    return response
  }
}
