// src/stores/gameStore.ts
import { defineStore } from 'pinia';
import { db } from '@/firebase/fbConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import shuffleArray from '@/utils/shuffleArray';

export const useGameStore = defineStore('gameStore', {
  state: () => ({
    currentGame: [] as string[],  
    selectedTiles: [] as string[],  
    lives: 3,
    gameStatus: 'playing' 
  }),
  actions: {
    async fetchTodayGame() {
      const localDate = new Date();
      const today = `${localDate.getFullYear()}-${String(localDate.getMonth() + 1).padStart(2, '0')}-${String(localDate.getDate()).padStart(2, '0')}`;
      const gamesCollection = collection(db, 'games');
      const q = query(gamesCollection, where("date", "==", today));
      const gameSnapshot = await getDocs(q);
      if (gameSnapshot.docs.length > 0) {
        const gameData = gameSnapshot.docs[0].data();
        this.currentGame = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9].map(index => gameData[index.toString()] as string || ''));
      } else {
        this.currentGame = [];
      }
    },
    selectTile(tile: string) {  
      if (!this.selectedTiles.includes(tile)) {
        this.selectedTiles.push(tile);
        if (this.selectedTiles.length === this.currentGame.length) {
          this.gameStatus = 'won';
        }
      } else {
        this.lives--;
        if (this.lives === 0) {
          this.gameStatus = 'lost';
        }
      }
    },
    resetGame() {
      this.selectedTiles = [];
      this.lives = 3;
      this.gameStatus = 'playing';
      this.fetchTodayGame();
    }
  }
});