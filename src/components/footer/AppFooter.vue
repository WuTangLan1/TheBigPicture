<!-- src\components\footer\AppFooter.vue -->
<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    onPrivacyClick: Function as PropType<() => void>,
    onTosClick: Function as PropType<() => void> 
  },
  setup(props) {
    return { ...props };
  }
});
</script>

<template>
  <footer class="footer">
    <div class="footer-content">
      <div>© 2024 Full Circle Games. All rights reserved.</div>
      <div class="footer-links">
        <p class="link" @click="onPrivacyClick">Privacy Policy</p> 
        <p class="link" @click="onTosClick">Terms of Service</p> 
      </div>
      <div>Contact us: <a href="mailto:contact@fullcirclegames.com">contact@fullcirclegames.com</a></div>
    </div>
  </footer>
</template>


<style scoped>
.footer {
  background-color: #afc4ee;
  color: #000000;
  padding: 20px;
  text-align: center;
}

.dark .footer {
  color: white;
  background-color: #2c3e50;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.footer-links {
  display: flex; 
  align-items: center; 
  gap: 20px;
}

.link {
  color: #063b5c;
  cursor: pointer;
  text-decoration: underline; 
}

.dark .link {
  color: rgb(255, 255, 255);
}

.link:hover {
  color: #cadfea; 
}

.footer-links a, .footer-links p {
  margin: 0;
  white-space: nowrap;
}

@media (max-width: 500px) {
  .footer-content {
    flex-direction: column;
  }

  .footer-links {
    flex-direction: column; 
    align-items: center; 
    gap: 10px; 
  }
}
</style>
