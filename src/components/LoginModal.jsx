import React, { useState } from 'react'
import api from '../api'

export default function LoginModal({ onLogin }) {
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('adminpass')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    
    try {
      console.log('→ LoginModal: Sending login request...')
      const res = await api.login(email, password)
      console.log('→ LoginModal: Received response:', { hasToken: !!res.data.token, userName: res.data.user?.name })
      
      // Call parent callback with response data
      onLogin(res.data)
    } catch (err) {
      const errMsg = err?.response?.data?.message || err?.message || 'Login failed'
      console.error('→ LoginModal: Login error:', errMsg)
      setError(errMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-modal">
      <div className="login-card">
        <h4>Sign In</h4>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="form-label">Email</label>
            <input 
              type="email"
              className="form-control" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="text-end">
            <button 
              className="btn btn-primary" 
              type="submit"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
