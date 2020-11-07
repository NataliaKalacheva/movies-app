import IDs from "@/store/mock/imdb";
import axios from "@/plugins/axios";
import mutations from"@/store/mutations";

function serializeResponse(movies) {
  return movies.reduce((acc, movie) => {
      acc[movie.imdbID] = movie;
      return acc;
    }, {});
}

const { MOVIES, CURRENT_PAGE, REMOVE_MOVIE, TOGGLE_SEARCH, SEARCH_QUERY } = mutations;

const moviesStore = {
    namespaced: true,
    state: {
        top250: IDs,
        perPage: 12,
        curPage: 1,
        movies: {},
        isSearch: false,
        searchQuery: ""
    },
    getters: {
        moviesList: ({ movies }) => movies,
        slicedIds: ({ top250 }) => (from, to) => top250.slice(from, to),
        curPage: ({ curPage }) => curPage,
        perPage: ({ perPage }) => perPage,
        total: ({ top250 }) => Object.keys(top250).length,
        top250: ({ top250 }) => top250,
        isSearch: ({ isSearch }) => isSearch,
        searchQuery: ({ searchQuery }) => searchQuery
    },
    mutations: {
        [MOVIES](state, value) {
            state.movies = value;
        },
        [CURRENT_PAGE](state, value) {
            state.curPage = value;
        },
        [REMOVE_MOVIE](state, index) {
            state.top250.splice(index, 1);
        },
        [TOGGLE_SEARCH](state, boolean) {
            state.isSearch = boolean;
        },
        [SEARCH_QUERY](state, query) {
            state.searchQuery = query;
        } 
    },
    actions: {
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
        },
        async searchMovie({ commit, dispatch }, query) {
           try {
               commit(SEARCH_QUERY, query);
               dispatch("toggleLoader", true, { root: true });
               const response = await axios.get(`/?s=${query}`);
               if (response.Error) {
                   throw Error(response.Error);
               } else {
                   const movies = serializeResponse(response.Search);
                   commit(MOVIES, movies); 
                   console.log(response);
               }
            } catch(err) {
                const notification = {
                    variant: "danger",
                    msg: err.message,
                    title: "Error"
                };
                dispatch("showNotify", notification, { root: true });
            } finally {
                dispatch("toggleLoader", false, { root: true });
            }
        },
        toggleSearchState({ commit }, boolean) {
            commit(TOGGLE_SEARCH, boolean);
        }
    }
};

export default moviesStore;