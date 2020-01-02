<template lang="pug">

  .r-text-input

    label.r-form-label.r-text-medium(v-if="label" :for="UID") {{ label }}

      .r-text-color-quiet.r-text-small.r-text-regular(v-if="helperText") {{ helperText }}

    input.r-input-text(
      :id="UID"
      :type="type"
      :class="{ fullwidth, invalid: invalidMessage }"
      :placeholder="placeholder"
      :value="value"
      v-bind="$attrs"
      v-on="inputListeners"
    )

    .r-text-color-error.r-margin-top-tiny(v-if="invalidMessage") {{ invalidMessage }}

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
