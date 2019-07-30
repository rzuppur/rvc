import { VueConstructor, PluginObject } from 'vue';
import Button from '@/components/Button.vue';
import Icon from '@/components/Icon.vue';

declare global {
  interface Window {
    Vue: VueConstructor
  }
}

const version = '__VERSION__';

const install = (Vue: VueConstructor): void => {
  /*
   * NOTE:
   *   if you need to extend Vue constructor, you can extend it in here.
   */

  Vue.component('r-button', Button);
  Vue.component('r-icon', Icon);
};

const plugin: PluginObject<VueConstructor> = {
  install,
  version,
};
export default plugin;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}
