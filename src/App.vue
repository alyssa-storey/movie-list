<template>
  <navigation></navigation>
  <div class="page-content">
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
export default {
  components: { Navigation },
  setup() {},
};
</script>

<style>
.page-content {
  padding-top: 100px;
  width: 750px;
}
</style>