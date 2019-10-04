// eslint-disable-next-line import/no-extraneous-dependencies
import { Vue, VueConstructor } from "vue/types/vue.d";
import TooltipComponent from "../../components/root/Tooltip.vue";

export interface TooltipComponentInterface {
  show: boolean;
  el: HTMLElement;
}

const TooltipComponentSymbol = Symbol("TooltipComponentSymbol");

class Tooltip {
  tooltipComponent: TooltipComponentInterface;

  constructor(context: Vue | undefined) {
    if (!context) throw new Error("No context");
    if (!context.$root) throw new Error("No context $root");

    // @ts-ignore
    this.tooltipComponent = <TooltipComponentInterface>context.$root[TooltipComponentSymbol];
  }

  attach(el: HTMLElement) {
    el.addEventListener("mouseenter", this.mouseEnter.bind(this), { passive: true });
    el.addEventListener("mouseleave", this.mouseLeave.bind(this), { passive: true });
    // el.addEventListener("touchstart", this.touchStart.bind(this), { passive: true });
    // el.addEventListener("touchend", this.touchEnd.bind(this), { passive: true });
  }

  detach(el: HTMLElement) {
    el.removeEventListener("mouseenter", this.mouseEnter);
    el.removeEventListener("mouseleave", this.mouseLeave);
    // el.removeEventListener("touchstart", this.touchStart);
    // el.removeEventListener("touchend", this.touchEnd);
  }

  private mouseEnter(event: MouseEvent) {
    this.tooltipComponent.el = <HTMLElement>event.currentTarget;
    this.tooltipComponent.show = true;
  }

  private mouseLeave(event: MouseEvent) {
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

  static createTooltipComponentInApp(context: Vue | undefined, vue: VueConstructor) {
    if (!context) throw new Error("No context");
    if (!context.$root) throw new Error("No context $root");
    // @ts-ignore
    if (context.$root[TooltipComponentSymbol]) return;

    const node = document.createElement("div");
    context.$root.$el.appendChild(node);

    const TooltipConstructor = vue.extend(TooltipComponent);
    // @ts-ignore
    context.$root[TooltipComponentSymbol] = new TooltipConstructor({
      parent: context.$root,
    }).$mount(node);
  }
}

export default Tooltip;
