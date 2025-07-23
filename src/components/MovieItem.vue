<template>
  <li :id="movieId + '-item'" @click="showDetails">
    <span>
      <label for="movieId">{{ movieTitle }}</label>
      <input
        type="checkbox"
        :id="movieId"
        v-model="watchState"
        @change="() => showAddReviewModal(movieId)"
        @click.stop
      />
    </span>
    <div class="details" :id="movieId + '-details'" v-if="viewDetails">
      <hr />
      <p>Recommended By: {{ recommendingFriend }}</p>
      <p v-if="watchedMovie">My Thoughts: {{ reviewState }}</p>
      <div class="editDeleteIcons">
        <font-awesome-icon
          :icon="['fas', 'trash-can']"
          :id="movieId + '-delete'"
          @click="showDeleteConfirmation(movieId)"
        />
        <font-awesome-icon
          :icon="['fas', 'pen-to-square']"
          :id="movieId + '-edit'"
          @click="showEditModal(movieId)"
        />
      </div>
    </div>
  </li>
  <edit-movie-details
    v-if="editModalIsVisible"
    :open="editModalIsVisible"
    :id="selectedMovieId"
    :title="movieTitle"
    :recommender="recommendingFriend"
    :movieReview="review"
    :modalName="'editDetailsModal'"
  ></edit-movie-details>
</template>


<script>
import { ref, watch } from "vue";
import { useStore } from "vuex";
import { computed } from "vue";
import EditMovieDetails from "./EditMovieDetails.vue";

export default {
  components: { EditMovieDetails },
  props: {
    id: String,
    title: String,
    watched: Boolean,
    recommender: String,
    review: String,
    open: Boolean,
    selected: String,
    modalName: String,
  },
  emits: ["selectMovie", "update:watched", "update:review"],
  setup(props, { emit }) {
    console.log("props", props);
    const { movie } = props;
    const movieTitle = props.title;
    const movieId = props.id;
    const watchedMovie = ref(props.watched);
    const recommendingFriend =
      props.recommender != "" ? props.recommender : "My Choice";
    //let review = ref(props.review);
    const viewDetails = ref(false);
    const dialogIsVisible = ref(false);
    const editModalIsVisible = ref(false);
    const selectedMovieId = computed(() => store.state.selectedMovieId);
    console.log("selectedMovieId", selectedMovieId);
    const store = useStore();
    //Computed Properties

    const watchState = computed({
      get: () => props.watched,
      set: (val) => emit("update:watched", val),
    });

    const reviewState = computed({
      get: () => props.review,
      set: (val) => emit("update:review", val),
    });

    const showDeleteConfirmation = (movieId) => {
      store.commit("showElement", "deleteConfirmationModal");
      console.log("showDeleteConfirmation - MovieItem.vue", movieId);
      store.commit("setSelectedMovieId", movieId);
    };

    const showAddReviewModal = (movieId) => {
      store.commit("setSelectedMovieId", movieId);
      store.commit("showElement", "addReviewModal");
    };

    //show details
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
      dialogIsVisible,
      showDeleteConfirmation,
      showEditModal,
      editModalIsVisible,
      showAddReviewModal,
      watchState,
      reviewState,
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