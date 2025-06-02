<template>
  <li :id="movieId + '-item'" @click="showDetails">
    <span>
      <label for="movieId">{{ movieTitle }}</label>
      <input
        type="checkbox"
        :id="movieId"
        v-model="watchedMovie"
        @change="saveWatchedMovie"
        @click.stop
      />
    </span>
    <div class="details" :id="movieId + '-details'" v-if="viewDetails">
      <hr />
      <p>Recommended By: {{ recommendingFriend }}</p>
    </div>
  </li>
</template>


<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  props: ["id", "title", "watched", "recommender"],

  setup(props) {
    const movieTitle = props.title;
    const movieId = props.id;
    const watchedMovie = ref(props.watched);
    const recommendingFriend =
      props.recommender != "" ? props.recommender : "My Choice";
    const viewDetails = ref(false);
    const store = useStore();

    function saveWatchedMovie() {
      var movie = {
        id: movieId.value,
        watched: watchedMovie.value,
      };
      console.log("save watched move - movie item", movie);
      store.dispatch("saveWatchedMovie", movie);
    }

    function showDetails(event) {
      const clickedId = event.currentTarget.id;
      viewDetails.value = !viewDetails.value;
    }

    return {
      movieTitle,
      movieId,
      watchedMovie,
      viewDetails,
      saveWatchedMovie,
      showDetails,
      recommendingFriend,
    };
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