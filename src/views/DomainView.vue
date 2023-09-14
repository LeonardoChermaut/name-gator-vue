<script>
export default {
  name: "DomainView",
  props: ["domain"],
  data() {
    return {};
  },
  methods: {},
};
</script>

<template>
  <div class="container">
    <div class="text-left">
      <router-link to="/domains">Voltar</router-link>
      <br />
      <h2>{{ domain }}</h2>
    </div>
  </div>
</template>

<style scoped></style>
