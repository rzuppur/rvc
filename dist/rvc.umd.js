/*!
 * rvc v0.19.0 
 * (c) 2019 Reino Zuppur
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('resize-observer-polyfill')) :
  typeof define === 'function' && define.amd ? define(['resize-observer-polyfill'], factory) :
  (global = global || self, global.Rvc = factory(global.ResizeObserver));
}(this, function (ResizeObserver) { 'use strict';

  ResizeObserver = ResizeObserver && ResizeObserver.hasOwnProperty('default') ? ResizeObserver['default'] : ResizeObserver;

  var script = {
    name: "Button",
    functional: true,
    props: {
      action: Function,
      actionWithModifier: Function,
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
    },
    render: function render(createElement, context) {
      var d = context.data;
      var p = context.props;
      var childrenNodes = [];
      var textSlot = context.slots().default;

      if (p.icon) {
        childrenNodes.push(createElement("r-icon", {
          props: {
            icon: p.icon
          },
          class: [{
            white: p.primary,
            gray: !p.primary && !p.iconColor
          }, p.iconColor]
        }));
      }

      if (textSlot) childrenNodes.push(createElement("span", {}, [textSlot]));
      var buttonClasses = {
        "r-button": true,
        "icon-only": p.icon && !textSlot,
        borderless: p.borderless,
        primary: p.primary,
        gray: p.gray,
        fullwidth: p.fullwidth,
        small: p.small,
        loading: p.loading
      };
      return createElement("button", {
        attrs: {
          "aria-label": p.label
        },
        class: [buttonClasses, d.staticClass, d.class],
        directives: d.directives,
        domProps: {
          disabled: p.disabled || p.loading,
          type: p.submit ? "submit" : "button"
        },
        on: {
          click: function click(event) {
            if (p.actionWithModifier) ;

            if (p.action) p.action(event);
          },
          pointerdown: function pointerdown(event) {
            event.preventDefault();
          }
        }
      }, childrenNodes);
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

    /* style */
    const __vue_inject_styles__ = function (inject) {
      if (!inject) return
      inject("data-v-1465a014_0", { source: ".r-button{cursor:pointer;user-select:none;-webkit-touch-callout:none;-webkit-appearance:none;-moz-appearance:none;position:relative;vertical-align:top;white-space:nowrap;display:inline-flex;align-items:center;justify-content:center;height:40px;padding:0 12px;border:1px solid #ddd;border-radius:4px;font-family:Inter,BlinkMacSystemFont,-apple-system,\"Segoe UI\",Roboto,Oxygen-Sans,Ubuntu,Cantarell,\"Helvetica Neue\",sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\";font-size:16px;letter-spacing:-.005em;line-height:24px;font-weight:400;text-align:center;color:#40444a;background-color:#fff;box-shadow:none;transition:transform .1s,box-shadow .1s}.darkMode .r-button{background-color:transparent;color:#e1e3e5;border-color:rgba(255,255,255,.15)}.r-button,.r-button:hover{text-decoration:none;color:#40444a}.darkMode .r-button,.darkMode .r-button:hover{color:#e1e3e5}.r-button.is-active,.r-button.is-focused,.r-button:active,.r-button:focus{outline:0}.r-button[disabled]{cursor:not-allowed}.r-button:active:not([disabled]){transform:scale(.98)}.r-button.borderless{background-color:transparent;box-shadow:none;border:none}.r-button.borderless:focus,.r-button.borderless:hover{background:rgba(0,0,0,.04)}.darkMode .r-button.borderless:focus,.darkMode .r-button.borderless:hover{background:rgba(255,255,255,.08)}.r-button.borderless:focus:not(:active){box-shadow:0 0 0 3px rgba(13,124,200,.2)!important}.r-button:hover:not(.borderless){box-shadow:0 0 0 2px rgba(13,124,200,.3)!important}.r-button:focus:not(:active){box-shadow:0 0 0 3px rgba(13,124,200,.2),0 0 0 1px #0d7cc8!important}.r-button.primary{background:#2097e8;border:none;color:#fff}.r-button.primary:focus,.r-button.primary:hover{background:#1790e1}.r-button.primary:focus:not(:active){box-shadow:0 0 0 3px rgba(13,124,200,.2),inset 0 0 0 1px #0a5e98!important}.r-button.gray{background:#f8f8f9}.darkMode .r-button.gray{background:rgba(255,255,255,.1)}.r-button[disabled]{box-shadow:none!important;opacity:.4}.r-button.fullwidth{display:flex;width:100%}.r-button.small{height:34px}.r-button.icon-only{width:40px;padding:0}.r-button.icon-only.small{width:34px}.r-button:not(.icon-only){min-width:65px}.r-button.loading{color:transparent!important;pointer-events:none}.r-button.loading span{opacity:0}.r-button.loading::after{content:\"\";width:18px;height:18px;border:2px solid transparent;border-top-color:rgba(0,0,0,.3);border-right-color:rgba(0,0,0,.3);border-radius:100%;animation:spinAround .6s infinite linear;position:absolute!important}.darkMode .r-button.loading::after{border-top-color:rgba(255,255,255,.4);border-right-color:rgba(255,255,255,.4)}.r-button:not(.muted) span:not(.icon){font-size:16px;letter-spacing:-.005em;line-height:24px;font-weight:600}.r-button span{transition:opacity 75ms}.r-button span:not(.r-icon){position:relative;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.r-button .r-icon:first-child:not(:last-child){margin-left:-2px;margin-right:8px}.r-button .r-icon:last-child:not(:first-child){margin-left:8px;margin-right:-2px}.r-button .r-icon:first-child:last-child{margin-left:0;margin-right:0}.small .r-icon:first-child:not(:last-child){margin-left:-4px;margin-right:5px}.small .r-icon:last-child:not(:first-child){margin-right:-4px;margin-left:5px}@-moz-keyframes spinAround{from{transform:rotate(0)}to{transform:rotate(359deg)}}@-webkit-keyframes spinAround{from{transform:rotate(0)}to{transform:rotate(359deg)}}@-o-keyframes spinAround{from{transform:rotate(0)}to{transform:rotate(359deg)}}@keyframes spinAround{from{transform:rotate(0)}to{transform:rotate(359deg)}}", map: undefined, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__ = undefined;
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = undefined;
    /* style inject SSR */
    

    
    var Button = normalizeComponent_1(
      {},
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      browser,
      undefined
    );

  /* eslint-disable quote-props */
  var ICONS = {
    "add": "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z",
    "add image": "M5,3A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H14.09C14.03,20.67 14,20.34 14,20C14,19.32 14.12,18.64 14.35,18H5L8.5,13.5L11,16.5L14.5,12L16.73,14.97C17.7,14.34 18.84,14 20,14C20.34,14 20.67,14.03 21,14.09V5C21,3.89 20.1,3 19,3H5M19,16V19H16V21H19V24H21V21H24V19H21V16H19Z",
    "add text": "M8.5,7H10.5L16,21H13.6L12.5,18H6.3L5.2,21H3L8.5,7M7.1,16H11.9L9.5,9.7L7.1,16M22,5V7H19V10H17V7H14V5H17V2H19V5H22Z",
    "add date": "M19,19V7H5V19H19M16,1H18V3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H6V1H8V3H16V1M11,9H13V12H16V14H13V17H11V14H8V12H11V9Z",
    "send": "M2,21L23,12L2,3V10L17,12L2,14V21Z",
    "check": "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z",
    "undo": "M13.5,7A6.5,6.5 0 0,1 20,13.5A6.5,6.5 0 0,1 13.5,20H10V18H13.5C16,18 18,16 18,13.5C18,11 16,9 13.5,9H7.83L10.91,12.09L9.5,13.5L4,8L9.5,2.5L10.92,3.91L7.83,7H13.5M6,18H8V20H6V18Z",
    "redo": "M10.5,7A6.5,6.5 0 0,0 4,13.5A6.5,6.5 0 0,0 10.5,20H14V18H10.5C8,18 6,16 6,13.5C6,11 8,9 10.5,9H16.17L13.09,12.09L14.5,13.5L20,8L14.5,2.5L13.08,3.91L16.17,7H10.5M18,18H16V20H18V18Z",
    "attention": "M2.2,16.06L3.88,12L2.2,7.94L6.26,6.26L7.94,2.2L12,3.88L16.06,2.2L17.74,6.26L21.8,7.94L20.12,12L21.8,16.06L17.74,17.74L16.06,21.8L12,20.12L7.94,21.8L6.26,17.74L2.2,16.06M13,17V15H11V17H13M13,13V7H11V13H13Z",
    "close": "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",
    "more": "M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z",
    "date": "M7,10H12V15H7M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z",
    "merge": "M17,20.41L18.41,19L15,15.59L13.59,17M7.5,8H11V13.59L5.59,19L7,20.41L13,14.41V8H16.5L12,3.5",
    "download": "M14,2L20,8V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2H14M18,20V9H13V4H6V20H18M12,19L8,15H10.5V12H13.5V15H16L12,19Z",
    "sync": "M12,18A6,6 0 0,1 6,12C6,11 6.25,10.03 6.7,9.2L5.24,7.74C4.46,8.97 4,10.43 4,12A8,8 0 0,0 12,20V23L16,19L12,15M12,4V1L8,5L12,9V6A6,6 0 0,1 18,12C18,13 17.75,13.97 17.3,14.8L18.76,16.26C19.54,15.03 20,13.57 20,12A8,8 0 0,0 12,4Z",
    "log out": "M19,3H5C3.89,3 3,3.89 3,5V9H5V5H19V19H5V15H3V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M10.08,15.58L11.5,17L16.5,12L11.5,7L10.08,8.41L12.67,11H3V13H12.67L10.08,15.58Z",
    "file": "M16.5,6V17.5A4,4 0 0,1 12.5,21.5A4,4 0 0,1 8.5,17.5V5A2.5,2.5 0 0,1 11,2.5A2.5,2.5 0 0,1 13.5,5V15.5A1,1 0 0,1 12.5,16.5A1,1 0 0,1 11.5,15.5V6H10V15.5A2.5,2.5 0 0,0 12.5,18A2.5,2.5 0 0,0 15,15.5V5A4,4 0 0,0 11,1A4,4 0 0,0 7,5V17.5A5.5,5.5 0 0,0 12.5,23A5.5,5.5 0 0,0 18,17.5V6H16.5Z",
    "upload": "M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z",
    "edit": "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z",
    "delete": "M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z",
    "images": "M21,17H7V3H21M21,1H7A2,2 0 0,0 5,3V17A2,2 0 0,0 7,19H21A2,2 0 0,0 23,17V3A2,2 0 0,0 21,1M3,5H1V21A2,2 0 0,0 3,23H19V21H3M15.96,10.29L13.21,13.83L11.25,11.47L8.5,15H19.5L15.96,10.29Z",
    "modal": "M18 18V20H4A2 2 0 0 1 2 18V8H4V18M22 6V14A2 2 0 0 1 20 16H8A2 2 0 0 1 6 14V6A2 2 0 0 1 8 4H20A2 2 0 0 1 22 6M20 6H8V14H20Z",
    "notification": "M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21",
    "search": "M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z",
    "search file": "M15.5,12C18,12 20,14 20,16.5C20,17.38 19.75,18.21 19.31,18.9L22.39,22L21,23.39L17.88,20.32C17.19,20.75 16.37,21 15.5,21C13,21 11,19 11,16.5C11,14 13,12 15.5,12M15.5,14A2.5,2.5 0 0,0 13,16.5A2.5,2.5 0 0,0 15.5,19A2.5,2.5 0 0,0 18,16.5A2.5,2.5 0 0,0 15.5,14M5,3H19C20.11,3 21,3.89 21,5V13.03C20.5,12.23 19.81,11.54 19,11V5H5V19H9.5C9.81,19.75 10.26,20.42 10.81,21H5C3.89,21 3,20.11 3,19V5C3,3.89 3.89,3 5,3M7,7H17V9H7V7M7,11H12.03C11.23,11.5 10.54,12.19 10,13H7V11M7,15H9.17C9.06,15.5 9,16 9,16.5V17H7V15Z",
    "settings": "M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z",
    "new message": "M16.2561 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V9.74394C21.5308 9.90977 21.026 10 20.5 10C20.331 10 20.1642 9.99068 20 9.97254V18H4V8L12 13L18.006 9.24624C17.5187 8.92119 17.0984 8.5036 16.7703 8.01858L12 11L4 6H16.0275C16.0093 5.83583 16 5.669 16 5.5C16 4.97405 16.0902 4.46917 16.2561 4ZM18,5.5a2.5,2.5 0 1,0 5,0a2.5,2.5 0 1,0 -5,0Z",
    "mail": "M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z",
    "pin": "M16 12V6L18 5V3H6V5L8 6V12L5 14V16H11.2V22H12.8V16H19V14L16 12Z",
    "pin off": "M2 5.27L3.28 4L20 20.72L18.73 22L12.8 16.07V22H11.2V16H5V14L8 12V11.27L2 5.27ZM16 12L19 14V16H17.82L8 6.18V6L6 5V3H18V5L16 6V12Z",
    "reply": "M10,9V5L3,12L10,19V14.9C15,14.9 18.5,16.5 21,20C20,15 17,10 10,9Z",
    "expand": "M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z",
    "collapse": "M16.59,5.41L15.17,4L12,7.17L8.83,4L7.41,5.41L12,10M7.41,18.59L8.83,20L12,16.83L15.17,20L16.58,18.59L12,14L7.41,18.59Z",
    "eye hidden": "M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z",
    "eye visible": "M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z",
    "brightness dark": "M12,18C11.11,18 10.26,17.8 9.5,17.45C11.56,16.5 13,14.42 13,12C13,9.58 11.56,7.5 9.5,6.55C10.26,6.2 11.11,6 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69Z",
    "brightness bright": "M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8M12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69Z",
    "brightness auto": "M14.3,16L13.6,14H10.4L9.7,16H7.8L11,7H13L16.2,16H14.3M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69M10.85,12.65H13.15L12,9L10.85,12.65Z",
    "arrow up": "M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z",
    "arrow down": "M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z",
    "arrow left": "M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z",
    "arrow right": "M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z",
    "chevron down": "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z",
    "chevron up": "M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z",
    "chevron left": "M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z",
    "chevron right": "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z",
    "star": "M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z",
    "star outline": "M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z",
    "user leave": "M19,21V19H15V17H19V15L22,18L19,21M13,18C13,18.71 13.15,19.39 13.42,20H2V17C2,14.79 5.58,13 10,13C11,13 11.96,13.09 12.85,13.26C13.68,13.42 14.44,13.64 15.11,13.92C13.83,14.83 13,16.32 13,18M4,17V18H11C11,16.96 11.23,15.97 11.64,15.08L10,15C6.69,15 4,15.9 4,17M10,4A4,4 0 0,1 14,8A4,4 0 0,1 10,12A4,4 0 0,1 6,8A4,4 0 0,1 10,4M10,6A2,2 0 0,0 8,8A2,2 0 0,0 10,10A2,2 0 0,0 12,8A2,2 0 0,0 10,6Z",
    "user join": "M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z",
    "text bold": "M13.5,15.5H10V12.5H13.5A1.5,1.5 0 0,1 15,14A1.5,1.5 0 0,1 13.5,15.5M10,6.5H13A1.5,1.5 0 0,1 14.5,8A1.5,1.5 0 0,1 13,9.5H10M15.6,10.79C16.57,10.11 17.25,9 17.25,8C17.25,5.74 15.5,4 13.25,4H7V18H14.04C16.14,18 17.75,16.3 17.75,14.21C17.75,12.69 16.89,11.39 15.6,10.79Z",
    "text italic": "M10,4V7H12.21L8.79,15H6V18H14V15H11.79L15.21,7H18V4H10Z",
    "text underline": "M5,21H19V19H5V21M12,17A6,6 0 0,0 18,11V3H15.5V11A3.5,3.5 0 0,1 12,14.5A3.5,3.5 0 0,1 8.5,11V3H6V11A6,6 0 0,0 12,17Z",
    "text h1": "M3,4H5V10H9V4H11V18H9V12H5V18H3V4M14,18V16H16V6.31L13.5,7.75V5.44L16,4H18V16H20V18H14Z",
    "text h2": "M3,4H5V10H9V4H11V18H9V12H5V18H3V4M21,18H15A2,2 0 0,1 13,16C13,15.47 13.2,15 13.54,14.64L18.41,9.41C18.78,9.05 19,8.55 19,8A2,2 0 0,0 17,6A2,2 0 0,0 15,8H13A4,4 0 0,1 17,4A4,4 0 0,1 21,8C21,9.1 20.55,10.1 19.83,10.83L15,16H21V18Z",
    "text h3": "M3,4H5V10H9V4H11V18H9V12H5V18H3V4M15,4H19A2,2 0 0,1 21,6V16A2,2 0 0,1 19,18H15A2,2 0 0,1 13,16V15H15V16H19V12H15V10H19V6H15V7H13V6A2,2 0 0,1 15,4Z",
    "text quote": "M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z",
    "text code": "M14.6,16.6L19.2,12L14.6,7.4L16,6L22,12L16,18L14.6,16.6M9.4,16.6L4.8,12L9.4,7.4L8,6L2,12L8,18L9.4,16.6Z",
    "text code block": "M11,6.5V9.33L8.33,12L11,14.67V17.5L5.5,12M13,6.43L18.57,12L13,17.57V14.74L15.74,12L13,9.26M5,3C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3H5Z"
  };

  //

  var toSvgTag = function toSvgTag(svgPath) {
    return "<svg style=\"width:24px;height:24px\" viewBox=\"0 0 24 24\"><path d=\"".concat(svgPath, "\" /></svg>");
  };

  var script$1 = {
    name: "Icon",
    functional: true,
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
          return "M21.5,10.8L13.2,2.5C12.5,1.8 11.5,1.8 10.8,2.5L2.5,10.8C1.8,11.5 1.8,12.5 2.5,13.2L10.8,21.5C11.5,22.2 12.5,22.2 13.2,21.5L21.5,13.2C22.1,12.5 22.1,11.5 21.5,10.8M12.5,17H11V15.5H12.5V17M14.3,11.8C13.9,12.3 13.2,12.6 12.9,13.1C12.6,13.5 12.6,14 12.6,14.5H11C11,13.7 11,13 11.3,12.5C11.6,12 12.3,11.7 12.7,11.4C13.9,10.3 13.6,8.7 11.9,8.6C11.1,8.6 10.4,9.3 10.4,10.1H9C9,8.4 10.3,7.1 12,7.1C14.7,7.1 15.9,9.8 14.3,11.8Z";
        }
      }
    },
    render: function render(createElement, context) {
      var d = context.data;
      var p = context.props;
      var iconValid = !!p.iconsObject[p.icon];
      return createElement("span", {
        attrs: {
          "aria-hidden": true
        },
        class: ["r-icon", iconValid ? "" : "red", d.staticClass, d.class],
        directives: d.directives,
        domProps: {
          innerHTML: iconValid ? toSvgTag(p.iconsObject[p.icon]) : toSvgTag(p.fallbackIcon)
        }
      });
    }
  };

  /* script */
  const __vue_script__$1 = script$1;

  /* template */

    /* style */
    const __vue_inject_styles__$1 = function (inject) {
      if (!inject) return
      inject("data-v-6d7b14bb_0", { source: ".r-icon{height:24px;width:24px;display:inline-block}.r-icon.icon-text{vertical-align:text-top;display:inline-block;position:relative;top:1px}.r-icon.icon-text,.r-icon.icon-text svg{height:18px!important;width:18px!important}.darkMode .r-icon svg{fill:#e1e3e5}.r-icon.gray svg{fill:#777}.darkMode .r-icon.gray svg{fill:#aab0b6}.r-icon.light-gray svg{fill:#aaa}.r-icon.green svg{fill:#009635}.darkMode .r-icon.green svg{fill:#00aa3c}.r-icon.red svg{fill:#e24161}.darkMode .r-icon.red svg{fill:#e55370}.r-icon.blue svg{fill:#209cee}.darkMode .r-icon.blue svg{fill:#118ada}.r-icon.gold svg{fill:#eebc41}.r-icon.white svg{fill:#fff}", map: undefined, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$1 = undefined;
    /* module identifier */
    const __vue_module_identifier__$1 = undefined;
    /* functional template */
    const __vue_is_functional_template__$1 = undefined;
    /* style inject SSR */
    

    
    var Icon = normalizeComponent_1(
      {},
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      browser,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //
  //
  //
  var MAX_SHOWN = 3;
  var script$2 = {
    name: "Toast",
    data: function data() {
      return {
        queue: []
      };
    },
    watch: {
      queue: {
        handler: function handler(val) {
          var _this = this;

          if (val.length) {
            setTimeout(function () {
              _this.remove(val[0].index);
            }, 900 + val[0].text.length * 70);
          }
        }
      }
    },
    created: function created() {
      this.index = 0;
    },
    methods: {
      notify: function notify(text) {
        var index = this.index++;
        text = text.toString();
        this.queue.push({
          text: text,
          index: index
        });

        if (this.queue.length > MAX_SHOWN) {
          this.queue = this.queue.slice(-MAX_SHOWN);
        }
      },
      remove: function remove(index) {
        this.queue = this.queue.filter(function (notif) {
          return notif.index !== index;
        });
      }
    }
  };

  /* script */
  const __vue_script__$2 = script$2;

  /* template */
  var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"toast-list"},[_c('transition-group',{staticClass:"toast-list-inner",attrs:{"name":"toast-list","tag":"div"}},_vm._l((_vm.queue),function(notification){return _c('div',{key:notification.index,staticClass:"toast-notification-wrap"},[_c('div',{staticClass:"toast-notification",on:{"click":function($event){return _vm.remove(notification.index)}}},[_vm._v(_vm._s(notification.text))])])}),0)],1)};
  var __vue_staticRenderFns__ = [];

    /* style */
    const __vue_inject_styles__$2 = function (inject) {
      if (!inject) return
      inject("data-v-0e8d3bbf_0", { source: ".toast-list[data-v-0e8d3bbf]{position:fixed;top:36px;left:10px;right:10px;z-index:1100;user-select:none;pointer-events:none}.toast-list-inner[data-v-0e8d3bbf]{max-width:700px;margin:0 auto;position:relative;text-align:center}.toast-notification[data-v-0e8d3bbf]{display:inline-block;padding:15px 25px;margin-bottom:5px;word-break:break-word;color:#fff;font-size:16px;letter-spacing:-.005em;line-height:24px;font-weight:600;background:#40444a;border-radius:4px;box-shadow:0 2px 10px -2px rgba(0,0,0,.2);pointer-events:all;user-select:none}.toast-list-enter[data-v-0e8d3bbf],.toast-list-leave-to[data-v-0e8d3bbf]{opacity:0}.toast-list-enter-active[data-v-0e8d3bbf],.toast-list-leave-active[data-v-0e8d3bbf],.toast-list-move[data-v-0e8d3bbf]{transition:all .2s}.toast-list-leave-active[data-v-0e8d3bbf]{position:absolute;left:0;right:0}", map: undefined, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$2 = "data-v-0e8d3bbf";
    /* module identifier */
    const __vue_module_identifier__$2 = undefined;
    /* functional template */
    const __vue_is_functional_template__$2 = false;
    /* style inject SSR */
    

    
    var Toast = normalizeComponent_1(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__$2,
      __vue_script__$2,
      __vue_scope_id__$2,
      __vue_is_functional_template__$2,
      __vue_module_identifier__$2,
      browser,
      undefined
    );

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  //
  var script$3 = {
    name: "Tooltip",
    data: function data() {
      return {
        visible: false,
        show: false,
        el: null,
        text: "",
        tooltip_x: 0,
        tooltip_y: 0,
        arrow_x: 0,
        arrow_y: 0,
        width: 0,
        height: 0,
        location: "top"
      };
    },
    computed: {
      tooltipStyle: function tooltipStyle() {
        return {
          left: "".concat(this.tooltip_x, "px"),
          top: "".concat(this.tooltip_y, "px")
        };
      },
      arrowStyle: function arrowStyle() {
        return {
          left: "".concat(this.arrow_x, "px"),
          top: "".concat(this.arrow_y, "px"),
          transform: {
            top: "",
            bottom: "rotate(180deg)",
            left: "rotate(270deg)",
            right: "rotate(90deg)"
          }[this.location]
        };
      }
    },
    watch: {
      show: {
        handler: function handler(val, oldVal) {
          var _this = this;

          if (val === oldVal) return;

          if (val === false) {
            clearTimeout(this.hideShowTimeout);
            this.hideShowTimeout = setTimeout(function () {
              _this.visible = false;
            }, 100);
          } else {
            clearTimeout(this.hideShowTimeout);

            if (this.el && this.el.tooltipData) {
              var tooltipData = this.el.tooltipData;
              this.text = tooltipData.text;
              if (!this.text) return;
            }

            this.hideShowTimeout = setTimeout(function () {
              _this.visible = true;
            }, 200);
          }
        }
      }
    },
    mounted: function mounted() {
      this.positionInterval = setInterval(this.update, 10);
      this.resizeObs = new ResizeObserver(this.tooltipSize);
      if (this.$refs.tooltip) this.resizeObs.observe(this.$refs.tooltip);
    },
    beforeDestroy: function beforeDestroy() {
      clearInterval(this.positionInterval);
      this.resizeObs.disconnect();
    },
    methods: {
      update: function update() {
        var _this2 = this;

        if (this.visible) {
          window.cancelAnimationFrame(this.animFrame);
          this.animFrame = window.requestAnimationFrame(function () {
            _this2.getData();

            _this2.position();
          });
        }
      },
      getData: function getData() {
        if (this.visible) {
          if (this.el && this.el.tooltipData && document.body.contains(this.el) && this.el.offsetHeight > 0) {
            var tooltipData = this.el.tooltipData;
            this.text = tooltipData.text;

            if (!this.text) {
              this.forceHide();
              return;
            }

            if (Object.keys(tooltipData.modifiers).length) {
              if (tooltipData.modifiers.bottom) {
                this.location = "bottom";
              } else if (tooltipData.modifiers.left) {
                this.location = "left";
              } else if (tooltipData.modifiers.right) {
                this.location = "right";
              }
            } else {
              this.location = "top";
            }
          } else {
            this.forceHide();
          }
        }
      },
      forceHide: function forceHide() {
        clearTimeout(this.hideShowTimeout);
        this.visible = false;
        this.show = false;
      },
      position: function position() {
        if (this.visible && this.el) {
          var rect = this.el.getBoundingClientRect();

          switch (this.location) {
            case "bottom":
              this.arrow_x = Math.round(rect.x + rect.width / 2) - 7;
              this.arrow_y = Math.round(rect.y + rect.height) - 9;
              this.tooltip_x = Math.round(rect.x + rect.width / 2 - this.width / 2);
              this.tooltip_y = Math.round(rect.y + rect.height) + 5;
              break;

            case "left":
              this.arrow_x = Math.round(rect.x) - 5;
              this.arrow_y = Math.round(rect.y + rect.height / 2) - 7;
              this.tooltip_x = Math.round(rect.x - this.width) - 5;
              this.tooltip_y = Math.round(rect.y + rect.height / 2 - this.height / 2);
              break;

            case "right":
              this.arrow_x = Math.round(rect.x + rect.width) - 9;
              this.arrow_y = Math.round(rect.y + rect.height / 2) - 7;
              this.tooltip_x = Math.round(rect.x + rect.width) + 5;
              this.tooltip_y = Math.round(rect.y + rect.height / 2 - this.height / 2);
              break;

            default:
              this.arrow_x = Math.round(rect.x + rect.width / 2) - 7;
              this.arrow_y = Math.round(rect.y) - 5;
              this.tooltip_x = Math.round(rect.x + rect.width / 2 - this.width / 2);
              this.tooltip_y = Math.round(rect.y - this.height) - 5;
              break;
          }

          if (this.location !== "left" && this.tooltip_x < 5) this.tooltip_x = 5;
        }
      },
      tooltipSize: function tooltipSize() {
        if (this.$refs.tooltip) {
          this.width = this.$refs.tooltip.clientWidth;
          this.height = this.$refs.tooltip.clientHeight;
        }
      }
    }
  };

  /* script */
  const __vue_script__$3 = script$3;

  /* template */
  var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('transition',{attrs:{"name":"tooltip"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.visible),expression:"visible"}],ref:"tooltip",staticClass:"r-tooltip",style:(_vm.tooltipStyle)},[_vm._v(_vm._s(_vm.text))])]),_c('transition',{attrs:{"name":"tooltip-arrow"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.visible),expression:"visible"}],staticClass:"r-tooltip-arrow",style:(_vm.arrowStyle)})])],1)};
  var __vue_staticRenderFns__$1 = [];

    /* style */
    const __vue_inject_styles__$3 = function (inject) {
      if (!inject) return
      inject("data-v-463c5c10_0", { source: ".tooltip-enter-active[data-v-463c5c10]{transition:opacity .1s}.tooltip-enter[data-v-463c5c10]{opacity:0}.tooltip-arrow-enter-active[data-v-463c5c10]{transition:opacity 150ms}.tooltip-arrow-enter[data-v-463c5c10]{opacity:0}.r-tooltip[data-v-463c5c10]{position:fixed;z-index:1000;padding:5px 12px;margin-right:5px;word-break:break-word;color:#fff;font-size:16px;letter-spacing:-.005em;line-height:24px;font-weight:600;background:#40444a;border-radius:4px;box-shadow:0 2px 10px -2px rgba(0,0,0,.2);pointer-events:none;user-select:none}.r-tooltip-arrow[data-v-463c5c10]{position:fixed;z-index:1001;border-top:7px solid #40444a;border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid transparent}", map: undefined, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$3 = "data-v-463c5c10";
    /* module identifier */
    const __vue_module_identifier__$3 = undefined;
    /* functional template */
    const __vue_is_functional_template__$3 = false;
    /* style inject SSR */
    

    
    var TooltipComponent = normalizeComponent_1(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$3,
      __vue_script__$3,
      __vue_scope_id__$3,
      __vue_is_functional_template__$3,
      __vue_module_identifier__$3,
      browser,
      undefined
    );

  var TooltipComponentSymbol = Symbol("TooltipComponentSymbol");

  var Tooltip =
  /*#__PURE__*/
  function () {
    function Tooltip(context) {
      _classCallCheck(this, Tooltip);

      if (!context) throw new Error("No context");
      if (!context.$root) throw new Error("No context $root"); // @ts-ignore

      this.tooltipComponent = context.$root[TooltipComponentSymbol];
    }

    _createClass(Tooltip, [{
      key: "attach",
      value: function attach(el) {
        el.addEventListener("mouseenter", this.mouseEnter.bind(this), {
          passive: true
        });
        el.addEventListener("mouseleave", this.mouseLeave.bind(this), {
          passive: true
        }); // el.addEventListener("touchstart", this.touchStart.bind(this), { passive: true });
        // el.addEventListener("touchend", this.touchEnd.bind(this), { passive: true });
      }
    }, {
      key: "detach",
      value: function detach(el) {
        el.removeEventListener("mouseenter", this.mouseEnter);
        el.removeEventListener("mouseleave", this.mouseLeave); // el.removeEventListener("touchstart", this.touchStart);
        // el.removeEventListener("touchend", this.touchEnd);
      }
    }, {
      key: "mouseEnter",
      value: function mouseEnter(event) {
        this.tooltipComponent.el = event.currentTarget;
        this.tooltipComponent.show = true;
      }
    }, {
      key: "mouseLeave",
      value: function mouseLeave(event) {
        this.tooltipComponent.show = false;
      }
      /*
      private touchStart(event: TouchEvent) {
        // @ts-ignore
        const { tooltipData } = event.currentTarget;
        console.log("touchStart", tooltipData);
      }
          private touchEnd(event: TouchEvent) {
        // @ts-ignore
        const { tooltipData } = event.currentTarget;
        console.log("touchEnd", tooltipData);
      }
      */

    }], [{
      key: "createTooltipComponentInApp",
      value: function createTooltipComponentInApp(context, vue) {
        if (!context) throw new Error("No context");
        if (!context.$root) throw new Error("No context $root"); // @ts-ignore

        if (context.$root[TooltipComponentSymbol]) return;
        var node = document.createElement("div");
        context.$root.$el.appendChild(node);
        var TooltipConstructor = vue.extend(TooltipComponent); // @ts-ignore

        context.$root[TooltipComponentSymbol] = new TooltipConstructor({
          parent: context.$root
        }).$mount(node);
      }
    }]);

    return Tooltip;
  }();

  var RTip = function RTip(vue) {
    return {
      // bind(el: HTMLElement, binding: VNodeDirective, vnode: VNode_) {},
      inserted: function inserted(el, binding, vnode) {
        Tooltip.createTooltipComponentInApp(vnode.context, vue); // Create a Tooltip instance for element and save it with VNode

        vnode._tooltip = new Tooltip(vnode.context);

        vnode._tooltip.attach(el); // Save tooltipData with element


        el.tooltipData = {
          text: binding.value,
          modifiers: binding.modifiers
        };
      },
      componentUpdated: function componentUpdated(el, binding, vnode) {
        if (binding.oldValue === binding.value) return; // Save tooltipData with element

        el.tooltipData = {
          text: binding.value,
          modifiers: binding.modifiers
        };
      },
      unbind: function unbind(el, binding, vnode) {
        vnode._tooltip && vnode._tooltip.detach(el);
      }
    };
  };

  var version = "0.19.0";

  var install = function install(Vue) {
    Vue.component("r-button", Button);
    Vue.component("r-icon", Icon);
    Vue.directive("rtip", RTip(Vue));
    var toastComponent;
    Vue.mixin({
      mounted: function mounted() {
        // @ts-ignore
        if (!this.$parent) {
          var node = document.createElement("div"); // @ts-ignore

          this.$el.appendChild(node);
          var ToastConstructor = Vue.extend(Toast); // @ts-ignore

          toastComponent = new ToastConstructor({
            parent: this
          }).$mount(node);
        }
      }
    });

    Vue.prototype.$notifyToast = function (message) {
      // @ts-ignore
      toastComponent.notify(message);
    };
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
