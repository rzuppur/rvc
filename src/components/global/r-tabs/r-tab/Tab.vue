<template lang="pug">

  .tab
    p TAB

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
  };
</script>

<style lang="stylus" scoped>
  @import "../../../../styles/shared.styl"

</style>
