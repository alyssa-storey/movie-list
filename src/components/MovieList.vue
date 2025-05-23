<template>
  <section>
    <ul>
      <movie-item
        v-for="movie in movies"
        :key="movie.id"
        :id="movie.id"
        :title="movie.title"
        :watched="movie.watched"
      ></movie-item>
    </ul>
  </section>
</template>

<script>
import MovieItem from "./MovieItem.vue";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  components: { MovieItem },
  setup() {
    const store = useStore();
    const movies = computed(() => store.getters.movieList);

    return { movies };
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