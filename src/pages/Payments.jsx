import React, { useState } from 'react'

export default function Payments({ onNavigate }) {
  const [payments] = useState([
    { id: 1, invoiceNo: 'INV-2025-001', customer: 'Acme Corp', amount: 2450.50, method: 'Credit Card', status: 'completed', date: '2025-02-08' },
    { id: 2, invoiceNo: 'INV-2025-002', customer: 'Beta LLC', amount: 1200.75, method: 'Bank Transfer', status: 'completed', date: '2025-02-07' },
    { id: 3, invoiceNo: 'INV-2025-003', customer: 'Global Tech', amount: 3850.00, method: 'Credit Card', status: 'pending', date: '2025-02-06' },
    { id: 4, invoiceNo: 'INV-2025-004', customer: 'Nordic Supplies', amount: 899.99, method: 'PayPal', status: 'completed', date: '2025-02-05' },
    { id: 5, invoiceNo: 'INV-2025-005', customer: 'Istanbul Trading', amount: 450.00, method: 'Bank Transfer', status: 'failed', date: '2025-02-04' }
  ])

  const totalCollected = payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0)
  const totalPending = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0)

  const statusColor = (status) => {
    if (status === 'completed') return 'bg-success'
    if (status === 'pending') return 'bg-warning'
    return 'bg-danger'
  }

  return (
    <div className="dashboard-container">
      <div className="breadcrumb-nav">
        <button type="button" className="breadcrumb-link" onClick={() => onNavigate?.('home')}>Home</button>
        <span className="breadcrumb-sep">•</span>
        <span>Payments</span>
      </div>

      <h2 style={{marginTop: '20px'}}>Payment Management</h2>
      
      <div style={{marginTop: '20px'}}>
        <div className="dashboard-grid">
          <div className="metric-card">
            <div className="card-header">
              <h3>Total Collected</h3>
              <span className="card-icon">✅</span>
            </div>
            <div className="card-value">${totalCollected.toFixed(2)}</div>
          </div>
          
          <div className="metric-card">
            <div className="card-header">
              <h3>Pending Payments</h3>
              <span className="card-icon">⏳</span>
            </div>
            <div className="card-value">${totalPending.toFixed(2)}</div>
          </div>

          <div className="metric-card">
            <div className="card-header">
              <h3>Total Transactions</h3>
              <span className="card-icon">💳</span>
            </div>
            <div className="card-value">{payments.length}</div>
          </div>

          <div className="metric-card">
            <div className="card-header">
              <h3>Success Rate</h3>
              <span className="card-icon">📊</span>
            </div>
            <div className="card-value">{((payments.filter(p => p.status === 'completed').length / payments.length) * 100).toFixed(0)}%</div>
          </div>
        </div>
      </div>

      <h3 style={{marginTop: '30px'}}>Recent Transactions</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Invoice #</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment.id}>
              <td>{payment.invoiceNo}</td>
              <td>{payment.customer}</td>
              <td>${payment.amount.toFixed(2)}</td>
              <td>{payment.method}</td>
              <td><span className={`badge ${statusColor(payment.status)}`}>{payment.status}</span></td>
              <td>{payment.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

