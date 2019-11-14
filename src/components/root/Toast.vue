<template lang="pug">

  .r-toast-list
    transition-group.r-toast-list-inner(name="r-toast-list" tag="div")
      .r-toast-notification-wrap(v-for="notification in queue" :key="notification.index")
        .r-toast-notification(@click="remove(notification.index)") {{ notification.text }}

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
