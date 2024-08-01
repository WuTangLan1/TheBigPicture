<!-- src\views\HomeView.vue -->
<script lang="ts">
import GameContainer from '@/components/game/GameContainer.vue';
import GameOverModal from '@/components/game/GameOverModal.vue';
import ExplanationContainer from '@/components/help/ExplanationContainer.vue'; 
import { useGameStore } from '@/stores/gameStore';
import {computed, onMounted} from 'vue'

export default {
  components: {
    GameContainer,
    GameOverModal,
    ExplanationContainer
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
  <div class="home-page">
    <ExplanationContainer />
    <GameContainer /> 
    <GameOverModal :visible="isGameOver" />
  </div>
</template>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center align the items horizontally */
  justify-content: center; /* Adjust the distribution of children along the column */
  width: 100%;
  min-height: 100vh; /* Make sure it takes at least the full height of the viewport */
  padding: 20px;
  box-sizing: border-box;
}

.welcome-section {
  margin-bottom: 20px;
}

</style>
