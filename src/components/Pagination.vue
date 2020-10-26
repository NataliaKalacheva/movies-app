<template>
  <div class="movies-pagination overflow-auto">
    <b-pagination
      v-model="curPage"
      :total-rows="total"
      :per-page="perPage"
    ></b-pagination>

    <p class="mt-3">Current Page: {{ currentPage }}</p>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props: {
      perPage: {
        type: Number,
        default: 1
      },
      curPage: {
        type: Number,
        default: 1
      },
      total: {
        type: Number,
        default: 1
      }
    },
    computed: {
      currentPageModel: {
        get() {
          return this.curPage;
        },
        set() {}
      }
    }
  }
</script>

<style lang="scss" scoped>
.movies-pagination /deep/ {

    .pagination {
        justify-content: center;
    }

    .page-link {
        background: transparent;
        color: white;
        font-family: Helvetica, Arial, sans-serif;
        border: 1px solid white;
        border-radius: 0;
        transition: background-color .3s ease-in-out;

        &:focus {
            box-shadow: 0 0 0 0.1rem rgba(255, 255, 255, 0.3);
        }
    }

    .page-item.active .page-link {
        background: white;
        border-color: white;
        color: black;
    }

    .page-item.disabled {
        opacity: .4;
    }
}
</style>