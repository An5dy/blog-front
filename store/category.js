export const state = () => {
  return {
    list: [],
    category: {}
  }
}

export const mutations = {
  SET_LIST: (state, action) => {
    state.list = action
  },
  SET_CATEGORY: (state, action) => {
    state.category = action
  },
  ADD_CATEGORY: (state, action) => {
    state.list.unshift(action)
  },
  EDIT_CATEGORY: (state, action) => {
    for (const item of state.list) {
      if (item.id === action.id) {
        item.title = action.title
        return
      }
    }
  },
  DELETE_CATEGORY: (state, action) => {
    state.list.splice(state.list.indexOf(action), 1)
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
    commit('ADD_CATEGORY', response.data)
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
    commit('EDIT_CATEGORY', {
      id: payload.id,
      title: payload.data.title
    })
    return response
  },
  async handleDelete({ commit }, payload) {
    const response = await this.$axios.post(
      `/api/admin/categories/${payload.id}`,
      { _method: 'DELETE' }
    )
    commit('DELETE_CATEGORY', payload)
    return response
  }
}
