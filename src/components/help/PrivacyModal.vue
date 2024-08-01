<!-- src\components\help\PrivacyModal.vue -->
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
        <h2>Privacy Policy</h2>
        <div class="privacy-text">
          <p>Last updated: 2024/08/01</p>
          <p>Thank you for choosing to be part of our community at The Big Picture. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy policy, or our practices with regards to your personal information, please contact us at contact@fullcirclegames.com.</p>

          <h3>Information We Collect</h3>
          <p>When you visit our website (https://thebigpicturegame.com), and use our services, we appreciate that you are trusting us with your personal information. We take your privacy very seriously. In this privacy policy, we seek to explain to you in the clearest way possible what information we collect, how we use it, and what rights you have in relation to it.</p>

          <h3>What Information Is Collected?</h3>
          <ul>
            <li><strong>Personal Information Provided by You.</strong> We collect names; email addresses; usernames; contact preferences; contact or authentication data; billing addresses; debit/credit card numbers; and other similar information.</li>
            <li><strong>Information automatically collected.</strong> We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information.</li>
          </ul>

          <h3>How Do We Use Your Information?</h3>
          <p>We use personal information collected via our Services for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
          <ul>
            <li>To facilitate account creation and logon process.</li>
            <li>To send administrative information to you for Business Purposes, Legal Reasons, and Contractual.</li>
            <li>To fulfill and manage your orders, payments, returns, and exchanges made through the Services.</li>
            <li>To administer prize draws and competitions when you elect to participate in competitions.</li>
          </ul>

          <h3>Will Your Information Be Shared With Anyone?</h3>
          <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.</p>

          <h3>How Do We Keep Your Information Safe?</h3>
          <p>We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security, and improperly collect, access, steal, or modify your information.</p>

          <h3>Do We Make Updates To This Policy?</h3>
          <p>We may update this privacy policy from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible.</p>
          
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
  }
  
  button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 20px;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  