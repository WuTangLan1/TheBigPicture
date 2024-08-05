// src/stores/gameStore.ts
import { defineStore } from 'pinia';
import { db, auth } from '@/firebase/fbConfig';
import { collection, query, where, getDocs, setDoc, doc } from 'firebase/firestore';
import shuffleArray from '@/utils/shuffleArray';
import { v4 as uuidv4 } from 'uuid';

interface PerformanceDetail {
  gameDate: string;
  record: string;
  result: string;
  score: number;
  uuid: string;
}

export const useGameStore = defineStore('gameStore', {
  state: () => ({
    currentGame: [] as string[],
    completedToday: false,
    todayPerformance: null as PerformanceDetail | null, 
    shuffledGame: [] as string[],
    interactiveTiles: [] as string[],
    selectedTiles: [] as string[],
    tileStatus: {} as Record<string, { correct: boolean, incorrect: boolean }>,
    lives: 3,
    gameStatus: 'playing',
    isModalVisible: false,
    isLoading: false,
    guesses: [] as { tile: string, correct: boolean }[],
    difficulty: '',
  }),
  actions: {
    async fetchTodayGame() {
      this.isLoading = true;
      const localDate = new Date();
      const today = `${localDate.getFullYear()}-${String(localDate.getMonth() + 1).padStart(2, '0')}-${String(localDate.getDate()).padStart(2, '0')}`;
      
      try {
        await this.setupNewGame(); 
  
        if (auth.currentUser) {
          const uid = auth.currentUser.uid;
          const performanceQuery = query(collection(db, 'performances'),
            where("uuid", "==", uid),
            where("gameDate", ">=", `${today}T00:00:00.000Z`),
            where("gameDate", "<=", `${today}T23:59:59.999Z`)
          );
  
          const perfSnapshot = await getDocs(performanceQuery);
          if (!perfSnapshot.empty) {
            this.completedToday = true;
            const data = perfSnapshot.docs[0].data();
            this.todayPerformance = {
              gameDate: data.gameDate,
              record: data.record,
              result: data.result,
              score: data.score,
              uuid: data.uuid
            } as PerformanceDetail;
          }
        }
      } catch (error) {
        console.error("Error fetching today's game data:", error);
      } finally {
        this.isLoading = false;
      }
    },   

    async setupNewGame() {
      const localDate = new Date();
      const today = `${localDate.getFullYear()}-${String(localDate.getMonth() + 1).padStart(2, '0')}-${String(localDate.getDate()).padStart(2, '0')}`;

      const gamesCollection = collection(db, 'games');
      const q = query(gamesCollection, where("date", "==", today));

      try {
        const gameSnapshot = await getDocs(q);
        if (gameSnapshot.docs.length > 0) {
          const gameData = gameSnapshot.docs[0].data();
          this.currentGame = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(index => gameData[index.toString()] || '');
          const middleTiles = shuffleArray(this.currentGame.slice(1, -1));
          this.shuffledGame = [this.currentGame[0], ...middleTiles, this.currentGame[9]];
          this.interactiveTiles = middleTiles;
          this.difficulty = gameData.difficulty;
          this.tileStatus = this.currentGame.reduce((acc, term) => {
            acc[term] = { correct: false, incorrect: false };
            return acc;
          }, {} as Record<string, { correct: boolean; incorrect: boolean }>);          
        } else {
          this.currentGame = [];
          this.shuffledGame = [];
          this.interactiveTiles = [];
          this.tileStatus = {};
        }
      } catch (error) {
        console.error("Error setting up new game:", error);
      }
    },
    selectTile(tile: string) {
      if (!this.interactiveTiles.includes(tile)) return;
    
      const nextIndex = this.selectedTiles.length;
      const correctTile = this.currentGame[nextIndex + 1];
      const isCorrect = tile === correctTile;
    
      this.guesses.push({ tile, correct: isCorrect });

      console.log('guesses which should display at the end :', this.guesses)
    
      if (isCorrect) {
        this.selectedTiles.push(tile);
        this.tileStatus[tile].correct = true;
        if (this.selectedTiles.length === this.interactiveTiles.length) {
          this.gameStatus = 'won';
          this.isModalVisible = true;
          this.savePerformance('won', this.selectedTiles.length);
        }
      } else {
        this.lives--;
        this.tileStatus[tile].incorrect = true;
        setTimeout(() => {
          this.tileStatus[tile].incorrect = false;
        }, 1000);
        if (this.lives === 0) {
          this.gameStatus = 'lost';
          this.isModalVisible = true;
          this.savePerformance('lost', this.selectedTiles.length);
        }
      }
    },    
    async savePerformance(result: string, score: number): Promise<void> {
      if (auth.currentUser) {
        const uid = auth.currentUser.uid;
        const docId = `${uid}_${uuidv4()}`;
        const performanceRef = doc(db, 'performances', docId);
        const guessRecord = this.guesses.map(g => `${g.correct ? 't' : 'f'}_${g.tile}`).join('_');
    
        try {
          await setDoc(performanceRef, {
            uuid: uid,
            gameDate: new Date().toISOString(),
            result: result,
            score: score,
            record: guessRecord 
          });
        } catch (error) {
          console.error("Failed to save performance:", error);
        }
      }
    },    
    closeModal() {
      this.isModalVisible = false; 
    },
  }
});
