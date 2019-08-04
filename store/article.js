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
    const response = await this.$axios.get('/api/articles', payload)
    const { data, meta } = response
    commit('SET_LIST', data)
    commit('SET_META', meta)
    return response
  }
}
