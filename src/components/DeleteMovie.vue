<template>
  <div class="backdrop"></div>
  <transition>
    <dialog open>
      <div class="item">
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
    modalName: {
      type: String,
      required: true,
    },
  },
  components: { CloseButton },
  setup(props) {
    const store = useStore();

    function deleteMovie() {
      store.dispatch("deleteMovieAction", store.state.selectedMovieId);
      store.commit("HIDE_ELEMENT", props.modalName);
    }

    return { deleteMovie };
  },
};
</script>
