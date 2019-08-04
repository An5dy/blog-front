export const state = () => {
  return {
    archives: []
  }
}

export const mutations = {
  SET_ARCHIVES: (state, action) => {
    state.archives = action
  }
}

export const actions = {
  async fetchArchives({ commit }) {
    const response = await this.$axios.get('/api/archives')
    const { data } = response
    commit('SET_ARCHIVES', data)
    return response
  }
}
