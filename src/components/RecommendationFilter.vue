<template>
  <div>
    <h2>Recommended Movies</h2>
    <span class="filter-option">
      <input type="checkbox" id="myChoice" checked @change="setFilter" />
      <label for="myChoice">My Choice</label>
    </span>
    <span class="filter-option">
      <input
        type="checkbox"
        id="friendRecommendation"
        checked
        @change="setFilter"
      />
      <label for="friendRecommendation">Friend Recommendation</label>
    </span>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const emit = defineEmits(["change-filters"]); //emit is used for a child to talk to the parent

const filters = reactive({
  myChoice: true,
  friendRecommendation: true,
});

function setFilter(event) {
  const inputId = event.target.id;
  const isActive = event.target.checked;
  console.log("inputId", inputId);
  console.log("isActive", isActive);

  const updatedFilters = {
    ...filters,
    [inputId]: isActive,
  };
  emit("change-filters", updatedFilters);
  console.log("filters", updatedFilters);
  console.log("set filter called from recommendation filter");
}
</script>