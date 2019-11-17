<template lang="pug">

  .textinput
    pre UID: {{ UID }}

</template>

<script>
  import UIDMixin from "../../../mixins/uid";

  export default {
    name: "TextInput",
    mixins: [ UIDMixin ],
    props: {
      label: String,
      helperText: { type: String, default: undefined },
      invalidMessage: { type: String, default: undefined },
      type: String,
      value: String,
    },
  };
</script>
