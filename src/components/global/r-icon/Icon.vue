<script>

  import ICONS from "../../../icons";

  const toSvgTag = svgPath => `<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path d="${svgPath}" /></svg>`;

  export default {
    name: "Icon",
    functional: true,
    props: {
      icon: {
        validator(value) {
          if (value === "missing") return true;
          const valid = Object.keys(ICONS).includes(value);
          // eslint-disable-next-line no-console
          if (!valid) console.warn(`Invalid icon name, available names are\n${Object.keys(ICONS).join(", ")}`);
          return valid;
        },
      },
      iconsObject: {
        type: Object,
        required: false,
        default() {
          return ICONS;
        },
      },
      fallbackIcon: {
        type: String,
        required: false,
        default() {
          return "M21.5,10.8L13.2,2.5C12.5,1.8 11.5,1.8 10.8,2.5L2.5,10.8C1.8,11.5 1.8,12.5 2.5,13.2L10.8,21.5C11.5,22.2 12.5,22.2 13.2,21.5L21.5,13.2C22.1,12.5 22.1,11.5 21.5,10.8M12.5,17H11V15.5H12.5V17M14.3,11.8C13.9,12.3 13.2,12.6 12.9,13.1C12.6,13.5 12.6,14 12.6,14.5H11C11,13.7 11,13 11.3,12.5C11.6,12 12.3,11.7 12.7,11.4C13.9,10.3 13.6,8.7 11.9,8.6C11.1,8.6 10.4,9.3 10.4,10.1H9C9,8.4 10.3,7.1 12,7.1C14.7,7.1 15.9,9.8 14.3,11.8Z";
        },
      },
    },
    render(createElement, context) {
      const d = context.data;
      const p = context.props;

      const iconValid = !!p.iconsObject[p.icon];

      return createElement("span", {
        attrs: { "aria-hidden": true },
        class: ["r-icon", iconValid ? "" : "red", d.staticClass, d.class],
        style: [d.staticStyle, d.style],
        directives: d.directives,
        domProps: { innerHTML: iconValid ? toSvgTag(p.iconsObject[p.icon]) : toSvgTag(p.fallbackIcon) },
      });
    },
  };

</script>
