import Vue from "vue";
import Vuex from "vuex";
import article from "./modules/article";
import login from "./modules/login";
import category from "./modules/category";
import tag from "./modules/tag";
import about from "./modules/about";
import archive from "./modules/archive";

import getters from "./getters";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    article,
    login,
    category,
    tag,
    about,
    archive
  },
  getters
});
