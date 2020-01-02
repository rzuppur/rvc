<template lang="pug">

  .r-tabs-container
    .r-tabs
      r-button.r-tab(
        v-for="tab in tabs"
        :key="'tab-' + tab.name"
        :class="{ active: tab.isActive }"
        :icon="tab.icon"
        :icon-color="tab.isActive ? 'blue' : null"
        :action="() => { setTabActive(tab.name); }"
        borderless
      )
        span(:class="{ 'r-text-color-quiet': !tab.isActive }") {{ tab.name }}

    .r-tabs-line.r-margin-bottom-medium(v-if="line" :class="{ extendLine }")

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
      line: {
        type: Boolean,
        default: true,
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
