/*!
 * rvc v0.1.0 
 * (c) 2019 Reino Zuppur
 * Released under the undefined License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@/components/Button.vue'), require('@/components/Icon.vue')) :
  typeof define === 'function' && define.amd ? define(['@/components/Button.vue', '@/components/Icon.vue'], factory) :
  (global = global || self, global.Rvc = factory(global.Button, global.Icon));
}(this, function (Button, Icon) { 'use strict';

  Button = Button && Button.hasOwnProperty('default') ? Button['default'] : Button;
  Icon = Icon && Icon.hasOwnProperty('default') ? Icon['default'] : Icon;

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

  return plugin;

}));
