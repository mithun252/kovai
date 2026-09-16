const FILTERS = ['All', 'Planned', 'In Progress', 'Complete']

function TaskFilter({ currentFilter, onFilterChange }) {
  return (
    <div className="task-filter">
      <span className="filter-label">Filter:</span>
      {FILTERS.map((filter) => (
        <button
          key={filter}
          type="button"
          className={`filter-btn ${currentFilter === filter ? 'active' : ''}`}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}

export default TaskFilter
