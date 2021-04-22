<script>

  export default {
    name: "Button",
    functional: true,
    props: {
      action: Function,
      actionWithModifier: Function,
      label: String,
      icon: String,
      iconRight: Boolean,
      iconColor: String,
      borderless: Boolean,
      primary: Boolean,
      gray: Boolean,
      fullwidth: Boolean,
      small: Boolean,
      loading: Boolean,
      submit: Boolean,
      disabled: Boolean,
    },
    render(createElement, context) {
      const d = context.data;
      const p = context.props;

      const childrenNodes = [];
      const textSlot = context.slots().default;

      let icon;
      if (p.icon) {
        icon = createElement("r-icon", {
          props: { icon: p.icon },
          class: [{
            white: p.primary,
            gray: !p.primary && !p.iconColor,
          }, p.iconColor],
        });
      }

      if (icon && !p.iconRight) {
        childrenNodes.push(icon);
      }
      if (textSlot) {
        childrenNodes.push(createElement("span", {}, [textSlot]));
      }
      if (icon && p.iconRight) {
        childrenNodes.push(icon);
      }

      const buttonClasses = {
        "r-button": true,
        "icon-only": p.icon && !textSlot,
        borderless: p.borderless,
        primary: p.primary,
        gray: p.gray,
        fullwidth: p.fullwidth,
        small: p.small,
        loading: p.loading,
      };

      return createElement("button", {
        attrs: { "aria-label": p.label },
        class: [buttonClasses, d.staticClass, d.class],
        style: [d.staticStyle, d.style],
        directives: d.directives,
        domProps: {
          disabled: p.disabled || p.loading,
          type: p.submit ? "submit" : "button",
        },
        on: {
          click(event) {

            // Check for ctrl+click
            if (
              p.actionWithModifier
              && event.getModifierState("Control")
              && !event.getModifierState("Shift")
              && !event.getModifierState("Alt")
              && !event.getModifierState("Meta")
              && !event.getModifierState("Meta")
              && !event.getModifierState("Hyper")
              && !event.getModifierState("OS")
              && !event.getModifierState("Super")
              && !event.getModifierState("Win")
            ) {
              p.actionWithModifier(event);
              return;
            }

            // Check if normal click handler is present
            if (p.action) p.action(event);

          },
          pointerdown(event) {
            event.preventDefault();
          },
        },
      }, childrenNodes);
    },
  };

</script>
