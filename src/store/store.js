import { createStore } from "vuex";
import { useAxios } from "../hook";

export const store = createStore({
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
        },
        async deleteItem(context, payload) {
            const item = payload;
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
        },
        async getItems(context, payload) {
            const type = payload;
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
                    type,
                }
            });
            const { data: { items } } = await data;

            return context.commit("setItems", { type, items });
        },
        async generateDomains(context) {
            const { data } = await useAxios("post", {
                query: `
                    mutation generateDomains {
                        domains: generateDomains {
                            name
                            checkout
                            isAvailable
                        }
                    }`
            });
            const { data: { domains } } = await data;
            return context.commit("setDomains", { domains });
        },
    }
});