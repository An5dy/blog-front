export const state = () => {
  return {
    list: []
  }
}

export const mutations = {
  SET_LIST: (state, action) => {
    state.list = action
  }
}

export const actions = {
  async fetchCategories({ commit }) {
    const response = await this.$axios.get('/api/admin/categories')
    const { data } = response
    commit('SET_LIST', data)
    return response
  },
  async handleStore({ commit }, payload) {
    const response = await this.$axios.post('/api/admin/categories', payload)
    return response
  },
  async handleUpdate({ commit }, payload) {
    const data = {
      title: payload.data.title,
      _method: 'PATCH'
    }
    const response = await this.$axios.post(
      `/api/admin/categories/${payload.id}`,
      data
    )
    return response
  },
  async handleDelete({ commit }, payload) {
    const response = await this.$axios.post(
      `/api/admin/categories/${payload.id}`,
      { _method: 'DELETE' }
    )
    return response
  }
}
