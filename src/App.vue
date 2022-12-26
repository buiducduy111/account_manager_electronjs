<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@font-face {
  font-family: "Roboto";
  src: local("Roboto"), url('./assets/fonts/Roboto-Regular.ttf') format("truetype");
}

#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 16px;
}

* {
  margin: 0px;
  padding: 0px;
}

.form-control {
  font-size: 14px !important;
}

.btn {
  font-size: 14px !important;
}
</style>
