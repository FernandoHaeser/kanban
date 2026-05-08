import { useState } from 'react'
import Card from './Card'
import './Column.css'

export default function Column({ column, isDragOver, draggingId, onDragStart, onDragOver, onDrop, onDragEnd, onAddCard, onDeleteCard }) {
  const [adding, setAdding] = useState(false)
  const [newTitle, setNewTitle] = useState('')

  const handleAdd = () => {
    if (newTitle.trim()) {
      onAddCard(column.id, newTitle.trim())
      setNewTitle('')
      setAdding(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd()
    if (e.key === 'Escape') { setAdding(false); setNewTitle('') }
  }

  return (
    <div
      className={`column${isDragOver ? ' column--drag-over' : ''}`}
      onDragOver={e => { e.preventDefault(); onDragOver(column.id) }}
      onDrop={() => onDrop(column.id)}
    >
      <div className="column-header" style={{ borderTopColor: column.color }}>
        <div className="column-title-row">
          <h2 className="column-title">{column.title}</h2>
          <span className="column-count" style={{ background: column.color }}>{column.cards.length}</span>
        </div>
      </div>

      <div className="column-cards">
        {column.cards.map(card => (
          <Card
            key={card.id}
            card={card}
            colId={column.id}
            isDragging={draggingId === card.id}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDelete={onDeleteCard}
          />
        ))}

        {adding ? (
          <div className="card-add-form">
            <input
              autoFocus
              className="card-add-input"
              placeholder="Card title..."
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="card-add-actions">
              <button className="btn-add-confirm" onClick={handleAdd}>Add</button>
              <button className="btn-add-cancel" onClick={() => { setAdding(false); setNewTitle('') }}>✕</button>
            </div>
          </div>
        ) : (
          <button className="btn-add-card" onClick={() => setAdding(true)}>
            + Add card
          </button>
        )}
      </div>
    </div>
  )
}
