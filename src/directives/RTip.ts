// eslint-disable-next-line import/no-extraneous-dependencies
import { DirectiveOptions, VNodeDirective, VNode, VueConstructor } from "vue";
import Tooltip from "../components/Tooltip.vue";

const mouseEnter = (event: MouseEvent) => {
  // @ts-ignore
  const { tooltipData } = event.currentTarget;
  tooltipData.tooltip.el = event.currentTarget;
  tooltipData.tooltip.show = true;
};

const mouseLeave = (event: MouseEvent) => {
  // @ts-ignore
  const { tooltipData } = event.currentTarget;
  tooltipData.tooltip.show = false;
};

const touchStart = (event: TouchEvent) => {
  // @ts-ignore
  const { tooltipData } = event.currentTarget;
  console.log("touchStart", tooltipData);
};

const touchEnd = (event: TouchEvent) => {
  // @ts-ignore
  const { tooltipData } = event.currentTarget;
  console.log("touchEnd", tooltipData);
};

const RTip = (Vue: VueConstructor): DirectiveOptions => ({
  bind(el: HTMLElement, binding: VNodeDirective, vnode: VNode) {
    el.addEventListener("mouseenter", mouseEnter, { passive: true });
    el.addEventListener("mouseleave", mouseLeave, { passive: true });
    el.addEventListener("touchstart", touchStart, { passive: true });
    el.addEventListener("touchend", touchEnd, { passive: true });
  },
  inserted(el: HTMLElement, binding: VNodeDirective, vnode: VNode) {
    // @ts-ignore
    if (!vnode.context.$root["r-tooltip"]) {
      const node = document.createElement("div");
      // @ts-ignore
      vnode.context.$root.$el.appendChild(node);
      const TooltipConstructor = Vue.extend(Tooltip);
      // @ts-ignore
      vnode.context.$root["r-tooltip"] = new TooltipConstructor({ parent: vnode.context.$root }).$mount(node);
    }

    // @ts-ignore
    el.tooltipData = {
      text: binding.value,
      modifiers: binding.modifiers,
      // @ts-ignore
      tooltip: vnode.context.$root["r-tooltip"],
    };
  },
  componentUpdated(el: HTMLElement, binding: VNodeDirective, vnode: VNode, a) {
    if (binding.oldValue === binding.value) return;
    // @ts-ignore
    el.tooltipData.text = binding.value;
  },
  unbind(el: HTMLElement, binding: VNodeDirective, vnode: VNode) {
    el.removeEventListener("mouseenter", mouseEnter);
    el.removeEventListener("mouseleave", mouseLeave);
    el.removeEventListener("touchstart", touchStart);
    el.removeEventListener("touchend", touchEnd);
  },
});

export default RTip;
