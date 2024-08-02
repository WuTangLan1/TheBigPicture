// src/stores/gameStore.ts
import { defineStore } from 'pinia';
import { db, auth } from '@/firebase/fbConfig';
import { collection, query, where, getDocs, setDoc, doc } from 'firebase/firestore';
import shuffleArray from '@/utils/shuffleArray';
import { v4 as uuidv4 } from 'uuid';

export const useGameStore = defineStore('gameStore', {
  state: () => ({
    currentGame: [] as string[],
    shuffledGame: [] as string[],
    interactiveTiles: [] as string[],
    selectedTiles: [] as string[],
    tileStatus: {} as Record<string, { correct: boolean, incorrect: boolean }>,
    lives: 3,
    gameStatus: 'playing',
    isModalVisible: false,
    isLoading: false,
  }),
  actions: {
    async fetchTodayGame() {
      this.isLoading = true; 
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
        this.tileStatus = this.currentGame.reduce((acc, term) => {
          acc[term] = { correct: false, incorrect: false };
          return acc;
        }, {} as Record<string, { correct: boolean, incorrect: boolean }>);
      } else {
        this.currentGame = [];
        this.shuffledGame = [];
        this.interactiveTiles = [];
        this.tileStatus = {};
      }
      this.isLoading = false;
    },
    selectTile(tile: string) {
      if (!this.interactiveTiles.includes(tile)) return;

      const nextIndex = this.selectedTiles.length;
      const correctTile = this.currentGame[nextIndex + 1]; 
      if (tile === correctTile) {
        this.selectedTiles.push(tile);
        this.tileStatus[tile].correct = true;
        if (this.selectedTiles.length === this.interactiveTiles.length) {
          this.gameStatus = 'won';
          this.isModalVisible = true;
          console.log('Congratulations! You won.');
        }
      } else {
        this.lives--;
        this.tileStatus[tile].incorrect = true; 
        setTimeout(() => {
          this.tileStatus[tile].incorrect = false;
        }, 1000); 
        console.log(`Incorrect! You chose ${tile}, but the correct tile was ${correctTile}`);
        if (this.lives === 0) {
          this.gameStatus = 'lost';
          this.isModalVisible = true;
          this.savePerformance('won', this.selectedTiles.length); 
        }
      }
    },
    async savePerformance(result: string, score: number): Promise<void> {
      if (auth.currentUser) {
        const uid = auth.currentUser.uid;
        const docId = `${uid}_${uuidv4()}`;
    
        const performanceRef = doc(db, 'performances', docId);
    
        try {
          await setDoc(performanceRef, {
            uuid: uid,
            gameDate: new Date().toISOString(),
            result: result,
            score: score
          });
          console.log("Performance saved successfully.");
        } catch (error) {
          console.error("Failed to save performance:", error);
        }
      } else {
        console.error("No authenticated user found.");
      }
    },
    closeModal() {
      this.isModalVisible = false; 
    },
    resetGame() {
      this.selectedTiles = [];
      this.tileStatus = this.currentGame.reduce((acc, term) => {
        acc[term] = { correct: false, incorrect: false };
        return acc;
      }, {} as Record<string, { correct: boolean, incorrect: boolean }>);
      this.lives = 3;
      this.gameStatus = 'playing';
      this.fetchTodayGame();
    }
  }
});
