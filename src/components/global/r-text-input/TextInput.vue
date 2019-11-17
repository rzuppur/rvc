<template lang="pug">

  .r-text-input

    label(:for="UID") {{ label }}

    input(
      :id="UID"
      :type="type"
      :class="{ fullwidth }"
      :placeholder="placeholder"
      :value="value"
      v-on="inputListeners"
    )

</template>

<script>
  import UIDMixin from "../../../mixins/uid";

  export default {
    name: "TextInput",
    mixins: [ UIDMixin ],
    props: {
      label: String,
      placeholder: String,
      helperText: { type: String, default: undefined },
      invalidMessage: { type: String, default: undefined },
      type: { type: String, default: "text" },
      fullwidth: { type: Boolean, default: true },
      value: String,
    },
    computed: {
      inputListeners() {
        return {
          ...this.$listeners,
          input: event => this.$emit("input", event.target.value),
        };
      },
    },
  };
</script>
