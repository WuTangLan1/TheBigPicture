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
      { title: 'Some rules for the game...', connections: [{ left: 'Mountain', right: 'Peak' }] },
      { title: 'Or', connections: [{ left: 'Ocean', right: 'Wave' }] },
      { title: 'Or even', connections: [{ left: 'Forest', right: 'Tree' }] }
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
      <div class="final-section">
        <h3>with a incorrect guess showing</h3>
        <p class="description">The tile will flash red if the guess is incorrect, taking one of the three lives.</p>
        <div class="flex-container single-tile-container">
          <div class="tile incorrect-tile">Pastry Chef</div>
        </div>
      </div>
      <button @click="close" class="close-button">Perfecto</button>
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
  padding-bottom: 20px; 
  width: 90%; 
  max-width: 600px;
  background-color: #FFF;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  position: relative; 
  overflow: auto; 
  overflow-y:auto;
  border-radius: 0.3rem;
  transition: transform 0.5s ease-out;
  will-change: transform; 
}

h2 {
  font-size: 28px;
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

.dark .help-modal-overlay {
  background-color: rgba(0, 0, 0, 0.8);
}

.dark .help-modal {
  background-color: #333; 
  color: #ccc; 
}

.dark .description, .dark h2, .dark h3 {
  color: #ddd; 
}

.dark .tile {
  color: white; 
  background-color: var(--tile-bg-color, #f1f0f5); 
}

.close-button {
  position: absolute;
  right: 20px;
  bottom: 20px;
  padding: 10px 20px;
  background-color: rgb(40, 116, 37);
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

@media (max-width: 600px) {
  .help-modal-overlay {
    justify-content: flex-start; 
    align-items: flex-start; 
    padding: 0;
  }

  .help-modal {
    position: relative;
    max-height: 68vh;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding-bottom: 10px;
    transition: transform 0.5s ease-out;
    will-change: transform; 
    
  }

  .help-modal-overlay.visible .help-modal {
    transform: translate(-50%, -50%); 
  }

  .close-button {
    position: relative; 
    align-self: flex-end; 
    margin-top: auto; 
    padding: 10px 20px;
    background-color: rgb(40, 116, 37);
    border: 2px thick white;
    color: white;
    border: 1px solid white;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  h2 {
    font-size: 25px;
  }

  @keyframes slideIn {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0);
    }
  }

  @keyframes slideOut {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-100%);
    }
  }
}

</style>
