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
  }
}
