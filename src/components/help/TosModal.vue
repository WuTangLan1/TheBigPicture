<!-- src\components\help\TosModal.vue -->

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup(_, { emit }) {
    const isVisible = ref(true);

    function closeModal() {
      isVisible.value = false;
      emit('close');
    }

    return { isVisible, closeModal };
  }
});
</script>

<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h2>Terms of Service</h2>
      <div class="tos-text">
        <p>Last updated: 2024/08/01</p>
        <p>Welcome to The Big Picture! These terms and conditions outline the rules and regulations for the use of our website and services.</p>

        <h3>Acceptance of Terms</h3>
        <p>By accessing this website, we assume you accept these terms and conditions. Do not continue to use The Big Picture if you do not agree to take all of the terms and conditions stated on this page.</p>

        <h3>License</h3>
        <p>Unless otherwise stated, The Big Picture and/or its licensors own the intellectual property rights for all material on the website. All intellectual property rights are reserved. You may access this from The Big Picture for your own personal use subjected to restrictions set in these terms and conditions.</p>

        <h3>User Responsibilities</h3>
        <p>As a user of this site, you agree to use the site for lawful purposes only and to be responsible for your conduct and actions on the site. You must not:</p>
        <ul>
          <li>Republish material from The Big Picture</li>
          <li>Sell, rent, or sub-license material from The Big Picture</li>
          <li>Reproduce, duplicate, or copy material from The Big Picture</li>
          <li>Redistribute content from The Big Picture</li>
        </ul>

        <h3>Limitation of Liability</h3>
        <p>In no event shall The Big Picture, nor any of its officers, directors, and employees, be liable for anything arising out of or in any way connected with your use of this website. The Big Picture, including its officers, directors, and employees shall not be held liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this website.</p>

        <h3>Changes to These Terms</h3>
        <p>We reserve the right to amend these terms at any time. You are expected to check this page periodically to take notice of any changes we made, as they are binding on you.</p>

        <h3>Contact Us</h3>
        <p>If you have any questions about these Terms, please contact us at contact@fullcirclegames.com.</p>
      </div>
      <div class="button-container">
        <button @click="closeModal">Close</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); 
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-height: 70vh;
  overflow-y: auto;
  max-width: 500px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #45a049;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.dark .modal-content {
  background: #1f2937;
  color: #f9fafb;
}

.dark button {
  background-color: #2563eb;
}

.dark button:hover {
  background-color: #1d4ed8;
}
</style>
