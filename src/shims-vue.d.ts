/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component

  declare module '@/firebase/fbConfig.js'

  declare module '@/utils/shuffleArray.js'
}
