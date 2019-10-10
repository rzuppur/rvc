<template lang="pug">

  .tabs
    .tabs-tabs.space-bottom-medium
      r-button.tab(
        v-for="tab in tabs"
        :key="'tab-' + tab.name"
        :class="{ active: tab.isActive }"
        :action="() => { setTabActive(tab.name); }"
        borderless
      )
        span(:class="{ 'text-quiet': !tab.isActive }") {{ tab.name }}

    .tabs-content
      slot

</template>

<script>
  export default {
    name: "Tabs",
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

  .tab
    border-radius 0

    &.active
      border-top 3px solid transparent
      border-bottom 3px solid $color-focus-blue

    .text-quiet
      font-weight $font-weight-sans-regular

</style>
