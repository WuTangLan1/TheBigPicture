<!-- src\components\game\GameTile.vue -->
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { useGameStore } from '@/stores/gameStore';

function blendColors(color1: string, color2: string, fraction: number): string {
  const r1 = parseInt(color1.slice(1, 3), 16);
  const g1 = parseInt(color1.slice(3, 5), 16);
  const b1 = parseInt(color1.slice(5, 7), 16);

  const r2 = parseInt(color2.slice(1, 3), 16);
  const g2 = parseInt(color2.slice(3, 5), 16);
  const b2 = parseInt(color2.slice(5, 7), 16);

  const r = Math.round(r1 + (r2 - r1) * fraction);
  const g = Math.round(g1 + (g2 - g1) * fraction);
  const b = Math.round(b1 + (b2 - b1) * fraction);

  return `rgb(${r}, ${g}, ${b})`;
}

export default defineComponent({
  props: {
    term: {
      type: String as PropType<string>,
      required: true
    },
    index: {
      type: Number,
      required: true,
      default: 0 
    }
  },
  setup(props) {
    const gameStore = useGameStore();

    const isStartingTile = computed(() => props.index === 0);
    const isEndingTile = computed(() => props.index === gameStore.shuffledGame.length - 1);
    const isInteractive = computed(() => !isStartingTile.value && !isEndingTile.value && gameStore.interactiveTiles.includes(props.term));
    const isCorrect = computed(() => gameStore.tileStatus[props.term].correct);
    const isIncorrect = computed(() => gameStore.tileStatus[props.term].incorrect);

    const backgroundColor = computed(() => {
      const green = "#00ff00"; 
      const blue = "#4046A0"; 

      if (isStartingTile.value) {
        return green;
      } else if (isEndingTile.value) {
        return blue;
      } else if (isCorrect.value) {
        const correctIndex = gameStore.currentGame.indexOf(props.term);
        const fraction = correctIndex / (gameStore.currentGame.length - 1);
        return blendColors(green, blue, fraction);
      }
      return '#f1f0f5'; 
    });

    const selectTile = () => {
      if (isInteractive.value) {
        gameStore.selectTile(props.term);
      }
    };

    return { selectTile, isStartingTile, isEndingTile, isInteractive, backgroundColor, isCorrect, isIncorrect };
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
       @click="selectTile"
       :style="{ backgroundColor: backgroundColor }">
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
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
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
    color: rgb(0, 0, 0);
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
    color: rgb(0, 0, 0);
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
  .incorrect-tile {
    animation: flash-red 2s;
  }

  @keyframes flash-red {
    0%, 100% { background-color: #f1f0f5; }
    50% { background-color: red; }
  }
  
  </style>
  
  
  
  
  
  