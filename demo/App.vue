<template lang="pug">

  #app

    section
      h1.title-2 RVC Demo
      p
        a(href="https://github.com/rzuppur/rvc/blob/master/demo/App.vue" target="_blank") View page source
        br
        a(href="https://www.npmjs.com/package/@rzuppur/rvc" target="_blank") @rzuppur/rvc

    div(:class="{ darkMode }")

      section

        .title-4 {{ darkMode ? "Dark theme" : "Light theme" }} #{""}
          r-button(small gray borderless :action="toggleTheme" :icon="`brightness ${darkMode ? 'dark' : 'bright'}`") Toggle theme

      section

        .title-5 Tooltip

        .buttons
          r-button(v-rtip="'Default tooltip - long text test'") Default
          r-button(v-rtip.bottom="'Position bottom'") Bottom
          r-button(v-rtip.left="'Position left'") Left
          r-button(v-rtip.right="'Position right'") Right
          r-button(v-rtip="null") Null

      section

        .title-5 Buttons

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
          r-button(:action="test" :actionWithModifier="test2") @click.ctrl test
          r-button(small) Small
          r-button(small icon="arrow left") Small icon
          r-button(small icon="close")
          r-button(small borderless icon="edit")

      section

        .title-5 Toast notification

        .buttons
          r-button(:action="() => { $notifyToast('Notification') }") Notification
          r-button(:action="() => { $notifyToast('Short') }") Short
          r-button(:action="() => { $notifyToast('Long text notification that should hopefully wrap to multiple lines and you should be able to read this entire text before it disappears.') }") Long notification

      section

        .title-5 Icons

        .icons
          r-icon.gray(v-for="icon in icons.concat(['missing'])" :icon="icon" v-rtip="icon")

</template>

<script>

  import ICONS from "../src/icons";

  export default {
    data() {
      return {
        darkMode: false,
      };
    },
    computed: {
      icons() {
        return Object.keys(ICONS);
      },
    },
    methods: {
      test() {
        // eslint-disable-next-line no-alert
        window.alert("Click test");
      },
      test2() {
        // eslint-disable-next-line no-alert
        window.alert("Ctrl+click test");
      },
      toggleTheme() {
        this.darkMode = !this.darkMode;
      },
    },
  };
</script>

<style lang="stylus">
  @import "../src/styles/shared.styl"
  //@import url('https://rsms.me/inter/inter.css');

  body
    margin 0
    padding 0
    font-family $font-sans

  .darkMode
    background $color-dark-background
    color $color-darkmode-text

  section
    padding 20px

    .title-4
      margin 0
      font-weight $font-weight-sans-bold

    .title-5
      font-weight $font-weight-sans-bold

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
