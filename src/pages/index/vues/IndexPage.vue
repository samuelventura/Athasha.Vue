<template>
  <div class="container">
    <NavBar userMenu="true" />
    <div
      v-if="!acceptedCookies"
      class="notification has-text-centered is-warning"
    >
      <p>
        By using this site you agree to all of our
        <a href="/policy">policies</a> which include collecting
        <a href="/policy#cookies">cookies</a>.
      </p>
      <br />
      <a class="button" @click="acceptCookies">Accept & Hide Notice</a>
    </div>
  </div>
</template>

<style scoped>
</style>

<script>
import api from "@/common/api";
import NavBar from "@/components/NavBar.vue";

export default {
  name: "IndexPage",
  components: {
    NavBar,
  },
  data() {
    return {
      cookiesClick: false,
    };
  },
  methods: {
    acceptCookies() {
      api.acceptCookies();
      this.cookiesClick = true;
    },
  },
  computed: {
    acceptedCookies() {
      return api.acceptedCookies() || this.cookiesClick;
    },
  },
};
</script>
