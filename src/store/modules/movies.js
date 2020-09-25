import axios from "@/plugins/axios";

const moviesStore = {
    namespaced: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {
        async fetchMovies(context) {
            console.log(context);
            //tt3896198

            const response = await axios.get('/?i=tt3896198')
            console.log(response); 
        }
    }
};

export default moviesStore;