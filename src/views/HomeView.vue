<!-- src\views\HomeView.vue -->
<script lang="ts">
import GameContainer from '@/components/game/GameContainer.vue';
import GameOverModal from '@/components/game/GameOverModal.vue'; 
import { useGameStore } from '@/stores/gameStore';
import {computed, onMounted} from 'vue'

export default {
  components: {
    GameContainer,
    GameOverModal
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
    <GameContainer /> 
    <GameOverModal :visible="isGameOver" />
  </div>
</template>

<style scoped>
.home-view {
  display: flex;
  margin:auto 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.welcome-section {
  margin-bottom: 20px;
}

</style>
