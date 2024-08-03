<!-- src\views\ProfileView.vue -->

<script lang="ts">
import { defineComponent, inject, Ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import PastGames from '@/components/past_games/PastGames.vue';

export default defineComponent({
  components: {
    PastGames
  },
  setup() {
    const authStore = useAuthStore();
    const isDark = inject('isDark') as Ref<boolean> | undefined;

    const isDarkValue = isDark?.value ?? false;

    return {
      user: authStore.user,
      performances: authStore.performances,
      isDark: isDarkValue
    };
  }
});
</script>


<template>
  <div class="profile-page" :class="{ 'dark': isDark }">
    <h1>Profile Page</h1>
    <p>Welcome, {{ user?.email || 'Guest' }}</p>
    <div class="past-games">
      <h2>Past Games</h2>
      <PastGames v-for="game in performances" :key="game.id" :game="game" :is-dark="isDark" />
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  padding: 20px;
}
.past-games {
  margin-top: 20px;
}
.dark .profile-page {
  color: #fff;
}
</style>
