<template lang="pug">

  .r-text-input-area

    label.r-form-label(v-if="label" :for="UID") {{ label }}

      .text-color-quiet.text-small.margin-bottom-tiny(v-if="helperText") {{ helperText }}

    textarea.r-input-text(
      :id="UID"
      ref="textarea"
      :class="{ fullwidth, invalid: invalidMessage }"
      :placeholder="placeholder"
      :value="value"
      v-bind="$attrs"
      v-on="inputListeners"
    )

    .text-color-error.margin-top-tiny(v-if="invalidMessage") {{ invalidMessage }}

</template>

<script>
  import UIDMixin from "../../../mixins/uid";

  export default {
    name: "TextInputArea",
    mixins: [ UIDMixin ],
    props: {
      label: String,
      placeholder: String,
      helperText: { type: String, default: undefined },
      invalidMessage: { type: String, default: undefined },
      fullwidth: { type: Boolean, default: true },
      value: String,
    },
    computed: {
      inputListeners() {
        return {
          ...this.$listeners,
          input: event => this.$emit("input", event.target.value),
          "&input": (event) => {
            // & for passive listener
            event.target.style.height = "auto";
            event.target.style.height = `${event.target.scrollHeight}px`;
          },
        };
      },
    },
    mounted() {
      this.$refs.textarea.style.height = `${this.$refs.textarea.scrollHeight}px`;
    },
  };
</script>
