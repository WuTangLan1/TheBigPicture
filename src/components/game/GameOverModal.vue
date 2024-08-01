<!-- src\components\game\GameOverModal.vue -->
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useGameStore } from '@/stores/gameStore';

export default defineComponent({
  setup() {
    const gameStore = useGameStore();

    const gameStatus = computed(() => gameStore.gameStatus);
    const message = computed(() => `You finished the game with ${gameStore.lives} lives remaining.`);
    const isModalVisible = computed(() => gameStore.isModalVisible); // Computed to track modal visibility

    function closeModal() {
      gameStore.closeModal(); // Call closeModal action that just hides the modal
    }

    return { gameStatus, message, closeModal, isModalVisible };
  }
});
</script>

<template>
  <div v-if="isModalVisible" class="game-over-modal">
    <div class="modal-content">
      <h1>{{ gameStatus === 'won' ? 'Congratulations, You Won!' : 'Game Over' }}</h1>
      <p>{{ message }}</p>
      <button class="close-button" @click="closeModal">Close</button>
    </div>
  </div>
</template>
 
<style scoped>
.game-over-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.836);
  animation: fadeIn 0.3s;
}

.modal-content {
  background: white;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 50%;
  max-width: 400px;
  text-align: center;
}

h1 {
  font-size: 24px;
  color: #4CAF50; 
}

p {
  font-size: 16px;
  color: #333;
  margin-top: 20px;
}

.close-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 20px;
  transition: background-color 0.3s, transform 0.2s;
}

.close-button:hover {
  background-color: #45a049;
  transform: scale(1.05);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>