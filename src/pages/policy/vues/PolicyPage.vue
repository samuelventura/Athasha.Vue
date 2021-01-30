<template>
  <div class="container">
    <NavBar />
    <SectionTerms />
    <SectionPrivacy />
    <SectionCookies />
  </div>
</template>

<style scoped>
</style>

<script>
import NavBar from "@/components/NavBar.vue";
import SectionTerms from "./SectionTerms.vue";
import SectionPrivacy from "./SectionPrivacy.vue";
import SectionCookies from "./SectionCookies.vue";

export default {
  name: "IndexPage",
  components: {
    NavBar,
    SectionTerms,
    SectionPrivacy,
    SectionCookies,
  },
};
</script>
