<!-- src\views\HomeView.vue -->
<script lang="ts">
import GameContainer from '@/components/game/GameContainer.vue'; 

export default {
  components: {
    GameContainer 
  }
};
</script>

<template>
  <div class="home-page">
    <GameContainer /> 
  </div>
</template>

<style scoped>
.home-view {
  display: flex;
  margin:auto 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.welcome-section {
  margin-bottom: 20px;
}

</style>
