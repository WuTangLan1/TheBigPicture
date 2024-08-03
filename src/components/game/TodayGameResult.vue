<!-- src/components/game/TodayGameResult.vue -->
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useGameStore } from '@/stores/gameStore';

export default defineComponent({
  setup() {
    const gameStore = useGameStore();

    // Define the type of `str` as string
    const capitalize = (str: string) => {
      return str.replace(/_/g, ' ').split(' ').map((word: string) => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
    };

    const parsedGameRecord = computed(() => {
      return gameStore.todayPerformance?.record.split('_').map(part => {
        const prefix = part.charAt(0);
        const term = part.slice(2);
        return {
          term: capitalize(term),
          correct: prefix === 't'
        };
      }) || [];
    });

    return { gameStore, parsedGameRecord };
  }
});
</script>

<template>
  <div v-if="gameStore.completedToday" class="game-result">
    <h3>Today's Game Result</h3>
    <p>Score: {{ gameStore.todayPerformance?.score }}</p>
    <div class="details">
      <div v-for="(item, index) in parsedGameRecord" :key="index"
        :class="{'correct': item.correct, 'incorrect': !item.correct}">
        {{ item.term }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.game-result {
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  margin-top: 20px;
}
.details div {
  display: inline-block;
  margin-right: 10px;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: #e0e0e0;
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
</style>
