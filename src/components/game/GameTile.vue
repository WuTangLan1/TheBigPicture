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
    background-color: white;
    border: 2px solid black;
    border-radius: 10px;
    padding: 10px 20px;
    text-align: center;
    transition: background-color 0.3s;
  }
  
  .game-tile:hover {
    background-color: lightgray;
  }
  </style>
  