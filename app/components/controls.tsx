'use client'

import { useShallow } from "zustand/react/shallow"
import { useAppStore } from "../store/store"
import { lists } from "../config/lists"

export default function Controls() {
  const { showDetails, setConfig } = useAppStore(useShallow((state) => ({
    setConfig: state.setConfig,
    showDetails: state.showDetails,
  })))
  return (
    <div>
      <button onClick={() => setConfig('showDetails', !showDetails )}>{showDetails ? 'Hide Details' : 'Show Details'}</button>
      <div>
        Sort by:
        <button onClick={() => setConfig('sort', 'difficulty')}>Difficulty</button>
        <button onClick={() => setConfig('sort', 'alphabetical')}>Alphabetical</button>
        <button onClick={() => setConfig('sort', 'frequency')}>Frequency</button>
        <button onClick={() => setConfig('sort', 'random')}>Random</button>
      </div>
      <div>
        Sort direction:
        <button onClick={() => setConfig('sortDirection', 'asc')}>Ascending</button>
        <button onClick={() => setConfig('sortDirection', 'desc')}>Descending</button>
      </div>
      <div>
        Reset progress
        {
          lists.map((list) => (
            <button key={list.id} onClick={() => setConfig('reset', list.slug)}>{list.name}</button>
          ))
        }
      </div>
    </div>
  )
}