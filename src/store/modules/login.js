import LoginAPI from "@/api/login";
import Token from "@/utils/token";

const state = {
  token: Token.get() || ""
};

const mutations = {
  SET_TOKEN: (state, actions) => {
    state.token = actions;
  }
};

const actions = {
  async login({ commit }, payload) {
    const response = await LoginAPI.login(payload);
    const { access_token } = response.data;
    commit("SET_TOKEN", access_token);
    Token.set(access_token);
    return response;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
