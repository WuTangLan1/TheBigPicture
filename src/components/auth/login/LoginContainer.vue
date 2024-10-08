<!-- src/components/auth/login/LoginContainer.vue -->
<!-- src/components/auth/login/LoginContainer.vue -->
<script lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import ForgotPasswordModal from './forgotpassword/ForgotPasswordModal.vue';
import { auth } from '@/firebase/fbConfig.js';

export default {
  name: 'LoginContainer',
  components : {
    ForgotPasswordModal
  },
  setup() {
    const router = useRouter();
    const showForgotPassword = ref(false);
    const email = ref('');
    const password = ref('');
    const showPassword = ref(false);
    const isLoading = ref(false);
    const isSuccess = ref(false);
    const isError = ref('');
    const loginText = ref('Login');

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const passwordFieldType = computed(() => (showPassword.value ? 'text' : 'password'));

    const handleSubmit = async () => {
      isLoading.value = true;
      loginText.value = '';
      try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        isSuccess.value = true;
        setTimeout(() => {
          router.push({ name: 'home' });
        }, 2000);
      } catch (error) {
          const errorMessage = (error as { message: string }).message; 
          isError.value = errorMessage;
          setTimeout(() => {
            isError.value = '';
            isLoading.value = false;
            isSuccess.value = false;
            loginText.value = 'Login';
          }, 5000);
        }
    };

    const openForgotPasswordModal = () => {
      showForgotPassword.value = true;
    };


    return {
      email,
      password,
      showPassword,
      togglePasswordVisibility,
      passwordFieldType,
      handleSubmit,
      isLoading,
      isSuccess,
      isError,
      loginText,
      openForgotPasswordModal,
      showForgotPassword
    };
  },
};
</script>

<template>
  <div class="form-container">
    <h2 class="title">Login</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="email">Email</label>
        <div class="input-wrapper">
          <input type="email" id="email" v-model="email" required autocomplete="email" />
        </div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <div class="input-wrapper password-group">
          <input :type="passwordFieldType" id="password" v-model="password" required />
          <img :src="showPassword ? require('@/assets/images/auth/hide.png') : require('@/assets/images/auth/show.png')"
               @click="togglePasswordVisibility"
               class="toggle-password-icon"
               alt="Toggle Password Visibility" />
        </div>
      </div>
      <div class="input-wrapper">
        <button type="submit" class="submit-button" :class="{ 'success-position': isSuccess }" :disabled="isLoading">
          <font-awesome-icon v-if="isLoading && !isSuccess" icon="spinner" spin />
          <font-awesome-icon v-if="isSuccess" icon="check-circle" />
          <span v-if="isError" class="error-message">{{ isError }}</span>
          <span v-else-if="!isSuccess">{{ loginText }}</span>
        </button>
      </div>
      <a @click="openForgotPasswordModal" class="forgot-password">Forgot Password?</a>
      <ForgotPasswordModal v-if="showForgotPassword" :show="showForgotPassword" @update:show="showForgotPassword = $event"/>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  min-height: 320px;
  position: relative;
}

.dark .form-container {
  background-color: #2d3748;
  box-shadow: 0 2px 10px rgba(255, 255, 255, 0.1);
}

.title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #2c3e50;
  text-align: center;
}

.dark .title {
  color: #f9fafb;
}

.form-group {
  margin-bottom: 1.5rem;
  text-align:left;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.dark label {
  color: #e2e8f0;
}

.input-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}

input {
  width: 100%;
  max-width: 400px;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  transition: border-color 0.3s;
  padding-right: 2.5rem;
}

.dark input {
  background-color: #4a5568;
  border-color: #a0aec0;
  color: #f9fafb;
}

input:focus {
  outline: none;
  border-color: #42b983;
}

.password-group {
  position:relative;
}

.password-wrapper {
  display: flex;
  align-items: center;
  position:relative;
}

.toggle-password-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  width: 24px;
  height: 24px;
  opacity: 0.7;
  transition: opacity 0.3s;
}

.toggle-password-icon:hover {
  opacity: 1;
}

.submit-button {
  width: 100%;
  max-width: 400px;
  padding: 0.75rem;
  background-color: #4279b9;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #3c3a9d;
}

.submit-button.success-position {
  margin-top: 10px;
  position: absolute;
  bottom: 5px;
  right: 10px;
  width: 40px;
  height: 40px;
  padding: 10px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.error-message {
  color: #b94a48;
  display: block;
}

.error-message font-awesome-icon {
  margin-right: 8px;
}


.forgot-password {
    position: absolute;
    bottom: 10px;
    left: 10px;
    color: #4279b9;
    cursor: pointer;
    text-decoration: underline;
  }

  .dark .forgot-password {
    color: #38bdf8;
  }
</style>