export const state = () => {
  return {
    data: []
  }
}

export const mutations = {
  SET_DATA: (state, action) => {
    state.data = action
  }
}

export const actions = {
  async searchArticles({ commit }, payload) {
    const response = await this.$axios.get('/api/search', { params: payload })
    commit('SET_DATA', response.data)
    return response
  }
}
