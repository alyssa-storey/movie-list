<template>
  <div v-show="open" class="backdrop"></div>
  <transition>
    <dialog open v-if="open">
      <h1>Edit</h1>
      <form @submit.prevent="submitForm" class="edit-movie-details">
        <div class="form-control item">
          <label for="movie-title">Title</label>
          <input
            id="movie-title"
            type="text"
            v-model="movieTitle"
            :class="{ invalid: formIncomplete && movieTitle == '' }"
          />
        </div>
        <div class="form-control item">
          <div class="radio-wrapper">
            <div>
              <input
                id="my-choice"
                name="Recommendation"
                type="radio"
                :value="'MyChoice'"
                v-model="wasRecommended"
              />
              <label for="my-choice">My Pick</label>
            </div>
            <div>
              <input
                id="friend-recommendation"
                name="Recommendation"
                type="radio"
                :value="'Recommended'"
                v-model="wasRecommended"
              />
              <label for="friend-recommendation">Recommended</label>
              <div v-if="wasRecommended == 'Recommended'">
                <input
                  id="movie-title"
                  type="text"
                  v-model="recommendingFriend"
                  :class="{
                    invalid: formIncomplete && recommendingFriend == '',
                  }"
                  class="radio-wrapper"
                />
              </div>
            </div>
          </div>
        </div>
        <div v-if="watched" class="form-control item">
          <label for="movie-review">What did you think?</label>
          <textarea
            id="movie-review"
            type="text"
            v-model="movieReview"
            :class="{ invalid: formIncomplete && movieReview == '' }"
          ></textarea>
        </div>
        <div>
          <button class="submit-btn" type="submit">Submit</button>
          <close-button :modalName="modalName"></close-button>
        </div>
        <div class="error-div" v-if="formIncomplete">
          Please complete all fields!
        </div>
      </form>
    </dialog>
  </transition>
</template>

<script>
import { ref, watch } from "vue";
import { useStore } from "vuex";

import CloseButton from "./CloseButton.vue";
export default {
  props: ["open", "id", "modalName"],
  emits: ["hideDialog", "saveReview"],
  components: { CloseButton },
  setup(props) {
    const store = useStore();
    const selectedMovie = store.state.selectedMovie;
    const movieId = props.id;
    const movieTitle = ref(selectedMovie.title);
    const movieReview = ref(selectedMovie.review);
    const wasRecommended = ref(
      selectedMovie.wasRecommended ? "Recommended" : "MyChoice"
    );
    const recommendedBy = ref(selectedMovie.wasRecommended);
    const recommendingFriend = ref(
      recommendedBy ? selectedMovie.recommender : null
    );
    const watched = ref(selectedMovie.watched);
    console.log("selectedMovie", selectedMovie);

    let formIncomplete = ref(false);

    function submitForm() {
      let validated = validateForm();
      if (validated) {
        var movie = {
          id: selectedMovie.id,
          title: movieTitle.value,
          wasRecommended: wasRecommended.value == "Recommended" ? true : false,
          recommender:
            wasRecommended.value == "Recommended"
              ? recommendingFriend.value
              : "",
          review: movieReview.value,
        };
        console.log("submitting movie", movie);
        store.dispatch("editMovieAction", movie);
        store.commit("HIDE_ELEMENT", "editDetailsModal");
      } else {
        formIncomplete.value = true;
      }
    }

    function validateForm() {
      if (
        movieTitle.value == "" ||
        (wasRecommended.value == "Recommended" &&
          recommendingFriend.value == "") ||
        (watched.value && movieReview.value == "")
      ) {
        return false;
      } else {
        return true;
      }
    }

    watch(
      [movieTitle, wasRecommended, recommendingFriend, watched, movieReview],
      () => {
        if (
          movieTitle.value != "" &&
          (wasRecommended.value == "MyChoice" ||
            (wasRecommended.value == "Recommended" &&
              recommendingFriend.value != "")) &&
          (!watched.value || (watched.value && movieReview.value != ""))
        ) {
          formIncomplete.value = false;
        }
      }
    );

    return {
      movieReview,
      submitForm,
      formIncomplete,
      movieTitle,
      recommendingFriend,
      wasRecommended,
      recommendedBy,
      watched,
    };
  },
};
</script>

