<template lang="pug">

  .r-tabs-container
    .r-tabs
      r-button.r-tab(
        v-for="tab in tabs"
        :key="'tab-' + tab.name"
        :class="{ active: tab.isActive }"
        :action="() => { setTabActive(tab.name); }"
        borderless
      )
        span(:class="{ 'text-quiet': !tab.isActive }") {{ tab.name }}

    .r-tabs-line.margin-bottom-medium(:class="{ extendLine }")

    .r-tabs-content
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
