<template>
  <div>
    <favorite-list v-if="listHasMovies" />
    <no-movies v-else></no-movies>
    <!-- <add-movie-form :modalName="'addNewMovie'"></add-movie-form> -->
  </div>
</template>

<script>
import FavoriteList from "./FavoriteList.vue";
//import AddMovieForm from "./AddMovieForm.vue";
import NoMovies from "./NoMovies.vue";
import { useStore } from "vuex";
import { computed, watchEffect } from "vue";
export default {
  components: { FavoriteList, NoMovies },
  setup() {
    const store = useStore();
    //const listHasMovies = computed(() => store.getters.activeList.length > 0);
    const listHasMovies = computed(
      () => store.getters.listHasMovies.length > 0
    );

    return { listHasMovies };
  },
};
</script>

<style scoped>
</style>