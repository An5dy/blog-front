import ArticleAPI from "@/api/article";

const state = {
  list: [],
  meta: {},
  categories: [],
  article: {
    id: null,
    category_id: null,
    main: "",
    title: ""
  }
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
  },
  INIT_ARTICLE: state => {
    state.article = {
      id: null,
      category_id: null,
      main: "",
      title: ""
    };
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
  async getFrontArticles({ commit }, payload) {
    const response = await ArticleAPI.frontIndex(payload);
    const { data, meta } = response;
    commit("SET_LIST", data);
    commit("SET_META", meta);
    return response;
  },
  async storeArticle({ commit }, payload) {
    const response = await ArticleAPI.store(payload);
    commit("INIT_ARTICLE");
    return response;
  },
  async getArticle({ commit }, payload) {
    const response = await ArticleAPI.show(payload);
    const { id, title, category, main } = response.data;
    commit("SET_ARTICLE", {
      id: id,
      category_id: category.id,
      main: main,
      title: title
    });
    return response;
  },
  async getFrontArticle({ commit }, payload) {
    const response = await ArticleAPI.frontShow(payload);
    const article = response.data;
    commit("SET_ARTICLE", article);
    return response;
  },
  async updateArticle({ commit }, payload) {
    const { id, data } = payload;
    const response = await ArticleAPI.update(data, id);
    commit("INIT_ARTICLE");
    return response;
  },
  async deleteArticle({ commit }, payload) {
    const response = await ArticleAPI.destroy(payload);
    commit("INIT_ARTICLE");
    return response;
  },
  async upperArticle({ commit }, payload) {
    const response = await ArticleAPI.upper(payload);
    commit("INIT_ARTICLE");
    return response;
  },
  async lowerArticle({ commit }, payload) {
    const response = await ArticleAPI.lower(payload);
    commit("INIT_ARTICLE");
    return response;
  },
  initArticle({ commit }) {
    commit("INIT_ARTICLE");
  },
  async getArticlesByCategory({ commit }, payload) {
    const { category, params } = payload;
    const response = await ArticleAPI.articles(category, params);
    const { data, meta } = response;
    commit("SET_LIST", data);
    commit("SET_META", meta);
    return response;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
