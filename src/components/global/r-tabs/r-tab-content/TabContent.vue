<template lang="pug">

  .tab-content(v-if="isActive")

    slot

</template>

<script>
  export default {
    name: "TabContent",
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
