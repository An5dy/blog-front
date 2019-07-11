import TagAPI from "@/api/tag";

const state = {
  tag: {}
};

const mutations = {
  SET_TAG: (state, action) => {
    state.tag = action;
  }
};

const actions = {
  async deleteCategory({ commit }, payload) {
    const response = await TagAPI.destroy(payload);
    commit("SET_TAG", {});
    return response;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
