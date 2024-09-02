import { create } from 'zustand'
import { ConfigType, defaultConfig } from '../config/default-config'
import { Word } from '../components/word'

interface AppState {
    name: string,
    currentIndex: number,
    showDetails: boolean,
    updateIndex: Function,
    setShowDetails: Function,
    config: ConfigType,
    initStore: Function,
    init: boolean,
    learnedWords: { [key: string]: { [key: string]: boolean } },
    setConfig: Function,
    sort: string,
    sortDirection: string,
    updateLearnedWords: Function,
    words: Word[],
}

export const useAppStore = create<AppState>((set) => ({
  name: '',
  words: [],
  currentIndex: -1,
  showDetails: false,
  sort: 'alphabetical',
  sortDirection: 'asc',
  config: defaultConfig,
  init: false,
  learnedWords: {},
  updateIndex: (newIndex: number) => set(state => ({ currentIndex: newIndex })),
  setShowDetails: (flag: boolean) => set({ showDetails: flag }),
  initStore: (name: string, words: Word[]) => set(state => {
    let localConfig = localStorage.getItem('config') || JSON.stringify(defaultConfig)
    let parsedLocalConfig = JSON.parse(localConfig)
    const learnedWords = localStorage.getItem(`learnedWords-${name}`) || '{}'
    const parsedLearnedWords = JSON.parse(learnedWords)
    const { showDetails, sort, sortDirection } = parsedLocalConfig
    console.log(`zzz initStore`, name, parsedLearnedWords, parsedLocalConfig)
    localStorage.setItem('currentList', name)
    return {
      init: true,
      name,
      sort,
      sortDirection,
      showDetails,
      words,
      learnedWords: {
        [name]: parsedLearnedWords
      },
      currentIndex: -1,
    }
  }),
  setConfig: (key: string, value: any) => set(state => {
    const newConfig = { ...state.config, [key]: value }
    localStorage.setItem('config', JSON.stringify(newConfig))
    switch(key) {
    case 'showDetails':
      newConfig.showDetails = value
      return { config: newConfig, showDetails: value }
    case 'sort':
      newConfig.sort = value
      return { config: newConfig, sort: value, currentIndex: -1 }
    case 'sortDirection':
      newConfig.sortDirection = value
      return { config: newConfig, sortDirection: value, currentIndex: -1 }
    case 'reset':
      localStorage.removeItem(`learnedWords-${value}`)
      newConfig.learnedWords = {
        ...newConfig.learnedWords,
        [value]: {}
      }
      console.log(`zzz after reset newconfig`, newConfig)
      return { config: newConfig, learnedWords: newConfig.learnedWords, currentIndex: -1 }
    default: {
      return { config: newConfig }
    }
    }
  }),
  updateLearnedWords: (word: string, name: string) => set(state => {
    const targetLearnedWords = {
      ...(state.learnedWords[name] || {}),
      [word]: true,
    }
    const newLearnedWords = {
      ...state.learnedWords,
      [name]: targetLearnedWords,
    }
    localStorage.setItem(`learnedWords-${name}`, JSON.stringify(targetLearnedWords))
    return { learnedWords: newLearnedWords }
  }),
}))