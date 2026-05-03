import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Home() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.instance.get('/dashboard')
      .then(r => {
        setData(r.data)
      })
      .catch(err => console.error('Error:', err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="dashboard-loading"><p>Loading home...</p></div>

  return (
    <div className="dashboard-container">
      <div className="breadcrumb-nav">
        <span>Home</span>
      </div>

      <h2 style={{marginTop: '20px'}}>Welcome to Quantico Dashboard</h2>
      
      <div style={{marginTop: '40px', textAlign: 'center', padding: '40px 20px'}}>
        <div style={{fontSize: '4rem', marginBottom: '20px'}}>🎯</div>
        <h3>Business Management System</h3>
        <p style={{color: '#999', marginBottom: '30px'}}>
          Manage your sales, inventory, customers, and analytics in one place.
        </p>
        
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', maxWidth: '600px', margin: '0 auto'}}>
          <div className="metric-card">
            <div style={{fontSize: '2rem', marginBottom: '10px'}}>📊</div>
            <div>Dashboard</div>
            <div style={{color: '#999', fontSize: '0.85rem'}}>View KPIs</div>
          </div>
          
          <div className="metric-card">
            <div style={{fontSize: '2rem', marginBottom: '10px'}}>📦</div>
            <div>Products</div>
            <div style={{color: '#999', fontSize: '0.85rem'}}>Manage stock</div>
          </div>

          <div className="metric-card">
            <div style={{fontSize: '2rem', marginBottom: '10px'}}>👥</div>
            <div>Customers</div>
            <div style={{color: '#999', fontSize: '0.85rem'}}>View clients</div>
          </div>

          <div className="metric-card">
            <div style={{fontSize: '2rem', marginBottom: '10px'}}>💵</div>
            <div>Orders</div>
            <div style={{color: '#999', fontSize: '0.85rem'}}>Track sales</div>
          </div>

          <div className="metric-card">
            <div style={{fontSize: '2rem', marginBottom: '10px'}}>💳</div>
            <div>Payments</div>
            <div style={{color: '#999', fontSize: '0.85rem'}}>Payment status</div>
          </div>

          <div className="metric-card">
            <div style={{fontSize: '2rem', marginBottom: '10px'}}>📈</div>
            <div>Analytics</div>
            <div style={{color: '#999', fontSize: '0.85rem'}}>View reports</div>
          </div>
        </div>
      </div>

      {data && (
        <div style={{marginTop: '50px'}}>
          <h3>Dashboard Overview</h3>
          <div className="dashboard-grid">
            {data.widgets && data.widgets.map((w, idx) => (
              <div key={idx} className="metric-card">
                <div className="card-header">
                  <h3>{w.kpi}</h3>
                </div>
                <div className="card-value">{w.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
