<!-- src\components\game\GameOverModal.vue -->

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useGameStore } from '@/stores/gameStore';

export default defineComponent({
  setup() {
    const gameStore = useGameStore();

    const isModalVisible = computed(() => gameStore.isModalVisible);
    const guessDetails = computed(() => gameStore.guesses.map(guess => ({
      tile: guess.tile,
      correct: guess.correct ? 'Correct' : 'Incorrect'  // Ensure this reflects the actual game state
    })));
    const gameStatusMessage = computed(() => gameStore.gameStatus === 'won' ? 'Congratulations, You Won!' : 'Game Over, You Lost');

    const performanceMessage = computed(() => {
      const correctGuesses = guessDetails.value.filter(g => g.correct === 'Correct').length;
      const totalGuesses = guessDetails.value.length;
      const percentageCorrect = totalGuesses > 0 ? (correctGuesses / totalGuesses) * 100 : 0;

      if (percentageCorrect === 100) {
        return 'Perfect game! All guesses were correct!';
      } else if (percentageCorrect >= 50) {
        return `Good effort! You got ${percentageCorrect.toFixed(2)}% of your guesses correct.`;
      } else {
        return 'Keep practicing! Less than half your guesses were correct.';
      }
    });

    function exportResults() {
      const dataStr = JSON.stringify(guessDetails.value, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = "game-results.json";
      link.click();
      URL.revokeObjectURL(url);
    }

    function closeModal() {
      gameStore.closeModal();
    }

    return { isModalVisible, gameStatusMessage, performanceMessage, guessDetails, exportResults, closeModal };
  }
});
</script>

<template>
  <div v-if="isModalVisible" class="game-over-modal">
    <div class="modal-content">
      <h1>{{ gameStatusMessage }}</h1>
      <p>{{ performanceMessage }}</p>
      <div class="guesses-container">
        <div v-for="(guess, index) in guessDetails" :key="index"
             :class="['guess-item', guess.correct === 'Correct' ? 'correct' : 'incorrect']">
          {{ guess.tile }}
        </div>
      </div>
      <div class="button-container">
        <button @click="exportResults" class="export-button">Export Results</button>
        <button @click="closeModal" class="close-button">Close</button>
      </div>
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
  background-color: rgba(0, 0, 0, 0.75);
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 92vw;
  max-width: 600px;
  text-align: center;
}

.guesses-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%; 
}

.guess-item {
  flex: 1 1 48%; 
  margin: 1%; 
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  box-sizing: border-box; 
}


.correct {
  background-color: #4CAF50;
  color: white;
}

.incorrect {
  background-color: #F44336;
  color: white;
}

h1, p {
  margin-bottom: 20px; 
}

.button-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.export-button, .close-button {
  padding: 12px 25px;
  font-size: 16px;
  border-radius: 5px;
  margin-top: 20px;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  flex-grow: 1;
}

.export-button {
  background-color: #007BFF;
  margin-right: 10px; 
}

.export-button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.close-button {
  background-color: #af5b4c;
}

.close-button:hover {
  background-color: #af3c27;
  transform: scale(1.05);
}

.dark .game-over-modal {
  background-color: rgba(0, 0, 0, 0.85); 
}

.dark .modal-content {
  background: #333; 
  color: white;
}

.dark .correct {
  background-color: #27632a;
}

.dark .incorrect {
  background-color: #8b1e10; 
}

.dark .export-button {
  background-color: #7a2c76; 
}

.dark .close-button{
  background-color: #c14949; 
}


@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>