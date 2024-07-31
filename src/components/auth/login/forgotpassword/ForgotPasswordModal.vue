<!-- src\components\auth\login\forgotpassword\ForgotPasswordModal.vue -->

<script lang="ts">
import { ref, defineComponent, PropType } from 'vue';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/firebase/fbConfig.js';

export default defineComponent({
  name: 'ForgotPasswordModal',
  props: {
    show: Boolean as PropType<boolean>
  },
  setup(props, { emit }) {
    const email = ref('');
    const message = ref('');
    const error = ref('');

    const sendResetEmail = async () => {
      try {
        await sendPasswordResetEmail(auth, email.value);
        message.value = "Reset link sent. Check your email.";
        error.value = '';
      } catch (err) {
        if (err instanceof Error) {
          error.value = err.message;
        } else {
          error.value = 'An unknown error occurred';
        }
      }
    };

    const close = () => {
      emit('update:show', false);
      message.value = '';
      error.value = '';
    };

    return { email, sendResetEmail, message, error, close };
  }
});
</script>

<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-2xl max-w-md w-full relative p-8">
      <button @click="close" class="close-button">
        <font-awesome-icon icon="times" />
      </button>
      <h2 class="text-2xl font-semibold text-center mb-6">Reset Password</h2>
      <form @submit.prevent="sendResetEmail" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 text-left">Email</label>
          <input
            type="email"
            v-model="email"
            id="email"
            required
            class="email-input"
            placeholder="Enter your email"
            aria-label="Email"
          />
        </div>
        <div class="flex justify-end">
          <button
            type="submit"
            class="submit-button"
          >
            Send Reset Link
          </button>
        </div>
        <p v-if="message" class="text-sm text-green-600 text-center">{{ message }}</p>
        <p v-if="error" class="text-sm text-red-600 text-center">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.material-icons {
  font-size: 16px;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #bd5a5a; 
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.close-button:hover {
  background: #693737; 
}

.email-input {
  width: calc(100% - 16px);
  padding: 8px;
  margin: 0 auto;
  display: block;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
  color: #333;
  outline: none;
}

.email-input:focus {
  border-color: #3b82f6;
  box-shadow: 0px 0px 0px 2px rgba(59, 130, 246, 0.2);
}

.submit-button {
  width: auto;
  padding: 10px 20px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #2563eb;
}

.bg-black.bg-opacity-70 {
  backdrop-filter: blur(5px);
}

.bg-white {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

button {
  cursor: pointer;
}
</style>