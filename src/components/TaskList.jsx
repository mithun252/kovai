import { useEffect, useState } from 'react'
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from 'firebase/firestore'
import { db } from '../firebase/firebase'
import TaskItem from './TaskItem'
import TaskFilter from './TaskFilter'

const STATUSES = ['Planned', 'In Progress', 'Complete']

function TaskList({ userId }) {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!userId) return
    if (!db) {
      setError('Database not initialized. Please refresh.')
      setLoading(false)
      return
    }
    setLoading(true)
    setError('')
    const tasksRef = collection(db, 'tasks')
    const q = query(
      tasksRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    )

    try {
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const taskList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          setTasks(taskList)
          setLoading(false)
        },
        (err) => {
          const code = err?.code || 'unknown'
          const message = err?.message || ''
          setError(`Failed to load tasks (${code}). Please refresh and try again.`)
          setLoading(false)
          console.error('Firestore listener error:', code, message)
        }
      )
      return () => unsubscribe()
    } catch (err) {
      setError('Failed to set up task listener. Please try again.')
      setLoading(false)
      console.error('Query error:', err)
    }
  }, [userId])

  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    )
  }

  const filteredTasks =
    filter === 'All' ? tasks : tasks.filter((task) => task.status === filter)

  const counts = {
    Total: tasks.length,
    Planned: tasks.filter((t) => t.status === 'Planned').length,
    'In Progress': tasks.filter((t) => t.status === 'In Progress').length,
    Complete: tasks.filter((t) => t.status === 'Complete').length,
  }

  if (!userId) {
    return (
      <div className="task-list-container">
        <p className="error-message">Please sign in to view your tasks.</p>
      </div>
    )
  }

  return (
    <div className="task-list-container">
      <div className="task-counts">
        {Object.entries(counts).map(([label, count]) => (
          <span key={label} className="count-badge">
            {label}: {count}
          </span>
        ))}
      </div>
      <TaskFilter currentFilter={filter} onFilterChange={setFilter} />
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Loading tasks...</div>
      ) : filteredTasks.length === 0 ? (
        <div className="empty-state">
          {filter === 'All'
            ? "You don't have any tasks yet. Create your first task."
            : `No tasks with status "${filter}".`}
        </div>
      ) : (
        <div className="task-list">
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} onStatusChange={handleStatusChange} />
          ))}
        </div>
      )}
    </div>
  )
}

export default TaskList
