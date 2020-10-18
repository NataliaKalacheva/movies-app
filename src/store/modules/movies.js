import IDs from "@/store/mock/imdb";
import axios from "@/plugins/axios";
import mutations from"@/store/mutations";

function serializeResponse(movies) {
  return movies.reduce((acc, movie) => {
      acc[movie.imdbID] = movie;
      return acc;
    }, {});
}

const { MOVIES } = mutations;

const moviesStore = {
    namespaced: true,
    state: {
        top250: IDs,
        perPage: 12,
        curPage: 1,
        movies: {}
    },
    getters: {
        moviesList: ({ movies }) => movies,
        slicedIds: ({ top250 }) => (from, to) => top250.slice(from, to),
        curPage: ({ curPage }) => curPage,
        perPage: ({ perPage }) => perPage
    },
    mutations: {
        [MOVIES](state, value) {
            state.movies = value;
        } 
    },
    actions: {
        initMoviesStore: {
            handler({ dispatch }) { 
                dispatch("fetchMovies");
            },
            root: true, // available for all app
        },
        async fetchMovies({ getters, commit }) {
            try {
                const { curPage, perPage, slicedIds } = getters;
                const from = (curPage * perPage) - perPage;
                const to = curPage * perPage;
                const moviesToFetch = slicedIds(from, to);
                const requests = moviesToFetch.map((id) => axios.get(`/?i=${id}`)); 
                const response = await Promise.all(requests);
                const movies = serializeResponse(response);
                commit(MOVIES, movies); //commit method calls the payload for the mutation(mutation, data)
            } catch(err) {
                console.log(err);
            }
        }
    }
};

export default moviesStore;