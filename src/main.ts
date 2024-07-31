//main.ts code 
import { createApp } from 'vue';
import DOMPurify from 'dompurify';
import App from './App.vue';
import router from './router';
import './tailwind.css';
import { useDark, useToggle } from '@vueuse/core';

const app = createApp(App).use(router);
app.config.globalProperties.$sanitize = DOMPurify.sanitize;

const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light',
  storageKey: 'dark-mode', 
  storage: window.localStorage 
});

const toggleDark = useToggle(isDark);

app.provide('isDark', isDark);
app.provide('toggleDark', toggleDark);

app.mount('#app');

