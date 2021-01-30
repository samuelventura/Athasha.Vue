<template>
  <nav class="bd-navbar navbar has-shadow is-spaced">
    <NavBrand />
    <div id="navbarBurger" class="navbar-menu">
      <div class="navbar-end">
        <NavUser v-if="user" />
      </div>
    </div>
  </nav>
</template>

<style scoped>
</style>

<script>
import NavBrand from "@/components/NavBrand.vue";
import NavUser from "@/components/NavUser.vue";

export default {
  name: "IndexPage",
  props: ["user"],
  components: {
    NavBrand,
    NavUser,
  },
};
</script>
