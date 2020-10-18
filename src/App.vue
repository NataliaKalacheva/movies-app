
<template>
  <div id="app">
    <MoviesList :list="moviesList"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MoviesList from "@/components/MoviesList";

export default {
  name: "App",
  components: {
    MoviesList
  },
  computed: {
    ...mapGetters("movies", ["moviesList"]) // get getters from movies store (store name, arr of getters names)
  },
  methods: {
    ...mapActions("movies", ["fetchMovies"])
  }
};
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
