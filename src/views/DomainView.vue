<script>
import { useAxios } from "../hook";

export default {
  name: "DomainView",
  props: ["domain"],
  data() {
    return {
      domains: [],
    };
  },
  methods: {
    navigateToCheckoutDomain(domainUrl) {
      open(domainUrl, "_blank");
    },
  },
  async created() {
    const { data } = await useAxios(12, {
      query: `
        mutation getDomainByName($name: String){
          domains: getDomainByName(name: $name){
            name
            extension
            checkout
            isAvailable
          }
        }`,
      variables: {
        name: this.domain,
      },
    });
    const {
      data: { domains },
    } = await data;

    return (this.domains = domains);
  },
};
</script>

<template>
  <div class="container">
    <div class="text-left">
      <router-link to="/domains">Voltar</router-link>
      <br />
      <h2>{{ domain }}</h2>
      <br />
      <div class="card">
        <div class="card-body">
          <ul class="list-group">
            <li
              class="list-group-item"
              v-for="(domain, index) in domains"
              v-bind:key="`${domain.extension}-${index}`"
            >
              <div class="row">
                <div class="col-md-6">
                  {{ domain.extension }}
                </div>
                <div class="col-md-3">
                  <span class="badge badge-pill badge-secondary">{{
                    domain.isAvailable ? "Disponível ✅" : "Indisponível ❌"
                  }}</span>
                </div>
                <div class="col-md-3 text-right">
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
</template>

<style scoped></style>
