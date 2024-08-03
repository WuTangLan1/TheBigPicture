<!-- src\views\ProfileView.vue -->
<template>
  <div class="profile-page">
    <h1>Profile Page</h1>
    <p>Welcome, {{ user?.email || 'Guest' }}</p>
    <div class="past-games">
      <h2>Past Games</h2>
      <PastGames v-for="game in performances" :key="game.id" :game="game" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import PastGames from '@/components/past_games/PastGames.vue';

export default defineComponent({
  components: {
    PastGames
  },
  setup() {
    const authStore = useAuthStore();
    return {
      user: authStore.user,
      performances: authStore.performances
    };
  }
});
</script>

<style scoped>
.profile-page {
  padding: 20px;
}
.past-games {
  margin-top: 20px;
}
</style>
