"use client"

import React, { useState } from "react"
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

function Info() {
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
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Swipe left / Left Arrow</h3>
            <p className="text-sm"><span className="font-medium text-red-500 dark:text-red-400">I don&apos;t know this word</span></p>
            <p className="text-xs">The word will be shown again next time you go through the list.</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Swipe right / Right Arrow</h3>
            <p className="text-sm"><span className="font-medium text-green-500 dark:text-green-400">I know this word</span></p>
            <p className="text-xs">The word will be added to your learned words. It will not be shown again (until you reset progress).</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Tap / Click / Up Arrow / Down Arrow</h3>
            <p className="text-sm"><span className="font-medium text-blue-500 dark:text-blue-400">Toggle meaning and examples</span></p>
            <p className="text-xs">You can also tap/click the card or press the Up Arrow to show/hide details.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default React.memo(Info)