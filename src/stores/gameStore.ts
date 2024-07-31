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
      const localDate = new Date();
      // Use hyphens instead of slashes for date formatting to match Firestore
      const today = `${localDate.getFullYear()}-${String(localDate.getMonth() + 1).padStart(2, '0')}-${String(localDate.getDate()).padStart(2, '0')}`;
      console.log("Adjusted date for query:", today); // Check the formatted date

      const gamesCollection = collection(db, 'games');
      const q = query(gamesCollection, where("date", "==", today));

      const gameSnapshot = await getDocs(q);
      if (gameSnapshot.docs.length > 0) {
        const gameData = gameSnapshot.docs[0].data();
        this.currentGame = [1, 2, 3, 4, 5, 6, 7, 8].map(index => gameData[index.toString()] || '');
        console.log("Current Game:", this.currentGame);
      } else {
        this.currentGame = [];
        console.log("No games found for today.");
      }
    }
  }
});
