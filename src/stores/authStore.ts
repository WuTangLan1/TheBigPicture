// src/stores/authStore.ts
import { User } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { defineStore } from 'pinia';
import { auth, db } from '@/firebase/fbConfig';
import { onAuthStateChanged } from 'firebase/auth';

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
  }),

  actions: {
    initAuth() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
          this.fetchPerformances(); 
        } else {
          this.user = null;
          this.performances = []; 
        }
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
          return { id: doc.id, ...data };  // Explicitly separate 'id' and the rest of the data
        });
      } catch (error) {
        console.error("Error fetching performances:", error);
      }
      this.isLoading = false;
    },
  }
});
