<template lang="pug">

  portal(to="r-modals")

    transition(name="modal")

      .modal-overlay(
        v-if="modalOpen"
        @click="outsideClose"
        @keyup.esc.stop="outsideClose"
        :style="{ 'z-index': modalOverlayZIndex }"
      )

        .modal-container.r-container(:class="modalContainerClass")

          .modal(
            ref="modal"
            role="dialog"
            @click.stop=""
            :aria-labelledby="title ? `dialog-title-${_id}` : null"
            @keydown.native.capture.esc="outsideClose"
            :style="{ 'z-index': modalZIndex }"
          )

            .modal-header(v-if="title !== false")

              h1.title.title-5(:id="`dialog-title-${_id}`") {{ title }}

              r-button(v-if="!blocking" borderless :action="close" label="Close dialog" icon="close")

            .modal-content(
              :class="{ 'modal-content-scroll': contentScrolls, 'show-top-border': showTopBorder, 'show-bottom-border': showBottomBorder, 'no-buttons': !buttons }"
              @scroll.passive="updateScrollPosition"
              ref="modalContent"
            )
              .modal-content-inner
                slot

            .modal-buttons(v-if="buttons")
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

<style lang="stylus" scoped>
  @import "../../../styles/shared.styl"

  .modal-enter-active,
  .modal-leave-active
    transition opacity 120ms ease-out

    .modal
      transition transform 120ms ease-out

  .modal-enter,
  .modal-leave-to
    opacity 0

    .modal
      transform scale(.97)


  @media (max-width $container-small)

    .modal-enter-active,
    .modal-leave-active
      transition opacity 170ms ease-out

      .modal
        transition transform 200ms cubic-bezier(.31,.79,.46,.92)

    .modal-enter,
    .modal-leave-to
      .modal
        transform translateY(12px)

  .modal-overlay
    overflow hidden
    -webkit-overflow-scrolling touch
    background alpha(#000, 0.6)
    position fixed
    text-align center
    left 0
    top 0
    right 0
    bottom 0
    height 100%

    @supports (display: grid)
      @media (min-width ($container-small + 1px))
        grid-template-columns 100%
        grid-template-rows 1fr max-content 2fr
        display grid

        .modal-container
          grid-column 1
          grid-row 2
          width 100%

    &.white
      background alpha(#fff, 0.93)

  .modal-container
    text-align left

  .modal
    border-radius $border-radius
    word-wrap break-word
    overflow-y auto
    display flex
    flex-direction column
    max-height "calc(100vh - %s)" % $space-medium
    box-shadow 0 0 0 3px alpha($color-black, 0.15), 0 15px 10px -5px alpha($color-black, 0.07)

    .darkMode &
      box-shadow 0 0 0 3px alpha($color-white, 0.1), 0 15px 30px -5px alpha($color-black, 0.5)

  .modal-header,
  .modal-buttons
    padding $space-medium
    flex 0 0 auto

  .modal-header
    padding-bottom $space-small

  .modal-header
    display flex

    .title
      flex 1 1 auto
      align-self center
      margin 0

    .modal-close
      flex 0 0 auto
      align-self flex-start

  .modal-content
    padding 0 $space-medium
    flex 0 1 auto
    overflow hidden

    &.no-buttons
      padding-bottom $space-medium

    &.modal-content-scroll
      min-height $space-large
      padding 0 $space-medium $space-medium
      overflow-y auto

      $_shadow_size = 12px

      &.show-top-border
        box-shadow inset 0 $_shadow_size $_shadow_size (- $_shadow_size) alpha(#000, 0.1)

      &.show-bottom-border
        box-shadow inset 0 (- $_shadow_size) $_shadow_size (- $_shadow_size) alpha(#000, 0.1)

      &.show-top-border.show-bottom-border
        box-shadow inset 0 $_shadow_size $_shadow_size (- $_shadow_size) alpha(#000, 0.1), inset 0 (- $_shadow_size) $_shadow_size (- $_shadow_size) alpha(#000, 0.1)

  @media (max-width $container-small)

    .modal-container
      padding 0

    .modal-container
      justify-content flex-end
      height 100%
      display flex
      flex-direction column

    .modal
      border-radius 0


</style>
