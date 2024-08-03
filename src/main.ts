//main.ts code 
import { createApp } from 'vue';
import DOMPurify from 'dompurify';
import App from './App.vue';
import { createPinia } from 'pinia'; 
import { useAuthStore } from './stores/authStore';
import router from './router';
import './tailwind.css';
import { useDark, useToggle } from '@vueuse/core';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner, faCheckCircle, faTimesCircle, faTimes, faHeart, faInfoCircle, faWindowMinimize, faWindowMaximize   } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faSpinner, faCheckCircle, faTimesCircle, faTimes, faHeart, faInfoCircle, faWindowMinimize, faWindowMaximize );

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.use(router);

const authStore = useAuthStore();
authStore.initAuth();

app.component('font-awesome-icon', FontAwesomeIcon);
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

