<template>
  <div></div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "notification",
    data() {
      return {
        toastCount: 0
      }
    },
    computed: {
      ...mapGetters(["messagePool"])
    },
    watch: {
        messagePool: "showNotification"
    },
    methods: {
        showNotification({ variant, msg, title }) {
            this.toastCount++;
            this.$bvToast.toast(msg, {
              title: title,
              variant: variant || 'default',
            })
        }
    }
}
</script>