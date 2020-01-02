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
      icon: {
        type: String,
        required: false,
      },
    },
    data: () => ({
      isActive: false,
    }),
  };
</script>
