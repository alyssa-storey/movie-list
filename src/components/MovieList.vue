<template>
  <section>
    <recommendation-filter @change-filters="setFilters"></recommendation-filter>
    <div class="container">
      <ul class="movie-list">
        <movie-item
          v-for="movie in filteredMovies"
          :key="movie.id + '-' + movie.review"
          :id="movie.id"
          :title="movie.title"
          v-model:watched="movie.watched"
          :recommender="movie.recommender"
          v-model:review="movie.review"
          @selectMovie="setSelectedMovie"
        ></movie-item>
        <no-results v-if="noResults"></no-results>
      </ul>
    </div>
  </section>
  <!--ENTER REVIEW MODAL-->
  <enter-review
    v-if="enterReviewModalIsVisible"
    :open="enterReviewModalIsVisible"
    :selected="selectedMovieId"
    :modalName="'addReviewModal'"
  >
  </enter-review>
  <delete-movie
    v-if="deleteModalIsVisible"
    :open="deleteModalIsVisible"
    :modalName="'deleteConfirmationModal'"
  >
  </delete-movie>
</template>

<script>
import MovieItem from "./MovieItem.vue";
import NoResults from "./NoResults.vue";
import { useStore } from "vuex";
import { reactive, computed, ref } from "vue";
import RecommendationFilter from "./RecommendationFilter.vue";
import EnterReview from "./EnterReview.vue";
import DeleteMovie from "./DeleteMovie.vue";

export default {
  components: {
    MovieItem,
    NoResults,
    RecommendationFilter,
    EnterReview,
    DeleteMovie,
  },
  setup(props) {
    const activeFilters = reactive({
      myChoice: true,
      friendRecommendation: true,
    });
    //let selectedMovieId = ref(null);
    const selectedMovieId = computed(() => store.state.selectedMovieId);
    let watchedMovie = ref(false);
    const review = ref(props.review);
    const movieTitle = props.title;

    const store = useStore();
    const enterReviewModalIsVisible = computed(
      () => store.state.modals.addReviewModal
    );
    const deleteModalIsVisible = computed(
      () => store.state.modals.deleteConfirmationModal
    );
    console.log("deleteModalIsVisible - MovieList.vue");
    // const movies = computed(() => store.getters.movieList);

    const movieList = computed(() => store.state.movieList);

    const filteredMovies = computed(() => {
      return movieList.value.filter((movie) => {
        return (
          (activeFilters.myChoice && movie.wasRecommended === false) ||
          (activeFilters.friendRecommendation && movie.wasRecommended === true)
        );
      });
    });

    const noResults = computed(() => filteredMovies.value.length === 0);

    function setFilters(updatedFilters) {
      console.log("set filters called from movie list");
      activeFilters.myChoice = updatedFilters.myChoice;
      activeFilters.friendRecommendation = updatedFilters.friendRecommendation;
    }

    console.log("filteredMovies", filteredMovies);

    function setSelectedMovie(value) {
      console.log("made it here");
      console.log("setSelectedMovie", value);
      selectedMovieId.value = value;
    }

    return {
      activeFilters,
      filteredMovies,
      setFilters,
      noResults,
      enterReviewModalIsVisible,
      movieTitle,
      selectedMovieId,
      setSelectedMovie,
      deleteModalIsVisible,
    };
  },
};
</script>

<style scoped>
ul {
  margin: 1rem 0;
  border: 1px solid #ff81d0;
  border-radius: 12px;
  padding: 1rem;
  list-style: none;
}
</style>