<!-- src\components\game\GameContainer.vue -->
<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { useGameStore } from '@/stores/gameStore';
import GameTile from './GameTile.vue';

export default defineComponent({
  components: {
    GameTile
  },
  setup() {
    const gameStore = useGameStore();
    
    onMounted(() => {
        gameStore.fetchTodayGame();
    });
    
    const gameTerms = computed(() => {
        console.log("Game Terms: ", gameStore.currentGame); // Debugging
        return gameStore.currentGame;
    });

    return { gameTerms };
    }
});
</script>

<template>
  <div class="game-container">
    <GameTile v-for="(term, index) in gameTerms" :key="index" :term="term" />
  </div>
</template>

  
<style scoped>
    .game-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      justify-items: center;
      align-items: center;
      padding: 20px;
      transform: rotate(45deg); 
    }
    
    .game-container::before {
      content: '';
      width: 100%;
      padding-top: 100%;
      grid-column: 1 / 4;
      grid-row: 1 / 4;
    }
</style>
  