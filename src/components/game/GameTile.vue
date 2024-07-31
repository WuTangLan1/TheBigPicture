<!-- src\components\game\GameTile.vue -->
<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    term: {
      type: String as PropType<string>,
      required: true
    }
  }
});
</script>

<template>
    <div class="game-tile">
      {{ term || 'Empty term' }} 
    </div>
  </template>
  
  
  <style scoped>
  .game-tile {
    background-color: #ffffff;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px 20px; /* Slightly increased padding for better aesthetics */
    text-align: center;
    font-size: 16px;
    font-family: 'Arial', sans-serif;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    transition: all 0.3s ease;
    height: auto; /* Allows tile height to adjust based on content */
    min-width: 180px; /* Minimum width for better control */
    max-width: 300px; /* Maximum width to avoid too wide tiles */
    margin: 0 auto; /* Center tiles within their grid cells */
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100px; /* Consistent height across all tiles */
  }
  
  .game-tile:hover {
    background-color: #e8e8e8;
    transform: translateY(-3px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
  </style>
  
  
  
  
  