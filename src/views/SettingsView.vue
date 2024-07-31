<!-- src/views/SettingsView.vue -->
<template>
    <div class="page-container">
      <h1 class="title">Settings</h1>
      <p>Manage your application settings from this page.</p>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    name: 'SettingsView'
  }
  </script>
  
  <style scoped>
  .page-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    text-align: left;
  }
  
  .title {
    color: #2c3e50;
    font-size: 24px;
  }
  </style>
  