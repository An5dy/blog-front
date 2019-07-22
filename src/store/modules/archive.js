import ArchiveAPI from "@/api/archive";

const state = {
  archives: []
};

const mutations = {
  SET_ARCHIVES: (state, action) => {
    state.archives = action;
  }
};

const actions = {
  async getArchives({ commit }) {
    const response = await ArchiveAPI.index();
    const { data } = response;
    commit("SET_ARCHIVES", data);
    return response;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
