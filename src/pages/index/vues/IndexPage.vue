<template>
  <div class="container">
    <nav class="bd-navbar navbar has-shadow is-spaced">
      <NavBrand />
      <div id="navbarBurger" class="navbar-menu">
        <div class="navbar-end">
          <NavUser />
        </div>
      </div>
    </nav>
    <NavFooter />
  </div>
</template>

<style scoped>
</style>

<script>
import NavBrand from "@/components/NavBrand.vue";
import NavUser from "@/components/NavUser.vue";
import NavFooter from "@/components/NavFooter.vue";

export default {
  name: "IndexPage",
  components: {
    NavBrand,
    NavUser,
    NavFooter,
  },
};
</script>
