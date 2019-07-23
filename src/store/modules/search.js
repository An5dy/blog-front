import SearchAPI from "@/api/search";

const state = {
  data: []
};

const mutations = {
  SET_DATA: (state, action) => {
    state.data = action;
  }
};

const actions = {
  async searchArticles({ commit }, payload) {
    const response = await SearchAPI.index(payload);
    commit("SET_DATA", response.data);
    return response;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
