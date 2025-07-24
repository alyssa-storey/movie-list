<template>
  <!--MAKE THIS A FORM-->
  <div v-show="open" class="backdrop"></div>
  <transition>
    <dialog open v-if="open">
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <!-- <label for="movie-review" class="review">What did you think?</label> -->
          <div class="review">
            <h1>Edit</h1>
          </div>
          <!-- <textarea
            id="movie-review"
            name="movieReview"
            v-model.trim="movieReview"
            :class="{ invalid: formIncomplete }"
          ></textarea> -->
          <div>
            <label for="movie-title">Title</label>
            <input id="movie-title" type="text" v-model="movieTitle" />
          </div>
          <div class="form-control">
            <h4>Recommended By:</h4>
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
              </div>
            </div>
          </div>
          <div v-if="recommendedBy">
            <label for="movie-title">Recommended By</label>
            <input id="movie-title" type="text" v-model="recommendingFriend" />
          </div>
        </div>
        <div>
          <label for="movie-review">Review</label>
          <textarea
            id="movie-review"
            type="text"
            v-model="movieReview"
          ></textarea>
        </div>
        <div class="error-div" v-if="formIncomplete">
          Please complete all fields!
        </div>
        <button class="submit" type="submit">Submit</button>
        <close-button :modalName="modalName"></close-button>
      </form>
    </dialog>
  </transition>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

import CloseButton from "./CloseButton.vue";
export default {
  props: ["open", "id", "modalName"],
  // props: ["id", "title", "watched", "recommender", "review"],

  emits: ["hideDialog", "saveReview"],
  components: { CloseButton },
  setup(props, { emit }) {
    const store = useStore();
    const selectedMovie = store.state.selectedMovie;
    const movieId = props.id;
    const movieTitle = ref(selectedMovie.title);
    const movieReview = ref(selectedMovie.review);
    const wasRecommended = ref(
      selectedMovie.wasRecommended ? "Recommended" : "MyChoice"
    );
    const recommendedBy = ref(selectedMovie.wasRecommended);
    const recommendingFriend =
      selectedMovie.recommender != "" ? selectedMovie.recommender : "My Choice";

    console.log("selectedMovie", selectedMovie);

    let formIncomplete = ref(false);

    function submitForm() {
      let validated = validateForm();
      if (validated) {
        emit("saveReview", movieReview.value);
      } else {
        formIncomplete.value = true;
      }
    }

    function validateForm() {
      if (movieReview.value == "") {
        return false;
      } else {
        return true;
      }
    }
    //watchers
    // watch([movieReview], () => {
    //   if (movieReview.value != "") {
    //     formIncomplete.value = false;
    //   }
    // });

    return {
      movieReview,
      submitForm,
      formIncomplete,
      movieTitle,
      recommendingFriend,
      wasRecommended,
      myChoice,
      recommendedBy,
    };
  },
};
</script>

<style scoped>
dialog {
  position: fixed;
  top: 30vh;
  width: 30rem;
  left: calc(50% - 15rem);
  margin: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
  padding: 1rem;
  background-color: #919151;
  z-index: 100;
  border: none;
  text-align: center;

  /* animation: modal 0.3s ease-out forwards; */
}

.modal-enter-active {
  animation: modal 0.3s ease-out;
}

.modal-leave-active {
  animation: modal 0.3s ease-in reverse;
}
.review {
  color: white;
  margin-right: 10px;
}

@keyframes modal {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.submit {
  background-color: #400036;
}

textarea.invalid {
  border-color: yellow;
}

.error-div {
  color: white;
}
</style>
