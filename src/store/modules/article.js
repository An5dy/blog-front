import ArticleAPI from "@/api/article";

const state = {
  list: [],
  meta: {},
  categories: [],
  article: {}
};

const mutations = {
  SET_LIST: (state, action) => {
    state.list = action;
  },
  SET_META: (state, action) => {
    state.meta = action;
  },
  SET_CATEGORIES: (state, action) => {
    state.categories = action;
  },
  SET_ARTICLE: (state, action) => {
    state.article = action;
  }
};

const actions = {
  async getArticles({ commit }, payload) {
    const response = await ArticleAPI.index(payload);
    const { data, meta } = response;
    commit("SET_LIST", data);
    commit("SET_META", meta);
    return response;
  },
  async storeArticle({ commit }, payload) {
    const response = await ArticleAPI.store(payload);
    commit("SET_ARTICLE", {});
    return response;
  },
  async getArticle({ commit }, payload) {
    const response = await ArticleAPI.show(payload);
    commit("SET_ARTICLE", {});
    return response;
  },
  async updateArticle({ commit }, payload) {
    const { id, data } = payload;
    const response = await ArticleAPI.update(data, id);
    commit("SET_ARTICLE", {});
    return response;
  },
  async getCategories({ commit }) {
    const response = await ArticleAPI.categories();
    const { data } = response;
    commit("SET_CATEGORIES", data);
    return response;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
