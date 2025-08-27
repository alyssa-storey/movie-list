<template>
  <li :id="movieId + '-item'" @click="showDetails" class="item">
    <span>
      <label class="list-movie" for="movieId">{{ title }}</label>
    </span>
    <div class="details" :id="movieId + '-details'" v-if="viewDetails">
      <hr />
      <p>Why I love this movie: {{ review }}</p>
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
    review: String,
  },
  emits: ["selectMovie"],
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

    const showDeleteConfirmation = (movieId) => {
      console.log("showDeleteConfirmation", movieId);
      store.commit("SHOW_ELEMENT", "deleteConfirmationModal");
      store.commit("SET_SELECTED_MOVIE_ID", movieId);
    };

    const showEditModal = (movieId) => {
      store.commit("SHOW_ELEMENT", "editDetailsModal");
      store.commit("SET_SELECTED_MOVIE_ID", movieId);
      store.commit("SET_SELECTED_MOVIE", movieId);
    };

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
      showEditModal,
    };
  },
};
</script>
