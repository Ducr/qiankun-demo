<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {},
  methods: {}
}
</script>

<style>
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

#app {
  text-align: center;
  color: #2c3e50;
}

.btns {
  margin: 100px;
}
.btns button {
  margin: 0 10px;
}

</style>
