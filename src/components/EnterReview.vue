<template>
  <transition>
    <dialog open>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <h1>What did you think?</h1>
          <textarea
            id="movie-review"
            name="movieReview"
            v-model.trim="movieReview"
            :class="{ invalid: formIncomplete }"
          ></textarea>
          <div class="error-div" v-if="formIncomplete">
            Please complete all fields!
          </div>
          <div class="new-fav">
            <h4>New Favorite?</h4>
            <input
              type="checkbox"
              id="star"
              class="star-checkbox"
              @change="(event) => handleFavoriteChange(event, movieId)"
            />
            <label for="star" class="star">&#9733;</label>
          </div>
        </div>
        <button class="submit-btn" type="submit">Submit</button>
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
    modalName: {
      type: String,
      required: true,
    },
  },
  setup() {
    const movieReview = ref("");
    let starred = ref(false);
    let formIncomplete = ref(false);
    const store = useStore();
    const selectedMovieId = store.state.selectedMovieId;

    function handleFavoriteChange(event) {
      const isChecked = event.target.checked;
      if (isChecked) {
        starred = true;
      } else {
        starred = false;
      }
    }

    function submitForm(value) {
      let validated = validateForm();
      if (validated) {
        var movie = {
          id: selectedMovieId,
          watched: true,
          review: movieReview.value,
          starred: starred,
        };
        //review.value = value;
        store.dispatch("saveReviewAction", movie);
        store.commit("HIDE_ELEMENT", "addReviewModal");
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
      handleFavoriteChange,
    };
  },
};
</script>
<style scoped>
input.star-checkbox {
  display: none;
}

label.star {
  font-size: 1.5rem;
  cursor: pointer;
  color: lightgray;
  transition: color 0.3s ease;
}

input.star-checkbox:checked + label.star {
  color: gold;
}

.new-fav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
</style>