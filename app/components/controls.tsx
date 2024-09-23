'use client'

import { useShallow } from "zustand/react/shallow"
import { useAppStore } from "../store/store"
import { lists } from "../config/lists"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import React, { useMemo } from "react"
import { ListItem } from "./nav"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"
import styles from "./controls.module.scss"
import { usePathname } from "next/navigation"



export default function Controls() {
  const { toast } = useToast()
  const { showDetails, setConfig, config, name } = useAppStore(useShallow((state) => ({
    setConfig: state.setConfig,
    showDetails: state.showDetails,
    config: state.config,
    name: state.name,
  })))

  const pathname = usePathname()

  const nameItem = useMemo(() => lists.find((list) => list.slug === pathname.split('/').pop()), [pathname])
  if (!nameItem) return null

  return (
    <div className={styles.controls}>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>{lists.find((list) => list.slug === name)?.name}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {
                  lists.map((list) => (
                    <ListItem key={list.id} title={list.name} href={`/${list.slug}`}>
                      {list.description}
                    </ListItem>
                  ))
                }
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Settings</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
          </DialogHeader>
          <DialogDescription />
          <div className="grid gap-4 py-4">
            <div className="flex items-center space-x-2 my-5">
              <Checkbox
                id="showDetails"
                checked={showDetails}
                onCheckedChange={() => setConfig('showDetails', !showDetails)}
              />
              <label
                htmlFor="showDetails"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Show word meaning & example by default
              </label>
            </div>
            <div className="flex justify-between space-x-2 my-5">
              <div>
                <label>Sort by</label>
                <Select onValueChange={(value) => setConfig('sort', value)} value={config.sort}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="difficulty">Difficulty</SelectItem>
                    <SelectItem value="alphabetical">Alphabetical</SelectItem>
                    <SelectItem value="frequency">Frequency</SelectItem>
                    <SelectItem value="random">Random</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label>Sort direction</label>
                <Select onValueChange={(value) => setConfig('sortDirection', value)} value={config.sortDirection}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort direction" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">Ascending</SelectItem>
                    <SelectItem value="desc">Descending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <div>Reset progress</div>
              {
                lists.map((list) => (
                  <Button
                    key={list.id}
                    className="w-full my-2"
                    variant="outline"
                    onClick={() => {
                      setConfig('reset', list.slug)
                      toast({
                        title: "Progress reset",
                        description: `Progress for ${list.name} has been reset`,
                      })
                    }}
                  >
                    {list.name}
                  </Button>
                ))
              }
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}