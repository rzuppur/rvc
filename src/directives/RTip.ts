// eslint-disable-next-line import/no-extraneous-dependencies
import { DirectiveOptions, VNodeDirective, VNode, VueConstructor } from "vue";
import Tooltip from "../components/Tooltip.vue";

const mouseEnter = (event: MouseEvent) => {
  // @ts-ignore
  const { tooltipData } = event.currentTarget;
  // @ts-ignore
  const rect = event.currentTarget.getBoundingClientRect();

  tooltipData.tooltip.x = Math.round(rect.x + rect.width / 2);
  tooltipData.tooltip.y = Math.round(rect.y);
  tooltipData.tooltip.text = tooltipData.text;
  tooltipData.tooltip.show = true;
  tooltipData.show = true;
};

const mouseLeave = (event: MouseEvent) => {
  // @ts-ignore
  const { tooltipData } = event.currentTarget;
  tooltipData.tooltip.show = false;
  tooltipData.show = false;
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
    console.log("BIND", binding.value);

    el.addEventListener("mouseenter", mouseEnter, { passive: true });
    el.addEventListener("mouseleave", mouseLeave, { passive: true });
    el.addEventListener("touchstart", touchStart, { passive: true });
    el.addEventListener("touchend", touchEnd, { passive: true });
  },
  inserted(el: HTMLElement, binding: VNodeDirective, vnode: VNode) {
    console.log("INSERTED", binding.value);

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
    el.tooltipData = { text: binding.value, modifiers: binding.modifiers, tooltip: vnode.context.$root["r-tooltip"] };
  },
  componentUpdated(el: HTMLElement, binding: VNodeDirective, vnode: VNode) {
    console.log("UPDATE", binding.value);

    // @ts-ignore
    el.tooltipData.text = binding.value;
    // @ts-ignore
    if (el.tooltipData.show) el.tooltipData.tooltip.text = binding.value;
  },
  unbind(el: HTMLElement, binding: VNodeDirective, vnode: VNode) {
    console.log("UNBIND", binding.value);

    el.removeEventListener("mouseenter", mouseEnter);
    el.removeEventListener("mouseleave", mouseLeave);
    el.removeEventListener("touchstart", touchStart);
    el.removeEventListener("touchend", touchEnd);
  },
});

export default RTip;
