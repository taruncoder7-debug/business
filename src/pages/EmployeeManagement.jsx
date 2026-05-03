import React, { useState, useEffect } from 'react'
import api from '../api'

export default function EmployeeManagement({ user, onNavigate }) {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'employee',
    department: '',
    password: '',
  })

  const roles = ['employee', 'manager', 'admin']
  const departments = ['IT', 'HR', 'Finance', 'Operations', 'Sales', 'Marketing']

  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    try {
      const res = await api.instance.get('/users')
      setEmployees(res.data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAddEmployee = async () => {
    if (!formData.name || !formData.email) {
      alert('Name and Email are required')
      return
    }
    try {
      await api.instance.post('/users', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password || 'defaultPass123',
        role: formData.role,
        department: formData.department
      })
      setFormData({ name: '', email: '', phone: '', role: 'employee', department: '', password: '' })
      setShowForm(false)
      fetchEmployees()
      alert('Employee added successfully!')
    } catch (err) {
      alert(`Error: ${err.response?.data?.message || err.message}`)
    }
  }

  const handleDeleteEmployee = async (id) => {
    if (!window.confirm('Are you sure you want to remove this employee?')) return
    try {
      await api.instance.delete(`/users/${id}`)
      fetchEmployees()
      alert('Employee removed successfully!')
    } catch (err) {
      alert(`Error: ${err.message}`)
    }
  }

  const handleEditEmployee = (emp) => {
    setFormData({
      name: emp.name,
      email: emp.email,
      phone: emp.phone || '',
      role: emp.role,
      department: emp.department || '',
      password: ''
    })
    setEditingId(emp._id)
    setShowForm(true)
  }

  const handleUpdateEmployee = async () => {
    if (!formData.name || !formData.email) {
      alert('Name and Email are required')
      return
    }
    try {
      await api.instance.put(`/users/${editingId}`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        department: formData.department
      })
      setFormData({ name: '', email: '', phone: '', role: 'employee', department: '', password: '' })
      setEditingId(null)
      setShowForm(false)
      fetchEmployees()
      alert('Employee updated successfully!')
    } catch (err) {
      alert(`Error: ${err.message}`)
    }
  }

  const getRoleColor = (role) => {
    switch(role) {
      case 'admin': return '#ff6b6b'
      case 'manager': return '#ffc107'
      case 'employee': return '#00d084'
      default: return '#00d0ff'
    }
  }

  if (!user || user.role !== 'admin') {
    return <div className="alert alert-danger">Access Denied: Only Admins can manage employees</div>
  }

  if (loading) return <div className="dashboard-loading"><p>Loading employees...</p></div>

  return (
    <div className="dashboard-container">
      <div className="breadcrumb-nav">
        <button type="button" className="breadcrumb-link" onClick={() => onNavigate?.('home')}>Home</button>
        <span className="breadcrumb-sep">•</span>
        <button type="button" className="breadcrumb-link" onClick={() => onNavigate?.('dashboard')}>Dashboard</button>
        <span className="breadcrumb-sep">•</span>
        <span>Employee Management</span>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-grid">
        <div className="metric-card">
          <div className="card-header">
            <h3>Total Employees</h3>
            <span className="card-icon">👥</span>
          </div>
          <div className="card-value">{employees.length}</div>
        </div>

        <div className="metric-card">
          <div className="card-header">
            <h3>Admins</h3>
            <span className="card-icon">👨‍💼</span>
          </div>
          <div className="card-value">{employees.filter(e => e.role === 'admin').length}</div>
        </div>

        <div className="metric-card">
          <div className="card-header">
            <h3>Managers</h3>
            <span className="card-icon">📋</span>
          </div>
          <div className="card-value">{employees.filter(e => e.role === 'manager').length}</div>
        </div>

        <div className="metric-card">
          <div className="card-header">
            <h3>Employees</h3>
            <span className="card-icon">💼</span>
          </div>
          <div className="card-value">{employees.filter(e => e.role === 'employee').length}</div>
        </div>
      </div>

      {/* Add Employee Button */}
      <div style={{ marginTop: '30px', marginBottom: '30px' }}>
        <button 
          onClick={() => {
            setEditingId(null)
            setFormData({ name: '', email: '', phone: '', role: 'employee', department: '', password: '' })
            setShowForm(!showForm)
          }}
          className="btn btn-primary"
        >
          {showForm ? '✕ Cancel' : '+ Add New Employee'}
        </button>
      </div>

      {/* Add/Edit Employee Form */}
      {showForm && (
        <div className="form-card">
          <h3>{editingId ? 'Edit Employee' : 'Add New Employee'}</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email *</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                placeholder="+1234567890"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Role *</label>
              <select
                name="role"
                className="form-control"
                value={formData.role}
                onChange={handleInputChange}
              >
                {roles.map(r => <option key={r} value={r}>{r.toUpperCase()}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Department</label>
              <select
                name="department"
                className="form-control"
                value={formData.department}
                onChange={handleInputChange}
              >
                <option value="">Select Department</option>
                {departments.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            {!editingId && (
              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Leave blank for default"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>

          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            <button 
              onClick={editingId ? handleUpdateEmployee : handleAddEmployee}
              className="btn btn-primary"
            >
              {editingId ? '💾 Update Employee' : '➕ Add Employee'}
            </button>
            <button 
              onClick={() => {
                setShowForm(false)
                setEditingId(null)
              }}
              className="btn"
              style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Employees Table */}
      <div style={{ marginTop: '30px' }}>
        <h3 style={{ marginBottom: '20px' }}>All Employees</h3>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Department</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp._id}>
                  <td><strong>{emp.name}</strong></td>
                  <td>{emp.email}</td>
                  <td>{emp.phone || '-'}</td>
                  <td>
                    <span className="badge" style={{ background: getRoleColor(emp.role), color: 'white' }}>
                      {emp.role.toUpperCase()}
                    </span>
                  </td>
                  <td>{emp.department || '-'}</td>
                  <td>
                    <span className="badge" style={{ background: emp.active ? '#00d084' : '#ff6b6b' }}>
                      {emp.active ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleEditEmployee(emp)}
                        className="btn"
                        style={{ background: '#1f77b4', color: 'white', padding: '5px 10px', fontSize: '0.8rem' }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteEmployee(emp._id)}
                        className="btn"
                        style={{ background: '#ff6b6b', color: 'white', padding: '5px 10px', fontSize: '0.8rem' }}
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

