import { useState } from 'react'
import Column from './Column'
import './Board.css'

export default function Board({ columns, onMoveCard, onAddCard, onDeleteCard }) {
  const [dragging, setDragging] = useState(null) // { cardId, fromColId }
  const [dragOver, setDragOver] = useState(null)

  const handleDragStart = (cardId, colId) => {
    setDragging({ cardId, fromColId: colId })
  }

  const handleDragOver = (colId) => {
    setDragOver(colId)
  }

  const handleDrop = (toColId) => {
    if (dragging) {
      onMoveCard(dragging.cardId, dragging.fromColId, toColId)
    }
    setDragging(null)
    setDragOver(null)
  }

  const handleDragEnd = () => {
    setDragging(null)
    setDragOver(null)
  }

  return (
    <main className="board">
      {columns.map(col => (
        <Column
          key={col.id}
          column={col}
          isDragOver={dragOver === col.id}
          draggingId={dragging?.cardId}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragEnd={handleDragEnd}
          onAddCard={onAddCard}
          onDeleteCard={onDeleteCard}
        />
      ))}
    </main>
  )
}
