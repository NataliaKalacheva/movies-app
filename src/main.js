import Vue from "vue";
import Router from "vue-router";
import App from "./App.vue";
import store from "./store";
import './plugins/bootstrap';
import VueRouter from "vue-router";

Vue.config.productionTip = false;
Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "root",
    component: App
  }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes: routes
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
