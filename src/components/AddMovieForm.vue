<template>
  <form @submit.prevent="submitForm">
    <div class="form-control movie-title">
      <label for="movie-title">Movie Title</label>
      <input
        id="movie-title"
        name="MovieTitle"
        type="text"
        v-model.trim="movieTitle"
      />
    </div>
    <hr />
    <div class="form-control">
      <h4>Recommended By:</h4>
      <div>
        <input
          id="my-choice"
          name="myChoice"
          type="radio"
          value="false"
          v-model="wasRecommended"
        />
        <label for="my-choice">My Pick</label>
      </div>
      <div>
        <input
          id="friend-recommendation"
          name="friendRecommendation"
          type="radio"
          value="true"
          v-model="wasRecommended"
        />
        <label for="interest-tutorials">Recommended</label>
      </div>
      <div>
        <button>Add Movie</button>
      </div>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const movieTitle = ref("");
    const wasRecommended = ref(null);

    const store = useStore();

    function submitForm() {
      var newMovie = {
        id: 3,
        title: movieTitle.value,
        wasRecommended: wasRecommended.value,
        watched: false,
      };
      store.dispatch("addMovie", newMovie);

      movieTitle.value = "";
      wasRecommended.value = null;
    }
    return { movieTitle, wasRecommended, submitForm };
  },
};
</script>




<style scoped>
form {
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

label {
  padding-left: 10px;
}

.form-control {
  margin: 20px;
}

#movie-title {
  margin-left: 10px;
}
</style>