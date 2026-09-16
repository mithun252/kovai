import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase/firebase'

const VALID_STATUSES = ['Planned', 'In Progress', 'Complete']

function TaskItem({ task, onStatusChange }) {
  const handleStatusChange = async (e) => {
    const newStatus = e.target.value
    if (!VALID_STATUSES.includes(newStatus)) {
      return
    }
    try {
      const taskRef = doc(db, 'tasks', task.id)
      await updateDoc(taskRef, { status: newStatus })
      onStatusChange(task.id, newStatus)
    } catch (err) {
      console.error('Update status error:', err)
    }
  }

  const formattedDate = task.createdAt
    ? new Date(task.createdAt.toDate()).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : ''

  return (
    <div className="task-item">
      <div className="task-info">
        <span className="task-title">{task.title}</span>
        {formattedDate && <span className="task-date">{formattedDate}</span>}
      </div>
      <select
        value={task.status}
        onChange={handleStatusChange}
        className="status-select"
      >
        {VALID_STATUSES.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  )
}

export default TaskItem
