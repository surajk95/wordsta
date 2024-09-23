"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Info as InfoIcon } from "lucide-react"
import styles from "./word.module.scss"

export default function Info() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={`rounded-full ${styles.infoButton}`}
          aria-label="Open information dialog"
        >
          <InfoIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Controls</DialogTitle>
          <DialogDescription>
            This is how you can control the app.
          </DialogDescription>
        </DialogHeader>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          <ul>
            <li className="mb-4">
              <span className="font-bold">Swipe left / Left Arrow</span> - <span className="text-red-500">I don't know this word</span>
              <p>The word will be shown again next time you go through the list.</p>
            </li>
            <li className="mb-4">
              <span className="font-bold">Swipe right / Right Arrow</span> - <span className="text-green-500">I know this word</span>
              <p>The word will be added to your learned words. It will not be shown again (until you reset progress).</p>
            </li>
            <li className="mb-4">
              <span className="font-bold">Tap / Click / Up Arrow / Down Arrow</span> - <span className="text-blue-500">Toggle meaning and examples</span>
              <p>You can also tap/click the card or press the Up Arrow to show/hide details.</p>
            </li>
          </ul>
        </p>
      </DialogContent>
    </Dialog>
  )
}