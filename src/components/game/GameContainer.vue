<!-- src\components\game\GameContainer.vue -->
<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { useGameStore } from '@/stores/gameStore';
import GameTile from './GameTile.vue';
import GameInfo from './GameInfo.vue';

export default defineComponent({
  components: {
    GameTile,
    GameInfo
  },
  setup() {
    const gameStore = useGameStore();
    
    onMounted(() => {
        gameStore.fetchTodayGame();
    });
    
    const gameTerms = computed(() => {
        return gameStore.currentGame;
    });

    return { gameTerms, gameStore };
    }
});
</script>

<template>
  <div class="game-container">
    <div class="tiles">
      <GameTile v-for="(term, index) in gameStore.shuffledGame" :key="index" :term="term" :index="index" />
    </div>
    <GameInfo />
  </div>
</template>

<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px; 
  padding: 20px;
  margin: auto; 
  max-width: 960px; 
}

.tiles {
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 20px; 
  justify-content: center; 
  align-items: center; 
}

.dark .game-container {
  color: #fff; 
}
</style>

