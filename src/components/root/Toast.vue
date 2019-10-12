<template lang="pug">

  .toast-list
    transition-group.toast-list-inner(name="toast-list" tag="div")
      .toast-notification-wrap(v-for="notification in queue" :key="notification.index")
        .toast-notification(@click="remove(notification.index)") {{ notification.text }}

</template>

<script>
  const MAX_SHOWN = 3;

  export default {
    name: "Toast",
    data: () => ({
      queue: [],
    }),
    watch: {
      queue: {
        handler(val) {
          if (val.length) {
            setTimeout(() => {
              this.remove(val[0].index);
            }, 900 + val[0].text.length * 70);
          }
        },
      },
    },
    created() {
      this.index = 0;
    },
    methods: {
      notify(text) {
        const { index } = this;
        this.index += 1;
        text = text.toString();
        this.queue.push({
          text,
          index,
        });

        if (this.queue.length > MAX_SHOWN) {
          this.queue = this.queue.slice(-MAX_SHOWN);
        }
      },
      remove(index) {
        this.queue = this.queue.filter(notif => notif.index !== index);
      },
    },
  };

</script>

<style lang="stylus" scoped>
  @import "../../styles/shared.styl"

  .toast-list
    position fixed
    top 36px
    left 10px
    right 10px
    z-index 13000
    user-select none
    pointer-events none

  .toast-list-inner
    max-width 700px
    margin 0 auto
    position relative
    text-align center

  .toast-notification
    display inline-block
    padding 15px 25px
    margin-bottom 5px
    word-break break-word
    color #fff
    font-sans($font-size-normal, $font-weight-sans-bold)
    background $color-text
    border-radius $border-radius
    box-shadow 0 2px 10px -2px alpha(#000, .2)
    pointer-events all
    user-select none

  .toast-list-enter,
  .toast-list-leave-to
    opacity 0

  .toast-list-enter-active,
  .toast-list-leave-active,
  .toast-list-move
    transition all .2s

  .toast-list-leave-active
    position absolute
    left 0
    right 0

</style>
