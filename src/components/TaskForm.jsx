import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/firebase'

function TaskForm({ userId }) {
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const trimmed = title.trim()
    if (!trimmed) {
      setError('Please enter a task title.')
      return
    }
    setLoading(true)
    try {
      await addDoc(collection(db, 'tasks'), {
        title: trimmed,
        status: 'Planned',
        userId,
        createdAt: serverTimestamp(),
      })
      setTitle('')
    } catch (err) {
      setError('Failed to create task. Please try again.')
      console.error('Create task error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-row">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          className="task-input"
          disabled={loading}
        />
        <button type="submit" className="add-btn" disabled={loading}>
          {loading ? 'Adding...' : 'Add Task'}
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
    </form>
  )
}

export default TaskForm
