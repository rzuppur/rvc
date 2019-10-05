<template lang="pug">

  .tab-content(v-if="isActive")

    slot

</template>

<script>
  export default {
    name: "Tab",
    props: {
      name: {
        type: String,
        required: true,
      },
    },
    data: () => ({
      isActive: false,
    }),
  };
</script>

<style lang="stylus" scoped>
  @import "../../../../styles/shared.styl"

</style>
