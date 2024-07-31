// src\stores\gameStore.ts
import { defineStore } from 'pinia';
import { db } from '@/firebase/fbConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const useGameStore = defineStore('gameStore', {
  state: () => ({
    currentGame: [] as string[],
  }),
  actions: {
    async fetchTodayGame() {
      const today = new Date().toISOString().slice(0, 10); 
      const gamesCollection = collection(db, 'games');
      const q = query(gamesCollection, where("date", "==", today));

      const gameSnapshot = await getDocs(q);
      if (gameSnapshot.docs.length > 0) {
        const gameData = gameSnapshot.docs[0].data();
        // Assuming the keys are '1' to '8' for each term
        this.currentGame = [1, 2, 3, 4, 5, 6, 7, 8].map(index => gameData[index.toString()] || '');
      } else {
        this.currentGame = [];
      }
    }
  }
});