<template>
  <BContainer>
    <h1 class="list-title">{{ listTitle }}</h1>
    <BRow>
      <template v-if="isExist">
        <BCol cols md="6" lg="3" v-for="(movie, key) in list" :key="key">
          <MovieItem :movie="movie" 
                     @mouseover.native="onMouseOver(movie.Poster)"
                     @removeItem="onRemoveItem"/>
        </BCol>
      </template>

      <template v-else>
        <div>No items</div>
      </template>
    </BRow>
  </BContainer>
</template>

<script>
import MovieItem from "./MovieItem";
import { mapActions, mapGetters } from 'vuex';

export default {
    name: "MoviesList",
    props: {
        list: {
            type: Object,
            default: () => ({})
        }
    },
    components: {
      MovieItem
    },
    computed: {
        ...mapGetters("movies", ["isSearch", "searchQuery"]),
        isExist() {
            return Boolean(Object.keys(this.list).length);
        },
        listTitle() {
          return this.isSearch ? `Search results: ${this.searchQuery}` : "Imdb top 250"
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
      } 
    }
};

</script>

<style lang="scss" scoped>
.list-title{
  font-size: 50px;
  margin-bottom: 30px;
}
</style>