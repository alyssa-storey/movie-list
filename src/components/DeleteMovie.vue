<template>
  <div v-show="open" class="backdrop"></div>
  <transition>
    <dialog open v-if="open">
      <div class="delete-prompt">
        <h1>Are you sure you want to delete this movie?</h1>
      </div>
      <button class="delete-btn" @click="deleteMovie">Delete</button>
      <close-button :modalName="modalName"></close-button>
    </dialog>
  </transition>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

import CloseButton from "./CloseButton.vue";
export default {
  props: {
    open: Boolean,
    modalName: {
      type: String,
      required: true,
    },
  },
  components: { CloseButton },
  setup(props) {
    const store = useStore();

    function deleteMovie() {
      store.dispatch("deleteMovie", store.state.selectedMovieId);
      store.commit("hideElement", props.modalName);
    }

    return { deleteMovie };
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
