// eslint-disable-next-line import/no-extraneous-dependencies
import { DirectiveOptions, VNodeDirective, VNode, VueConstructor } from "vue";
import Tooltip from "./common/Tooltip";

interface VNode_ extends VNode {
  _tooltip?: Tooltip;
}

interface HTMLElement_ extends HTMLElement {
  tooltipData?: {
    text: string;
    modifiers: any;
  };
}

const RTip = (vue: VueConstructor): DirectiveOptions => ({
  // bind(el: HTMLElement, binding: VNodeDirective, vnode: VNode_) {},
  inserted(el: HTMLElement_, binding: VNodeDirective, vnode: VNode_) {
    Tooltip.createTooltipComponentInApp(vnode.context, vue);

    // Create a Tooltip instance for element and save it with VNode
    vnode._tooltip = new Tooltip(vnode.context);
    vnode._tooltip.attach(el);

    // Save tooltipData with element
    el.tooltipData = {
      text: binding.value,
      modifiers: binding.modifiers,
    };
  },
  componentUpdated(el: HTMLElement_, binding: VNodeDirective, vnode: VNode) {
    if (binding.oldValue === binding.value) return;

    // Save tooltipData with element
    el.tooltipData = {
      text: binding.value,
      modifiers: binding.modifiers,
    };
  },
  unbind(el: HTMLElement_, binding: VNodeDirective, vnode: VNode_) {
    vnode._tooltip && vnode._tooltip.detach(el);
  },
});

export default RTip;
