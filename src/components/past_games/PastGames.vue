<!-- src\components\past_games\PastGames.vue -->
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import type { Performance } from '@/stores/authStore';

export default defineComponent({
  props: {
    game: {
      type: Object as PropType<Performance>,
      required: true,
    }
  },
  methods: {
    formatDate(dateString: string) {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Intl.DateTimeFormat('default', options).format(new Date(dateString));
    }
  }
});
</script>

<template>
    <div class="past-game-container">
      <h3>Game on {{ formatDate(game.gameDate) }}</h3>
      <p>Result: {{ game.result }}</p>
      <p>Score: {{ game.score }}</p>
      <p>Details: {{ game.record }}</p>
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
  </style>
  