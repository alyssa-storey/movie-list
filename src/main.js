import './assets/main.css'
import { createApp } from 'vue'
import { createStore } from 'vuex';
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

library.add(faTrashCan)
library.add(faPenToSquare)

const store = createStore({
    state() {
        return {
            movieList: [
                {
                    id: 1,
                    title: "Arrival",
                    wasRecommended: false,
                    recommender: "",
                    watched: true,
                    review: "Had some good conversations after seeing this.",
                },
                {
                    id: 2,
                    title: "Interstellar",
                    wasRecommended: false,
                    recommender: "",
                    watched: false,
                    review: "",
                },
                {
                    id: 3,
                    title: "The Matrix",
                    wasRecommended: false,
                    recommender: "",
                    watched: true,
                    review: "Fun action movie. Interesting concept, especially with the rise of AI.",
                },
                {
                    id: 4,
                    title: "Eternal Sunshine of the Spotless Mind",
                    wasRecommended: true,
                    recommender: "Jess",
                    watched: true,
                    review: "Loved it.",
                },
                {
                    id: 5,
                    title: "Goodfellas",
                    wasRecommended: true,
                    recommender: "Nathan",
                    watched: false,
                    review: "",
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
            console.log('movie', movie);
            console.log('updatedMovie', updatedMovie);
            if (movie) {
                movie.watched = updatedMovie.watched;
                movie.review = updatedMovie.review;
            }
            console.log('movieList', state.movieList)
        },

        deleteMovieRecommendation(state, movieId) {
            const movie = state.movieList.find(x => x.id === movieId.id)
            state.movieList.pop(movieId);
        }

    },
    actions: {
        addMovie({ commit }, newMovie) {
            commit('addMovieToList', newMovie);
        },

        saveWatchedMovie({ commit }, movie) {
            commit('saveWatchedStatus', movie)
        },

        deleteMovie({ commit }, movieId) {
            commit('deleteMovieRecommendation', movieId)
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
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')



