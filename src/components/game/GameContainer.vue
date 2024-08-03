<!-- GameContainer.vue -->

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch, onUnmounted } from 'vue';
import { useGameStore } from '@/stores/gameStore';
import GameTile from './GameTile.vue';
import GameInfo from './GameInfo.vue';

export default defineComponent({
  components: {
    GameTile,
    GameInfo
  },
  setup() {
    const gameStore = useGameStore();
    const containerSize = ref(0);
    const radius = computed(() => containerSize.value / 2 - 30); 

    const adjustRadius = () => {
      const container = document.querySelector('.tiles');
      if (container) {
        containerSize.value = Math.min(container.clientWidth, container.clientHeight);
      }
    };

    const getTilePosition = (index: number, total: number) => {
      const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
      const x = Math.cos(angle) * radius.value;
      const y = Math.sin(angle) * radius.value;
      return `translate(${x}px, ${y}px)`;
    };

    onMounted(() => {
      gameStore.fetchTodayGame();
      adjustRadius();
      window.addEventListener('resize', adjustRadius);
    });

    watch(() => gameStore.shuffledGame.length, adjustRadius, { immediate: true });

    onUnmounted(() => {
      window.removeEventListener('resize', adjustRadius);
    });

    return { gameStore, getTilePosition, radius };
  }
});
</script>


<template>
    <div v-if="gameStore.completedToday">
    <p>You have already completed today's game!</p>
  </div>
  <div v-else class="game-container">
    <div class="tiles">
      <GameTile
        v-for="(term, index) in gameStore.shuffledGame"
        :key="index"
        :term="term"
        :index="index"
        :style="{ transform: getTilePosition(index, gameStore.shuffledGame.length) }"
      />
    </div>
    <div class="game-info">
      <GameInfo />
    </div>
  </div>
</template>

<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 60vh;
  background-color: #e0e7f3;
  border-radius: 0.4rem;
  padding-bottom: 10px;
}

.dark .game-container {
  background-color: #111827;
}

.tiles {
  position: relative;
  width: 98%; 
  height: 100%; 
  padding-top: 16px;
  padding-bottom: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; 
  margin-top: 10px;
  margin-bottom: 10px;
}

.game-tile {
  position: absolute;
  width: 55px; 
  height: 55px;  
  display: flex;
  padding-top: 2px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  transition: transform 0.3s ease;
}

@media (max-width: 600px) {
  .game-tile {
    width: 60px; 
    height: 48px;
    font-size: 13px;
  }
}

@media (max-width: 570px) {
  .game-tile {
    width: 55px; 
    font-size: 11px;
    height: 49px;
  }
}

@media (max-width: 520px) {
  .game-tile {
    width: 52px; 
    font-size: 11px;
    height: 49px;
  }
}

@media (max-width: 470px) {
  .game-tile {
    width: 50px; 
    font-size: 11px;
    height: 47px;
  }
}

@media (max-width: 440px) {
  .game-tile {
    width: 48px; 
    font-size: 10.5px;
    height: 45px;
  }
}

@media (max-width: 410px) {
  .game-tile {
    width: 35px; 
    font-size: 10px;
    height: 30px;
  }
}

.game-info {
  width: calc(100% - 50px);
  text-align: center;
}
</style>
