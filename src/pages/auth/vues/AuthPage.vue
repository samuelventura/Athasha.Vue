<template>
  <div class="container">
    <NavBar />
    <div class="notification has-text-centered is-warning">
      By using this site you agree to all of our
      <a href="/policy">policies</a>.
    </div>
    <AuthList />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import AuthList from "./AuthList.vue";

export default {
  name: "AuthPage",
  components: {
    NavBar,
    AuthList,
  },
};
</script>
