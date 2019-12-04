<template lang="pug">

  portal(to="r-modals")

    transition(name="r-modal")

      .r-modal-overlay(
        v-if="modalOpen"
        @click="outsideClose"
        @keyup.esc.stop="outsideClose"
        :style="{ 'z-index': modalOverlayZIndex }"
      )

        .r-modal-container.r-container(:class="modalContainerClass")

          .r-modal.r-elevation-3(
            ref="modal"
            role="dialog"
            @click.stop=""
            :aria-labelledby="title ? `dialog-title-${_id}` : null"
            @keydown.native.capture.esc="outsideClose"
            :style="{ 'z-index': modalZIndex }"
          )

            .r-modal-header(v-if="title !== false")

              h1.r-modal-title.title-5(:id="`dialog-title-${_id}`") {{ title }}

              r-button.r-modal-close(v-if="!blocking" borderless :action="close" label="Close dialog" icon="close")

            .flex0.r-modal-top-shadow(v-if="showTopBorder")

            .r-modal-content(
              :class="{ 'r-modal-content-scroll': contentScrolls, 'no-buttons': !buttons }"
              @scroll.passive="updateScrollPosition"
              ref="modalContent"
            )
              .r-modal-content-inner
                slot

            .flex0.r-modal-bottom-shadow(v-if="showBottomBorder")

            .r-modal-buttons(v-if="buttons")
              .r-buttons
                slot(name="buttons" :close="close")
                  r-button(:action="close") Close

</template>

<script>

  import ResizeObserver from "resize-observer-polyfill";

  export default {
    name: "Modal",
    props: {
      title: {
        default: "Modal title",
        type: [String, Boolean],
      },
      blocking: {
        default: false,
        type: Boolean,
      },
      buttons: {
        default: true,
        type: Boolean,
      },
      size: {
        default: "small",
        type: String,
      },
    },
    data() {
      return {
        modalOpen: false,
        contentScrolls: false,
        showTopBorder: false,
        showBottomBorder: false,
      };
    },
    computed: {
      myIndex() {
        return this.$root.rModalsOpen.indexOf(this._id);
      },
      modalContainerClass() {
        return `r-container-${this.size}`;
      },
      modalOverlayZIndex() {
        return 10000 + this.$root.rModalsOpen.indexOf(this._id);
      },
      modalZIndex() {
        return 10001 + this.$root.rModalsOpen.indexOf(this._id);
      },
    },
    beforeCreate() {
      this._id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    },
    mounted() {
      this.contentObs = new ResizeObserver(() => {
        this.checkContentScroll();
      });
    },
    beforeDestroy() {
      if (this.modalOpen) this.close();
      if (this.contentObs) this.contentObs.disconnect();
    },
    methods: {
      async open() {
        const index = this.$root.rModalsOpen.indexOf(this._id);
        if (index >= 0) this.$root.rModalsOpen.splice(index, 1);
        this.$root.rModalsOpen.push(this._id);
        this.modalOpen = true;
        document.body.classList.add("r-modal-open");

        await this.$nextTick();

        if (this.$refs.modalContent) {
          this.contentObs.observe(this.$refs.modalContent);
        }
      },
      close() {
        this.$root.rModalsOpen.splice(this.$root.rModalsOpen.indexOf(this._id), 1);
        this.modalOpen = false;
        this.$emit("close");
        if (this.$root.rModalsOpen.length === 0) document.body.classList.remove("r-modal-open");
      },
      outsideClose() {
        if (!this.blocking) this.close();
      },
      checkContentScroll() {
        if (this.$refs.modalContent) {
          const overflow = this.$refs.modalContent.scrollHeight - this.$refs.modalContent.clientHeight;
          this.contentScrolls = overflow > 0;
          this.updateScrollPosition();
        }
      },
      updateScrollPosition() {
        const content = this.$refs.modalContent;
        if (content) {
          this.showTopBorder = content.scrollTop > 4;
          this.showBottomBorder = content.scrollTop < (content.scrollHeight - content.offsetHeight - 5);
        }
      },
    },
  };

</script>
