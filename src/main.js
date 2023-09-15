import App from "./App.vue";
import { createApp } from "vue";
import { store } from "./store";
import router from "./router/router";

class MainApplication {
    constructor() {
        this.application = createApp(App);
        this.router = router;
        this.store = store;
    }

    async initialize() {
        await Promise.all([
            this.store.dispatch("getItems", "prefix"),
            this.store.dispatch("getItems", "suffix")
        ]);
        await this.store.dispatch("generateDomains");

        this.application.use(this.router);
        this.application.use(this.store);
        this.application.mount("#app");
    }
}

const mainApplication = new MainApplication();
mainApplication.initialize();

export default router;
