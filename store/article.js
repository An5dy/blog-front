export const state = () => {
  return {
    list: [],
    meta: {},
    article: {}
  }
}

export const mutations = {
  SET_LIST: (state, action) => {
    state.list = action
  },
  SET_META: (state, action) => {
    state.meta = action
  },
  SET_ARTICLE: (state, action) => {
    state.article = action
  },
  UPPER_ARTICLE: (state, action) => {
    for (const item of state.list) {
      if (item.id === action) {
        item.is_published = 1
        return
      }
    }
  },
  LOWER_ARTICLE: (state, action) => {
    for (const item of state.list) {
      if (item.id === action) {
        item.is_published = 0
        return
      }
    }
  },
  DELETE_ARTICLE: (state, action) => {
    let tm
    for (const [key, item] of state.list.entries()) {
      if (item.id === action) {
        tm = key
        break
      }
    }
    state.list.splice(tm, 1)
  }
}

export const actions = {
  async fetchArticles({ commit }, payload) {
    const response = await this.$axios.get(payload.path, {
      params: payload.params
    })
    const { data, meta } = response
    commit('SET_LIST', data)
    commit('SET_META', meta)
    return response
  },
  async fetchArticle({ commit }, payload) {
    const response = await this.$axios.get(payload)
    commit('SET_ARTICLE', response.data)
    return response
  },
  async fecthArticlesByCategory({ commit }, payload) {
    const { category, params } = payload
    const response = await this.$axios.get(
      `/api/categories/${category}/articles`,
      { params: { page: params.page } }
    )
    const { data, meta } = response
    commit('SET_LIST', data)
    commit('SET_META', meta)
    return response
  },
  async upperArticle({ commit }, payload) {
    const response = await this.$axios.post(
      `/api/admin/articles/${payload}/upper`,
      {
        _method: 'PATCH'
      }
    )
    commit('UPPER_ARTICLE', payload)
    return response
  },
  async lowerArticle({ commit }, payload) {
    const response = await this.$axios.post(
      `/api/admin/articles/${payload}/lower`,
      {
        _method: 'PATCH'
      }
    )
    commit('LOWER_ARTICLE', payload)
    return response
  },
  async deleteArticle({ commit }, payload) {
    const response = await this.$axios.post(`/api/admin/articles/${payload}`, {
      _method: 'DELETE'
    })
    commit('DELETE_ARTICLE', payload)
    return response
  },
  async deleteTag({ commit }, payload) {
    const response = await this.$axios.post(`/api/admin/tags/${payload}`, {
      _method: 'DELETE'
    })
    return response
  },
  async handleStore({ commit }, payload) {
    const response = await this.$axios.post(`/api/admin/articles`, payload)
    return response
  },
  async handleUpdate({ commit }, payload) {
    const response = await this.$axios.post(
      `/api/admin/articles/${payload.id}`,
      {
        title: payload.title,
        category_id: payload.category.id,
        main: payload.main,
        _method: 'PATCH'
      }
    )
    return response
  }
}
