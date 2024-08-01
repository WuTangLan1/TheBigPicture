<!-- src\components\game\GameTile.vue -->
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { useGameStore } from '@/stores/gameStore';

export default defineComponent({
  props: {
    term: {
      type: String as PropType<string>,
      required: true
    },
    index: Number
  },
  setup(props) {
    const gameStore = useGameStore();

    const isStartingTile = computed(() => props.index === 0);
    const isEndingTile = computed(() => props.index === gameStore.shuffledGame.length - 1);
    const isInteractive = computed(() => !isStartingTile.value && !isEndingTile.value && gameStore.interactiveTiles.includes(props.term));
    const isCorrect = computed(() => gameStore.tileStatus[props.term].correct);
    const isIncorrect = computed(() => gameStore.tileStatus[props.term].incorrect);

    const selectTile = () => {
      if (isInteractive.value) {
        gameStore.selectTile(props.term);
      }
    };

    return { selectTile, isStartingTile, isEndingTile, isInteractive, isCorrect, isIncorrect };
  }
});
</script>


<template>
  <div :class="['game-tile', 
                {'starting-tile': isStartingTile, 
                 'ending-tile': isEndingTile, 
                 'non-interactive': !isInteractive, 
                 'correct-tile': isCorrect,
                 'incorrect-tile': isIncorrect
                }]" 
       @click="selectTile">
    {{ term || 'Empty term' }}
  </div>
</template>

<style scoped>
.game-tile {
  background-color: #f1f0f5;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 5px 15px;
  font-size: 14px;
  text-align: center;
  font-family: 'Arial', sans-serif;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
  height: auto;
  min-width: 120px;
  max-width: 200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
  } 

  .dark .game-tile {
    background-color: #d6d6d6; 
    border-color: #666; 
    color: #000000;
    box-shadow: 0 2px 4px rgba(255,255,255,0.1);
    }
    
  .game-tile:hover {
    transform: translateY(-3px);
  }
  
  .starting-tile {
    background-color: green; 
    color: white;
    cursor: default; 
    pointer-events: none; 
  }

  .ending-tile {
    background-color: rgb(64, 70, 160); 
    color: white;
    cursor: default; 
    pointer-events: none; 
  }

  .dark .starting-tile {
    background-color: green; 
    color: white;
    cursor: default; 
    pointer-events: none; 
  }

  .dark .ending-tile {
    background-color: rgb(64, 70, 160); 
    color: white;
    cursor: default; 
    pointer-events: none; 
  }

  .non-interactive {
    opacity: 0.8;
    cursor: not-allowed;
  }

  .game-tile:hover:not(.non-interactive) {
      background-color: #afc4ee;
      box-shadow: 0 2px 4px rgba(17, 14, 59, 0.651);
      transform: translateY(-3px);
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }

  .correct-tile {
    background-color: green; 
    color: white;
    cursor: default; 
    pointer-events: none; 
  }

  .incorrect-tile {
    animation: flash-red 2s;
  }

  @keyframes flash-red {
    0%, 100% { background-color: #f1f0f5; }
    50% { background-color: red; }
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
  
  
  
  
  
  