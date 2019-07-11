import CategoryAPI from "@/api/category";

const state = {
  list: [],
  category: {}
};

const mutations = {
  SET_LIST: (state, action) => {
    state.list = action;
  },
  SET_CATEGORY: (state, action) => {
    state.category = action;
  }
};

const actions = {
  async getCategories({ commit }, payload) {
    const response = await CategoryAPI.index(payload);
    const { data } = response;
    commit("SET_LIST", data);
    return response;
  },
  async storeCategory({ commit }, payload) {
    const response = await CategoryAPI.store(payload);
    commit("SET_CATEGORY", {});
    return response;
  },
  async updateCategory({ commit }, payload) {
    const { id, data } = payload;
    const response = await CategoryAPI.update(data, id);
    commit("SET_CATEGORY", {});
    return response;
  },
  async deleteCategory({ commit }, payload) {
    const response = await CategoryAPI.destroy(payload);
    commit("SET_CATEGORY", {});
    return response;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
