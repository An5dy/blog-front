import LoginAPI from "@/api/login";
import Token from "@/utils/token";
import axios from "axios";

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
    const { access_token, token_type } = response.data;
    const token = token_type + " " + access_token;
    commit("SET_TOKEN", token);
    Token.set(token);
    return response;
  },
  refreshToken({ commit }, payload) {
    commit("SET_TOKEN", payload);
    Token.set(payload);
    axios.defaults.headers.common["Authorization"] = payload;
  },
  async logout({ commit }) {
    await LoginAPI.logout();
    Token.set("");
    commit("SET_TOKEN", "");
  },
  resetToken({ commit }) {
    Token.set("");
    commit("SET_TOKEN", "");
    location.reload();
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
