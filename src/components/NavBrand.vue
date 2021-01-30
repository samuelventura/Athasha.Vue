<template>
  <div class="navbar-brand">
    <NavLogo />
    <NavBurger />
  </div>
</template>

<script>
import NavLogo from "./NavLogo.vue";
import NavBurger from "./NavBurger.vue";
export default {
  name: "NavBrand",
  components: {
    NavLogo,
    NavBurger,
  },
};
</script>
