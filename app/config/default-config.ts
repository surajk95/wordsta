export interface ConfigType {
  showDetails: boolean,
  hideLearnedWords: boolean,
  currentList: string,
  sort: string,
  sortDirection: string,
  learnedWords: { [key: string]: boolean },
}

export const defaultConfig = {
  showDetails: false,
  hideLearnedWords: true,
  currentList: 'high-frequency-gre',
  sort: 'alphabetical',
  sortDirection: 'asc',
  learnedWords: {},
}
