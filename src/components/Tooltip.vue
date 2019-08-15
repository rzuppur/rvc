<template lang="pug">

  .r-tooltip(ref="tooltip" :style="tooltipStyle") {{ text }}
    .arrow(:style="arrowStyle")

</template>

<script>

  import ResizeObserver from "resize-observer-polyfill";

  export default {
    name: "Tooltip",
    data() {
      return {
        show: false,
        text: "",
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      };
    },
    computed: {
      tooltipStyle() {
        return {
          left: this.left,
          top: this.top,
          opacity: this.show ? 1 : 0,
        };
      },
      arrowStyle() {
        return {
          left: `${this.x - 6}px`,
          top: `${this.y - 5}px`,
        };
      },
      left() {
        let x = this.x - Math.round(this.width / 2);
        if (x < 5) x = 5;

        return `${x}px`;
      },
      top() {
        return `${this.y - this.height - 5}px`;
      },
    },
    mounted() {
      this.resizeObs = new ResizeObserver(() => {
        this.tooltipSize();
      });
      if (this.$refs.tooltip) this.resizeObs.observe(this.$refs.tooltip);
    },
    beforeDestroy() {
      this.resizeObs.disconnect();
    },
    methods: {
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

  .r-tooltip
    position fixed
    z-index 1000
    padding 5px 12px
    color #fff
    font-sans($font-size-normal, $font-weight-sans-bold)
    background alpha($color-dark-background, .9)
    border-radius $border-radius
    box-shadow 0 2px 10px -2px alpha(#000, .2)
    pointer-events none
    user-select none

    .arrow
      position fixed
      $_size = 7px
      border-top $_size solid alpha($color-dark-background, .9)
      border-left $_size solid transparent
      border-right $_size solid transparent
      border-bottom $_size solid transparent

</style>
