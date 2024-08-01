<!-- src\components\game\GameInfo.vue -->

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useGameStore } from '@/stores/gameStore';

export default defineComponent({
  setup() {
    const gameStore = useGameStore();

    const currentTile = computed(() => gameStore.selectedTiles.slice(-1)[0] || '');
    const lives = computed(() => Array(gameStore.lives).fill(0));

    const showHelp = () => {
      alert("Help information goes here.");
    };

    return { currentTile, lives, showHelp };
  }
});
</script>

<template>
    <div class="status-panel">
      <div class="info-section">
        <div class="selected-tile-info">
        <span class="current-tile">{{ currentTile || 'None Selected' }}</span>
        </div>
        <div class="lives-display">
          <span v-for="life in lives" :key="life" class="heart">
            <font-awesome-icon icon="heart" />
          </span>
        </div>
        <button @click="showHelp">Help</button>
      </div>
    </div>
</template>

<style scoped>
.status-panel {
  margin-top: 20px;
  padding: 20px;
  background-color: #f0f0f0;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  width: calc(100% - 70px);
  max-width: 460px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center; 
  align-items: center;
}

.info-section {
  display: flex;
  justify-content: space-between; 
  align-items: center;
  width: 100%; 
}

.selected-tile-info, .lives-display, button {
  flex: 1; 
  margin: 0 10px; 
}

.current-tile {
  font-weight: bold;
  color: #333;
}

.dark .current-tile {
    color: white;
}

.heart {
  color: red;
  margin-left: 5px;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  transition: background-color 0.3s, box-shadow 0.3s;
}

button:hover {
  background-color: #45a049;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
}

.dark .status-panel {
  background-color: #333842;
  color: #fff;
}

.dark .heart {
  color: #ff4757;
}

</style>
