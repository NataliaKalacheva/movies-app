<template>
  <div class="movie-item mb-3">
      <div class="movie-item__poster" :style="moviePoster"></div>
      <div class="movie-item__info d-flex flex-column justify-content-between">
        <div>
          <h3 class="movie-item__title">{{ movie.Title }}</h3>
          <span class="movie-item__year">{{ movie.Year }}</span>
        </div>
        <b-btn-group class="movie-item__controls mx-1">
          <b-button variant="outline-light">Edit</b-button>
          <b-button variant="outline-light">Remove</b-button>
        </b-btn-group>
      </div>
  </div>
</template>

<script>
 export default {
      name: "MovieItem",
      props: {
          movie: {
              type: Object,
              required: true
          }
      },
      computed: {
        moviePoster() {
          return {
            "background-image": `url(${this.movie.Poster})`
          }
        } 
      }
 }
</script>

<style lang="scss" scoped>

$transition: all 0.2s ease-in-out;
$color-light: #fff;
$color-shadow: rgba(0,0,0,.7);

.movie-item {
  $self: &; 

  position: relative;
  cursor: pointer;
  overflow: hidden;
  transition: $transition;
  height: 400px;

  &:hover {
    box-shadow: 0px 5px 30px $color-shadow;
    
    #{$self}__poster {
      transform: scale(1.1);
    }

    #{$self}__info {
      opacity: 1;
      visibility: visible;
      background-color: $color-shadow;
    }
  }

  &__poster {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    transition: $transition;
  }

  &__info {
    padding: 10px;
    height: 100%;
    opacity: 0;
    color: $color-light;
    visibility: visually-hidden;
    transition: $transition;
  }

  &__title {
    font-size: 18px;
  }

  &__year {
    font-size: 14px;
  }
}

</style>