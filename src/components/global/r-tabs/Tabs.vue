<template lang="pug">

  .r-tabs
    .tabs
      r-button.tab(
        v-for="tab in tabs"
        :key="'tab-' + tab.name"
        :class="{ active: tab.isActive }"
        :action="() => { setTabActive(tab.name); }"
        borderless
      )
        span(:class="{ 'text-quiet': !tab.isActive }") {{ tab.name }}

    .line.space-bottom-medium(:class="{ extendLine }")

    .tabs-content
      slot

</template>

<script>
  export default {
    name: "Tabs",
    props: {
      extendLine: {
        type: Boolean,
        default: false,
      },
    },
    data: () => ( {
      tabs: [],
      activeTabName: null,
    } ),
    created() {
      this.tabs = this.$children;
    },
    mounted() {
      if (this.tabs.length) {
        this.setTabActive(this.tabs[0].name);
      }
    },
    methods: {
      setTabActive(tabName) {
        this.activeTabName = tabName;
        this.tabs.forEach((tab) => {
          tab.isActive = ( tab.name === tabName );
        });
      },
    },
  };
</script>

<style lang="stylus" scoped>
  @import "../../../styles/shared.styl"

  .line
    margin-top -1px
    border-bottom 1px solid $color-gray-border

    .darkMode &
      border-bottom-color $color-darkmode-gray-border

    &.extendLine
      margin-left - $space-medium
      margin-right - $space-medium

  .tab
    border-radius 0

    &.active
      border-top 3px solid transparent
      border-bottom 3px solid $color-focus-blue
      color $color-blue-text

      .darkMode &
        color $color-darkmode-blue-text

    .text-quiet
      font-weight $font-weight-sans-regular

</style>
