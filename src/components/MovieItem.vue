<template>
  <li :id="movieId + '-item'" @click="showDetails">
    <span>
      <label for="movieId">{{ movieTitle }}</label>
      <input
        type="checkbox"
        :id="movieId"
        v-model="watchedMovie"
        @change="() => showDialog(movieId)"
        @click.stop
      />
    </span>
    <div class="details" :id="movieId + '-details'" v-if="viewDetails">
      <hr />
      <p>Recommended By: {{ recommendingFriend }}</p>
      <p v-if="watchedMovie">My Thoughts: {{ review }}</p>
    </div>
    <enter-review
      :open="dialogIsVisible"
      @hideDialog="dialogIsVisible = false"
      @saveReview="saveMovieReview"
    >
    </enter-review>
  </li>
</template>


<script>
import { ref, watch } from "vue";
import { useStore } from "vuex";
import EnterReview from "./EnterReview.vue";

export default {
  components: { EnterReview },
  props: ["id", "title", "watched", "recommender", "review"],

  setup(props) {
    console.log("props", props);
    const movieTitle = props.title;
    const movieId = props.id;
    const watchedMovie = ref(props.watched);
    const recommendingFriend =
      props.recommender != "" ? props.recommender : "My Choice";
    let review = ref(props.review);
    const viewDetails = ref(false);
    const dialogIsVisible = ref(false);

    function showDialog(movieId) {
      console.log("watchedMovie", watchedMovie);
      if (watchedMovie.value) {
        dialogIsVisible.value = true;
      }
    }
    function hideDialog() {
      dialogIsVisible.value = false;
    }

    const store = useStore();

    // function markMovieWatched() {
    //   showDialog();
    //   var movie = {
    //     id: movieId.value,
    //     watched: watchedMovie.value,
    //     review: saveReview.
    //   };
    // console.log("save watched move - movie item", movie);
    // store.dispatch("saveWatchedMovie", movie);
    //}

    function saveMovieReview(value) {
      console.log("made it to saveMoviewReview");
      var movie = {
        id: movieId,
        watched: watchedMovie.value,
        review: value,
      };
      review.value = value;
      console.log("save watched move - movie item", movie);
      store.dispatch("saveWatchedMovie", movie);
      dialogIsVisible.value = false;
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
      showDetails,
      recommendingFriend,
      review,
      dialogIsVisible,
      hideDialog,
      saveMovieReview,
      showDialog,
    };
  },
};
</script>

<style scoped>
label {
  font-size: 20px;
  margin-right: 10px;
}
</style>