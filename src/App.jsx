import { useState } from 'react'
import Board from './components/Board'
import './App.css'

const INITIAL_COLUMNS = [
  {
    id: 'backlog',
    title: 'Backlog',
    color: '#6b7280',
    cards: [
      { id: '1', title: 'Define color palette', description: 'Choose primary, secondary, and accent colors', tag: 'Design' },
      { id: '2', title: 'Create wireframes', description: 'Low-fidelity wireframes for all pages', tag: 'UX' },
    ],
  },
  {
    id: 'todo',
    title: 'To Do',
    color: '#3b82f6',
    cards: [
      { id: '3', title: 'Setup project structure', description: 'Folder structure, naming conventions', tag: 'Dev' },
      { id: '4', title: 'Typography system', description: 'Font families, scale, line heights', tag: 'Design' },
    ],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    color: '#f59e0b',
    cards: [
      { id: '5', title: 'Component library', description: 'Build reusable UI components', tag: 'Dev' },
    ],
  },
  {
    id: 'review',
    title: 'Review',
    color: '#8b5cf6',
    cards: [
      { id: '6', title: 'Landing page layout', description: 'Hero, features, CTA sections', tag: 'Design' },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    color: '#10b981',
    cards: [
      { id: '7', title: 'Project kickoff', description: 'Initial meeting and goal alignment', tag: 'General' },
    ],
  },
]

export default function App() {
  const [columns, setColumns] = useState(INITIAL_COLUMNS)

  const moveCard = (cardId, fromColId, toColId) => {
    if (fromColId === toColId) return
    setColumns(cols => {
      const card = cols.find(c => c.id === fromColId).cards.find(c => c.id === cardId)
      return cols.map(col => {
        if (col.id === fromColId) return { ...col, cards: col.cards.filter(c => c.id !== cardId) }
        if (col.id === toColId) return { ...col, cards: [...col.cards, card] }
        return col
      })
    })
  }

  const addCard = (colId, title) => {
    const newCard = {
      id: Date.now().toString(),
      title,
      description: '',
      tag: 'General',
    }
    setColumns(cols =>
      cols.map(col => col.id === colId ? { ...col, cards: [...col.cards, newCard] } : col)
    )
  }

  const deleteCard = (cardId, colId) => {
    setColumns(cols =>
      cols.map(col => col.id === colId ? { ...col, cards: col.cards.filter(c => c.id !== cardId) } : col)
    )
  }

  const totalCards = columns.reduce((acc, col) => acc + col.cards.length, 0)

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>Web Design Project</h1>
          <span className="header-subtitle">Kanban Board</span>
        </div>
        <div className="header-meta">
          <span>{totalCards} tasks</span>
        </div>
      </header>
      <Board
        columns={columns}
        onMoveCard={moveCard}
        onAddCard={addCard}
        onDeleteCard={deleteCard}
      />
    </div>
  )
}
