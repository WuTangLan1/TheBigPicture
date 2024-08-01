<!-- src\components\footer\AppFooter.vue -->
<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    onPrivacyClick: Function as PropType<() => void> 
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
        <p to="/privacy" @click.prevent="onPrivacyClick">Privacy Policy</p> 
        <p>Terms of Service</p>
      </div>
      <div>Contact us: <a href="mailto:contact@fullcirclegames.com">contact@fullcirclegames.com</a></div>
    </div>
  </footer>
</template>

  <style scoped>
  .footer {
    background-color: #2c3e50;
    color: #fff;
    padding: 20px;
    text-align: center;
    width: 100%;
  }
  
  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
  
  .footer-links a {
    color: #9dc8e2;
    margin: 0 10px;
  }
  
  @media(max-width: 600px) {
    .footer-content {
      flex-direction: column;
    }
  
    .footer-links a {
      display: block;
      margin: 10px 0;
    }
  }
  </style>
  