<!-- src/components/auth/register/RegisterContainer.vue -->
<script lang="ts">
import { ref, computed} from 'vue';
import { useRouter } from 'vue-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import {auth, db} from '@/firebase/fbConfig.js'

export default {
  name: 'RegisterContainer',
  setup() {
    const router = useRouter();
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const showPassword = ref(false);
    const username = ref('');
    const isLoading = ref(false);
    const isSuccess = ref(false);
    const isError = ref('');
    const registrationText = ref('Register');

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const passwordFieldType = computed(() => (showPassword.value ? 'text' : 'password'));

    const handleSubmit = async () => {
      isLoading.value = true;
      registrationText.value = "";
      isSuccess.value = false;
      isError.value = '';
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        console.log("User credential obtained:", userCredential);

        const user = userCredential.user;
        console.log("User ID:", user.uid); 

        await setDoc(doc(db, "profiles", user.uid), {
          username: username.value,
        });
        console.log("Firestore document set for:", user.uid);

        isSuccess.value = true;
        registrationText.value = ''; 
        setTimeout(() => {
          router.push({ name: 'home' });
        }, 2000);  
      } catch (err) {
        const error = err as Error;
        isError.value = error.message;
        console.error('Error during registration:', error);
        setTimeout(() => {
          isError.value = '';
          isLoading.value = false;
          isSuccess.value = false;
          registrationText.value = 'Register'; 
        }, 5000);
      }
      if (!isError.value) {
        isLoading.value = false;
      }
    };


    return {
      name,
      email,
      password,
      username,
      showPassword,
      togglePasswordVisibility,
      passwordFieldType,
      handleSubmit,
      isLoading,
      isSuccess,
      isError,
      registrationText
    };
  },
};
</script>

<template>
  <div class="form-container">
    <h2 class="title">Register</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Full Name</label>
        <div class="input-wrapper">
          <input type="text" id="name" v-model="name" required />
        </div>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <div class="input-wrapper">
          <input type="email" id="email" v-model="email" required autocomplete="email" />
        </div>
      </div>
      <div class="form-group">
        <label for="username">Username</label>
        <div class="input-wrapper">
          <input type="text" id="username" v-model="username" required autocomplete="username" />
        </div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <div class="input-wrapper password-group">
          <input :type="passwordFieldType" id="password" v-model="password" required />
          <img :src="showPassword ? require('@/assets/images/auth/hide.png') : require('@/assets/images/auth/show.png')" @click="togglePasswordVisibility" class="toggle-password-icon" alt="Toggle Password Visibility" />
        </div>
      </div>
      <div class="input-wrapper">
        <button type="submit" class="submit-button" :class="{ 'success-position': isSuccess }" :disabled="isLoading">
          <font-awesome-icon v-if="isLoading" icon="spinner" spin />
          <font-awesome-icon v-else-if="isSuccess" icon="check-circle" />
          <span v-if="isError" class="error-message">
            <font-awesome-icon icon="times-circle" />
            {{ isError }}
          </span>
          <span v-else>{{ registrationText }}</span>
        </button>
      </div>
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
    min-height: 400px;
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
    text-align: left;
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
    position: relative;
  }
  
  .password-wrapper {
    display: flex;
    align-items: center;
    position: relative;
  }

  .avatar-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
    gap: 10px; 
    justify-content: center; 
  }

  .avatar {
    cursor: pointer;
    border: 2px solid transparent;
    transition: transform 0.3s ease, border-color 0.3s ease;

  }
  .avatar img {
    width: 50px; 
    height: 50px;
    display: block;
    border-radius: 1rem;
  }

  .avatar img.selected {
    border-color: #42b983; 
    box-shadow: 2px 0 8px #a7b942;
  }

  .avatar:hover {
    transform: scale(1.1);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
  
  .avatar.selected {
    border-color: #42b983; 
    box-shadow: 2px 0 8px #a7b942;
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
    transition: all 0.3s ease; 
  }

  .submit-button .fa-check-circle { 
    font-size: 24px; 
  }
  
  .submit-button:hover {
    background-color: #3c3a9d;
  }

  .success-position {
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
    display: flex;
    align-items: center;
    color: #b94a48;
    font-weight: bold;
  }

  .error-message font-awesome-icon {
    margin-right: 8px; 
  }

  </style>