import { createRouter, createWebHistory } from "vue-router";
import DomainView from "../views/DomainView.vue";
import DomainListComponent from "../components/DomainList.vue";

export const routes = [
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

export default router;