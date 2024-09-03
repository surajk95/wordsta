import React from 'react';
import {useDraggable} from '@dnd-kit/core';
import styles from './word.module.scss';
export function Draggable(props: {children: React.ReactNode, status: string | null}) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: 'draggable',
  });
  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition: 'opacity 1s ease',
  }

  
  return (
    <div
      className={`${styles.draggable} ${props.status === 'pass' ? styles.pass : props.status === 'fail' ? styles.fail : ''}`}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </div>
  );
}