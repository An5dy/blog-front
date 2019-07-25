import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import "./styles/index.scss";

import "./assets/icons/github";
import "vue-awesome/icons/heart";
import Icon from "vue-awesome/components/Icon";
Vue.component("Icon", Icon);

import VueDisqus from "vue-disqus";
Vue.use(VueDisqus);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
