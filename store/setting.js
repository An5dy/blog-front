export const state = () => {
  return {
    setting: {
      avatar: null,
      title: null,
      sketch: null
    }
  }
}

export const mutations = {
  SET_SETTING: (state, action) => {
    state.setting = action
  }
}

export const actions = {
  async fetchSetting({ commit }) {
    const response = await this.$axios.get('/api/setting')
    commit('SET_SETTING', response.data)
    return response
  },
  async fetchAdminSetting({ commit }) {
    const response = await this.$axios.get('/api/admin/settings')
    commit('SET_SETTING', response.data)
    return response
  },
  async handleUpdate({ commit }, payload) {
    const response = await this.$axios.post('/api/admin/settings', payload)
    return response
  }
}
