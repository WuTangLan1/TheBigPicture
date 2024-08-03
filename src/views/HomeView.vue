<!-- src\views\HomeView.vue -->
<script lang="ts">
import GameContainer from '@/components/game/GameContainer.vue';
import GameOverModal from '@/components/game/GameOverModal.vue';
import ExplanationContainer from '@/components/help/ExplanationContainer.vue'; 
import TodayGameResult from '@/components/game/TodayGameResult.vue';
import { useGameStore } from '@/stores/gameStore';
import { computed, onMounted } from 'vue'

export default {
  components: {
    GameContainer,
    GameOverModal,
    ExplanationContainer,
    TodayGameResult
  },
  setup() {
    const gameStore = useGameStore();
    
    onMounted(() => {
        gameStore.fetchTodayGame();
    });
    
    const gameTerms = computed(() => {
        return gameStore.currentGame;
    });

    const isGameOver = computed(() => gameStore.gameStatus === 'won' || gameStore.gameStatus === 'lost');

    return { gameTerms, gameStore, isGameOver };
  }
};
</script>

<template>
  <div class="home-view">
    <ExplanationContainer />
    <GameContainer />
    <TodayGameResult/>
    <GameOverModal :visible="isGameOver" />
  </div>
</template>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: flex-start; 
  padding: 10px 0 0 0; 
  margin-top: 0; 
  box-sizing: border-box;
  height: 100vh;
  width: 100%;
  overflow: hidden; 
}

@media (max-width: 500px) {
  .home-view {
    padding: 0;
  }
}
</style>

