<script>
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import AppItemListComponent from "./AppItemList.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "DomainList",
  components: {
    AppItemListComponent,
  },
  data: function () {
    return {};
  },
  methods: {
    ...mapActions(["getItems", "addItem", "deleteItem"]),

    navigateToCheckoutDomain(domainUrl) {
      open(domainUrl, "_blank");
    },
    handleDomainSearch({ name }) {
      this.$router.push({ path: `/domains/${name}` });
    },
  },
  computed: {
    ...mapState(["items", "domains"]),
  },
};
</script>

<template>
  <div>
    <div id="main">
      <div class="container">
        <div class="row">
          <div class="col-md">
            <AppItemListComponent
              title="Prefixos"
              type="prefix"
              v-bind:items="items.prefix"
              v-on:add-item="addItem"
              v-on:delete-item="deleteItem"
            />
          </div>
          <div class="col-md">
            <AppItemListComponent
              title="Sufixos"
              type="suffix"
              v-bind:items="items.suffix"
              v-on:add-item="addItem"
              v-on:delete-item="deleteItem"
            />
          </div>
        </div>
        <br />
      </div>
      <div class="container">
        <h5>
          Domínios
          <span class="badge badge-secondary">{{ domains.length }}</span>
        </h5>
        <div class="card">
          <div class="card-body">
            <ul class="list-group">
              <li
                class="list-group-item"
                v-for="(domain, index) in domains"
                v-bind:key="`${domain.name}-${index}`"
              >
                <div class="row">
                  <div class="col-md-6">
                    {{ domain.name }}
                  </div>
                  <div class="col-md-3">
                    <span class="badge badge-pill badge-secondary">{{
                      domain.isAvailable ? "Disponível ✅" : "Indisponível ❌"
                    }}</span>
                  </div>
                  <div class="col-md-3 text-right">
                    <button
                      class="btn btn-outline-info"
                      v-on:click="handleDomainSearch(domain)"
                    >
                      <span class="fa fa-search"></span>
                    </button>
                    &nbsp;
                    <button
                      class="btn btn-outline-success"
                      v-on:click="navigateToCheckoutDomain(domain.checkout)"
                      target="_blank"
                      :disabled="!domain.isAvailable"
                    >
                      <span class="fa fa-shopping-cart"></span>
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#slogan {
  margin-top: 30px;
  margin-bottom: 30px;
}

#main {
  background-color: #f1f1f1;
  padding-top: 30px;
  padding-bottom: 30px;
}
</style>
