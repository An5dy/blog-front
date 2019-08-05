export const state = () => {
  return {
    list: [],
    meta: {},
    categories: [],
    article: {
      id: null,
      category_id: null,
      main: '',
      title: ''
    }
  }
}

export const mutations = {
  SET_LIST: (state, action) => {
    state.list = action
  },
  SET_META: (state, action) => {
    state.meta = action
  },
  SET_CATEGORIES: (state, action) => {
    state.categories = action
  },
  SET_ARTICLE: (state, action) => {
    state.article = action
  },
  INIT_ARTICLE: (state) => {
    state.article = {
      id: null,
      category_id: null,
      main: '',
      title: ''
    }
  }
}

export const actions = {
  async fetchArticles({ commit }, payload) {
    const response = await this.$axios.get('/api/articles', {
      params: payload
    })
    const { data, meta } = response
    commit('SET_LIST', data)
    commit('SET_META', meta)
    return response
  },
  async fetchArticle({ commit }, payload) {
    const response = await this.$axios.get(`/api/articles/${payload}`)
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
  }
}
