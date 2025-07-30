<template>
  <div class="add-movie">
    <div>
      <button @click="showAddMovieForm" v-show="!addNewMovieIsVisible">
        Add New Movie
      </button>
    </div>
    <form
      @submit.prevent="submitForm"
      v-show="addNewMovieIsVisible"
      class="item"
    >
      <div class="form-control movie-title">
        <label for="movie-title">Movie Title</label>
        <input
          id="movie-title"
          name="MovieTitle"
          type="text"
          v-model.trim="movieTitle"
          :class="{ invalid: formIncomplete && movieTitle == '' }"
        />
      </div>
      <hr />
      <div class="form-control">
        <h4>Recommended By:</h4>
        <div
          :class="{ invalid: formIncomplete && wasRecommended == null }"
          class="radio-wrapper"
        >
          <div>
            <input
              id="my-choice"
              name="Recommendation"
              type="radio"
              :value="false"
              v-model="wasRecommended"
            />
            <label for="my-choice">My Pick</label>
          </div>
          <div>
            <input
              id="friend-recommendation"
              name="Recommendation"
              type="radio"
              :value="true"
              v-model="wasRecommended"
            />
            <label for="friend-recommendation">Recommended</label>
          </div>
        </div>
      </div>
      <div class="form-control">
        <div v-if="wasRecommended">
          <label for="recommended-by">This movie was recommend by: </label>
          <input
            id="recommended-by"
            name="RecommendedBy"
            type="text"
            v-model.trim="recommender"
            :class="{ invalid: formIncomplete && recommender == '' }"
          />
        </div>
      </div>
      <div>
        <button type="submit">Save</button>
        <close-button :modalName="modalName"></close-button>
      </div>
      <div class="error-div" v-if="formIncomplete">
        Please complete all fields!
      </div>
    </form>
  </div>
</template>

<script>
import { ref, watch, computed } from "vue";
import { useStore } from "vuex";
import CloseButton from "./CloseButton.vue";

export default {
  components: { CloseButton },
  props: {
    modalName: {
      type: String,
      required: true,
    },
  },
  setup() {
    const movieTitle = ref("");
    const wasRecommended = ref(null);
    const recommender = ref("");
    let formIncomplete = ref(false);
    const addNewMovieIsVisible = computed(
      () => store.state.movieList.length <= 0 || store.state.modals.addNewMovie
    );

    const store = useStore();

    //methods
    function submitForm() {
      let validated = validateForm();
      let test = Math.random().toString() * 100;
      console.log("new id", test);

      if (validated) {
        var newMovie = {
          id: Math.random().toString() * 100, //change this at some point
          title: movieTitle.value,
          wasRecommended: wasRecommended.value,
          recommender: recommender.value,
          watched: false,
        };
        store.dispatch("addMovieAction", newMovie);

        formIncomplete.value = false;
        movieTitle.value = "";
        wasRecommended.value = null;
        store.commit("HIDE_ELEMENT", "addNewMovie");
      } else {
        formIncomplete.value = true;
      }
    }

    const showAddMovieForm = () => {
      store.commit("SHOW_ELEMENT", "addNewMovie");
    };

    function validateForm() {
      if (
        movieTitle.value == "" ||
        wasRecommended.value == null ||
        (wasRecommended.value === true && recommender.value == "")
      ) {
        return false;
      } else {
        return true;
      }
    }
    //watchers
    watch([movieTitle, wasRecommended, recommender], () => {
      if (
        movieTitle.value != "" &&
        wasRecommended.value != null &&
        (wasRecommended.value == false ||
          (wasRecommended.value === true && recommender.value != ""))
      ) {
        formIncomplete.value = false;
      }
    });

    return {
      movieTitle,
      wasRecommended,
      submitForm,
      recommender,
      formIncomplete,
      showAddMovieForm,
      addNewMovieIsVisible,
    };
  },
};
</script>
