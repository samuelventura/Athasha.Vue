<template>
  <div>
    <ProviderGoogle />
  </div>
</template>

<style scoped>
</style>

<script>
import ProviderGoogle from "./ProviderGoogle.vue";
export default {
  name: "AuthList",
  components: {
    ProviderGoogle,
  },
};
</script>
