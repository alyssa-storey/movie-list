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
      <div class="editDeleteIcons">
        <font-awesome-icon
          :icon="['fas', 'trash-can']"
          :id="movieId + '-delete'"
          @click="showDeleteConfirmation(movieId)"
        />
        <font-awesome-icon :icon="['fas', 'pen-to-square']" />
      </div>
    </div>
  </li>
  <enter-review
    v-if="dialogIsVisible"
    :open="dialogIsVisible"
    @hideDialog="hideReviewModal"
    @saveReview="saveMovieReview"
  >
  </enter-review>
  <delete-movie
    v-if="deleteModalIsVisible"
    :open="deleteModalIsVisible"
    @hideDialog="hideDeleteConfirmation"
    @deleteMovie="deleteMovieRec"
  >
  </delete-movie>
</template>


<script>
import { ref, watch } from "vue";
import { useStore } from "vuex";
import EnterReview from "./EnterReview.vue";
import DeleteMovie from "./DeleteMovie.vue";

export default {
  components: { EnterReview, DeleteMovie },
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
    const deleteModalIsVisible = ref(false);

    function showDialog(movieId) {
      console.log("watchedMovie", watchedMovie);
      if (watchedMovie.value) {
        dialogIsVisible.value = true;
      }
    }
    function hideReviewModal() {
      console.log("closed");
      dialogIsVisible.value = false;
      watchedMovie.value = false;
    }

    function showDeleteConfirmation(movieId) {
      deleteModalIsVisible.value = true;
    }

    function hideDeleteConfirmation() {
      deleteModalIsVisible.value = false;
    }
    function hideReviewModal() {
      dialogIsVisible.value = false;
      watchedMovie.value = false;
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
      store.dispatch("saveWatchedMovie", movie);
      dialogIsVisible.value = false;
    }

    function deleteMovieRec() {
      store.dispatch("deleteMovie", movieId);
      deleteModalIsVisible.value = false;
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
      hideReviewModal,
      saveMovieReview,
      showDialog,
      showDeleteConfirmation,
      deleteModalIsVisible,
      hideDeleteConfirmation,
      deleteMovieRec,
    };
  },
};
</script>

<style scoped>
label {
  font-size: 20px;
  margin-right: 10px;
}

.fa-pen-to-square {
  margin-left: 5px;
}

.editDeleteIcons {
  text-align: right;
}
</style>