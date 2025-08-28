<template>
  <div class="add-movie">
    <button @click="showAddMovieForm" v-show="!addNewMovieIsVisible">
      Add New Movie
    </button>
    <form
      @submit.prevent="submitForm"
      v-show="addNewMovieIsVisible"
      class="item"
    >
      <div class="form-control">
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
      <div v-if="watchList">
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
              <label for="my-choice">My Choice</label>
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
      </div>
      <div v-else class="form-control">
        <label for="fav-review">Why do you love this movie?</label>
        <textarea
          id="fav-review"
          name="favReview"
          v-model.trim="favReview"
          :class="{ invalid: formIncomplete }"
        ></textarea>
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
    const favReview = ref("");
    let formIncomplete = ref(false);
    const addNewMovieIsVisible = computed(
      () => store.state.movieList.length <= 0 || store.state.modals.addNewMovie
    );

    const store = useStore();
    const watchList = store.state.watchList;
    //methods
    function submitForm() {
      let validated = validateForm();
      let test = Math.random().toString() * 100;

      if (validated) {
        var newMovie = {
          id: Math.random().toString() * 100, //change this at some point
          title: movieTitle.value,
          wasRecommended: watchList ? wasRecommended.value : false,
          recommender: watchList ? recommender.value : false,
          watched: watchList ? false : true,
          watchListMovie: watchList ? true : false,
          review: watchList ? "" : favReview,
          starred: watchList ? false : true,
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
        watchList &&
        (movieTitle.value == "" ||
          wasRecommended.value == null ||
          (wasRecommended.value === true && recommender.value == ""))
      ) {
        return false;
      } else if (
        !watchList &&
        (movieTitle.value == "" || favReview.value == "")
      ) {
        return false;
      } else {
        return true;
      }
    }
    //watchers
    watch([movieTitle, wasRecommended, recommender, favReview], () => {
      if (
        (watchList &&
          movieTitle.value != "" &&
          wasRecommended.value != null &&
          (wasRecommended.value == false ||
            (wasRecommended.value === true && recommender.value != ""))) ||
        (!watchList && movieTitle.value != "" && favReview.value != "")
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
      watchList,
      favReview,
    };
  },
};
</script>

<style scoped>
textarea {
  color: #333;
}
</style>