<template>
  <li>
    <span>
      <label for="movieId">{{ movieTitle }}</label>
      <input
        type="checkbox"
        id="{{ movieId }}"
        v-model="watchedMovie"
        @change="saveWatchedMovie"
      />
    </span>
  </li>
</template>


<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  props: ["id", "title", "watched"],

  setup(props) {
    const movieTitle = ref(props.title);
    const movieId = ref(props.id);
    const watchedMovie = ref(props.watched);
    const store = useStore();

    function saveWatchedMovie() {
      var movie = {
        id: movieId.value,
        watched: watchedMovie.value,
      };
      console.log("save watched move - movie item", movie);
      store.dispatch("saveWatchedMovie", movie);
    }

    return { movieTitle, movieId, watchedMovie, saveWatchedMovie };
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
  list-style: none;
}
label {
  font-size: 20px;
  margin-right: 10px;
}
</style>