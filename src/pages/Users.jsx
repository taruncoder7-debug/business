import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Users({ user, onNavigate }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api.instance.get('/users')
      .then(r => {
        setUsers(r.data || [])
        setError(null)
      })
      .catch(err => {
        console.error('Users fetch error:', err.message)
        setError(err.message)
        setUsers([])
      })
      .finally(() => setLoading(false))
  }, [])

  if (!user || String(user?.role || '').toLowerCase() !== 'admin') {
    return <div className="alert alert-danger">Access Denied: Only Admins can manage users</div>
  }

  if (loading) return <div className="dashboard-loading"><p>Loading users...</p></div>

  return (
    <div className="dashboard-container">
      <div className="breadcrumb-nav">
        <button type="button" className="breadcrumb-link" onClick={() => onNavigate?.('home')}>Home</button>
        <span className="breadcrumb-sep">â€¢</span>
        <button type="button" className="breadcrumb-link" onClick={() => onNavigate?.('dashboard')}>Dashboard</button>
        <span className="breadcrumb-sep">â€¢</span>
        <span>User Management</span>
      </div>

      <h2 style={{ marginTop: '20px' }}>User Management</h2>
      {error && <div className="alert alert-danger">Error: {error}</div>}
      {!users || users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Department</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={i}>
                  <td>{u.name || '-'}</td>
                  <td>{u.email || '-'}</td>
                  <td><span className="badge" style={{ background: '#1f77b4', color: 'white' }}>{u.role || 'user'}</span></td>
                  <td>{u.department || '-'}</td>
                  <td><span className="badge" style={{ background: '#00d084', color: 'white' }}>Active</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

