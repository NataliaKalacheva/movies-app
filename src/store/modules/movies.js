import IDs from "@/store/mock/imdb";
import axios from "@/plugins/axios";
import mutations from"@/store/mutations";

function serializeResponse(movies) {
  return movies.reduce((acc, movie) => {
      acc[movie.imdbID] = movie;
      return acc;
    }, {});
}

const { MOVIES, CURRENT_PAGE, REMOVE_MOVIE } = mutations;

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
        perPage: ({ perPage }) => perPage,
        total: ({ top250 }) => Object.keys(top250).length,
        top250: ({ top250 }) => top250
    },
    mutations: {
        [MOVIES](state, value) {
            state.movies = value;
        },
        [CURRENT_PAGE](state, value) {
            state.curPage = value;
        },
        [REMOVE_MOVIE](state, index) {
            console.log(state, index);
            state.top250 = state.top250.splice(index, 1);
        } 
    },
    actions: {
        initMoviesStore: {
            handler({ dispatch }) { 
                dispatch("fetchMovies");
            },
            root: true, // available for all app
        },
        async fetchMovies({ getters, commit, dispatch }) {
            try {
                dispatch("toggleLoader", true, { root: true });
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
            } finally {
                dispatch("toggleLoader", false, { root: true });
            }
        },
        changeCurrentPage({ commit, dispatch }, page) {
            commit(CURRENT_PAGE, page);
            dispatch("fetchMovies");
        },
        removeMovie({ commit, getters, dispatch }, movieId) {
            const { top250 } = getters;
            commit(REMOVE_MOVIE, top250.indexOf(movieId)); 
            dispatch("fetchMovies");
        }
    }
};

export default moviesStore;