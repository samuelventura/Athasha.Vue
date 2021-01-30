<template>
  <section class="section">
    <div class="has-text-centered">
      <a
        @click="onClick"
        class="button is-outlined is-link is-large"
        :disabled="!ready"
      >
        Sign in with Google
      </a>
    </div>
  </section>
</template>

<style scoped>
</style>

<script>
import api from "@/common/api";

export default {
  name: "ProviderGoogle",
  methods: {
    onClick() {
      if (!this.ready) return;
      //can only be called from click handler
      window.gapi.auth2
        .getAuthInstance()
        .signIn()
        .catch((ex) => {
          console.log("catch", ex);
        });
    },
    userChanged(user) {
      //yes <this> remains binded to userChanged method
      if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
        api
          .login({ provider: "google", data: user.getAuthResponse().id_token })
          .catch((ex) => {
            console.log("catch", ex);
          })
          .finally(() => {
            window.gapi.auth2.getAuthInstance().disconnect();
            window.gapi.auth2.getAuthInstance().signOut();
            api.referrer();
          });
      }
    },
  },
  data() {
    return { ready: false };
  },
  mounted() {
    const that = this;
    let script = document.createElement("script");
    script.onload = () => {
      window.gapi.load("auth2", function () {
        //profile scope brings email as well (email scope not needed)
        window.gapi.auth2
          .init({
            client_id:
              "1097371640155-5acvfevk6nl0npot676te7u9akspho3s.apps.googleusercontent.com",
            scope: "profile",
          })
          .then(
            () => {
              //yes <this> remains binded to userChanged method
              window.gapi.auth2
                .getAuthInstance()
                .currentUser.listen(that.userChanged);
              that.ready = true;
            },
            (reason) => {
              console.log("rejection", reason);
            }
          );
      });
    };
    script.async = true;
    script.src = "https://apis.google.com/js/platform.js";
    document.head.appendChild(script);
  },
};
</script>
