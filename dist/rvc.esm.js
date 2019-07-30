/*!
 * rvc v0.1.0 
 * (c) 2019 Reino Zuppur
 * Released under the undefined License.
 */
import Button from '@/components/Button.vue';
import Icon from '@/components/Icon.vue';

var version = '0.1.0';

var install = function install(Vue) {
  /*
   * NOTE:
   *   if you need to extend Vue constructor, you can extend it in here.
   */
  Vue.component('r-button', Button);
  Vue.component('r-icon', Icon);
};

var plugin = {
  install: install,
  version: version
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin;
