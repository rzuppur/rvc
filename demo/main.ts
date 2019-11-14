// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from "vue";
import App from "./App.vue";
import "../src/plugin";

// To allow stylus variables customization styles are imported in App.vue
// import "../src/styles/main.styl";


Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount("#app");
