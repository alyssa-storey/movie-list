<template>
  <div v-show="open" class="backdrop"></div>
  <transition>
    <dialog open v-if="open">
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <div class="review">
            <h1>What did you think?</h1>
          </div>
          <textarea
            id="movie-review"
            name="movieReview"
            v-model.trim="movieReview"
            :class="{ invalid: formIncomplete }"
          ></textarea>
          <div class="error-div" v-if="formIncomplete">
            Please complete all fields!
          </div>
        </div>
        <button class="submit" type="submit">Submit</button>
        <close-button :modalName="modalName"></close-button>
      </form>
    </dialog>
  </transition>
</template>

<script>
import { ref, watch } from "vue";
import CloseButton from "./CloseButton.vue";
import { useStore } from "vuex";

export default {
  components: { CloseButton },
  props: {
    open: Boolean,
    modalName: {
      type: String,
      required: true,
    },
  },
  setup() {
    const movieReview = ref("");
    let formIncomplete = ref(false);
    const store = useStore();
    const selectedMovieId = store.state.selectedMovieId;

    function submitForm(value) {
      let validated = validateForm();
      if (validated) {
        var movie = {
          id: selectedMovieId,
          watched: true,
          review: movieReview.value,
        };
        //review.value = value;
        store.dispatch("saveWatchedMovie", movie);
        store.commit("hideElement", "addReviewModal");
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
    watch([movieReview], () => {
      if (movieReview.value != "") {
        formIncomplete.value = false;
      }
    });

    return {
      movieReview,
      submitForm,
      formIncomplete,
      selectedMovieId,
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
