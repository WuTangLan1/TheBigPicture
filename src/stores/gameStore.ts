// src/stores/gameStore.ts
import { defineStore } from 'pinia';
import { db } from '@/firebase/fbConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import shuffleArray from '@/utils/shuffleArray';

export const useGameStore = defineStore('gameStore', {
  state: () => ({
    currentGame: [] as string[],
    shuffledGame: [] as string[],
    interactiveTiles: [] as string[],
    selectedTiles: [] as string[],
    tileStatus: {} as Record<string, boolean>,
    lives: 3,
    gameStatus: 'playing',
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
        const fullArray = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(index => gameData[index.toString()] as string || '');
        this.currentGame = fullArray;
        const middleTiles = shuffleArray(fullArray.slice(1, -1));
        this.shuffledGame = [fullArray[0], ...middleTiles, fullArray[8]];
        this.interactiveTiles = middleTiles;
        this.tileStatus = this.currentGame.reduce<Record<string, boolean>>((acc, term) => {
          acc[term] = false; 
          return acc;
        }, {});
      } else {
        this.currentGame = [];
        this.shuffledGame = [];
        this.interactiveTiles = [];
        this.tileStatus = {};
      }
    },
    selectTile(tile: string) {
      if (!this.interactiveTiles.includes(tile)) return;

      const nextIndex = this.selectedTiles.length;
      const correctTile = this.currentGame[nextIndex + 1]; 
      if (tile === correctTile) {
        this.selectedTiles.push(tile);
        this.tileStatus[tile] = true; 
        if (this.selectedTiles.length === this.interactiveTiles.length) {
          this.gameStatus = 'won';
          console.log('Congratulations! You won.');
        }
      } else {
        this.lives--;
        console.log(`Incorrect! You chose ${tile}, but the correct tile was ${correctTile}`);
        if (this.lives === 0) {
          this.gameStatus = 'lost';
          console.log('Game Over. You have run out of lives.');
        }
      }
    },
    resetGame() {
      this.selectedTiles = [];
      this.tileStatus = this.currentGame.reduce<Record<string, boolean>>((acc, term) => {
        acc[term] = false;
        return acc;
      }, {});
      this.lives = 3;
      this.gameStatus = 'playing';
      this.fetchTodayGame();
    }
  }
});
