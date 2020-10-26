
<template>
  <div id="app">
    <PagePoster :poster="pagePoster"/>
    <MoviesList :list="moviesList" @changePoster="onChangePoster"/>
    <Pagination :perPage="perPage" :curPage="curPage" :total="total"/>
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
  methods: {
    ...mapActions("movies", ["fetchMovies"]),
    onChangePoster(poster) {
      this.pagePoster = poster;
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
