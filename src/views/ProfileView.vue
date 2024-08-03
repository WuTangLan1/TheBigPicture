<!-- src\views\ProfileView.vue -->

<script lang="ts">
import { defineComponent, inject, Ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import PastGames from '@/components/past_games/PastGames.vue';
import { auth } from '@/firebase/fbConfig';
import { signOut } from 'firebase/auth';

export default defineComponent({
  components: {
    PastGames
  },
  setup() {
    const authStore = useAuthStore();
    const isDark = inject('isDark') as Ref<boolean> | undefined;
    const router = useRouter();

    const isDarkValue = isDark?.value ?? false;

    const logout = async () => {
      await signOut(auth); 
      router.push('/authentication'); 
    };

    return {
      authStore,
      user: authStore.user,
      performances: authStore.performances,
      isDark: isDarkValue,
      logout
    };
  }
});
</script>

<template>
  <div class="profile-page" :class="{ 'dark': isDark }">
    <h1>Profile Page</h1>
    <p>Welcome, {{ user?.email || 'Guest' }}</p>
    <button @click="logout" :disabled="authStore.isLoading">Logout</button>
    <div v-if="authStore.isLoading">Loading...</div>
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
button {
  padding: 10px 20px;
  background-color: #af574c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color:  #6b2a22;
}
</style>
