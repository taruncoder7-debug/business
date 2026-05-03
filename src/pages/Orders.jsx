import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Orders({ onNavigate }) {
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    api.instance.get('/invoices')
      .then(r => setInvoices(r.data || []))
      .catch(err => console.error('Error:', err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="dashboard-loading"><p>Loading orders...</p></div>

  return (
    <div className="dashboard-container">
      <div className="breadcrumb-nav">
        <button type="button" className="breadcrumb-link" onClick={() => onNavigate?.('home')}>Home</button>
        <span className="breadcrumb-sep">•</span>
        <span>Orders</span>
      </div>

      <h2 style={{marginTop: '20px'}}>Sales Orders</h2>
      
      <div style={{marginTop: '20px'}}>
        <div className="dashboard-grid">
          <div className="metric-card">
            <div className="card-header">
              <h3>Total Orders</h3>
              <span className="card-icon">📦</span>
            </div>
            <div className="card-value">{invoices.length}</div>
          </div>
          
          <div className="metric-card">
            <div className="card-header">
              <h3>Paid Orders</h3>
              <span className="card-icon">✅</span>
            </div>
            <div className="card-value">{invoices.filter(i => i.status === 'paid').length}</div>
          </div>

          <div className="metric-card">
            <div className="card-header">
              <h3>Pending Orders</h3>
              <span className="card-icon">⏳</span>
            </div>
            <div className="card-value">{invoices.filter(i => i.status === 'pending' || i.status === 'sent').length}</div>
          </div>

          <div className="metric-card">
            <div className="card-header">
              <h3>Total Revenue</h3>
              <span className="card-icon">💵</span>
            </div>
            <div className="card-value">${invoices.reduce((sum, i) => sum + (i.total || 0), 0).toFixed(2)}</div>
          </div>
        </div>
      </div>

      <h3 style={{marginTop: '30px'}}>Recent Orders</h3>
      {invoices.length === 0 ? (
        <div className="alert alert-danger">No orders found</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(inv => (
              <tr key={inv._id}>
                <td>{inv.invoiceNumber}</td>
                <td>{inv.customerName}</td>
                <td>${inv.total?.toFixed(2)}</td>
                <td><span className={`badge bg-${inv.status === 'paid' ? 'success' : 'warning'}`}>{inv.status}</span></td>
                <td>{new Date(inv.invoiceDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

