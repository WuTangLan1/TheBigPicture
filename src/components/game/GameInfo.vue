<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useGameStore } from '@/stores/gameStore';

export default defineComponent({
  setup(props, { emit }) {
    const gameStore = useGameStore();

    const difficulty = computed(() => gameStore.difficulty);
    const lives = computed(() => Array(gameStore.lives).fill(0));

    function showHelp() {
      emit('show-help');
    }

    return { difficulty, lives, showHelp };
  }
});
</script>

<template>
  <div class="status-panel">
    <div class="info-section">
      <div class="difficulty-display">
        Difficulty: {{ difficulty }}
      </div>
      <div class="lives-display">
        <span v-for="life in lives" :key="life" class="heart">
          <font-awesome-icon icon="heart" />
        </span>
      </div>
      <button @click="showHelp" class="help-button">
        <font-awesome-icon icon="info-circle" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.status-panel {
  margin-top: 10px;
  padding: 10px;
  background-color: #f9f9f9;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 2px 15px rgba(0,0,0,0.1);
  width: calc(100% - 20px);
  max-width: 460px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center; 
  align-items: center;
}

.info-section {
  display: flex;
  justify-content: space-around; 
  align-items: center;
  width: 100%; 
}

.selected-tile-info, .lives-display, button {
  flex: 1; 
  margin: 0 10px; 
}

.difficulty-display {
  font-weight: bold;
  color: #333;
  font-size: 18px; 
}

@media (max-width: 600px) {
  .difficulty-display {
    font-size: 14px; 
  }
}

.dark .difficulty-display {
    color: white;
}

.heart {
  color: red;
  margin-left: 5px;
  font-size: 22px;
}

.help-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 0.3rem;
  padding: 5px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px; 
  cursor: pointer;
  width: 24px; 
  height: 24px; 
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.help-button:hover {
  background-color: #45a049;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
}

.dark .help-button {
  color: #f9fafb; 
}

.dark .status-panel {
  background-color: #333842;
  color: #fff;
}

.dark .heart {
  color: #ff4757;
}
</style>
