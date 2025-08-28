<template>
  <div>
    <movie-list v-if="listHasMovies" />
    <no-movies v-else></no-movies>
    <add-movie-form :modalName="'addNewMovie'"></add-movie-form>
  </div>
</template>

<script>
import MovieList from "./MovieList.vue";
import AddMovieForm from "./AddMovieForm.vue";
import NoMovies from "./NoMovies.vue";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  components: { MovieList, AddMovieForm, NoMovies },
  setup() {
    const store = useStore();
    const listHasMovies = computed(
      () => store.getters.listHasMovies.length > 0
    );
    return { listHasMovies };
  },
};
</script>

<style scoped>
</style>