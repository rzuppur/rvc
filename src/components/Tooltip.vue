<template lang="pug">

  div
    transition(name="tooltip")
      .r-tooltip(v-show="visible" ref="tooltip" :style="tooltipStyle") {{ text }}
    transition(name="tooltip-arrow")
      .r-tooltip-arrow(v-show="visible" :style="arrowStyle")

</template>

<script>

  import ResizeObserver from "resize-observer-polyfill";

  export default {
    name: "Tooltip",
    data() {
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
        location: "top",
      };
    },
    computed: {
      tooltipStyle() {
        return {
          left: `${this.tooltip_x}px`,
          top: `${this.tooltip_y}px`,
        };
      },
      arrowStyle() {
        return {
          left: `${this.arrow_x}px`,
          top: `${this.arrow_y}px`,
          transform: {
            top: "",
            bottom: "rotate(180deg)",
            left: "rotate(270deg)",
            right: "rotate(90deg)",
          }[this.location],
        };
      },
    },
    watch: {
      show: {
        handler(val, oldVal) {
          if (val === oldVal) return;
          if (val === false) {
            clearTimeout(this.hideShowTimeout);
            this.hideShowTimeout = setTimeout(() => {
              this.visible = false;
            }, 100);
          } else {
            clearTimeout(this.hideShowTimeout);
            if (this.el && this.el.tooltipData) {
              const { tooltipData } = this.el;
              this.text = tooltipData.text;
              if (!this.text) return;
            }
            this.hideShowTimeout = setTimeout(() => {
              this.visible = true;
            }, 200);
          }
        },
      },
    },
    mounted() {
      this.positionInterval = setInterval(this.update, 10);

      this.resizeObs = new ResizeObserver(this.tooltipSize);
      if (this.$refs.tooltip) this.resizeObs.observe(this.$refs.tooltip);
    },
    beforeDestroy() {
      clearInterval(this.positionInterval);
      this.resizeObs.disconnect();
    },
    methods: {
      update() {
        if (this.visible) {
          window.cancelAnimationFrame(this.animFrame);
          this.animFrame = window.requestAnimationFrame(() => {
            this.getData();
            this.position();
          });
        }
      },
      getData() {
        if (this.visible) {
          if (this.el && this.el.tooltipData && document.body.contains(this.el) && this.el.offsetHeight > 0) {
            const { tooltipData } = this.el;
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
      forceHide() {
        clearTimeout(this.hideShowTimeout);
        this.visible = false;
        this.show = false;
      },
      position() {
        if (this.visible && this.el) {
          const rect = this.el.getBoundingClientRect();

          switch (this.location) {
          case "bottom":
            this.arrow_x = Math.round(rect.x + rect.width / 2) - 7;
            this.arrow_y = Math.round(rect.y + rect.height) - 9;
            this.tooltip_x = Math.round((rect.x + rect.width / 2) - this.width / 2);
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
            this.tooltip_x = Math.round((rect.x + rect.width / 2) - this.width / 2);
            this.tooltip_y = Math.round(rect.y - this.height) - 5;
            break;
          }

          if (this.location !== "left" && this.tooltip_x < 5) this.tooltip_x = 5;
        }
      },
      tooltipSize() {
        if (this.$refs.tooltip) {
          this.width = this.$refs.tooltip.clientWidth;
          this.height = this.$refs.tooltip.clientHeight;
        }
      },
    },
  };

</script>


<style lang="stylus" scoped>
  @import "../shared.styl"

  .tooltip-enter-active
    transition opacity 100ms

  .tooltip-enter
    opacity 0

  .tooltip-arrow-enter-active
    transition opacity 150ms

  .tooltip-arrow-enter
    opacity 0

  $_background = $color-text

  .r-tooltip
    position fixed
    z-index 1000
    padding 5px 12px
    margin-right 5px
    word-break break-word
    color #fff
    font-sans($font-size-normal, $font-weight-sans-bold)
    background $_background
    border-radius $border-radius
    box-shadow 0 2px 10px -2px alpha(#000, .2)
    pointer-events none
    user-select none

  .r-tooltip-arrow
    position fixed
    z-index 1001
    $_size = 7px
    border-top $_size solid $_background
    border-left $_size solid transparent
    border-right $_size solid transparent
    border-bottom $_size solid transparent

</style>
