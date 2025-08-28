import './assets/main.css'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import { createStore } from 'vuex';
import App from './App.vue'
import WatchView from './components/WatchView.vue';
import FavoriteView from './components/FavoriteView.vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

library.add(faTrashCan)
library.add(faPenToSquare)

const store = createStore({
    state() {
        return {
            watchList: true,
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
                    watchListMovie: true,
                    starred: false,
                },
                {
                    id: 2,
                    title: "Interstellar",
                    wasRecommended: false,
                    recommender: "",
                    watched: false,
                    review: "",
                    watchListMovie: true,
                    starred: false,
                },
                {
                    id: 3,
                    title: "The Matrix",
                    wasRecommended: false,
                    recommender: "",
                    watched: true,
                    review: "Fun action movie. Interesting concept, especially with the rise of AI.",
                    watchListMovie: true,
                    starred: false,
                },
                {
                    id: 4,
                    title: "Eternal Sunshine of the Spotless Mind",
                    wasRecommended: true,
                    recommender: "Jess",
                    watched: true,
                    review: "Loved it.",
                    watchListMovie: true,
                    starred: true,
                },
                {
                    id: 5,
                    title: "Goodfellas",
                    wasRecommended: true,
                    recommender: "Nathan",
                    watched: false,
                    review: "",
                    watchListMovie: true,
                    starred: false,
                },
                {
                    id: 6,
                    title: "Palm Springs",
                    wasRecommended: false,
                    recommender: "",
                    watched: true,
                    review: "Fun movie but also had a lot of great conversations prompted by this movie.",
                    watchListMovie: false,
                    starred: false,
                }
            ],
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
                movie.starred = updatedMovie.starred;
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
            const movie = state.movieList.find(x => x.id === movieId)
            //if you're deleting from the watch list
            if (state.watchList) {
                if (!movie.starred) { //delete from watchlist
                    state.movieList = state.movieList.filter(movie => movie.id !== movieId);
                } else { //delete from watchList, keep on fav list
                    movie.watchListMovie = false;
                    movie.starred = false;
                }
                //if you're deleting from fav list
            } else {
                if (movie.watchListMovie) { //if watch list movie, remain on watch list, delete from fav list
                    movie.favoriteList = false;
                    movie.starred = false;
                } else { //delete from fav list
                    state.movieList = state.movieList.filter(movie => movie.id !== movieId);
                }
            }
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
        },
        SET_LIST(state, value) {
            state.watchList = value
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
        activeList(state) {
            return state.watchList ? state.movieList : state.favoriteList;
        },
        listHasMovies: (state) => {
            return state.watchList ? state.movieList.filter(movie => movie.watchListMovie === true) : state.movieList.filter(movie => movie.watchListMovie === false)
        },
        favoriteList: (state) => state.movieList.filter(movie => !movie.watchListMovie || movie.watchListMovie && movie.starred),
        watchList: (state) => state.movieList.filter(movie => movie.watchListMovie)

    }

})

const app = createApp(App)
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/watch', component: WatchView },
        { path: '/favorites', component: FavoriteView },
        { path: '/', redirect: '/watch' }

    ],
    linkActiveClass: 'active'
});
app.use(store);
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon)

router.afterEach((to) => {
    store.commit("SET_LIST", to.path === "/watch")
})

app.mount('#app')



