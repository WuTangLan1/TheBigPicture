// src/stores/authStore.ts
import { defineStore } from 'pinia';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/firebase/fbConfig';
import { User } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';

const INACTIVITY_TIME_LIMIT = 30 * 60 * 1000;

interface PerformanceData {
    gameDate: string;
    record: string;
    result: string;
    score: number;
    uuid: string;
  }
  
  export interface Performance extends PerformanceData {
    id: string;
  }

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: null as User | null,
    performances: [] as Performance[],
    isLoading: false,
    lastActivityTime: Date.now(),
    activityTimeout: null as ReturnType<typeof setTimeout> | null,
  }),

  actions: {
    initAuth() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
          this.fetchPerformances();
          this.resetActivityTimer();
        } else {
          this.user = null;
          this.performances = [];
          this.clearActivityTimer();
        }
      });
    },
    resetActivityTimer() {
      this.clearActivityTimer();
      this.activityTimeout = setTimeout(() => this.logout(), INACTIVITY_TIME_LIMIT);
      document.addEventListener('mousemove', this.resetActivityTimer);
      document.addEventListener('keydown', this.resetActivityTimer);
    },
    clearActivityTimer() {
      if (this.activityTimeout) {
        clearTimeout(this.activityTimeout);
      }
      document.removeEventListener('mousemove', this.resetActivityTimer);
      document.removeEventListener('keydown', this.resetActivityTimer);
    },
    handleInactivity() {
      signOut(auth).then(() => {
        alert('You have been logged out due to inactivity.');
      });
      document.removeEventListener('mousemove', this.resetActivityTimer);
      document.removeEventListener('keydown', this.resetActivityTimer);
    },
    logout() {
      signOut(auth).then(() => {
        console.log('Logged out successfully');
        this.user = null;
        this.performances = [];
      }).catch((error) => {
        console.error('Logout failed', error);
      });
    },
    async fetchPerformances() {
      if (!this.user) return;
      
      this.isLoading = true;
      const performancesRef = collection(db, 'performances');
      const q = query(performancesRef, where("uuid", "==", this.user.uid));
      try {
        const snapshot = await getDocs(q);
        this.performances = snapshot.docs.map(doc => {
          const data = doc.data() as PerformanceData;
          return { id: doc.id, ...data };  
        });
      } catch (error) {
        console.error("Error fetching performances:", error);
      }
      this.isLoading = false;
    },
  }
});
