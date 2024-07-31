<!-- src\components\navbar\darkmode\DarkModeToggle.vue -->
<script lang="ts">
import { inject } from 'vue';

type ToggleFunction = () => void;

export default {
  name: 'DarkModeToggle',
  setup() {
    const toggleDark = inject<ToggleFunction>('toggleDark');

    if (!toggleDark) {
      throw new Error('toggleDark not provided!');
    }

    const toggle = () => {
      toggleDark();
    };

    return { toggle };
  }
}
</script>

<template>
  <div @click="toggle" class="dark-mode-icon">
    <img src="@/assets/images/navbar/dark-mode.png" alt="Toggle Dark Mode" />
  </div>
</template>

<style scoped>
.dark-mode-icon {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.dark-mode-icon img {
  width: 30px; 
  height: auto;
}

.dark-mode-icon:hover {
  transform: scale(1.1);
}
</style>