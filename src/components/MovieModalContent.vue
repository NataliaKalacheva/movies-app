<template>
    <div class="movie-info">
       <header class="movie-info__header">
          <h6 class="movie-info__title">{{ selectedMovie.Title }}</h6>
          <b-icon-x class="movie-info__close" @click="closeModal()">Close Me</b-icon-x>
       </header>
       <section class="movie-info__content">
         <b-row>
            <b-col sm="4">
              <div class="movie-info__img-wrapper">
                <img :src="selectedMovie.Poster" :alt="selectedMovie.Title" class="movie-info__img">
              </div>
            </b-col>
            <b-col sm="8"></b-col>
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

    }
</style>