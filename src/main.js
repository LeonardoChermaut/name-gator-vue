import App from "./App.vue";
import axios from "axios";
import { createApp } from "vue";
import { createStore } from "vuex";
import { createRouter, createWebHistory } from "vue-router";
import DomainView from "./views/DomainView.vue";
import DomainListComponent from "./components/DomainList.vue";

const BASE_URL = "http://localhost:4000";

const useAxios = async (method, data = {}) => {
    return await axios({
        baseURL: BASE_URL,
        method,
        data,
    });
};

const store = createStore({
    state: {
        items: {
            prefix: [],
            suffix: [],
        },
        domains: [],
    },
    mutations: {
        addItem(state, payload) {
            const { item, newItem } = payload;
            state.items[item.type].push(newItem);
        },
        deleteItem(state, payload) {
            const { item } = payload;
            state.items[item.type].splice(state.items[item.type].indexOf(item), 1);
        },
        setItems(state, payload) {
            const { type, items } = payload;
            state.items[type] = items;
        },
        setDomains(state, payload) {
            const { domains } = payload;
            state.domains = domains;
        }
    },
    actions: {
        async addItem(context, payload) {
            const item = payload;
            try {
                const { data } = await useAxios("post", {
                    query: `
                    mutation saveItem($item: ItemInput) {
                        newItem: saveItem(item: $item) {
                            id
                            type
                            description
                        }
                    }`,
                    variables: {
                        item,
                    }
                });
                const { data: { newItem } } = await data;
                context.commit("addItem", { item, newItem });

                return context.dispatch("generateDomains");
            } catch ({ response, message }) {
                console.error("Ops!", response);
                throw new Error(message);
            }

        },
        async deleteItem(context, payload) {
            const item = payload;
            try {
                await useAxios("post", {
                    query: `
                        mutation deleteItem($id: Int) {
                        deleteItem(id: $id)
                    }`,
                    variables: {
                        id: item.id,
                    },
                });
                context.commit("deleteItem", { item });

                return context.dispatch("generateDomains");
            } catch ({ response, message }) {
                console.error("Ops!", response);
                throw new Error(message);
            }

        },
        async getItems(context, payload) {
            const type = payload;
            try {
                const { data } = await useAxios("post", {
                    query: `
                        query ($type: String) {
                            items: items (type: $type) {
                                id
                                type
                                description
                            }
                        }`,
                    variables: {
                        type: type,
                    }
                },
                );
                const { data: { items } } = await data;

                return context.commit("setItems", { type, items });
            } catch ({ response, message }) {
                console.error("Ops!", response);
                throw new Error(message);
            }
        },
        async generateDomains(context) {
            try {
                const { data } = await useAxios("post", {
                    query: `
                            mutation generateDomains {
                                domains: generateDomains {
                                    name
                                    checkout
                                    isAvailable
                                }
                            }`,
                },
                );
                const { data: { domains } } = await data;
                return context.commit("setDomains", { domains });
            } catch ({ response, message }) {
                console.error("Ops!", response);
                throw new Error(message);
            }

        },
    }
});

Promise.all([
    store.dispatch("getItems", "prefix"),
    store.dispatch("getItems", "suffix")
]).then(() => store.dispatch("generateDomains"));

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
app.use(store);
app.mount("#app");

export default router;
