<!-- src\App.vue -->

<script lang="ts">
import Navbar from './components/navbar/navbar.vue';
import AppFooter from './components/footer/AppFooter.vue';



export default {
  name: 'App',
  components: {
    Navbar,
    AppFooter
  }
}
</script>

<template>
  <div id="app">
    <Navbar/>
    <div class="content">
      <router-view/>
    </div>
    <AppFooter/>
  </div>
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #f3f4f6;
  color: #2c3e50;
  min-height: 100vh; /* Ensure full vertical height */
}

@media(min-width: 600px) {
  #app {
    height: 100vh;
  }
}

.dark #app {
  background-color: #111827;
  color: #f9fafb;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px 0;
}

.navbar {
  padding: 0;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.dark nav a {
  color: #cbd5e1;
}

.dark nav a.router-link-exact-active {
  color: #38bdf8;
}
</style>
