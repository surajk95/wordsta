'use client'
import { useLayoutEffect } from "react"
import { useRouter } from "next/navigation"

export default function Redirect() {
  const router = useRouter()
  useLayoutEffect(() => {
    let currentList = localStorage.getItem('currentList')
    console.log(`zzz redirect`, currentList)
    if(!currentList) {
      currentList = 'high-frequency-gre'
    }
    if(currentList) {
      router.push(`/${currentList}`)
    }
  }, [])
  
  return null
}