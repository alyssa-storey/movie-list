<template>
  <div class="wrapper">
    <movie-list v-if="listHasMovies" />
    <no-movies v-else></no-movies>
    <add-movie-form></add-movie-form>
  </div>
</template>

<script>
import MovieList from "./components/MovieList.vue";
import AddMovieForm from "./components/AddMovieForm.vue";
import NoMovies from "./components/NoMovies.vue";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  components: { MovieList, AddMovieForm, NoMovies },
  setup() {
    const store = useStore();
    const listHasMovies = computed(() => store.getters.movieList.length > 0);
    return { listHasMovies };
  },
};
</script>




<style >
#app {
  display: flex;
  justify-content: center;
  width: 35%;
}
</style>
