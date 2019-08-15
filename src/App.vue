<template lang="pug">

  mixin tooltip()
    h3 Tooltip
    .buttons
      r-button(v-rtip="randomLenStr") Default
      r-button(v-rtip.bottom="'Reeeeeee 2222'") 2


  mixin icons()

    h3 Icons

    .icons
      .icon-container(v-for="icon in icons.concat(['missing'])" v-rtip="icon" )
        r-icon.gray(:icon="icon")


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


  #app

    section

      h1 Light

      +tooltip()
      +icons()
      +buttons()

    //-section.darkMode

      h1 Dark

      +icons()
      +buttons()

</template>

<script>

  import ICONS from "./icons";

  export default {
    data() {
      return {
        randomLenStr: "Tesdg",
      };
    },
    created() {
      setInterval(() => {
        this.randomLenStr =
        Math.random().toString(36).substr(0, parseInt(Math.random() * 15, 10)) +
        Math.random().toString(36).substr(0, parseInt(Math.random() * 15, 10));
      }, 1000);
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
    margin-bottom -5px
    margin-right -5px

    .icon-container
      border 1px solid alpha(#999, .2)
      border-radius $border-radius
      display inline-flex
      align-items center
      margin-right 5px
      margin-bottom 5px

      .icon
        margin 7px

      .name
        padding-right 9px

</style>
