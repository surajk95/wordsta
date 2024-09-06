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
import Link from "next/link"
import React from "react"
import { ListItem } from "./nav"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"


export default function Controls() {
  const { toast } = useToast()
  const { showDetails, setConfig, config, name } = useAppStore(useShallow((state) => ({
    setConfig: state.setConfig,
    showDetails: state.showDetails,
    config: state.config,
    name: state.name,
  })))
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>{name}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {
                  lists.map((list) => (
                    <ListItem key={list.id} title={list.name} href={`/${list.slug}`}>
                      {list.name}
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
          <button>Settings</button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
          </DialogHeader>
          <DialogDescription />
          <div className="grid gap-4 py-4">
            <div className="flex items-center space-x-2">
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
            <div>
              <label>Sort by:</label>
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
              <label>Sort direction:</label>
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
            <div>
              <div>Reset progress</div>
              {
                lists.map((list) => (
                  <Button
                    key={list.id}
                    className="w-full my-2"
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
    </>
  )
}