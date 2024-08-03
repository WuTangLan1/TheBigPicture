<!-- src/components/game/TodayGameResult.vue -->

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useGameStore } from '@/stores/gameStore';

export default defineComponent({
  setup() {
    const gameStore = useGameStore();

    // Utilize a method to format and capitalize terms consistently
    const formatTerm = (term: string) => {
      // Replace underscores with spaces and capitalize each word
      return term.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    };

    const parsedGameRecord = computed(() => {
      return gameStore.todayPerformance?.record.split(/_(?=t_|f_)/).map(part => {
        const prefix = part.charAt(0);
        const term = part.slice(2);
        return {
          term: formatTerm(term), // Format term for display
          correct: prefix === 't' // Determine if the term was guessed correctly
        };
      }) || [];
    });

    return { gameStore, parsedGameRecord };
  }
});
</script>

<template>
  <div v-if="gameStore.completedToday" class="past-game-container">
    <h3>Today's Game Result</h3>
    <p>Score: {{ gameStore.todayPerformance?.score }}</p>
    <div class="details">
      <span v-for="(item, index) in parsedGameRecord" :key="index"
            :class="{'correct': item.correct, 'incorrect': !item.correct}">
        {{ item.term }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.past-game-container {
  border: 1px solid #ccc;
  padding: 20px;
  margin-top: 20px;
  border-radius: 8px;
  background-color: #e5e6f3;
  width: calc(100% - 70px);
  min-width: 82vw;
  max-width: 560px;
}

.dark .past-game-container {
    background-color: #afc4ee;
  border-color: #777;
  color: black;
}
.details span {
  display: inline-block;
  margin: 5px;
  padding: 5px;
  border-radius: 4px;
  font-weight: bold;
}
.correct {
  background-color: #4CAF50;
  color: white;
}
.incorrect {
  background-color: #F44336;
  color: white;
}

.dark .correct {
  background-color: #4CAF50;
  color: white;
}
.dark .incorrect {
  background-color: #F44336;
  color: white;
}
</style>

