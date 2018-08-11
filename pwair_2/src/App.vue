<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  margin:0;
  padding:0;
}

html, body, #app {
  height:100%;
}
#app {
  font-family:'Nanum Gothic',"돋움",dotum,Helvetica,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
