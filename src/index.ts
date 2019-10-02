// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import { VueConstructor, PluginObject, Component } from "vue";
import Button from "./components/Button.vue";
import Icon from "./components/Icon.vue";
import Toast from "./components/Toast.vue";
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

  let toastComponent: Component;

  Vue.mixin({
    mounted() {
      // @ts-ignore
      if (!this.$parent) {
        const node = document.createElement("div");
        // @ts-ignore
        this.$el.appendChild(node);
        const ToastConstructor = Vue.extend(Toast);
        // @ts-ignore
        toastComponent = new ToastConstructor({ parent: this }).$mount(node);
      }
    },
  });

  Vue.prototype.$notifyToast = (message: string) => {
    // @ts-ignore
    toastComponent.notify(message);
  };
};

const plugin: PluginObject<VueConstructor> = {
  install,
  version,
};
export default plugin;

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(plugin);
}
