import App from "./App.vue";
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import DomainView from "./views/DomainView.vue";
import DomainListComponent from "./components/DomainList.vue";

const routes = [
    {
        path: "/domains",
        name: "Domains",
        component: DomainListComponent,
    },
    {
        path: "/domains/:domain",
        component: DomainView,
        props: true,
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
