<!-- src\components\help\ExplanationContainer.vue -->
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const minimized = ref(false);

    function toggle() {
      minimized.value = !minimized.value;
    }

    return { minimized, toggle };
  }
});
</script>

<template>
  <div class="explanation-container">
    <button @click="toggle" class="toggle-button">
      <font-awesome-icon :icon="minimized ? 'window-maximize' : 'window-minimize'" />
    </button>
    <h2>Welcome to Full Circle</h2>
    <div v-if="!minimized" class="content">
      <ol>
        <li>Select the correct tile to follow the green tile until the blue one is reached.</li>
        <li>Each correct selection will turn green.</li>
        <li>Avoid incorrect choices to maintain your lives.</li>
        <li>Correctly click the correct order of tiles to win the game.</li>
      </ol>
    </div>
  </div>
</template>

<style scoped>
.explanation-container {
  position: relative;
  background-color: #e0e7f3;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  margin: 0 auto 20px;
  text-align: center;
  width: calc(100% - 70px);
  max-width: 560px;
}

.dark .explanation-container {
  background-color: #3c4c66;
  color: white;
}

.toggle-button {
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  cursor: pointer;
}

.dark .toggle-button {
  color: white;
}

h2 {
  color: #000000;
}

.dark h2 {
  color: white;
}

ol {
  list-style: none; 
  counter-reset: list-counter;
  padding: 0;
}

li {
  color: #333;
  font-size: 16px;
  counter-increment: list-counter; 
  position: relative; 
}

.dark li {
  color: white;
}

li::before {
  content: counter(list-counter); 
  background: #afc4ee; 
  color: white; 
  font-weight: bold; 
  width: 25px;
  height: 25px; 
  border-radius: 50%; 
  display: inline-block;
  text-align: center;
  line-height: 25px; 
  margin-right: 10px; 
}
</style>
