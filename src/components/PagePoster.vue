<template>
  <div class="page-poster" :style="posterStyle"></div>
</template>

<script>
export default {
  name: "PagePoster",
  props: {
      poster: {
        type: String,
        default: ''
      },
  },
  data: () => ({
      defaultBg: 'linear-gradient(311deg, rgba(107,19,108,1) 0%, rgba(149,56,209,1) 60%, rgba(180,51,112,1) 100%)'
      }),
      computed: {
        posterStyle() {
          return {
            "background-image": this.posterBg,
          }
        },
        posterBg() {
          return this.poster.length ? `url(${this.poster})` : this.defaultBg;
        }
      }
}
</script>

<style lang="scss" scoped>

.page-poster {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    transition: background-image .3s ease-in-out;
    z-index: -10;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-image: linear-gradient(311deg, rgba(107,19,108,1) 0%, rgba(149,56,209,1) 60%, rgba(180,51,112,1) 100%);
      opacity: .7;
    }
}
</style>