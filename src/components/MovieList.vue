<template>
  <section>
    <recommendation-filter @change-filters="setFilters"></recommendation-filter>
    <div class="container">
      <ul class="movie-list">
        <movie-item
          v-for="movie in filteredMovies"
          :key="movie.id"
          :id="movie.id"
          :title="movie.title"
          :watched="movie.watched"
          :recommender="movie.recommender"
        ></movie-item>
      </ul>
    </div>
  </section>
</template>

<script>
import MovieItem from "./MovieItem.vue";
import { useStore } from "vuex";
import { reactive, computed } from "vue";
import RecommendationFilter from "./RecommendationFilter.vue";

export default {
  components: { MovieItem, RecommendationFilter },
  setup() {
    const activeFilters = reactive({
      myChoice: true,
      friendRecommendation: true,
    });

    const store = useStore();
    // const movies = computed(() => store.getters.movieList);

    const filteredMovies = computed(() => {
      const movies = store.getters.movieList;

      return movies.filter((movie) => {
        return (
          (activeFilters.myChoice && movie.wasRecommended === false) ||
          (activeFilters.friendRecommendation && movie.wasRecommended === true)
        );
      });
    });

    function setFilters(updatedFilters) {
      console.log("set filters called from movie list");
      activeFilters.myChoice = updatedFilters.myChoice;
      activeFilters.friendRecommendation = updatedFilters.friendRecommendation;
    }

    console.log("filteredMovies", filteredMovies);

    return { activeFilters, filteredMovies, setFilters };
  },
};
</script>

<style scoped>
ul {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
  list-style: none;
}
</style>