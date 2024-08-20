'use client'
import { useCallback, useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { SwipeConfig } from '../config/swipe-config'
import styles from './word.module.scss'

export default function Word({ words }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showDetails, setShowDetails] = useState(false)
  const [orientation, setOrientation] = useState(null)
  console.log(`zzzwords`, words.length)

  const triggerUpdate = useCallback((direction) => {
    console.log(`zzz trigger`, direction)
    switch(direction) {
    case 'up': setShowDetails(true); break;
    case 'down': setShowDetails(false); break;
    case 'right': nextWord(); break;
    case 'left': nextWord(); break;
    default: break;
    }
  }, [])

  const onKeyDown = useCallback((e) => {
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

  const handleSwipe = useCallback((data) => {
    switch(data.dir) {
    case 'Right': triggerUpdate('right'); break;
    case 'Left': triggerUpdate('left'); break;
    case 'Up': triggerUpdate('up'); break;
    case 'Down': triggerUpdate('down'); break;
    default: break;
    }
  }, [triggerUpdate])

  const onTap = (data) => {
    triggerUpdate('up')
  }

  const handlers = useSwipeable({
    onSwiped: (eventData) => {handleSwipe(eventData)},
    ...SwipeConfig,
    onTap: () => {onTap();}
  });

  const nextWord = () => {
    setOrientation('right');
    setCurrentIndex((index) => (index + 1))
    setTimeout(() => setOrientation('left'), 100)
    setTimeout(() => setOrientation(null), 300)
  }

  const currentWord = words[currentIndex]

  return (
    <div className={`${styles.wordContainer} ${styles[orientation]}`} {...handlers}>
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