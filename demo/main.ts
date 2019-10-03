// eslint-disable-next-line import/no-extraneous-dependencies
import Vue, { VueConstructor } from "vue";
import App from "./App.vue";
import "../src/plugin";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount("#app");
