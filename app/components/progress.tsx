'use client'

import { useShallow } from "zustand/react/shallow"
import { useAppStore } from "../store/store"
import { Progress } from "@/components/ui/progress"
import styles from "./progress.module.scss"

export const ProgressUI = () => {
  const { words, name, learnedWords } = useAppStore(useShallow((state) => ({
    words: state.words,
    name: state.name,
    learnedWords: state.learnedWords,
  })))

  if(!name || !words || !words.length) {
    return null
  }

  const learnedWordsCount = Object.keys(learnedWords[name] || {}).length
  const score = Math.floor((learnedWordsCount * 100) / words.length)

  return (
    <div className={styles.progress}>
      <h3><b>{learnedWordsCount}</b> learned out of {words.length} words</h3>
      <Progress value={score} className="w-[50%] w-max-full" />
    </div>
  )
}