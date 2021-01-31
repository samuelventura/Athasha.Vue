<template>
  <IndexPage />
</template>

<script>
import api from "@/common/api";
import IndexPage from "./vues/IndexPage.vue";

export default {
  name: "App",
  components: {
    IndexPage,
  },
  mounted() {
    const that = this;
    api
      .fetchInitialData()
      .then(({ user }) => {
        that.$store.commit("user/setCurrent", user);
      })
      .catch((ex) => {
        console.log("catch", ex);
      });
  },
};
</script>
