// eslint-disable-next-line import/no-extraneous-dependencies
import { VueConstructor, PluginObject } from "vue";
import Button from "./components/Button.vue";
import Icon from "./components/Icon.vue";
import RTip from "./directives/RTip";

declare global {
  interface Window {
    Vue: VueConstructor
  }
}

const version = "__VERSION__";

const install = (Vue: VueConstructor): void => {
  Vue.component("r-button", Button);
  Vue.component("r-icon", Icon);
  Vue.directive("rtip", RTip(Vue));
};

const plugin: PluginObject<VueConstructor> = {
  install,
  version,
};
export default plugin;

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(plugin);
}
