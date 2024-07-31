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

    return { gameTerms };
    }
});
</script>

<template>
  <div class="game-container">
    <GameTile v-for="(term, index) in gameTerms" :key="index" :term="term" />
  </div>
  <GameInfo />
</template>

<style scoped>
.game-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 20px; 
  padding: 20px;
  justify-content: center; 
  align-items: center; 
  margin: auto; 
  max-width: 960px; 
}

.dark .game-container {
  color: #fff; 
}
</style>


