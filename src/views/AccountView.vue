<!-- src/views/AccountView.vue -->
<script lang="ts">
import { ref, defineComponent } from 'vue';
import LoginContainer from '../components/auth/login/LoginContainer.vue';
import RegisterContainer from '../components/auth/register/RegisterContainer.vue';

export default defineComponent({
  name: 'AccountView',
  components: {
    LoginContainer,
    RegisterContainer,
  },
  setup() {
    const isRegisterView = ref(true);
    const currentView = ref('RegisterContainer');

    const toggleView = () => {
      isRegisterView.value = !isRegisterView.value;
      currentView.value = isRegisterView.value ? 'RegisterContainer' : 'LoginContainer';
    };

    return {
      isRegisterView,
      currentView,
      toggleView,
    };
  },
});
</script>

<template>
  <div class="page-container">
    <button @click="toggleView" class="toggle-button">
      {{ isRegisterView ? 'Switch to Login' : 'Switch to Register' }}
    </button>
    <div class="auth-container">
      <component :is="currentView" class="form-component" />
    </div>
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  max-width: 500px;
  padding: 20px;
  background-color: #e2e4f14b;
}

.dark .page-container {
  background-color: #2d3748; 
}

.toggle-button {
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #8342b9;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.dark .toggle-button {
  background-color: #256d51; 
}


.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 98%;
}

.form-component {
  width: 100%;
  max-width: 400px;
}
</style>
