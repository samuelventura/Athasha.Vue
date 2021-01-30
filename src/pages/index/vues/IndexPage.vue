<template>
  <div class="container">
    <NavBar userMenu="true" />
    <NavFooter />
  </div>
</template>

<style scoped>
</style>

<script>
import NavBar from "@/components/NavBar.vue";
import NavFooter from "@/components/NavFooter.vue";

export default {
  name: "IndexPage",
  components: {
    NavBar,
    NavFooter,
  },
};
</script>
