/*!
 * rvc v0.1.0 
 * (c) 2019 Reino Zuppur
 * Released under the undefined License.
 */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Button = _interopDefault(require('@/components/Button.vue'));
var Icon = _interopDefault(require('@/components/Icon.vue'));

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

module.exports = plugin;
