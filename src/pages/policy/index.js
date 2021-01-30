import "@fortawesome/fontawesome-free/css/all.css"
import "@fortawesome/fontawesome-free/js/all.js"
import "bulma/css/bulma.css"
import "@/assets/index.css"
import Vue from "vue"
import App from "./App.vue"
import tools from "@/common/tools"

const vm = new Vue({
  render: h => h(App),
}).$mount("#app")

//development initialization
if (tools.isDebug()) {
  Vue.config.productionTip = false;
  console.log("isDebug:TRUE", vm);
}
