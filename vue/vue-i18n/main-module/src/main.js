import Vue from "vue";
import App from "./App.vue";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import i18n from "./i18n";
import myComponentsLib from "./libs/my-component-library.umd.min";

Vue.use(Element);
Vue.use(myComponentsLib, { i18n });
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  i18n,
}).$mount("#app");
