import "@fortawesome/fontawesome-free/css/all.css"
import "@fortawesome/fontawesome-free/js/all.js"
import "bulma/css/bulma.css"
import "@/assets/index.css"
import Vue from "vue"
import App from "./App.vue"
import store from "./store"
import tools from "@/common/tools"
import resize from "@/common/resize"

Vue.directive("resize", resize);

//needed by inplace dblclick editors
Vue.directive("focus", {
  inserted: function (el) {
    el.focus()
  },
});

const vm = new Vue({
  store: store,
  render: h => h(App),
}).$mount("#app")

//development initialization
if (tools.isDebug()) {
  Vue.config.productionTip = false

  const initGroupDIs = function (data) {
    data.read = 2; //02 Read Input Status
    data.write = 0;
    data.names = ["Start Button", "Stop Button"];
  };

  const initGroupDOs = function (data) {
    data.read = 2;
    data.write = 15; //15 Force Multiple Coils
    data.names = ["Green Light", "Red Light"];
  };

  const initTable = function (data) {
    data.points = [
      { name: "Emergency Stop", read: 2, write: 0, slave: 1, address: 0 },
      { name: "Buzzer", read: 2, write: 15, slave: 1, address: 1 },
    ];
  };

  vm.$store.dispatch("view/newItemFromType",
    { type: vm.$store.getters["view/wrappedTypes"][0] });
  vm.$store.dispatch("view/newItemFromType",
    { type: vm.$store.getters["view/wrappedTypes"][0] });
  vm.$store.dispatch("view/newItemFromType",
    { type: vm.$store.getters["view/wrappedTypes"][1], init: initTable });

  vm.$store.dispatch("view/newItemFromType",
    { type: vm.$store.getters["view/wrappedTypes"][2], init: initGroupDIs });
  vm.$store.dispatch("view/newItemFromType",
    { type: vm.$store.getters["view/wrappedTypes"][2], init: initGroupDOs });
  vm.$store.dispatch("view/newItemFromType",
    { type: vm.$store.getters["view/wrappedTypes"][3] });

}
