<template lang="pug">

  mixin modalButtons()
    r-button(:action="() => { $refs.modal1.open(); }") Default size
    r-button(:action="() => { $refs.modal2.open(); }") Medium width
    r-button(:action="() => { $refs.modal3.open(); }") Large width
    r-button(:action="() => { $refs.modal6.open(); }") Blocking
    r-button(:action="() => { $refs.modal7.open(); }") No buttons

  mixin buttonsTests()
    .r-buttons
      r-button&attributes(attributes) Normal
      r-button(primary)&attributes(attributes) Primary
      r-button(borderless)&attributes(attributes) Borderless
      r-button(gray borderless)&attributes(attributes) Gray borderless
      r-button(gray)&attributes(attributes) Gray

  mixin demoTab(name)
    r-tab-content(name=name)
      h2.r-title-4.r-margin-bottom-medium= name
      block


  #app.r-fill-absolute-parent(:class="{ darkMode }")

    .r-container-row.r-columns-mobile-medium.r-fill-absolute

      .r-container-column.r-container-small.r-elevation-2.r-styled-scrollbar

        section
          h1.r-title-3.r-margin-bottom-tiny RVC
          .r-title-5.r-margin-top-none Vue UI Framework

          p
            a(href="https://github.com/rzuppur/rvc/blob/master/demo/App.vue" target="_blank") View page source
            br
            a(href="https://github.com/rzuppur/rvc" target="_blank") GitHub
            br
            a(href="https://www.npmjs.com/package/@rzuppur/rvc" target="_blank") NPM

          h2.r-title-5 Install

          div(v-pre)
            include:markdown-it ../docs/usage.md

          h2.r-title-5 Dark mode

          .r-margin-bottom-medium(v-pre)
            include:markdown-it ../docs/dark.md

          r-button(gray borderless :action="toggleTheme" :icon="`brightness ${darkMode ? 'dark' : 'bright'}`") Toggle theme

      .r-container-column.r-container-maximum.r-elevation-3.r-styled-scrollbar

        section(style="padding-top: 12px")

          r-tabs(:extendLine="true")

            +demoTab("Typography")
              .r-margin-bottom-medium(v-pre)
                include:markdown-it ../docs/typo.md

              each level in [1, 2, 3, 4, 5, 6, "caps"]
                div(class="r-title-" + level) r-title-#{level}

              each style in ["regular", "medium", "bold", "color-body", "color-quiet", "color-error", "left", "center", "right", "small"]
                div(class="r-text-" + style) r-text-#{style}

            +demoTab("Containers")
              .r-margin-bottom-medium(v-pre)
                include:markdown-it ../docs/container.md

              each size in ["tiny", "small", "medium", "large", "huge", "maximum"]
                .r-margin-bottom-medium.r-container(class="r-container-" + size)
                  p.container-demo r-container r-container-#{size}

              .r-container-row.r-container-huge
                p.r-margin-bottom-small.container-demo.r-flex-1 r-container-row r-container-huge r-columns-mobile-large
              .r-container-row.r-container-huge.r-columns-mobile-large
                .r-container-column.r-container-tiny
                  p.container-demo r-container-column r-container-tiny
                .r-container-column.r-container-large
                  p.container-demo  r-container-column r-container-large
                .r-container-column.r-container-small
                  p.container-demo r-container-column r-container-small

              .r-margin-bottom-medium

              .r-container-row.r-container-medium
                p.r-margin-bottom-small.container-demo.r-flex-1 r-container-row r-container-medium r-columns-mobile-small
              .r-container-row.r-container-medium.r-columns-mobile-small
                .r-container-column.r-container-maximum
                  p.container-demo  r-container-column r-container-maximum
                .r-container-column.r-container-tiny
                  p.container-demo r-container-column r-container-tiny

            +demoTab("Sheets")
              .r-margin-bottom-medium(v-pre)
                include:markdown-it ../docs/sheet.md

              .r-elevation-0.r-padding-medium
                p r-elevation-0
                .r-elevation-1.r-margin-bottom-medium.r-padding-small
                  p r-elevation-1
                .r-elevation-2.r-margin-bottom-medium.r-padding-small
                  p r-elevation-2
                .r-elevation-3.r-margin-bottom-medium.r-padding-small
                  p r-elevation-3
                .r-elevation-4.r-margin-bottom-medium.r-padding-small
                  p r-elevation-4

                hr

                .r-elevation-3.r-margin-bottom-medium.r-padding-small.r-border-radius
                  p r-border-radius
                .r-elevation-3.r-margin-bottom-medium.r-padding-small.r-border-radius-double
                  p r-border-radius-double

            +demoTab("Modals")
              .r-margin-bottom-medium(v-pre)
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

            +demoTab("Buttons")
              .r-margin-bottom-medium(v-pre)
                include:markdown-it ../docs/button.md

              +buttonsTests()
              +buttonsTests()(disabled=true)
              +buttonsTests()(loading=true)

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

            +demoTab("Forms")
              .r-margin-bottom-medium(v-pre)
                include:markdown-it ../docs/form.md

              .r-form-group
                r-text-input(label="Text input" :fullwidth="false" placeholder="Placeholder")

              .r-form-group
                r-text-input(label="Full width")

              .r-form-group
                r-text-input-area(label="Textarea" helper-text="Description text")

            +demoTab("Icons")
              .r-margin-bottom-medium(v-pre)
                include:markdown-it ../docs/icon.md

              .icons
                r-icon.gray(v-for="icon in icons.concat(['missing'])" :icon="icon" v-rtip="icon")

            +demoTab("Tabs")
              .r-margin-bottom-medium(v-pre)
                include:markdown-it ../docs/tab.md

              r-tabs(:line="false")
                .r-margin-bottom-medium

                r-tab-content(name="Tab 1", icon="star")
                  p Tab 1 content

                r-tab-content(name="Tab 2", icon="settings")
                  p Tab 2 content

            +demoTab("Tooltip")
              .r-margin-bottom-medium(v-pre)
                include:markdown-it ../docs/tooltip.md

              .r-buttons
                r-button(v-rtip="'Default tooltip - long text test'") Default
                r-button(v-rtip.bottom="'Position bottom'") Bottom
                r-button(v-rtip.left="'Position left'") Left
                r-button(v-rtip.right="'Position right'") Right
                r-button(v-rtip="null") Null

            +demoTab("Toast notification")
              .r-margin-bottom-medium(v-pre)
                include:markdown-it ../docs/toast.md

              form.r-flex-container.r-flex-items-end(@submit.prevent="() => { $rNotifyToast(testText) }")
                r-text-input-area.r-flex-1(v-model="testText" placeholder="Notification text")
                r-button.r-margin-left-small(primary submit) Notify

            +demoTab("Other")
              .r-margin-bottom-medium(v-pre)
                include:markdown-it ../docs/other.md


</template>

<script>

  import ICONS from "../src/icons";

  export default {
    data: () => ({
      darkMode: false,
      testText: "Long text notification that should hopefully wrap to multiple lines and you should be able to read this entire text before it disappears.",
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
  @import "../src/styles/main.styl";  // Import from node_modules/@rzuppur/rvc instead

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
    background alpha(#999, 15%)
    border-radius $border-radius
    padding 4px
    font-size $font-size-small

    &:not(:first-child)
      margin-left 4px

    &:not(:last-child)
      margin-right 4px

  pre code
    background none
    padding 0
    margin 0

  pre
    background alpha(#999, 15%)
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
