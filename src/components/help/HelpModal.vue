<!-- src\components\help\HelpModal.vue -->
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  props: {
    visible: Boolean
  },
  emits: ['update:visible'],
  setup(props, { emit }) {
    const sections = reactive([
      { title: 'Section 1', connections: [{ left: 'Mountain', right: 'Peak' }] },
      { title: 'Section 2', connections: [{ left: 'Ocean', right: 'Wave' }] },
      { title: 'Section 3', connections: [{ left: 'Forest', right: 'Tree' }] }
    ]);

    function getColor(index: number, position: 'left' | 'right'): string {
      const colors = ['#2C7D40', '#5E53B2', '#369F3A', '#316C72', '#27696D','#34618B'];
      return colors[(index * 2 + (position === 'right' ? 1 : 0)) % colors.length];
    }

    function getDescription(index: number): string {
      const descriptions = [
        "Tiles can be directly or functionally associated",
        "Tiles can be conceptually or categorically linked",
        "Tiles can be linked through cause and effect"
      ];
      return descriptions[index];
    }

    function close() {
      emit('update:visible', false);
    }

    return { close, sections, getColor, getDescription };
  }
});
</script>

<template>
  <div v-if="visible" class="help-modal-overlay">
    <div class="help-modal">
      <h2>Help Information</h2>
      <div v-for="(section, index) in sections" :key="section.title" class="section">
        <h3>{{ section.title }}</h3>
        <p class="description">{{ getDescription(index) }}</p>
        <div class="flex-container">
          <div class="tile" :style="{ backgroundColor: getColor(index, 'left') }">
            {{ section.connections[0].left }}
          </div>
          <font-awesome-icon icon="arrow-right" class="arrow-icon" />
          <div class="tile" :style="{ backgroundColor: getColor(index, 'right') }">
            {{ section.connections[0].right }}
          </div>
        </div>
      </div>
      <!-- New Final Section -->
      <div class="final-section">
        <h3>Incorrect Guess</h3>
        <p class="description">The tile will flash red if the guess is incorrect, taking one of the three lives.</p>
        <div class="flex-container single-tile-container">
          <div class="tile incorrect-tile">Example Tile</div>
        </div>
      </div>
      <button @click="close" class="close-button">Close</button>
    </div>
  </div>
</template>

<style scoped>
.help-modal-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
}

.help-modal {
  padding: 20px;
  padding-bottom: 50px; 
  width: 90%; 
  max-width: 600px;
  background-color: #FFF;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  position: relative; 
  overflow: auto; 
}

.section {
  margin-top: 20px;
  margin-bottom: 30px; 
  text-align: center; 
}

.flex-container {
  display: flex;
  justify-content: space-between; 
  align-items: center; 
  padding: 0 20px; 
  max-width: 600px; 
  margin: auto; 
}

.description {
  font-style: italic; 
  color: #666; 
  margin-bottom: 10px; 
}

.tile {
color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  min-width: 100px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.final-section {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 50px; 
}

.single-tile-container {
  justify-content: center; 
}

.incorrect-tile {
  animation: flash-red 2s infinite; 
}

@keyframes flash-red {
  0%, 100% { background-color: #f1f0f5; }
  50% { background-color: red; }
}

.close-button {
  position: absolute;
  right: 20px;
  bottom: 20px;
  padding: 10px 20px;
  background-color: rgb(194, 158, 40);
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

</style>
