import AboutAPI from "@/api/about";

const state = {
  about: {
    main: ""
  }
};

const mutations = {
  SET_ABOUT: (state, action) => {
    state.about.main = action;
  }
};

const actions = {
  async getAbout({ commit }) {
    const response = await AboutAPI.index();
    if (response.data.length !== 0) {
      const { main } = response.data;
      commit("SET_ABOUT", main);
    }
    return response;
  },
  async getFrontAbout({ commit }) {
    const response = await AboutAPI.frontIndex();
    if (response.data.length !== 0) {
      const { main } = response.data;
      commit("SET_ABOUT", main);
    }
    return response;
  },
  async updateOrCreateAbout({ commit }, payload) {
    const response = await AboutAPI.updateOrCreate(payload);
    commit("SET_ABOUT", payload.main);
    return response;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
