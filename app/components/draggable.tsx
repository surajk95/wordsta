import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import styles from './word.module.scss';
import CardUi from './card';
import { Card } from '@/components/ui/card';
export function Draggable(props: { children: React.ReactNode, status: string | null, onClick: () => void, currentIndex: number }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable',
  });
  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0) rotate(${(transform.x / 20).toFixed(1)}deg)` : undefined,
    transition: 'opacity 1s ease',
  }


  return (
    <CardUi
      className={`hover:shadow-xl ${styles.draggable} ${props.status === 'pass' ? styles.pass : props.status === 'fail' ? styles.fail : ''}`}
      nodeRef={setNodeRef}
      style={style}
      listeners={listeners}
      attributes={attributes}
      onClick={props.onClick}
      currentIndex={props.currentIndex}
    >
      {props.children}
    </CardUi>
  );
}