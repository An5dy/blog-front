import ArticleAPI from "@/api/article";
import { Message } from "element-ui";

const state = {
  list: [],
  meta: {},
  categories: [],
  loading: false
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
  SET_LOADING: (state, action) => {
    state.loading = action;
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
  async storeArticle({ commit, state }, payload) {
    if (state.loading) return;
    commit("SET_LOADING", true);
    try {
      await ArticleAPI.store(payload);
      commit("SET_LOADING", false);
      return true;
    } catch (error) {
      commit("SET_LOADING", false);
      Message.info(error.response.data.message);
      return false;
    }
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
