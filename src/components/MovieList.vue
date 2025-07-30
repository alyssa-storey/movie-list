<template>
  <section>
    <recommendation-filter @change-filters="setFilters"></recommendation-filter>
    <div class="container">
      <ul class="movie-list item">
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
  <!--MODALS-->
  <enter-review
    v-if="enterReviewModalIsVisible"
    :open="enterReviewModalIsVisible"
    :modalName="'addReviewModal'"
  >
  </enter-review>
  <delete-movie
    v-if="deleteModalIsVisible"
    :open="deleteModalIsVisible"
    :modalName="'deleteConfirmationModal'"
  >
  </delete-movie>

  <edit-movie-details
    v-if="editModalIsVisible"
    :open="editModalIsVisible"
    :id="selectedMovieId"
    :modalName="'editDetailsModal'"
  ></edit-movie-details>
</template>

<script>
import MovieItem from "./MovieItem.vue";
import NoResults from "./NoResults.vue";
import { useStore } from "vuex";
import { reactive, computed, ref } from "vue";
import RecommendationFilter from "./RecommendationFilter.vue";
import EnterReview from "./EnterReview.vue";
import DeleteMovie from "./DeleteMovie.vue";
import EditMovieDetails from "./EditMovieDetails.vue";

export default {
  components: {
    MovieItem,
    NoResults,
    RecommendationFilter,
    EnterReview,
    DeleteMovie,
    EditMovieDetails,
  },
  setup(props) {
    const store = useStore();

    const activeFilters = reactive({
      filterByRecommendation: true,
      myChoice: true,
      friendRecommendation: true,
      watched: true,
      notWatched: true,
    });
    //let selectedMovieId = ref(null);
    const selectedMovieId = computed(() => store.state.selectedMovieId);

    console.log("selectedMovieId", selectedMovieId.val);

    let watchedMovie = ref(false);
    const review = ref(props.review);
    const movieTitle = ref(props.title);

    const enterReviewModalIsVisible = computed(
      () => store.state.modals.addReviewModal
    );
    const deleteModalIsVisible = computed(
      () => store.state.modals.deleteConfirmationModal
    );

    const editModalIsVisible = computed(
      () => store.state.modals.editDetailsModal
    );

    const movieList = computed(() => store.state.movieList);

    const filteredMovies = computed(() => {
      return movieList.value.filter((movie) => {
        return (
          (activeFilters.filterByRecommendation &&
            activeFilters.myChoice &&
            movie.wasRecommended === false) ||
          (activeFilters.filterByRecommendation &&
            activeFilters.friendRecommendation &&
            movie.wasRecommended === true) ||
          (!activeFilters.filterByRecommendation &&
            activeFilters.watched &&
            movie.watched === true) ||
          (!activeFilters.filterByRecommendation &&
            activeFilters.notWatched &&
            movie.watched === false)
        );
      });
    });

    console.log("filteredMovies", filteredMovies);
    const noResults = computed(() => filteredMovies.value.length === 0);

    function setFilters(updatedFilters) {
      console.log("set filters called from movie list");
      console.log("updatedFilters", updatedFilters);
      activeFilters.filterByRecommendation =
        updatedFilters.filterByRecommendation;
      activeFilters.myChoice = updatedFilters.myChoice;
      activeFilters.friendRecommendation = updatedFilters.friendRecommendation;
      activeFilters.watched = updatedFilters.watched;
      activeFilters.notWatched = updatedFilters.notWatched;

      console.log("activeFilters", activeFilters);
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
      deleteModalIsVisible,
      editModalIsVisible,
      setSelectedMovie,
    };
  },
};
</script>

