<!-- src\components\help\HelpModal.vue -->
<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
import { useDark } from '@vueuse/core';

export default defineComponent({
  props: {
    visible: Boolean
  },
  emits: ['update:visible'], 
  setup(props, { emit }) {
    const isDark = useDark();
    const firstHelpImage = ref('');
    const secondHelpImage = ref('');

    watchEffect(async () => {
      const firstImage = !isDark.value ? 'first_dark.png' : 'first_light.png';
      const secondImage = !isDark.value ? 'second_dark.png' : 'second_light.png';
      firstHelpImage.value = (await import(`@/assets/images/help/${firstImage}`)).default;
      secondHelpImage.value = (await import(`@/assets/images/help/${secondImage}`)).default;
    });

    function close() {
      emit('update:visible', false);
    }

    return { close, firstHelpImage, secondHelpImage };
  }
});
</script>
<template>
  <div v-if="visible" class="help-modal-overlay">
    <div class="help-modal">
      <h2>Help Information</h2>
      <p>Here are some useful tips to get you started...</p>
      <div class="help-images">
        <img :src="firstHelpImage" alt="Help Image 1">
        <img :src="secondHelpImage" alt="Help Image 2">
      </div>
      <button @click="close" class="close-button">Close</button>
    </div>
  </div>
</template>

<style scoped>
.help-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.help-modal {
  background-color: var(--modal-background-color, #fff);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  width: 90%;
  position: relative;
  overflow: hidden; 
}

@media (max-width: 800px) {
  .help-modal-overlay {
    align-items: flex-start;
  }
  .help-modal {
    width: 80%;
    height: 65%; 
  }
}

.help-images {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
}

@media (min-width: 800px) {
  .help-images {
    flex-direction: row;
    justify-content: space-around;
  }
}

img {
  max-width: 100%;
  border: 1px solid var(#ddd);
  padding: 5px;
}

h2 {
  color: black;
}

.close-button {
  position: absolute;
  right: 20px;
  bottom: 10px;
  padding: 10px 20px;
  background-color: rgb(194, 158, 40);
  color: #fff;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.close-button:hover {
  background-color: var( #45a049);
}
</style>
