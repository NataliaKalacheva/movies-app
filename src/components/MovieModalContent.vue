<template>
    <div class="movie-info">
       <header class="movie-info__header">
          <h6 class="movie-info__title">{{ selectedMovie.Title }}</h6>
          <b-icon-x class="movie-info__close" size="lg" @click="closeModal()">Close Me</b-icon-x>
       </header>
       <section class="movie-info__content">
         <b-row>
            <b-col sm="4">
              <div class="movie-info__img-wrapper">
                <img :src="selectedMovie.Poster" :alt="selectedMovie.Title" class="movie-info__img">
              </div>
            </b-col>
            <b-col sm="8">
              <h6 class="movie-info__title">{{ selectedMovie.Title }}</h6>
              <p class="movie-info__rating">
                  <b-form-rating v-model="selectedMovie.Ratings[0].Value"  stars="10"  color="#9538d1" show-value show-value-max no-border inline></b-form-rating>
              </p>
              <p class="movie-info__desc">{{ selectedMovie.Plot }}</p>
              <p class="movie-info__tags">  
                  <b-badge variant="dark" class="p-2 mr-2">{{ selectedMovie.Released }}</b-badge>
                  <b-badge variant="dark" class="p-2 mr-2">{{ selectedMovie.Runtime }}</b-badge>
                  <b-badge variant="dark" class="p-2 mr-2">{{ selectedMovie.Centre }}</b-badge>
                  <b-badge variant="dark" class="p-2 mr-2">{{ selectedMovie.Language }}</b-badge>
              </p>
            </b-col>
         </b-row>
       </section>
    </div>
</template>

<script>
    export default {
        name: "MovieModalContent",
        props: {
            selectedMovie: {
                type: Object,
                required: true
            }
        },
        methods: {
            closeModal() {
                console.log('close');
                this.$bvModal.hide('modal-info')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .movie-info {
        &__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
            background: linear-gradient(311deg, rgba(107,19,108,1) 0%, rgba(149,56,209,1) 60%, rgba(180,51,112,1) 100%);
            color: white;
        }

        &__title {
            margin-bottom: 0;
            font-size: 1.25rem;
            text-transform: uppercase;
        }

        &__img {
            width: 100%;
        }

        &__content {
            padding: 1rem;
            background: #fff;
        }

        &__rating /deep/ .b-rating {
            padding: 1rem 0;
        }

    }
</style>