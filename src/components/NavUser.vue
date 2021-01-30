<template>
  <a
    v-if="user.email"
    class="navbar-item"
    @click="logout"
    :title="user.name + ' click to sign out'"
  >
    <img class="circle" :src="user.avatar" />
  </a>
  <a v-else class="navbar-item" href="/auth"> Sign in </a>
</template>

<style scoped>
.circle {
  border-radius: 50%;
}
</style>

<script>
import api from "@/common/api";

export default {
  name: "NavUser",
  methods: {
    logout() {
      api
        .logout()
        .then(() => {
          api.index();
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
