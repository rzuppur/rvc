// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import { Component, PluginObject, VueConstructor } from "vue";
import PortalVue, { PortalTarget } from "portal-vue";
import Button from "./components/global/r-button/Button.vue";
import Icon from "./components/global/r-icon/Icon.vue";
import Modal from "./components/global/r-modal/Modal.vue";
import ModalConfirm from "./components/root/ModalConfirm.vue";
import Tabs from "./components/global/r-tabs/Tabs.vue";
import TabContent from "./components/global/r-tabs/r-tab-content/TabContent.vue";
import Toast from "./components/root/Toast.vue";
import RTip from "./directives/RTip";

const version = "__VERSION__";

const mountComponentToRoot = (vue: VueConstructor, parent: any, componentConstructor: VueConstructor, propsData: object = {} ): Component => {
  const node = document.createElement("div");
  parent.$el.appendChild(node);
  const Constructor = vue.extend(componentConstructor);
  return <Component> new Constructor({ parent, propsData }).$mount(node);
};

const install = (Vue: VueConstructor): void => {
  Vue.use(PortalVue);

  Vue.component("r-button", Button);
  Vue.component("r-icon", Icon);
  Vue.component("r-modal", Modal);
  Vue.component("r-tabs", Tabs);
  Vue.component("r-tab-content", TabContent);

  Vue.directive("rtip", RTip(Vue));

  let toastComponent: Component;
  let portalTargetComponent: Component;
  let modalConfirmComponent: Component;

  Vue.mixin({
    data() {
      return this.$parent ? {} : { rModalsOpen: [] };
    },
    mounted() {
      // @ts-ignore
      if (!this.$parent) {
        // @ts-ignore
        toastComponent = mountComponentToRoot(Vue, this, Toast);
        // @ts-ignore
        portalTargetComponent = mountComponentToRoot(Vue, this, PortalTarget, { name: "r-modals", multiple: true });
        // @ts-ignore
        modalConfirmComponent = mountComponentToRoot(Vue, this, ModalConfirm);
      }
    },
  });

  Vue.prototype.$rNotifyToast = (message: string) => {
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
