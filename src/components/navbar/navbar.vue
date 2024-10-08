<!-- src\components\navbar\navbar.vue -->

<script lang="ts">
import { defineComponent, inject, computed, Ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth } from 'firebase/auth';
import DarkModeToggle from './darkmode/DarkModeToggle.vue';

export default defineComponent({
  name: 'Nav-bar',
  components: {
    DarkModeToggle
  },
  setup() {
    const router = useRouter();
    const isDark = inject('isDark') as Ref<boolean>;
    const auth = getAuth();

    const logoSrc = computed(() => {
      return isDark.value ? require('@/assets/logos/darklogo.png') : require('@/assets/logos/lightlogo.png');
    });

    const isAuthenticated = () => {
      return !!auth.currentUser; 
    };

    const navigateHome = () => {
      router.push('/');
    };

    const navigateAccount = () => {
      const route = isAuthenticated() ? '/profile' : '/authentication';
      router.push(route);
    };

    return {
      isDark,
      logoSrc,
      navigateHome,
      navigateAccount
    }
  }
});
</script>


<template>
  <nav class="navbar">
    <div class="container">
      <div @click="navigateHome" class="navbar-logo">
        <img :src="logoSrc" alt="Logo" class="logo">
      </div>
      <div class="navbar-links">
        <div @click="navigateHome" class="navbar-icon" title="Home">
          <img src="@/assets/images/navbar/base.png" alt="Home">
        </div>
        <div @click="navigateAccount" class="navbar-icon" title="Account">
          <img src="@/assets/images/navbar/account.png" alt="Account">
        </div>
        <dark-mode-toggle></dark-mode-toggle>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #afc4ee; 
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 0 10px;
}

.dark .navbar {
  background-color: #2e4058;
  color: #f9fafb; 
}

.container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-logo img {
  max-height: 50px; 
}

.navbar-links {
  display: flex;
  gap: 20px;
}

.navbar-icon,
.dark-mode-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, background-color 0.3s ease;
}

@media(max-width:420px)
{
  .navbar-logo img {
    max-height: 40px; 
  }

  .navbar-links {
    display: flex;
    gap: 15px;
  }

  .navbar-icon,
  .dark-mode-icon {
    width: 34px;
    height: 34px;
  }
  .navbar-icon img,
  .dark-mode-icon img {
    max-width: 20px; 
    max-height: 20px;
  }
}

@media(max-width:350px)
{
  .navbar-logo img {
    max-height: 35px; 
  }

  .navbar-links {
    display: flex;
    gap: 12px;
  }

  .navbar-icon,
  .dark-mode-icon {
    width: 30px;
    height: 30px;
  }
  .navbar-icon img,
  .dark-mode-icon img {
    max-width: 15px; 
    max-height: 15px;
  }
}

.navbar-icon img,
.dark-mode-icon img {
  max-width: 24px; 
  max-height: 24px;
}

.navbar-icon:hover,
.dark-mode-icon:hover {
  transform: scale(1.1);
  background-color: #ac89c9;
}

.active-icon {
  transform: scale(1.1);
  background-color: #ac89c9;
}

.dark .active-icon {
  background-color: #ac89c9;
}

.dark .navbar-icon:hover,
.dark .dark-mode-icon:hover {
  background-color: #ac89c9;
}
</style>