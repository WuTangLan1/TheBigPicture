<!-- src\components\past_games\PastGames.vue -->
  
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import type { Performance } from '@/stores/authStore';

export default defineComponent({
  props: {
    game: {
      type: Object as PropType<Performance>,
      required: true,
    },
    isDark: Boolean
  },
  computed: {
    parsedDetails(): Array<{ term: string, correct: boolean }> {
      if (!this.game || !this.game.record) {
        return [];
      }
      const rawEntries: string[] = this.game.record.split(/_(?=t_|f_)/);
      return rawEntries.map((entry: string) => {
        const result: string = entry.charAt(0);
        const term: string = entry.substring(2);
        return {
          term: term,
          correct: result === 't'
        };
      });
    }
  },
  methods: {
    formatDate(dateString: string): string {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Intl.DateTimeFormat('default', options).format(new Date(dateString));
    }
  }
});
</script>

<template>
  <div class="past-game-container" :class="{ 'dark': isDark }">
    <h3>Game on {{ formatDate(game.gameDate) }}</h3>
    <p>Result: {{ game.result }}</p>
    <p>Score: {{ game.score }}</p>
    <div class="details">
      <span v-for="(item, index) in parsedDetails" :key="index"
            :class="{'correct': item.correct, 'incorrect': !item.correct, 'dark-span': isDark}">
        {{ item.term }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.past-game-container {
  border: 1px solid #ccc;
  padding: 20px;
  margin: 10px 0;
  border-radius: 8px;
  background-color: #f9f9f9;
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
}
.correct {
  background-color: #4CAF50;
}
.incorrect {
  background-color: #F44336;
}
.dark .correct {
  background-color: #4CAF50;
}
.dark .incorrect {
  background-color: #F44336;
}
</style>
