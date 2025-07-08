<template>
  <form @submit.prevent="submitForm">
    <div class="form-control movie-title">
      <label for="movie-title">Movie Title</label>
      <input
        id="movie-title"
        name="MovieTitle"
        type="text"
        v-model.trim="movieTitle"
        :class="{ invalid: formIncomplete && movieTitle == '' }"
      />
    </div>
    <hr />
    <div class="form-control">
      <h4>Recommended By:</h4>
      <div
        :class="{ invalid: formIncomplete && wasRecommended == null }"
        class="radio-wrapper"
      >
        <div>
          <input
            id="my-choice"
            name="Recommendation"
            type="radio"
            :value="false"
            v-model="wasRecommended"
          />
          <label for="my-choice">My Pick</label>
        </div>
        <div>
          <input
            id="friend-recommendation"
            name="Recommendation"
            type="radio"
            :value="true"
            v-model="wasRecommended"
          />
          <label for="friend-recommendation">Recommended</label>
        </div>
      </div>
    </div>
    <div class="form-control">
      <div v-if="wasRecommended">
        <label for="recommended-by">This movie was recommend by: </label>
        <input
          id="recommended-by"
          name="RecommendedBy"
          type="text"
          v-model.trim="recommender"
          :class="{ invalid: formIncomplete && recommender == '' }"
        />
      </div>
    </div>
    <div>
      <button>Add Movie</button>
    </div>
  </form>
  <div class="error-div" v-if="formIncomplete">Please complete all fields!</div>
</template>

<script>
import { ref, watch } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const movieTitle = ref("");
    const wasRecommended = ref(null);
    const recommender = ref("");
    let formIncomplete = ref(false);

    const store = useStore();

    //methods
    function submitForm() {
      let validated = validateForm();
      if (validated) {
        var newMovie = {
          id: 3, //make this dynamic
          title: movieTitle.value,
          wasRecommended: wasRecommended.value,
          recommender: recommender.value,
          watched: false,
        };
        store.dispatch("addMovie", newMovie);

        formIncomplete.value = false;
        movieTitle.value = "";
        wasRecommended.value = null;
      } else {
        formIncomplete.value = true;
      }
    }

    function validateForm() {
      if (
        movieTitle.value == "" ||
        wasRecommended.value == null ||
        (wasRecommended.value === true && recommender.value == "")
      ) {
        return false;
      } else {
        return true;
      }
    }
    //watchers
    watch([movieTitle, wasRecommended, recommender], () => {
      if (
        movieTitle.value != "" &&
        wasRecommended.value != null &&
        (wasRecommended.value == false ||
          (wasRecommended.value === true && recommender.value != ""))
      ) {
        formIncomplete.value = false;
      }
    });

    return {
      movieTitle,
      wasRecommended,
      submitForm,
      recommender,
      formIncomplete,
    };
  },
};
</script>




<style scoped>
form {
  border: 1px solid #ff81d0;
  border-radius: 12px;
  padding: 1rem;
}

label {
  padding-left: 10px;
}

.form-control {
  margin: 20px 10px;
}

#movie-title {
  margin-left: 10px;
}
input.invalid {
  border-color: yellow;
}
.radio-wrapper {
  margin-top: 5px;
  padding: 5px;
  display: inline-block;
}

.radio-wrapper.invalid {
  outline: 2px solid yellow;
  margin-top: 5px;
  padding: 5px;
  border-radius: 5px;
  display: inline-block;
}
</style>