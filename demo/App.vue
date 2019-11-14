<template lang="pug">

  mixin modalButtons()
    r-button(:action="() => { $refs.modal1.open(); }") Default size
    r-button(:action="() => { $refs.modal2.open(); }") Medium width
    r-button(:action="() => { $refs.modal3.open(); }") Large width
    r-button(:action="() => { $refs.modal6.open(); }") Blocking
    r-button(:action="() => { $refs.modal7.open(); }") No buttons


  #app.r-fill-absolute-parent(:class="{ darkMode }")

    .r-container-row.r-columns-mobile-medium.r-fill-absolute

      .r-container-column.r-container-small.r-background-secondary

        section
          h1.title-3.margin-bottom-tiny RVC
          .title-5.margin-top-none Vue UI Framework

          p
            a(href="https://github.com/rzuppur/rvc/blob/master/demo/App.vue" target="_blank") View page source
            br
            a(href="https://github.com/rzuppur/rvc" target="_blank") GitHub
            br
            a(href="https://www.npmjs.com/package/@rzuppur/rvc" target="_blank") NPM

          h2.title-5 Install

          div(v-pre)
            include:markdown-it ../docs/usage.md

          h2.title-5 Dark mode

          .margin-bottom-medium(v-pre)
            include:markdown-it ../docs/dark.md

          r-button(gray borderless :action="toggleTheme" :icon="`brightness ${darkMode ? 'dark' : 'bright'}`") Toggle theme

      .r-container-column.r-container-maximum.r-background-primary

        section(style="padding-top: 12px")

          r-tabs(:extendLine="true")

            r-tab-content(name="Modals")
              .margin-bottom-medium(v-pre)
                include:markdown-it ../docs/modal.md


              .r-buttons
                +modalButtons()
                r-button(:action="confirmModalDemo") Confirmation modal

              r-modal(ref="modal1" title="Default size (small)")
                p Modal content start
                p(v-for="i in 20") .
                p Modal content end

                template(v-slot:buttons)
                  +modalButtons()

              r-modal(ref="modal2" title="Medium size" size="medium")
                template(v-slot:buttons)
                  +modalButtons()

              r-modal(ref="modal3" title="Large size" size="large")
                template(v-slot:buttons)
                  +modalButtons()

              r-modal(ref="modal6" title="Blocking modal" :blocking="true")
                p Can't close this
                template(v-slot:buttons="buttons")
                  r-button(:action="buttons.close") Unless you click here

              r-modal(ref="modal7" title="No buttons modal" :buttons="false")
                p(v-for="i in 10") Modal content

            r-tab-content(name="Buttons")
              .margin-bottom-medium(v-pre)
                include:markdown-it ../docs/button.md

              .r-buttons
                r-button Normal
                r-button(primary) Primary
                r-button(borderless) Borderless
                r-button(gray borderless) Gray borderless
                r-button(gray) Gray

              .r-buttons
                r-button(disabled) Normal
                r-button(primary disabled) Primary
                r-button(borderless disabled) Borderless
                r-button(gray borderless disabled) Gray borderless
                r-button(gray disabled) Gray

              .r-buttons
                r-button(loading)
                r-button(primary loading)
                r-button(borderless loading)
                r-button(gray borderless loading)
                r-button(gray loading)

              .r-buttons
                r-button(icon="arrow left") Icon
                r-button(primary icon="add") Icon
                r-button(borderless icon="close" icon-color="red") Icon
                r-button(gray borderless icon="edit" icon-color="blue") Icon
                r-button(gray icon="check" icon-color="green") Icon

                r-button(icon="add image")
                r-button(borderless icon="eye visible")

              .r-buttons
                r-button(:action="test") @click test
                r-button(:action="test" :actionWithModifier="test2") @click.ctrl test
                r-button(small) Small
                r-button(small icon="arrow left") Small icon
                r-button(small icon="close")
                r-button(small borderless icon="edit")

              .r-buttons-grouped
                .r-button-group
                  r-button(icon="text bold")
                  r-button(icon="text italic")
                  r-button(icon="text underline")
                .r-button-group
                  r-button Buttons
                  r-button Grouped

            r-tab-content(name="Icons")
              .margin-bottom-medium(v-pre)
                include:markdown-it ../docs/icon.md

              .icons
                r-icon.gray(v-for="icon in icons.concat(['missing'])" :icon="icon" v-rtip="icon")

            r-tab-content(name="Tooltip")
              .margin-bottom-medium(v-pre)
                include:markdown-it ../docs/tooltip.md

              .r-buttons
                r-button(v-rtip="'Default tooltip - long text test'") Default
                r-button(v-rtip.bottom="'Position bottom'") Bottom
                r-button(v-rtip.left="'Position left'") Left
                r-button(v-rtip.right="'Position right'") Right
                r-button(v-rtip="null") Null

            r-tab-content(name="Toast notification")
              .margin-bottom-medium(v-pre)
                include:markdown-it ../docs/toast.md

              .r-buttons
                r-button(:action="() => { $rNotifyToast('Notification') }") Notification
                r-button(:action="() => { $rNotifyToast('Short') }") Short
                r-button(:action="() => { $rNotifyToast('Long text notification that should hopefully wrap to multiple lines and you should be able to read this entire text before it disappears.') }") Long notification

            r-tab-content(name="Containers")
              .margin-bottom-medium(v-pre)
                include:markdown-it ../docs/container.md

              each size in ["tiny", "small", "medium", "large", "huge", "maximum"]
                .margin-bottom-medium.r-container(class="r-container-" + size)
                  p.container-demo r-container r-container-#{size}

              .r-container-row.r-container-huge
                p.margin-bottom-small.container-demo.flex1 r-container-row r-container-huge r-columns-mobile-large
              .r-container-row.r-container-huge.r-columns-mobile-large
                .r-container-column.r-container-tiny
                  p.container-demo r-container-column r-container-tiny
                .r-container-column.r-container-large
                  p.container-demo  r-container-column r-container-large
                .r-container-column.r-container-small
                  p.container-demo r-container-column r-container-small

              .margin-bottom-medium

              .r-container-row.r-container-medium
                p.margin-bottom-small.container-demo.flex1 r-container-row r-container-medium r-columns-mobile-small
              .r-container-row.r-container-medium.r-columns-mobile-small
                .r-container-column.r-container-maximum
                  p.container-demo  r-container-column r-container-maximum
                .r-container-column.r-container-tiny
                  p.container-demo r-container-column r-container-tiny

            r-tab-content(name="Typography")
              .margin-bottom-medium(v-pre)
                include:markdown-it ../docs/typo.md

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

              .text-bold text-bold
              .text-quiet text-quiet
              .text-center text-center
              .text-right text-right
              .text-error text-error
              .text-small text-small

            r-tab-content(name="Tabs")
              .margin-bottom-medium(v-pre)
                include:markdown-it ../docs/tab.md

              r-tabs

                r-tab-content(name="Tab 1")
                  p Tab 1 content

                r-tab-content(name="Tab 2")
                  p Tab 2 content

            r-tab-content(name="Other")
              .margin-bottom-medium(v-pre)
                include:markdown-it ../docs/other.md


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
      async confirmModalDemo() {
        const result = await this.$root.rModalConfirm("Modal question?", "Confirm", "Cancel", "Description text");
        this.$root.$rNotifyToast(result ? "Confirmed" : "Cancelled");
      },
    },
  };
</script>

<style lang="stylus">
  @import url("https://rsms.me/inter/inter.css");

  /* CUSTOMIZE VARIABLES HERE */
  // $color-button-cta = #5e6cbb;

  /* IMPORT RVC STYLES HERE */
  @import "../src/styles/main.styl";

  /* - */

  body,
  #app
    min-height 100vh

</style>

<style lang="stylus" scoped>
  @import "../src/styles/shared.styl"

  section
    padding-top $space-medium
    padding-bottom $space-medium

  .r-buttons
    margin-bottom $space-small

  .icons
    .r-icon
      margin-right 10px
      margin-bottom 10px

  code
    background alpha(#999, 0.2)
    border-radius $border-radius
    padding 4px
    font-size $font-size-small

  pre code
    background none
    padding 0

  pre
    background alpha(#999, 0.2)
    padding 10px
    border-radius $border-radius
    overflow-x auto

  .tab-content
    .r-container,
    .r-container-row,
    .r-container-column
      outline 1px solid alpha(#999, 0.3)
      font-family monospace

    .container-demo
      background alpha($color-blue, 0.15)


</style>
