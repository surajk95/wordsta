import { Card, CardContent } from "@/components/ui/card"
import React, { useCallback, useEffect, useState } from "react"

function getRandomPosition() {
  return `${Math.random() * 100}%`
}

function getRandomSize() {
  return `${Math.random() * 3 + 1}rem`
}

function getRandomRotation() {
  return `rotate(${Math.random() * 360}deg)`
}

function getRandomShape() {
  const shapes = ['circle', 'square', 'triangle']
  return shapes[Math.floor(Math.random() * shapes.length)]
}

function CardUi({
  children,
  className,
  nodeRef,
  style,
  listeners,
  attributes,
  onClick,
  currentIndex,
}: {
  children: React.ReactNode,
  className?: string,
  nodeRef?: React.Ref<HTMLDivElement>,
  style?: React.CSSProperties,
  listeners?: any,
  attributes?: any,
  onClick?: () => void,
  currentIndex: number,
}) {
  const [decorations, setDecorations] = useState<Array<{ shape: string, top: string, left: string, size: string, rotation: string }>>([])
  useEffect(() => {
    const newDecorations = Array(5).fill(null).map(() => ({
      shape: getRandomShape(),
      top: getRandomPosition(),
      left: getRandomPosition(),
      size: getRandomSize(),
      rotation: getRandomRotation()
    }))
    setDecorations(newDecorations)
  }, [currentIndex])

  const renderShape = useCallback((shape: string, size: string) => {
    switch (shape) {
      case 'circle':
        return <circle cx="50%" cy="50%" r="50%" />
      case 'square':
        return <rect width="100%" height="100%" />
      case 'triangle':
        return <polygon points="50,0 100,100 0,100" />
      default:
        return null
    }
  }, [])

  return (
    <Card ref={nodeRef} className={className} style={style} {...listeners} {...attributes} onClick={onClick}>
      <CardContent className="relative h-full">
        {decorations.map((dec, index) => (
          <div
            key={index}
            className="absolute opacity-10 pointer-events-none"
            style={{
              top: dec.top,
              left: dec.left,
              width: dec.size,
              height: dec.size,
              transform: dec.rotation
            }}
          >
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="fill-foreground">
              {renderShape(dec.shape, dec.size)}
            </svg>
          </div>
        ))}
        {children}
      </CardContent>
    </Card>
  )
}

export default React.memo(CardUi)