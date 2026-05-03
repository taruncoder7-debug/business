import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Tasks({ user }) {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api.instance.get('/tasks')
      .then(r => {
        setTasks(r.data || [])
        setError(null)
      })
      .catch(err => {
        console.error('Tasks fetch error:', err.message)
        setError(err.message)
        setTasks([])
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div><h2>Tasks</h2><p>Loading...</p></div>
  if (error) return <div><h2>Tasks</h2><div className="alert alert-danger">Error: {error}</div></div>

  return (
    <div>
      <h2>Tasks Management</h2>
      {!tasks || tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, i) => (
                <tr key={i}>
                  <td>{task.title || '-'}</td>
                  <td><span className="badge bg-info">{task.status || 'pending'}</span></td>
                  <td>{task.assignedTo || '-'}</td>
                  <td>{task.dueDate || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
