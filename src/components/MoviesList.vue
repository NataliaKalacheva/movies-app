<template>
  <BContainer>
    <h3 class="list-title">IMDB Top 250</h3>
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
import { mapActions } from 'vuex';

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
        isExist() {
            return Boolean(Object.keys(this.list).length);
        }
    },
    methods: {
      ...mapActions("movies", ["removeMovie"]),
      onMouseOver(poster) {
        this.$emit("changePoster", poster);
      },
      async onRemoveItem(movie) {
         const id = movie.imdbID;
         const title = movie.Title;
         console.log(id, title);
         await this.$bvModal.msgBoxConfirm(`Are you sure you want to delete ${title}?`)
          .then(isConfirmed => {
            if (isConfirmed) {
              this.removeMovie(id);
              console.log(id, isConfirmed);
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