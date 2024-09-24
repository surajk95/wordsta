'use client'
import { useCallback, useEffect, useState } from 'react'
import { DndContext, DragCancelEvent, DragEndEvent, DragMoveEvent, DragStartEvent, useSensors } from '@dnd-kit/core'
import {
  restrictToHorizontalAxis,
  restrictToWindowEdges,
} from '@dnd-kit/modifiers'
import { MouseSensor, TouchSensor, useSensor } from '@dnd-kit/core'
import { Draggable } from './draggable'
import { SwipeConfig } from '../config/swipe-config'
import styles from './word.module.scss'
import { useAppStore } from '../store/store'
import { useShallow } from 'zustand/react/shallow'
import useStore from '../store/use-store'
import { toast } from '@/hooks/use-toast'

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
  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
    },
  })
  const touchSensor = useSensor(TouchSensor, {
    // Press delay of 250ms, with tolerance of 10px of movement
    activationConstraint: {
      delay: 250,
      tolerance: 10,
    },
  })
  const sensors = useSensors(
    mouseSensor,
    touchSensor,
  );

  const { processedWords, getNextIndex } = useStore({ words, name: name || '' })
  const { showDetails, currentIndex, init, updateLearnedWords, learnedWords } = useAppStore(useShallow((state) => ({
    showDetails: state.showDetails,
    currentIndex: state.currentIndex,
    init: state.init,
    updateLearnedWords: state.updateLearnedWords,
    learnedWords: state.learnedWords,
  })))

  const [isMoving, setIsMoving] = useState<string | null>(null)
  const [localShowDetails, setLocalShowDetails] = useState<boolean>(false)
  const [status, setStatus] = useState<'pass' | 'fail' | null>(null)

  const nextWord = useCallback(() => {
    getNextIndex()
    setLocalShowDetails(false)
    setTimeout(() => {
      setStatus(null)
    }, 400)
  }, [getNextIndex])

  const pass = useCallback(() => {
    setStatus('pass')
    updateLearnedWords(processedWords[currentIndex]?.word, name)
    nextWord()
  }, [updateLearnedWords, processedWords, currentIndex, nextWord, name])

  const fail = useCallback(() => {
    setStatus('fail')
    nextWord()
  }, [nextWord])

  const triggerUpdate = useCallback((direction: string) => {
    switch (direction) {
      case 'up': setLocalShowDetails(true); break;
      case 'down': setLocalShowDetails(false); break;
      case 'right': {
        toast({
          title: 'Word learned',
          duration: 1000,
        })
        pass(); break;
      }
      case 'left': {
        toast({
          title: 'Word ignored',
          duration: 1000,
        })
        nextWord(); break;
      }
      default: break;
    }
  }, [nextWord, pass])

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft': triggerUpdate('left'); break;
      case 'ArrowRight': triggerUpdate('right'); break;
      case 'ArrowUp': triggerUpdate('up'); break;
      case 'ArrowDown': triggerUpdate('down'); break;
      default: break;
    }
  }, [triggerUpdate])

  const onTap = () => {
    triggerUpdate(localShowDetails ? 'down' : 'up')
  }

  useEffect(() => {
    if (!init) {
      return
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [onKeyDown, init])

  useEffect(() => {
    if (init && currentIndex === -1) {
      nextWord()
    }
  }, [currentIndex, nextWord, learnedWords, init])

  const currentWord = currentIndex === null ? null : processedWords[currentIndex]

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.delta.x > 100) {
      pass()
    } else if (event.delta.x < -100) {
      fail()
    }
    setIsMoving(null)
  }

  const handleDragMove = (event: DragMoveEvent) => {
    if (event.delta.x > 50 && isMoving !== 'right') {
      setIsMoving('right')
    } else if (event.delta.x < -50 && isMoving !== 'left') {
      setIsMoving('left')
    }
  }

  const handleDragCancel = (event: DragCancelEvent) => {
    setIsMoving(null)
  }

  if (!init) {
    return <div>Loading...</div>
  }

  if (currentIndex === null) {
    return (
      <div>
        <h1>You have learned all words in this list.</h1>
        <br />
        <h3>Change the list from the dropdown menu above, or reset progress by going to Settings.</h3>
      </div>
    )
  }

  return (
    <DndContext
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      modifiers={[restrictToHorizontalAxis]}
      sensors={sensors}
    >
      <Draggable status={status} onClick={onTap} currentIndex={currentIndex}>
        <div className={`${styles.wordContainer}`}>
          <div className={styles.word}>
            <h2 className={`${styles.title} ${isMoving === 'left' ? styles.left : isMoving === 'right' ? styles.right : ''}`}>
              {isMoving === 'left' ? 'I don\'t know this word' : isMoving === 'right' ? 'I know this word' : currentWord?.word}
            </h2>
            <div className={`${styles.details} ${((showDetails || localShowDetails) && isMoving === null) ? styles.show : styles.hide}`}>
              {
                currentWord?.definition &&
                <div className={styles.definition}>
                  <h3>Definition</h3>
                  <p>{currentWord?.definition}</p>
                </div>
              }
              {
                currentWord?.example &&
                <div className={styles.example}>
                  <h3>Example</h3>
                  <p>{currentWord?.example}</p>
                </div>
              }
            </div>
          </div>
          <div className={`${styles.indicator} ${styles.right} ${isMoving === 'right' ? styles.show : ''}`}>
          </div>
          <div className={`${styles.indicator} ${styles.left} ${isMoving === 'left' ? styles.show : ''}`}>
          </div>
        </div>
      </Draggable>
    </DndContext>
  )
}