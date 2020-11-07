<template>
  <BContainer>
    <h1 class="list-title">{{ listTitle }}</h1>
    <BRow>
      <template v-if="isExist">
        <BCol cols md="6" lg="3" v-for="(movie, key) in list" :key="key">
          <MovieItem :movie="movie" 
                     @mouseover.native="onMouseOver(movie.Poster)"
                     @removeItem="onRemoveItem"
                     @showModal="onShowMovieInfo"/>
        </BCol>
      </template>

      <template v-else>
        <div>No items</div>
      </template>
    </BRow>
     <BModal id="modal-info" centered size="xl" hide-footer hide-header
             body-class="movie-modal__body">
        <MovieModalContent :selectedMovie="selectedMovie"/>
     </BModal>
  </BContainer>
</template>

<script>
import MovieItem from "./MovieItem";
import MovieModalContent from "./MovieModalContent";
import { mapActions, mapGetters } from 'vuex';

export default {
    name: "MoviesList",
    props: {
        list: {
            type: Object,
            default: () => ({})
        }
    },
    data: () => ({
      selectedMovieId: ""
    }),
    components: {
      MovieItem,
      MovieModalContent
    },
    computed: {
        ...mapGetters("movies", ["isSearch", "searchQuery"]),
        isExist() {
            return Boolean(Object.keys(this.list).length);
        },
        listTitle() {
          return this.isSearch ? `Search results: ${this.searchQuery}` : "Imdb top 250"
        },
        selectedMovie() {
          return this.selectedMovieId ? this.list[this.selectedMovieId] : null
        }
    },
    methods: {
      ...mapActions("movies", ["removeMovie"]),
      ...mapActions(["showNotify"]),
      onMouseOver(poster) {
        this.$emit("changePoster", poster);
      },
      async onRemoveItem(movie) {
         const id = movie.imdbID;
         const title = movie.Title;

         await this.$bvModal.msgBoxConfirm(`Are you sure you want to delete ${title}?`)
          .then(isConfirmed => {
            if (isConfirmed) {
              this.removeMovie(id);
              const notification = {
                    variant: "success",
                    msg: "Movie deleted successful",
                    title: "Success"
                };
              this.showNotify(notification);
            } 
          })
          .catch(err => {
            console.log(err);
          })
      },
      onShowMovieInfo(id) {
        console.log(id);
        this.selectedMovieId = id;
        this.$bvModal.show('modal-info');
      } 
    }
};

</script>

<style lang="scss" scoped>
    /deep/ .movie-modal__body {
      padding: 0;
    }
</style>