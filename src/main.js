import { createApp } from "vue";
import App from "./App.vue";
import DomainListComponent from "./components/DomainList.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/domains",
        name: "Domains",
        component: DomainListComponent,
    },
    {
        path: "/",
        redirect: "/domains",
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");

export default router;
