<script>
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

export default {
  name: "app",
  components: {},
};
</script>

<template>
  <div>
    <div id="slogan" class="text-center">
      <h1>Verificador de Domínios</h1>
      <br />
      <h6 class="text-secondary">Stacks: Vue.js, GraphQL e Node 😃</h6>
    </div>
    <div id="main">
      <router-view></router-view>
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
