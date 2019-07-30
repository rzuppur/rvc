<template lang="pug">

  mixin buttons()
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


  #app

    section

      h1 Light

      +buttons()

    section.darkMode

      h1 Dark

      +buttons()

</template>

<style lang="stylus">
  @import "~@/shared.styl"
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

</style>
