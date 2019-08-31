<!--<template lang="pug" functional>

  button.r-button(
    :class="[\
      (props.borderless || props.borderless === '') ? 'borderless' : '',\
      (props.icon && !slots().default) ? 'icon-only' : '',\
      (props.primary || props.primary === '') ? 'primary' : '',\
      (props.gray || props.gray === '') ? 'gray' : '',\
      (props.fullwidth || props.fullwidth === '') ? 'fullwidth' : '',\
      (props.small || props.small === '') ? 'small' : '',\
      (props.loading || props.loading === '') ? 'loading' : '',\
      data.class,\
      data.staticClass,\
    ]"
    :type="(props.submit || props.submit === '') ? 'submit' : 'button'"
    :disabled="(props.disabled || props.disabled === '') || props.loading"
    :aria-label="props.label"
    @pointerdown.prevent=""
    @click="() => { props.action ? props.action() : null }"
  )

    r-icon(
      v-if="props.icon"
      :icon="props.icon"
      :class="(props.primary || props.primary === '') ? 'white' : (props.iconColor ? props.iconColor : 'gray')")

    span(v-if="slots().default")
      slot

</template>-->

<script>

  export default {
    name: "Button",
    functional: true,
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
      disabled: Boolean,
    },
    render(createElement, context) {
      const d = context.data;
      const p = context.props;

      const childrenNodes = [];
      const textSlot = context.slots().default;

      if (p.icon) {
        childrenNodes.push(createElement("r-icon", {
          props: { icon: p.icon },
          class: [{
            white: p.primary,
            gray: !p.primary && !p.iconColor,
          }, p.iconColor],
        }));
      }

      if (textSlot) childrenNodes.push(createElement("span", {}, [textSlot]));

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
        directives: d.directives,
        domProps: {
          disabled: p.disabled || p.loading,
          type: p.submit ? "submit" : "button",
        },
        on: {
          click(event) {
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

<style lang="stylus">
  @import "../shared.styl"

  @keyframes spinAround
    from
      transform rotate(0deg)
    to
      transform rotate(359deg)

  .r-button

    cursor pointer
    user-select none
    -webkit-touch-callout none
    -webkit-appearance none
    -moz-appearance none

    position relative
    vertical-align top
    white-space nowrap

    display inline-flex
    align-items center
    justify-content center

    height $height-input
    padding 0 12px
    border 1px solid $color-gray-border
    border-radius $border-radius

    font-family $font-sans
    font-sans($font-size-normal)
    text-align center

    color $color-text
    background-color #fff

    box-shadow none
    transition transform 100ms, box-shadow 100ms

    .darkMode &
      background-color transparent
      color $color-darkmode-text
      border-color alpha(#fff, .15)

    &,
    &:hover
      text-decoration none
      color $color-text

      .darkMode &
        color $color-darkmode-text

    &:focus,
    &.is-focused,
    &:active,
    &.is-active
      outline none

    &[disabled]
      cursor not-allowed

    &:active:not([disabled])
      transform scale(.98)

    &.borderless
      background-color transparent
      box-shadow none
      border none

      &:hover,
      &:focus
        background alpha(#000, .04)

        .darkMode &
          background alpha(#fff, .08)

      &:focus:not(:active)
        box-shadow 0 0 0 3px alpha($color-focus-blue, 0.2) !important

    &:hover:not(.borderless)
      box-shadow 0 0 0 2px alpha($color-focus-blue, 0.3) !important

    &:focus:not(:active)
      box-shadow 0 0 0 3px alpha($color-focus-blue, 0.2), 0 0 0 1px $color-focus-blue !important

    &.primary
      background $color-button-cta
      border none
      color #fff

      &:hover,
      &:focus
        background darken($color-button-cta, 3)

      &:focus:not(:active)
        box-shadow 0 0 0 3px alpha($color-focus-blue, 0.2), inset 0 0 0 1px darken($color-focus-blue, 10) !important

    &.gray
      background darken($color-light-gray-background, .5)

      .darkMode &
        background alpha(#fff, .1)

    &[disabled]
      box-shadow none !important
      opacity 0.4

    &.fullwidth
      display flex
      width 100%

    &.small
      height $height-input-small

    &.icon-only
      width $height-input
      padding 0

      &.small
        width $height-input-small

    &:not(.icon-only)
      min-width 65px

    &.loading
      color transparent !important
      pointer-events none

      span
        opacity 0

      &::after
        content ""
        width 18px
        height @width
        border 2px solid transparent
        border-top-color alpha(#000, 0.3)
        border-right-color alpha(#000, 0.3)
        border-radius 100%
        animation spinAround .6s infinite linear
        position absolute !important

        .darkMode &
          border-top-color alpha(#fff, 0.4)
          border-right-color alpha(#fff, 0.4)

    &:not(.muted) span:not(.icon)
      font-sans($font-size-normal, $font-weight-sans-bold)

    span
      transition opacity 75ms

      &:not(.r-icon)
        position relative
        white-space nowrap
        overflow hidden
        text-overflow ellipsis

    .r-icon

      &:first-child:not(:last-child)
        margin-left -2px
        margin-right 8px

      &:last-child:not(:first-child)
        margin-left 8px
        margin-right -2px

      &:first-child:last-child
        margin-left 0
        margin-right 0

  &.small .r-icon

    &:first-child:not(:last-child)
      margin-left -4px
      margin-right 5px

    &:last-child:not(:first-child)
      margin-right -4px
      margin-left 5px


</style>
