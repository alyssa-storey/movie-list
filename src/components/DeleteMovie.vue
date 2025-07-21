<template>
  <div v-show="open" class="backdrop"></div>
  <transition>
    <dialog open v-if="open">
      <div class="delete-prompt">
        <h1>Are you sure you want to delete this movie?</h1>
      </div>
      <button class="delete-btn" @click="deleteMovie">Delete</button>
      <close-button @close="closeModal"></close-button>
    </dialog>
  </transition>
</template>

<script>
import { ref } from "vue";
import CloseButton from "./CloseButton.vue";
export default {
  props: ["open"],
  emits: ["hideDialog", "deleteMovie"],
  components: { CloseButton },
  setup(props, { emit }) {
    const movieReview = ref("");

    function closeModal() {
      setTimeout(() => emit("hideDialog"), 0);
    }

    function deleteMovie() {
      emit("deleteMovie", movieReview.value);
    }

    return { closeModal, deleteMovie };
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
.delete-prompt {
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

.delete-btn {
  background-color: #400036;
}
</style>
