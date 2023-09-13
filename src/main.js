import Vue from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/domains",
        component: () => import("./components/DomainList.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


new Vue({ router, render: (h) => h(App) }).$mount("#app");

export default router;
