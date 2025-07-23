<template>
  <button @click="closeOpenElement" type="button" class="close">Close</button>
</template>


<script>
import { useStore } from "vuex";
export default {
  props: {
    modalName: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    function closeOpenElement() {
      store.commit("hideElement", props.modalName);

      //if closing rather than submitting review
      if (props.modalName == "addReviewModal") {
        store.commit("uncheck", store.state.selectedMovieId);
      }
    }

    return {
      closeOpenElement,
    };
  },
};
</script>