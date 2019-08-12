/*!
 * rvc v0.10.0 
 * (c) 2019 Reino Zuppur
 * Released under the UNLICENSED License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Rvc = factory());
}(this, function () { 'use strict';

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  var script = {
    name: "Button",
    props: {
      action: Function,
      label: String,
      icon: String,
      iconColor: String,
      borderless: Boolean,
      primary: Boolean,
      gray: Boolean,
      fullwidth: Boolean,
      small: Boolean,
      loading: Boolean,
      submit: Boolean,
      disabled: Boolean
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
  /* server only */
  , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    } // Vue.extend constructor export interop.


    var options = typeof script === 'function' ? script.options : script; // render functions

    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true; // functional template

      if (isFunctionalTemplate) {
        options.functional = true;
      }
    } // scopedId


    if (scopeId) {
      options._scopeId = scopeId;
    }

    var hook;

    if (moduleIdentifier) {
      // server build
      hook = function hook(context) {
        // 2.3 injection
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
        // 2.2 with runInNewContext: true

        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        } // inject component styles


        if (style) {
          style.call(this, createInjectorSSR(context));
        } // register component module identifier for async chunk inference


        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      }; // used by ssr in case component is cached and beforeCreate
      // never gets called


      options._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function () {
        style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
      } : function (context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook) {
      if (options.functional) {
        // register for functional component in vue file
        var originalRender = options.render;

        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }

    return script;
  }

  var normalizeComponent_1 = normalizeComponent;

  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

  function createInjector(context) {
    return function (id, style) {
      return addStyle(id, style);
    };
  }

  var HEAD = document.head || document.getElementsByTagName('head')[0];
  var styles = {};

  function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: new Set(),
      styles: []
    });

    if (!style.ids.has(id)) {
      style.ids.add(id);
      var code = css.source;

      if (css.map) {
        // https://developer.chrome.com/devtools/docs/javascript-debugging
        // this makes source maps inside style tags work properly in Chrome
        code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

        code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
      }

      if (!style.element) {
        style.element = document.createElement('style');
        style.element.type = 'text/css';
        if (css.media) style.element.setAttribute('media', css.media);
        HEAD.appendChild(style.element);
      }

      if ('styleSheet' in style.element) {
        style.styles.push(code);
        style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
      } else {
        var index = style.ids.size - 1;
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  }

  var browser = createInjector;

  /* script */
  const __vue_script__ = script;

  /* template */
  var __vue_render__ = function (_h,_vm) {var _c=_vm._c;return _c('button',{staticClass:"r-button",class:[    (_vm.props.borderless || _vm.props.borderless === '') ? 'borderless' : '',    (_vm.props.icon && !_vm.slots().default) ? 'icon-only' : '',    (_vm.props.primary || _vm.props.primary === '') ? 'primary' : '',    (_vm.props.gray || _vm.props.gray === '') ? 'gray' : '',    (_vm.props.fullwidth || _vm.props.fullwidth === '') ? 'fullwidth' : '',    (_vm.props.small || _vm.props.small === '') ? 'small' : '',    (_vm.props.loading || _vm.props.loading === '') ? 'loading' : '',    _vm.data.class,    _vm.data.staticClass ],attrs:{"type":(_vm.props.submit || _vm.props.submit === '') ? 'submit' : 'button',"disabled":(_vm.props.disabled || _vm.props.disabled === '') || _vm.props.loading,"aria-label":_vm.props.label},on:{"pointerdown":function($event){$event.preventDefault();},"click":function () { _vm.props.action ? _vm.props.action() : null; }}},[(_vm.props.icon)?_c('r-icon',{class:(_vm.props.primary || _vm.props.primary === '') ? 'white' : (_vm.props.iconColor ? _vm.props.iconColor : 'gray'),attrs:{"icon":_vm.props.icon}}):_vm._e(),(_vm.slots().default)?_c('span',[_vm._t("default")],2):_vm._e()],1)};
  var __vue_staticRenderFns__ = [];

    /* style */
    const __vue_inject_styles__ = function (inject) {
      if (!inject) return
      inject("data-v-8c9a4fd4_0", { source: ".r-button{cursor:pointer;user-select:none;-webkit-touch-callout:none;-webkit-appearance:none;-moz-appearance:none;position:relative;vertical-align:top;white-space:nowrap;display:inline-flex;align-items:center;justify-content:center;height:40px;padding:0 12px;border:1px solid #ddd;border-radius:4px;font-family:Inter,BlinkMacSystemFont,-apple-system,\"Segoe UI\",Roboto,Oxygen-Sans,Ubuntu,Cantarell,\"Helvetica Neue\",sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\";font-size:16px;letter-spacing:-.005em;line-height:24px;font-weight:400;text-align:center;color:#4a4a4a;background-color:#fff;box-shadow:none;transition:transform .1s,box-shadow .1s}.darkMode .r-button{background-color:transparent;color:#e1e3e5;border-color:rgba(255,255,255,.15)}.r-button,.r-button:hover{text-decoration:none;color:#4a4a4a}.darkMode .r-button,.darkMode .r-button:hover{color:#e1e3e5}.r-button.is-active,.r-button.is-focused,.r-button:active,.r-button:focus{outline:0}.r-button[disabled]{cursor:not-allowed}.r-button:active:not([disabled]){transform:scale(.98)}.r-button.borderless{background-color:transparent;box-shadow:none;border:none}.r-button.borderless:focus,.r-button.borderless:hover{background:rgba(0,0,0,.04)}.darkMode .r-button.borderless:focus,.darkMode .r-button.borderless:hover{background:rgba(255,255,255,.08)}.r-button.borderless:focus:not(:active){box-shadow:0 0 0 3px rgba(13,124,200,.2)!important}.r-button:hover:not(.borderless){box-shadow:0 0 0 2px rgba(13,124,200,.3)!important}.r-button:focus:not(:active){box-shadow:0 0 0 3px rgba(13,124,200,.2),0 0 0 1px #0d7cc8!important}.r-button.primary{background:#209cee;border:none;color:#fff}.r-button.primary:focus,.r-button.primary:hover{background:#1296ed}.r-button.primary:focus:not(:active){box-shadow:0 0 0 3px rgba(13,124,200,.2),inset 0 0 0 1px #0a5e98!important}.r-button.gray{background:#f9f9fa}.darkMode .r-button.gray{background:rgba(255,255,255,.1)}.r-button[disabled]{box-shadow:none!important;opacity:.4}.r-button.fullwidth{display:flex;width:100%}.r-button.small{height:34px}.r-button.icon-only{width:40px;padding:0}.r-button.icon-only.small{width:34px}.r-button:not(.icon-only){min-width:65px}.r-button.loading{color:transparent!important;pointer-events:none}.r-button.loading span{opacity:0}.r-button.loading::after{content:\"\";width:18px;height:18px;border:2px solid transparent;border-top-color:rgba(0,0,0,.3);border-right-color:rgba(0,0,0,.3);border-radius:100%;animation:spinAround .6s infinite linear;position:absolute!important}.darkMode .r-button.loading::after{border-top-color:rgba(255,255,255,.4);border-right-color:rgba(255,255,255,.4)}.r-button:not(.muted) span:not(.icon){font-size:16px;letter-spacing:-.005em;line-height:24px;font-weight:600}.r-button span{transition:opacity 75ms}.r-button span:not(.icon){position:relative;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.r-button .icon:first-child:not(:last-child){margin-left:-2px;margin-right:8px}.r-button .icon:last-child:not(:first-child){margin-left:8px;margin-right:-2px}.r-button .icon:first-child:last-child{margin-left:0;margin-right:0}.small .icon:first-child:not(:last-child){margin-left:-4px;margin-right:5px}.small .icon:last-child:not(:first-child){margin-right:-4px;margin-left:5px}@-moz-keyframes spinAround{from{transform:rotate(0)}to{transform:rotate(359deg)}}@-webkit-keyframes spinAround{from{transform:rotate(0)}to{transform:rotate(359deg)}}@-o-keyframes spinAround{from{transform:rotate(0)}to{transform:rotate(359deg)}}@keyframes spinAround{from{transform:rotate(0)}to{transform:rotate(359deg)}}", map: undefined, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__ = undefined;
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = true;
    /* style inject SSR */
    

    
    var Button = normalizeComponent_1(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      browser,
      undefined
    );

  /* eslint-disable quotes */

  /* eslint-disable quote-props */
  var ICONS = {
    "add": '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>',
    "add image": '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path d="M5,3A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H14.09C14.03,20.67 14,20.34 14,20C14,19.32 14.12,18.64 14.35,18H5L8.5,13.5L11,16.5L14.5,12L16.73,14.97C17.7,14.34 18.84,14 20,14C20.34,14 20.67,14.03 21,14.09V5C21,3.89 20.1,3 19,3H5M19,16V19H16V21H19V24H21V21H24V19H21V16H19Z" /></svg>',
    "add text": '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path d="M8.5,7H10.5L16,21H13.6L12.5,18H6.3L5.2,21H3L8.5,7M7.1,16H11.9L9.5,9.7L7.1,16M22,5V7H19V10H17V7H14V5H17V2H19V5H22Z" /></svg>',
    "add date": '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path d="M19,19V7H5V19H19M16,1H18V3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H6V1H8V3H16V1M11,9H13V12H16V14H13V17H11V14H8V12H11V9Z" /></svg>',
    "send": '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" /></svg>',
    "check": '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /></svg>',
    "undo": '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path d="M13.5,7A6.5,6.5 0 0,1 20,13.5A6.5,6.5 0 0,1 13.5,20H10V18H13.5C16,18 18,16 18,13.5C18,11 16,9 13.5,9H7.83L10.91,12.09L9.5,13.5L4,8L9.5,2.5L10.92,3.91L7.83,7H13.5M6,18H8V20H6V18Z" /></svg>',
    "attention": '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path d="M2.2,16.06L3.88,12L2.2,7.94L6.26,6.26L7.94,2.2L12,3.88L16.06,2.2L17.74,6.26L21.8,7.94L20.12,12L21.8,16.06L17.74,17.74L16.06,21.8L12,20.12L7.94,21.8L6.26,17.74L2.2,16.06M13,17V15H11V17H13M13,13V7H11V13H13Z" /></svg>',
    "close": '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>',
    "more": '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" /></svg>',
    "date": '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path d="M7,10H12V15H7M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z" /></svg>',
    "merge": '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path d="M17,20.41L18.41,19L15,15.59L13.59,17M7.5,8H11V13.59L5.59,19L7,20.41L13,14.41V8H16.5L12,3.5" /></svg>',
    "download": '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path d="M14,2L20,8V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2H14M18,20V9H13V4H6V20H18M12,19L8,15H10.5V12H13.5V15H16L12,19Z" /></svg>',
    "sync": '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path d="M12,18A6,6 0 0,1 6,12C6,11 6.25,10.03 6.7,9.2L5.24,7.74C4.46,8.97 4,10.43 4,12A8,8 0 0,0 12,20V23L16,19L12,15M12,4V1L8,5L12,9V6A6,6 0 0,1 18,12C18,13 17.75,13.97 17.3,14.8L18.76,16.26C19.54,15.03 20,13.57 20,12A8,8 0 0,0 12,4Z" /></svg>',
    "log out": '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path d="M19,3H5C3.89,3 3,3.89 3,5V9H5V5H19V19H5V15H3V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M10.08,15.58L11.5,17L16.5,12L11.5,7L10.08,8.41L12.67,11H3V13H12.67L10.08,15.58Z" /></svg>',
    "file": '<svg style="width:24px;height:24px" viewBox="0 0 24 24"> <path d="M16.5,6V17.5A4,4 0 0,1 12.5,21.5A4,4 0 0,1 8.5,17.5V5A2.5,2.5 0 0,1 11,2.5A2.5,2.5 0 0,1 13.5,5V15.5A1,1 0 0,1 12.5,16.5A1,1 0 0,1 11.5,15.5V6H10V15.5A2.5,2.5 0 0,0 12.5,18A2.5,2.5 0 0,0 15,15.5V5A4,4 0 0,0 11,1A4,4 0 0,0 7,5V17.5A5.5,5.5 0 0,0 12.5,23A5.5,5.5 0 0,0 18,17.5V6H16.5Z" /> </svg>',
    "upload": '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path d="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z" /></svg>',
    "edit": '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" /></svg>',
    "images": '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path d="M21,17H7V3H21M21,1H7A2,2 0 0,0 5,3V17A2,2 0 0,0 7,19H21A2,2 0 0,0 23,17V3A2,2 0 0,0 21,1M3,5H1V21A2,2 0 0,0 3,23H19V21H3M15.96,10.29L13.21,13.83L11.25,11.47L8.5,15H19.5L15.96,10.29Z" /></svg>',
    "modal": '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path d="M18 18V20H4A2 2 0 0 1 2 18V8H4V18M22 6V14A2 2 0 0 1 20 16H8A2 2 0 0 1 6 14V6A2 2 0 0 1 8 4H20A2 2 0 0 1 22 6M20 6H8V14H20Z" /></svg>',
    "settings": '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" /></svg>',
    "new message": '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.2561 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V9.74394C21.5308 9.90977 21.026 10 20.5 10C20.331 10 20.1642 9.99068 20 9.97254V18H4V8L12 13L18.006 9.24624C17.5187 8.92119 17.0984 8.5036 16.7703 8.01858L12 11L4 6H16.0275C16.0093 5.83583 16 5.669 16 5.5C16 4.97405 16.0902 4.46917 16.2561 4Z"/><circle cx="20.5" cy="5.5" r="2.5"/></svg>',
    "mail": '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" /></svg>',
    "pin": '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path d="M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z" /></svg>',
    "pin off": '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path d="M2,5.27L3.28,4L20,20.72L18.73,22L12.8,16.07V22H11.2V16H6V14L8,12V11.27L2,5.27M16,12L18,14V16H17.82L8,6.18V4H7V2H17V4H16V12Z" /></svg>',
    "expand": '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path d="M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z" /></svg>',
    "collapse": '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path d="M16.59,5.41L15.17,4L12,7.17L8.83,4L7.41,5.41L12,10M7.41,18.59L8.83,20L12,16.83L15.17,20L16.58,18.59L12,14L7.41,18.59Z" /></svg>',
    "eye hidden": '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z" /></svg>',
    "eye visible": '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" /></svg>',
    "arrow up": '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z" /></svg>',
    "arrow down": '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path d="M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z" /></svg>',
    "arrow left": '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" /></svg>',
    "arrow right": '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" /></svg>',
    "chevron down": '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>',
    "chevron up": '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" /></svg>'
  };

  //
  var script$1 = {
    name: "Icon",
    props: {
      icon: {
        validator: function validator(value) {
          if (value === "missing") return true;
          var valid = Object.keys(ICONS).includes(value); // eslint-disable-next-line no-console

          if (!valid) console.warn("Invalid icon name, available names are\n".concat(Object.keys(ICONS).join("\n")));
          return valid;
        }
      },
      iconsObject: {
        type: Object,
        required: false,
        default: function _default() {
          return ICONS;
        }
      },
      fallbackIcon: {
        type: String,
        required: false,
        default: function _default() {
          return "<svg style=\"width:24px;height:24px\" viewBox=\"0 0 24 24\"><path fill='red' d=\"M21.5,10.8L13.2,2.5C12.5,1.8 11.5,1.8 10.8,2.5L2.5,10.8C1.8,11.5 1.8,12.5 2.5,13.2L10.8,21.5C11.5,22.2 12.5,22.2 13.2,21.5L21.5,13.2C22.1,12.5 22.1,11.5 21.5,10.8M12.5,17H11V15.5H12.5V17M14.3,11.8C13.9,12.3 13.2,12.6 12.9,13.1C12.6,13.5 12.6,14 12.6,14.5H11C11,13.7 11,13 11.3,12.5C11.6,12 12.3,11.7 12.7,11.4C13.9,10.3 13.6,8.7 11.9,8.6C11.1,8.6 10.4,9.3 10.4,10.1H9C9,8.4 10.3,7.1 12,7.1C14.7,7.1 15.9,9.8 14.3,11.8Z\" /></svg>";
        }
      }
    }
  };

  /* script */
  const __vue_script__$1 = script$1;

  /* template */
  var __vue_render__$1 = function (_h,_vm) {var _c=_vm._c;return _c('span',{staticClass:"icon material",class:[ _vm.data.class, _vm.data.staticClass ],domProps:{"innerHTML":_vm._s(_vm.props.iconsObject[_vm.props.icon] ? _vm.props.iconsObject[_vm.props.icon] : _vm.props.fallbackIcon)}})};
  var __vue_staticRenderFns__$1 = [];

    /* style */
    const __vue_inject_styles__$1 = function (inject) {
      if (!inject) return
      inject("data-v-42a5281e_0", { source: ".icon.material{height:24px;width:24px}.icon.material.icon-text{vertical-align:text-top;display:inline-block;position:relative;top:1px}.icon.material.icon-text,.icon.material.icon-text svg{height:18px!important;width:18px!important}.darkMode .icon.material svg{fill:#e1e3e5}.icon.material.gray svg{fill:#777}.darkMode .icon.material.gray svg{fill:#aab0b6}.icon.material.light-gray svg{fill:$color-gray-text-light}.icon.material.green svg{fill:#009826}.icon.material.red svg{fill:#e24161}.icon.material.blue svg{fill:#2c61b6}.darkMode .icon.material.blue svg{fill:#0f91ea}.icon.material.white svg{fill:#fff}", map: undefined, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$1 = undefined;
    /* module identifier */
    const __vue_module_identifier__$1 = undefined;
    /* functional template */
    const __vue_is_functional_template__$1 = true;
    /* style inject SSR */
    

    
    var Icon = normalizeComponent_1(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      browser,
      undefined
    );

  var version = "0.10.0";

  var install = function install(Vue) {
    Vue.component("r-button", Button);
    Vue.component("r-icon", Icon);
  };

  var plugin = {
    install: install,
    version: version
  };

  if (typeof window !== "undefined" && window.Vue) {
    window.Vue.use(plugin);
  }

  return plugin;

}));
