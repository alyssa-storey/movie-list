<template>
  <div>
    <h2>Alyssa's Movie List</h2>
    <div>
      <button
        @click="resetFilter(true)"
        class="tab"
        :class="{ active: filterByRecommendation.value }"
      >
        By Recommendation
      </button>
      <button
        @click="resetFilter(false)"
        class="tab"
        :class="{ active: !filterByRecommendation.value }"
      >
        By Watched
      </button>
    </div>
    <div>
      <span v-if="filterByRecommendation">
        <span class="filter-option">
          <input
            type="checkbox"
            id="myChoice"
            checked
            @change="setFilter"
            v-model="filters.myChoice"
          />
          <label for="myChoice">My Choice</label>
        </span>
        <span class="filter-option">
          <input
            type="checkbox"
            id="friendRecommendation"
            checked
            @change="setFilter"
            v-model="filters.friendRecommendation"
          />
          <label for="friendRecommendation">Friend Recommendation</label>
        </span>
      </span>

      <span v-else>
        <span class="filter-option">
          <input
            type="checkbox"
            id="watched"
            checked
            @change="setFilter"
            v-model="filters.watched"
          />
          <label for="myChoice">Watched</label>
        </span>
        <span class="filter-option">
          <input
            type="checkbox"
            id="notWatched"
            checked
            @change="setFilter"
            v-model="filters.notWatched"
          />
          <label for="friendRecommendation">Not Watched</label>
        </span>
      </span>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const emit = defineEmits(["change-filters"]); //emit is used for a child to talk to the parent
let filterByRecommendation = ref(true);
const filters = reactive({
  myChoice: true,
  friendRecommendation: true,
  watched: true,
  notWatched: true,
});

function setFilter(event) {
  const inputId = event.target.id;
  const isActive = event.target.checked;
  console.log("inputId", inputId);
  console.log("isActive", isActive);

  const updatedFilters = {
    ...filters,
    [inputId]: isActive,
    filterByRecommendation: filterByRecommendation.value,
  };
  emit("change-filters", updatedFilters);
  console.log("set filter called from recommendation filter");
}

function resetFilter(val) {
  filterByRecommendation.value = val;

  const resetFilter = {
    myChoice: true,
    friendRecommendation: true,
    watched: true,
    notWatched: true,
    filterByRecommendation: filterByRecommendation.value,
  };
  emit("change-filters", resetFilter);

  filters.myChoice = true;
  filters.friendRecommendation = true;
  filters.watched = true;
  filters.notWatched = true;
}
</script>

<style scoped>
label {
  margin: 1px 5px;
}

.tab {
  border-radius: 0px;
  background-color: #a9a972;
  margin: 0px;
  border: 1px solid #a9a972;
}
.active {
  background-color: #919151;
  border: 1px solid #919151;
}
</style>

<!-- This is a little lighter -- not sure which I like better yet bfbf90 -->
