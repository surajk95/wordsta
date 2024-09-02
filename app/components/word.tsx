'use client'
import { useCallback, useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { SwipeConfig } from '../config/swipe-config'
import styles from './word.module.scss'
import { useAppStore } from '../store/store'
import { useShallow } from 'zustand/react/shallow'
import useStore from '../store/use-store'

export interface Word {
  word: string,
  difficulty: number,
  frequency: number,
  definition: string,
  example?: string,
  language: string,
}
interface Props {
  words: Word[],
  name: string | undefined,
}

interface KeyboardEvent {
  key: string,
}

export default function Word({ words, name }: Props) {
  const { processedWords, getNextIndex } = useStore({ words, name: name || '' })
  const { showDetails, currentIndex, init, updateLearnedWords, learnedWords } = useAppStore(useShallow((state) => ({
    showDetails: state.showDetails,
    currentIndex: state.currentIndex,
    init: state.init,
    updateLearnedWords: state.updateLearnedWords,
    learnedWords: state.learnedWords,
  })))
  const [localShowDetails, setLocalShowDetails] = useState<boolean>(false)

  const nextWord = useCallback(() => {
    getNextIndex()
    setLocalShowDetails(false)
  }, [getNextIndex])

  const pass = useCallback(() => {
    updateLearnedWords(processedWords[currentIndex].word, name)
    nextWord()
  }, [updateLearnedWords, processedWords, currentIndex, nextWord, name])

  const triggerUpdate = useCallback((direction: string) => {
    switch(direction) {
    case 'up': setLocalShowDetails(true); break;
    case 'down': setLocalShowDetails(false); break;
    case 'right': pass(); break;
    case 'left': nextWord(); break;
    default: break;
    }
  }, [nextWord, pass])

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    switch(e.key) {
    case 'ArrowLeft': triggerUpdate('left'); break;
    case 'ArrowRight': triggerUpdate('right'); break;
    case 'ArrowUp': triggerUpdate('up'); break;
    case 'ArrowDown': triggerUpdate('down'); break;
    default: break;
    }
  }, [triggerUpdate])

  const handleSwipe = useCallback((data: any) => {
    switch(data.dir) {
    case 'Right': triggerUpdate('right'); break;
    case 'Left': triggerUpdate('left'); break;
    case 'Up': triggerUpdate('up'); break;
    case 'Down': triggerUpdate('down'); break;
    default: break;
    }
  }, [triggerUpdate])

  const onTap = () => {
    triggerUpdate('up')
  }

  const handlers = useSwipeable({
    onSwiped: (eventData) => {handleSwipe(eventData)},
    ...SwipeConfig,
    onTap: () => {onTap();}
  });

  useEffect(() => {
    if(!init) {
      return
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [onKeyDown, init])

  useEffect(() => {
    if(init && currentIndex === -1) {
      nextWord()
    }
  }, [currentIndex, nextWord, learnedWords, init])

  const currentWord = processedWords[currentIndex]

  if(!init) {
    return <div>Loading...</div>
  }

  return (
    <div className={`${styles.wordContainer}`} {...handlers}>
      {currentWord?.word}
      {
        (showDetails || localShowDetails) &&
        <div className="details">
          <div className="definition">{currentWord?.definition}</div>
          <div className="example">{currentWord?.example}</div>
        </div>
      }
    </div>
  )
}