<template>
  <div v-show="open" class="backdrop"></div>
  <transition>
    <dialog open v-if="open">
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="movie-review" class="review">What did you think?</label>
          <textarea
            id="movie-review"
            name="movieReview"
            v-model.trim="movieReview"
          ></textarea>
        </div>
        <button type="submit">Submit</button>
        <button @click="$emit('hideDialog')">Close it!</button>
      </form>
    </dialog>
  </transition>
</template>

<script>
import { ref } from "vue";
export default {
  props: ["open"],
  emits: ["hideDialog", "saveReview"],
  setup(props, { emit }) {
    const movieReview = ref("");

    function submitForm() {
      console.log("in submit form");
      //movieReview.value = "";
      emit("saveReview", movieReview.value);
    }

    return { movieReview, submitForm };
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
</style>