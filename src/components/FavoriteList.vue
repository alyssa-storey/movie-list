<template>
  <section>
    <div class="container">
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
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import FavoriteItem from "./FavoriteItem.vue";
import DeleteMovie from "./DeleteMovie.vue";

export default {
  components: {
    FavoriteItem,
    DeleteMovie,
  },
  setup(props) {
    const store = useStore();
    const favoriteList = computed(() => store.getters.favoriteList);

    const deleteModalIsVisible = computed(
      () => store.state.modals.deleteConfirmationModal
    );

    return { favoriteList, deleteModalIsVisible };
  },
};
</script>