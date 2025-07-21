<template>
  <button @click="closeOpenElement" type="button" class="close">Close</button>
</template>


<script>
export default {
  emits: ["close"],
  setup(props, { emit }) {
    function closeOpenElement() {
      emit("close");
    }

    return {
      closeOpenElement,
    };
  },
};
</script>