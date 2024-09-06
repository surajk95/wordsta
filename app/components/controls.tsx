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
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import React from "react"
import { cn } from "@/lib/utils"

export default function Controls() {
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
            <button onClick={() => setConfig('showDetails', !showDetails )}>{showDetails ? 'Hide Details by default' : 'Show Details by default'}</button>
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
              <label>Reset progress</label>
              {
                lists.map((list) => (
                  <button key={list.id} onClick={() => setConfig('reset', list.slug)}>{list.name}</button>
                ))
              }
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"