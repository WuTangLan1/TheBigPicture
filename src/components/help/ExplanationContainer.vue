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
  <div :class="['explanation-container', { minimized: minimized }]" >
    <button @click="toggle" class="toggle-button">
      <font-awesome-icon :icon="minimized ? 'window-maximize' : 'window-minimize'" />
    </button>
    <h2>Welcome to Full Circle</h2>
    <div v-if="!minimized" >
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
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  margin: 0 auto 20px;
  text-align: center;
  width: calc(100% - 50px);
  min-width: 82vw;
  max-width: 560px;
  overflow: hidden; 
  transition: max-height 0.5s ease-out;
  max-height: 1000px; 
  overflow-y: auto;
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
  font-family: 'Arial Black', Gadget, sans-serif; 
  font-size: clamp(16px, 5vw, 32px);
  font-weight: bold; 
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3); 
  letter-spacing: 0.5px; 
}

.dark h2 {
  color: white;
  text-shadow: 2px 2px 4px rgba(255,255,255,0.3); 
}

ol {
  list-style: none;
  counter-reset: list-counter;
  padding: 0;
  margin-left: 0;
}

li {
  color: #333;
  font-size: 16px;
  counter-increment: list-counter;
  position: relative;
  padding-left: 35px; 
  text-align: left;
  margin-bottom: 15px;
}

@media(max-width : 450px)
{
  li {
    font-size: 14px;
  }
}

.dark li {
  color: white;
}

li::before {
  content: counter(list-counter);
  background: #afc4ee;
  color: black;
  font-weight: bold;
  width: 25px;
  height: 25px;
  border-radius: 0.3rem; 
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0; 
  top: 0; 
}

.minimized {
  max-height: 80px; 
}
</style>