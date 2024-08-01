<!-- src\components\help\ExplanationContainer.vue -->
<script lang="ts">
import { inject, Ref, computed } from 'vue';

export default {
  setup() {
    const isDark = inject('isDark') as Ref<boolean>;

    const logoSrc = computed(() => {
      return isDark.value ? require('@/assets/logos/darklogo.png') : require('@/assets/logos/lightlogo.png');
    });

    return { logoSrc };
  }
}
</script>

<template>
  <div class="explanation-container">
    <h2>
      Welcome to <img :src="logoSrc" alt="Logo" class="logo">
    </h2>
    <ul>
      <li>Select the correct tile to follow the green tile until the blue one is reached.</li>
      <li>Each correct selection will turn green.</li>
      <li>Avoid incorrect choices to maintain your lives.</li>
      <li>Correctly click the correct order of tiles to win the game.</li>
    </ul>
  </div>
</template>

<style scoped>
.explanation-container {
  background-color: #afc4ee;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  margin: 0 auto 20px;
  text-align: center;
  width: calc(100% - 70px);
  max-width: 560px;
}

.dark .explanation-container {
  background-color: #2e4058;
  color: #f9fafb;
}

.logo {
  max-height: 50px; 
  margin-bottom: 10px;
}

h2 {
  color: #4CAF50;
}

p, li {
  color: #333;
  font-size: 16px;
}

.dark p, .dark li {
  color: #f9fafb;
}

ul {
  text-align: left;
  margin-top: 10px;
}
</style>
