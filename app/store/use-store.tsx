import { useCallback, useEffect, useLayoutEffect, useMemo } from 'react';
import { useAppStore } from './store';
import { Word } from '../components/word';
import { useShallow } from 'zustand/react/shallow';
import { ConfigType } from '../config/default-config';



export default function useStore({ words, name }: { words: Word[], name: string }) {
  const { initStore, sort, sortDirection, currentIndex, learnedWords, updateIndex } = useAppStore(useShallow((state) => ({
    config: state.config,
    initStore: state.initStore,
    sort: state.sort,
    sortDirection: state.sortDirection,
    currentIndex: state.currentIndex,
    learnedWords: state.learnedWords,
    updateIndex: state.updateIndex,
  })));

  useEffect(() => {
    console.log(`zzz init usestore`, name)
    if(name && words) {
      initStore(name, words)
    }
  }, [initStore, name, words])

  const processedWords = useMemo(() => {
    console.log(`zzz processing config`, sort, sortDirection)
    return words
      .sort((a: Word, b: Word) => {
        if (sort === 'alphabetical') {
          return sortDirection === 'asc' ? a.word.localeCompare(b.word) : b.word.localeCompare(a.word)
        } else if (sort === 'frequency') {
          return sortDirection === 'asc' ? a.frequency - b.frequency : b.frequency - a.frequency
        } else if (sort === 'random') {
          return Math.random() - 0.5
        } else if (sort === 'difficulty') {
          return sortDirection === 'asc' ? a.difficulty - b.difficulty : b.difficulty - a.difficulty
        }
        return 0
      })
  }, [words, sort, sortDirection]);

  const getNextIndex = useCallback(() => {
    console.log(`zzz getNextIndex`, currentIndex, learnedWords, name)
    let newIndex = currentIndex === words.length - 1 ? 0 : currentIndex + 1
    if(!learnedWords[name]) {
      updateIndex(newIndex)
      return
    }
    do {
      if(!learnedWords[name][processedWords[newIndex].word]) {
        updateIndex(newIndex)
        return
      } else {
        newIndex = newIndex === words.length - 1 ? 0 : newIndex + 1
      }
    } while(Object.keys(learnedWords[name]).length !== words.length)
  }, [currentIndex, learnedWords, name, words, processedWords, updateIndex])


  console.log(`zzz use-store`)

  return { processedWords, getNextIndex }
}