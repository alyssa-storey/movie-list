import './assets/main.css'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import { createStore } from 'vuex';
import App from './App.vue'
import MyMovieList from './components/MyMovieList.vue';
import Top100 from './components/Top100.vue'


import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

library.add(faTrashCan)
library.add(faPenToSquare)

const store = createStore({
    state() {
        return {
            selectedMovieId: null,
            selectedMovie: {
                id: null,
                title: '',
                review: '',
                recommender: ''
            },
            modals: {
                addReviewModal: false,
                deleteConfirmationModal: false,
                editDetailsModal: false,
                addNewMovie: false
            },
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
        SET_SELECTED_MOVIE_ID(state, id) {
            state.selectedMovieId = id;
        },
        SET_SELECTED_MOVIE(state, id) {
            state.selectedMovie = state.movieList.find(x => x.id === id)
        },
        ADD_MOVIE(state, newMovie) {
            state.movieList.push(newMovie);
            console.log('movieList', state.movieList)

        },
        SAVE_REVIEW(state, updatedMovie) {
            const movie = state.movieList.find(x => x.id === updatedMovie.id)
            if (movie) {
                movie.watched = updatedMovie.watched;
                movie.review = updatedMovie.review;
            }
            console.log('movieList', state.movieList)
        },

        EDIT_MOVIE(state, updatedMovie) {
            const movie = state.movieList.find(x => x.id === updatedMovie.id)
            if (movie) {
                console.log('update movie')
                movie.title = updatedMovie.title;
                movie.wasRecommended = updatedMovie.wasRecommended;
                movie.recommender = updatedMovie.recommender; //This is breaking the filter.How to handle this ?
                movie.review = updatedMovie.review;
            }
        },

        DELETE_MOVIE(state, movieId) {
            state.movieList = state.movieList.filter(movie => movie.id !== movieId);
        },

        HIDE_ELEMENT(state, modalName) {
            state.modals[modalName] = false;
        },

        SHOW_ELEMENT(state, modalName) {
            state.modals[modalName] = true;
        },

        UNCHECK(state, movieId) {
            const movie = state.movieList.find(m => m.id === movieId);

            if (movie) {
                movie.watched = false;
            }
        }
    },
    actions: {
        addMovieAction({ commit }, newMovie) {
            commit('ADD_MOVIE', newMovie);
        },

        saveReviewAction({ commit }, movie) {
            commit('SAVE_REVIEW', movie)
        },

        deleteMovieAction({ commit }, movieId) {
            commit('DELETE_MOVIE', movieId)
        },

        editMovieAction({ commit }, movie) {
            commit('EDIT_MOVIE', movie);
        }

    },
    getters: {
        movieList(state) {
            return state.movieList;
        }

    }

})

const app = createApp(App)
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/mymovielist', component: MyMovieList },
        { path: '/top100', component: Top100 },
        { path: '/', redirect: '/mymovielist' }

    ],
    linkActiveClass: 'active'
});
app.use(store);
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')



