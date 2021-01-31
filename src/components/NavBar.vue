<template>
  <nav class="bd-navbar navbar has-shadow is-spaced">
    <div class="navbar-brand">
      <a v-once class="navbar-item" href="/" title="Athasha Automation">
        <img src="@/assets/logo28.png" height="28" />
      </a>
      <div
        v-if="userMenu"
        class="navbar-burger"
        @click="burgerActive = !burgerActive"
      >
        <div v-if="user.valid" class="navbar-item is-hidden-desktop">
          <img class="circle" :src="user.avatar" :title="user.name" />
        </div>
        <span v-if="!user.valid" aria-hidden="true"></span>
        <span v-if="!user.valid" aria-hidden="true"></span>
        <span v-if="!user.valid" aria-hidden="true"></span>
      </div>
    </div>
    <div class="navbar-menu" :class="{ 'is-active': burgerActive }">
      <div class="navbar-end" v-if="userMenu">
        <div v-if="user.valid" class="navbar-item">
          <a class="navbar-item" href="/drive">My Drive</a>
          <a class="navbar-item" @click="logout">Sign Out</a>
          <div class="navbar-item is-hidden-touch">
            <img class="circle" :src="user.avatar" :title="user.name" />
          </div>
        </div>
        <a v-else class="navbar-item" href="/auth">Sign In</a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.circle {
  border-radius: 50%;
}
</style>

<script>
import api from "@/common/api";

export default {
  name: "IndexPage",
  props: ["userMenu"],
  data() {
    return {
      burgerActive: false,
    };
  },
  methods: {
    logout() {
      api
        .logout()
        .then(() => {
          api.redirectToIndex();
        })
        .catch((ex) => {
          console.log("catch", ex);
        });
    },
  },
  computed: {
    user() {
      return this.$store.getters["user/current"];
    },
  },
};
</script>
