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

        .title-5 {{ darkMode ? "Dark theme" : "Light theme" }} #{""}

        r-button(:action="toggleTheme" :icon="`brightness ${darkMode ? 'dark' : 'bright'}`") Toggle theme

      section

        r-tabs

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

      section

        .title-5 Typography

        .text-bold text-bold
        .text-quiet text-quiet
        .text-center text-center
        .text-right text-right
        .text-error text-error
        .text-small text-small

        .title-1 title-1
        p The official guide assumes intermediate level knowledge of HTML, CSS, and JavaScript. If you are totally new to frontend development, it might not be the best idea to jump right into a framework as your first step - grasp the basics then come back! Prior experience with other frameworks helps, but is not required.

        .title-2 title-2
        p At the core of Vue.js is a system that enables us to declaratively render data to the DOM using straightforward template syntax
        p Here we are encountering something new. The v-bind attribute you are seeing is called a directive. Directives are prefixed with v- to indicate that they are special attributes provided by Vue, and as you may have guessed, they apply special reactive behavior to the rendered DOM. Here, it is basically saying “keep this element’s title attribute up-to-date with the message property on the Vue instance.”

        .title-3 title-3
        p This example demonstrates that we can bind data to not only text and attributes, but also the structure of the DOM. Moreover, Vue also provides a powerful transition effect system that can automatically apply transition effects when elements are inserted/updated/removed by Vue.
        p There are quite a few other directives, each with its own special functionality. For example, the v-for directive can be used for displaying a list of items using the data from an Array.

        .title-4 title-4
        p In the console, enter app4.todos.push({ text: 'New item' }). You should see a new item appended to the list.

        .title-5 title-5
        p Note that in this method we update the state of our app without touching the DOM - all DOM manipulations are handled by Vue, and the code you write is focused on the underlying logic.

        .title-6 title-6
        p Vue also provides the v-model directive that makes two-way binding between form input and app state a breeze.

        .title-caps title-caps
        p The component system is another important concept in Vue, because it’s an abstraction that allows us to build large-scale applications composed of small, self-contained, and often reusable components. If we think about it, almost any type of application interface can be abstracted into a tree of components.


</template>

<script>

  import ICONS from "../src/icons";

  export default {
    data: () => ({
      darkMode: false,
    }),
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

    .title-4,
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
