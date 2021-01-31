<template>
  <DrivePage />
</template>

<script>
import api from "@/common/api";
import DrivePage from "./vues/DrivePage.vue";

export default {
  name: "App",
  components: {
    DrivePage,
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
