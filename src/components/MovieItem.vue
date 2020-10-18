<template>
  <div class="movie-item mb-3">
    Movie {{ movie.Title }}
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
      }
 }
</script>