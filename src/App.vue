<template lang="pug">

  mixin tooltip()
    h3 Tooltip
    .buttons
      r-button(v-rtip="'Default tooltip - very long text test'") Default
      r-button(v-rtip.bottom="'Position bottom'") Bottom
      r-button(v-rtip.left="'Position left'") Left
      r-button(v-rtip.right="'Position right'") Right
      r-button(v-if="showTooltipButton" v-rtip="'Tooltip'") Element removed


  mixin icons()

    h3 Icons

    .icons
      r-icon.gray(v-for="icon in icons.concat(['missing'])" :icon="icon" v-rtip="icon")


  mixin buttons()

    h3 Buttons

    .buttons
      r-button Normal
      r-button(primary) Primary
      r-button(borderless) Borderless
      r-button(gray borderless) Gray borderless
      r-button(gray) Gray

    .buttons
      r-button(disabled) Normal
      r-button(primary disabled) Primary
      r-button(borderless disabled) Borderless
      r-button(gray borderless disabled) Gray borderless
      r-button(gray disabled) Gray

    .buttons
      r-button(loading)
      r-button(primary loading)
      r-button(borderless loading)
      r-button(gray borderless loading)
      r-button(gray loading)

    .buttons
      r-button(icon="arrow left") Icon
      r-button(primary icon="add") Icon
      r-button(borderless icon="close" icon-color="red") Icon
      r-button(gray borderless icon="edit" icon-color="blue") Icon
      r-button(gray icon="check" icon-color="green") Icon

      r-button(icon="add image")
      r-button(borderless icon="eye visible")

    .buttons
      r-button(:action="test") @click test
      r-button(small) Small
      r-button(small icon="arrow left") Small icon
      r-button(small icon="close")
      r-button(small borderless icon="edit")

  mixin display()
    +tooltip()
    +icons()
    +buttons()

  #app

    section

      h1 Light
      +display()

    section.darkMode

      h1 Dark
      +display()

    section
      h3 Toast notification

      .buttons
        r-button(:action="() => { $notifyToast('Notification') }") Notification
        r-button(:action="() => { $notifyToast('Short') }") Short
        r-button(:action="() => { $notifyToast('Long text notification that should hopefully wrap to multiple lines') }") Long text notification that should hopefully wrap to multiple lines

</template>

<script>

  import ICONS from "./icons";

  export default {
    data() {
      return { showTooltipButton: true };
    },
    mounted() {
      this._i = setInterval(() => {
        this.showTooltipButton = !this.showTooltipButton;
      }, 2000);
    },
    beforeDestroy() {
      clearInterval(this._i);
    },
    computed: {
      icons() {
        return Object.keys(ICONS);
      },
    },
    methods: {
      test() {
        // eslint-disable-next-line no-alert
        window.alert("Test");
      },
    },
  };
</script>

<style lang="stylus">
  @import "./shared.styl"
  @import url('https://rsms.me/inter/inter.css');

  body
    margin 0
    padding 0
    font-family $font-sans

  section
    padding 20px

    &.darkMode
      background $color-dark-background
      color $color-darkmode-text

    h3
      margin-bottom 10px

  .buttons
    $_buttons_margin = 10px

    align-items center
    display flex
    flex-wrap wrap
    justify-content flex-start
    margin-bottom - $_buttons_margin

    &:not(:last-child)
      margin-bottom 0

    .r-button
      margin-bottom $_buttons_margin

      &:not(:last-child):not(.fullwidth)
        margin-right $_buttons_margin

  .icons
    .r-icon
      margin-right 10px
      margin-bottom 10px

</style>
