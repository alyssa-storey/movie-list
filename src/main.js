import './assets/main.css'
import { createApp } from 'vue'
import { createStore } from 'vuex';
import App from './App.vue'


const store = createStore({
    state() {
        return {
            movieList: [
                {
                    id: 1,
                    title: "Roma",
                    wasRecommended: false,
                    recommender: "",
                    watched: false,
                },
                {
                    id: 2,
                    title: "Moonlight",
                    wasRecommended: false,
                    recommender: "",
                    watched: true,
                }
            ]
        }
    },
    mutations: {
        addMovieToList(state, newMovie) {
            state.movieList.push(newMovie);
            console.log('movieList', state.movieList)

        },
        saveWatchedStatus(state, updatedMovie) {
            const movie = state.movieList.find(x => x.id === updatedMovie.id)
            if (movie) {
                movie.watched = updatedMovie.watched;
            }
            console.log('movieList', state.movieList)
        }

    },
    actions: {
        addMovie({ commit }, newMovie) {
            commit('addMovieToList', newMovie);
        },

        saveWatchedMovie({ commit }, movie) {
            commit('saveWatchedStatus', movie)
        }

    },
    getters: {
        movieList(state) {
            return state.movieList;
        }

    }

})

const app = createApp(App)
app.use(store);
app.mount('#app')



