<template>
  <section>
    <div class="container">
      <h2>My Favorite Movies</h2>
      <ul class="movie-list item">
        <favorite-item
          v-for="movie in favoriteList"
          :key="movie.id + '-' + movie.review"
          :id="movie.id"
          :fromRecList="movie.fromRecList"
          :title="movie.title"
          :review="movie.review"
        ></favorite-item>
      </ul>
    </div>
  </section>
  <!--Modals-->
  <delete-movie
    v-if="deleteModalIsVisible"
    :modalName="'deleteConfirmationModal'"
  >
  </delete-movie>
  <edit-movie-details
    v-if="editModalIsVisible"
    :id="selectedMovieId"
    :modalName="'editDetailsModal'"
  ></edit-movie-details>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import FavoriteItem from "./FavoriteItem.vue";
import DeleteMovie from "./DeleteMovie.vue";
import EditMovieDetails from "./EditMovieDetails.vue";

export default {
  components: {
    FavoriteItem,
    DeleteMovie,
    EditMovieDetails,
  },
  setup(props) {
    const store = useStore();
    const favoriteList = computed(() => store.getters.favoriteList);
    const selectedMovieId = computed(() => store.state.selectedMovieId);

    const deleteModalIsVisible = computed(
      () => store.state.modals.deleteConfirmationModal
    );
    const editModalIsVisible = computed(
      () => store.state.modals.editDetailsModal
    );

    return {
      favoriteList,
      deleteModalIsVisible,
      editModalIsVisible,
      selectedMovieId,
    };
  },
};
</script>