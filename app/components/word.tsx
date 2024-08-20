'use client'
import { useCallback, useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { SwipeConfig } from '../config/swipe-config'
import styles from './word.module.scss'

interface Word {
  word: string,
  difficulty: number,
  frequency: number,
  definition: string,
  example?: string,
  language: string,
}
interface Props {
  words: Word[]
}

interface KeyboardEvent {
  key: string,
}

export default function Word({ words }: Props) {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [showDetails, setShowDetails] = useState<boolean>(false)
  const [orientation, setOrientation] = useState<string | null>(null)
  console.log(`zzzwords`, words.length)

  const triggerUpdate = useCallback((direction: string) => {
    console.log(`zzz trigger`, direction)
    switch(direction) {
    case 'up': setShowDetails(true); break;
    case 'down': setShowDetails(false); break;
    case 'right': nextWord(); break;
    case 'left': nextWord(); break;
    default: break;
    }
  }, [])

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    switch(e.key) {
    case 'ArrowLeft': triggerUpdate('left'); break;
    case 'ArrowRight': triggerUpdate('right'); break;
    case 'ArrowUp': triggerUpdate('up'); break;
    case 'ArrowDown': triggerUpdate('down'); break;
    default: break;
    }
  }, [triggerUpdate])

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [onKeyDown])

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

  const nextWord = () => {
    setOrientation('right');
    setTimeout(() => setOrientation('left'), 100)
    setCurrentIndex((index) => (index + 1))
    setTimeout(() => setOrientation(null), 200)
  }

  const currentWord = words[currentIndex]

  return (
    <div className={`${styles.wordContainer} ${styles[orientation || '']}`} {...handlers}>
      {currentWord?.word}
      {
        showDetails &&
        <div className="details">
          {currentWord?.definition}
        </div>
      }
    </div>
  )
}