<template>
  <div v-show="open" class="backdrop"></div>
  <transition>
    <dialog open v-if="open">
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <!-- <label for="movie-review" class="review">What did you think?</label> -->
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
        <close-button @close="closeModal"></close-button>
      </form>
    </dialog>
  </transition>
</template>

<script>
import { ref, watch } from "vue";
import CloseButton from "./CloseButton.vue";

export default {
  components: { CloseButton },
  props: ["open"],
  emits: ["hideDialog", "saveReview"],
  setup(props, { emit }) {
    const movieReview = ref("");
    let formIncomplete = ref(false);

    function submitForm() {
      let validated = validateForm();
      if (validated) {
        emit("saveReview", movieReview.value);
      } else {
        formIncomplete.value = true;
      }
    }

    function closeModal() {
      setTimeout(() => emit("hideDialog"), 0);
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

    return { movieReview, submitForm, formIncomplete, closeModal };
  },
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.75);
}

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
