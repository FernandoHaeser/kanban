import './Card.css'

const TAG_COLORS = {
  Design: '#3b82f6',
  UX: '#8b5cf6',
  Dev: '#f59e0b',
  General: '#6b7280',
}

export default function Card({ card, colId, isDragging, onDragStart, onDragEnd, onDelete }) {
  return (
    <div
      className={`card${isDragging ? ' card--dragging' : ''}`}
      draggable
      onDragStart={() => onDragStart(card.id, colId)}
      onDragEnd={onDragEnd}
    >
      <div className="card-top">
        {card.tag && (
          <span
            className="card-tag"
            style={{ background: TAG_COLORS[card.tag] || '#6b7280' }}
          >
            {card.tag}
          </span>
        )}
        <button
          className="card-delete"
          onClick={() => onDelete(card.id, colId)}
          title="Delete card"
        >
          ✕
        </button>
      </div>
      <p className="card-title">{card.title}</p>
      {card.description && <p className="card-desc">{card.description}</p>}
    </div>
  )
}
