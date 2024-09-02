'use client'

import { useShallow } from "zustand/react/shallow"
import { useAppStore } from "../store/store"

export const Progress = () => {
  const { words, name, learnedWords } = useAppStore(useShallow((state) => ({
    words: state.words,
    name: state.name,
    learnedWords: state.learnedWords,
  })))

  if(!name) {
    return null
  }

  const score = Object.keys(learnedWords[name] || {}).length
  return (
    <div>
      <h3>{score} words learned out of {words.length}</h3>
    </div>
  )
}