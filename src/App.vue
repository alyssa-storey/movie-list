<template>
  <div class="wrapper">
    <movie-list />
    <add-movie-form></add-movie-form>
  </div>
</template>

<script>
import MovieList from "./components/MovieList.vue";
import AddMovieForm from "./components/AddMovieForm.vue";
export default {
  components: { MovieList, AddMovieForm },
  setup() {},
};
</script>




<style >
#app {
  display: flex;
  justify-content: center;
}
</style>
