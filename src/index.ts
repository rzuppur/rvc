// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import { Component, PluginObject, VueConstructor } from "vue";
import Button from "./components/Button.vue";
import Icon from "./components/Icon.vue";
import GlobalStyles from "./components/GlobalStyles.vue";
import Toast from "./components/Toast.vue";
import RTip from "./directives/RTip";

declare global {
  interface Window {
    Vue: VueConstructor
  }
}

const version = "__VERSION__";

const mountComponentToRoot = (vue: VueConstructor, parent: any, componentConstructor: VueConstructor, propsData: object = {} ): Component => {
  const node = document.createElement("div");
  parent.$el.appendChild(node);
  const Constructor = vue.extend(componentConstructor);
  return <Component> new Constructor({ parent, propsData }).$mount(node);
};

const install = (Vue: VueConstructor): void => {
  Vue.component("r-button", Button);
  Vue.component("r-icon", Icon);
  Vue.directive("rtip", RTip(Vue));

  let toastComponent: Component;
  let globalStylesComponent: Component;

  Vue.mixin({
    mounted() {
      // @ts-ignore
      if (!this.$parent) {
        // @ts-ignore
        toastComponent = mountComponentToRoot(Vue, this, Toast);
        // @ts-ignore
        globalStylesComponent = mountComponentToRoot(Vue, this, GlobalStyles);
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
