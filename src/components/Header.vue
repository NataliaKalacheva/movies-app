<template>
 <div class="header">
     <b-navbar class="navbar mb-5 p-0 py-2" toggleable="lg" type="dark" fixed="top">
      <BContainer>
        <b-navbar-brand href="#" tag="h1">Movies App</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-form @submit.stop.prevent>
            <b-form-input v-model="searchValue" debounce="500" size="md" class="mr-sm-2 navbar__input" placeholder="Search"></b-form-input>
            </b-nav-form>
     
           </b-navbar-nav>
         </b-collapse>
      </BContainer>
     </b-navbar>
 </div>
</template>

<script>

import { mapActions } from "vuex";

export default {
    name: "Header",
    data: () => ({
      searchValue: ""
    }),
    watch: {
        searchValue: "onSearchValueChanged"
    },
    methods: {
        ...mapActions("movies", ["searchMovie", "fetchMovies", "toggleSearchState"]),
        onSearchValueChanged(query) {
            if (query) {
               this.searchMovie(query);
               this.toggleSearchState(true);
            } else {
                this.fetchMovies();
                this.toggleSearchState(false);
            }
        }
    }

}

</script>

<style lang="scss" scoped>
  .navbar {
      background: rgba(0,0,0, .7);

      &__input {
          background: transparent;
          border: none;
          border-radius: 0;
          border-bottom: 1px solid white;

          &:focus, &:hover {
              background: rgba(0,0,0, .7);
              outline: none;
              box-shadow: none;
              border-color: white;
          }
      }
  }
</style>