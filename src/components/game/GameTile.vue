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
    padding: 10px 20px; 
    text-align: center;
    font-size: 16px;
    font-family: 'Arial', sans-serif;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    transition: all 0.3s ease;
    height: auto;
    min-width: 180px; 
    max-width: 300px; 
    margin: 0 auto; 
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100px; 
  }

  .dark .game-tile {
    background-color: #7c7878; 
    border-color: #666; 
    color: #ddd;
    box-shadow: 0 2px 4px rgba(255,255,255,0.1);
    }
    
  .game-tile:hover {
    background-color: #e8e8e8;
    transform: translateY(-3px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }

  .dark .game-tile:hover {
    background-color: #193f79;
    transform: translateY(-3px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
  
  

  @media (max-width: 750px) {
        .game-tile {
        min-width: 120px; 
        max-width: 200px; 
        padding: 5px 15px; 
        font-size: 14px; 
        }
    }
    @media (max-width: 550px) {
        .game-tile {
        min-width: 100px; 
        max-width: 180px; 
        padding: 5px 15px; 
        font-size: 14px; 
        min-height:90px; 
        }
    }
    @media (max-width: 475px) {
        .game-tile {
        min-width: 80px; 
        max-width: 150px; 
        padding: 5px 10px; 
        min-height: 60px; 
        font-size: 12px; 
    }
    @media (max-width: 380px) {
        .game-tile {
        min-width: 70px; 
        max-width: 120px; 
        padding: 5px 10px; 
        font-size: 12px; 
    }
    }
    @media (max-width: 340px) {
        .game-tile {
        min-width: 60px; 
        max-width: 120px; 
        padding: 5px 5px; 
        font-size: 10px; 
      }
    }
}
  
  </style>
  
  
  
  
  
  