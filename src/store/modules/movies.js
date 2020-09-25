import IDs from "@/store/mock/imdb";
import axios from "@/plugins/axios";

const moviesStore = {
    namespaced: true,
    state: {
        top250: IDs,
        perPage: 12,
        curPage: 1
    },
    getters: {
        slicedIds: ({ top250 }) => (from, to) => top250.slice(from, to),
        curPage: ({ curPage }) => curPage,
        perPage: ({ perPage }) => perPage
    },
    mutations: {},
    actions: {
        async fetchMovies({ getters }) {
            const { curPage, perPage, slicedIds } = getters;
            const from = (curPage * perPage) - perPage;
            const to = curPage * perPage;
            const moviesToFetch = slicedIds(from, to);
            console.log(moviesToFetch);
            const requests = moviesToFetch.map((id) => axios.get(`/?i=${id}`)); 
            const response = await Promise.all(requests);
            console.log(response); 
        }
    }
};

export default moviesStore;