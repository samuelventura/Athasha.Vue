<template>
  <div class="container">
    <nav class="bd-navbar navbar has-shadow is-spaced">
      <NavBrand />
    </nav>
    <div class="notification is-warning">
      By using this site you agree to all of our <a href="/policy">policies</a>.
    </div>
    <AuthList />
  </div>
</template>

<script>
import NavBrand from "@/components/NavBrand.vue";
import AuthList from "./AuthList.vue";

export default {
  name: "AuthPage",
  components: {
    NavBrand,
    AuthList,
  },
};
</script>
