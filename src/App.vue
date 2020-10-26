
<template>
  <div id="app">
    <PagePoster :poster="pagePoster"/>
    <MoviesList :list="moviesList" @changePoster="onChangePoster"/>
    <Pagination :perPage="perPage" 
                :curPage="curPage"
                :total="total" 
                @onChangePage="onChangePage"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MoviesList from "@/components/MoviesList";
import PagePoster from "@/components/PagePoster";
import Pagination from "@/components/Pagination";

export default {
  name: "App",
  components: {
    MoviesList,
    PagePoster,
    Pagination
  },
  data: () => ({
    pagePoster: ""
  }),
  computed: {
    ...mapGetters("movies", ["moviesList", "perPage", "curPage", "total"]) // get getters from movies store (store name, arr of getters names)
  },
  watch: {
    "$route.query": {
       handler: "onChangeQuery",
       immediate: true,
       deep: true
    }
  },
  methods: {
    ...mapActions("movies", ["changeCurrentPage"]),
    onChangePoster(poster) {
      this.pagePoster = poster;
    },
    onChangePage(page) {
      this.$router.push({ query: { page } });
    },
    onChangeQuery({ page = 1 }) {
      this.changeCurrentPage(Number(page));
    }
  }
};
</script>

<style>
#app {
  position: relative;
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
}
</style>
