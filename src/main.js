import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

const vue = new Vue({ render: (history) => history(App) });
vue.$mount("#app");
