<!-- src\App.vue -->

<script lang="ts">
import Navbar from './components/navbar/navbar.vue';
import AppFooter from './components/footer/AppFooter.vue';
import PrivacyModal from './components/help/PrivacyModal.vue'; 
import TosModal from './components/help/TosModal.vue';
import HelpModal from './components/help/HelpModal.vue';
import { ref } from 'vue';

export default {
  name: 'App',
  components: {
    Navbar,
    AppFooter,
    PrivacyModal, 
    TosModal,
    HelpModal
  },
  setup() {
    const showPrivacyModal = ref(false); 
    const showTOSModal = ref(false);
    const showHelpModal = ref(true);

    function togglePrivacyModal() {
      showPrivacyModal.value = !showPrivacyModal.value;
    }

    function toggleTOSModal() {
      showTOSModal.value = !showTOSModal.value;
    }

    function handleShowHelp() {
      showHelpModal.value = true;
    }

    return { showPrivacyModal, togglePrivacyModal, showTOSModal, toggleTOSModal, showHelpModal, handleShowHelp };
  }
}
</script>

<template>
  <div id="app">
    <Navbar/>
    <div class="content">
      <router-view @show-help="handleShowHelp"/>
    </div>
    <HelpModal :visible="showHelpModal" @update:visible="showHelpModal = $event" />
    <PrivacyModal v-if="showPrivacyModal" @close="togglePrivacyModal"/> 
    <TosModal v-if="showTOSModal" @close="toggleTOSModal"/> 
    <AppFooter :onPrivacyClick="togglePrivacyModal" :onTosClick="toggleTOSModal"/>
  </div>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

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
  min-height: 100vh;
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
  height: 100%;
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
