//import "@/plugins/fontawesome"
import "@fortawesome/fontawesome-free/css/all.css"
import "@fortawesome/fontawesome-free/js/all.js"
import "bulma/css/bulma.css"
import "@/assets/tryout.css"
import Vue from "vue"
import App from "./App.vue"
import store from "./store"
import tools from "@/common/tools"

//sample hook functions
Vue.directive("tryout", {
  inserted: function (el) {
    console.log('inserted', el);
  },
  bind: function (el, binding) {
    console.log('bind', el, binding);
  },
  unbind: function (el) {
    console.log('unbind', el);
  },
  update: function (el) {
    console.log('update', el);
  },
  componentUpdated: function (el) {
    console.log('componentUpdated', el);
  },
});

//this.$root.method from component
//not visible from vuex store/modules
Vue.mixin({
  methods: {
    mixinMethod() {
      console.log("mixinMethod", this);
    },
  }
});

const vm = new Vue({
  store: store,
  render: h => h(App),
}).$mount("#app")

//development initialization
if (tools.isDebug()) {
  Vue.config.productionTip = false;
  console.log("isDebug:TRUE", vm);
}
