<template>
  <li :id="movieId + '-item'" @click="showDetails">
    <span>
      <label for="movieId">{{ title }}</label>
      <input
        type="checkbox"
        :id="movieId"
        v-model="watchState"
        @change="(event) => handleWatchedChange(event, movieId)"
        @click.stop
      />
    </span>
    <div class="details" :id="movieId + '-details'" v-if="viewDetails">
      <hr />
      <p>
        Recommended By:
        {{ recommender !== "" ? recommender : "My Choice" }}
      </p>
      <p v-if="watchState">My Thoughts: {{ review }}</p>
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
</template>


<script>
import { ref, watch } from "vue";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  props: {
    id: Number,
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
    const movieId = props.id;
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

    // const reviewState = computed({
    //   get: () => props.review,
    //   set: (val) => emit("update:review", val),
    // });

    const showDeleteConfirmation = (movieId) => {
      store.commit("SHOW_ELEMENT", "deleteConfirmationModal");
      store.commit("SET_SELECTED_MOVIE_ID", movieId);
    };

    const showEditModal = (movieId) => {
      store.commit("SHOW_ELEMENT", "editDetailsModal");
      store.commit("SET_SELECTED_MOVIE_ID", movieId);
      store.commit("SET_SELECTED_MOVIE", movieId);
    };

    const showAddReviewModal = (movieId) => {
      store.commit("SET_SELECTED_MOVIE_ID", movieId);
      store.commit("SHOW_ELEMENT", "addReviewModal");
    };

    function handleWatchedChange(event, movieId) {
      const isChecked = event.target.checked;
      if (isChecked) {
        showAddReviewModal(movieId);
      } else {
        var movie = {
          id: movieId,
          watched: false,
          review: "",
        };
        store.dispatch("saveWatchedMovie", movie);
      }
    }

    //show details
    function showDetails(event) {
      const clickedId = event.currentTarget.id;
      viewDetails.value = !viewDetails.value;
    }

    return {
      movieId,
      viewDetails,
      showDetails,
      dialogIsVisible,
      showDeleteConfirmation,
      editModalIsVisible,
      watchState,
      // reviewState,
      handleWatchedChange,
      showEditModal,
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