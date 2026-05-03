import React, { useState } from 'react'

export default function Customers({ onNavigate }) {
  const [customers] = useState([
    { id: 1, name: 'Acme Corp', email: 'contact@acme.com', phone: '555-0001', country: 'USA', totalOrders: 5, totalSpend: 2450.50 },
    { id: 2, name: 'Beta LLC', email: 'info@beta.com', phone: '555-0002', country: 'Canada', totalOrders: 3, totalSpend: 1200.75 },
    { id: 3, name: 'Global Tech', email: 'sales@globaltech.com', phone: '555-0003', country: 'UK', totalOrders: 8, totalSpend: 5320.00 },
    { id: 4, name: 'Nordic Supplies', email: 'contact@nordic.se', phone: '555-0004', country: 'Sweden', totalOrders: 4, totalSpend: 1899.99 },
    { id: 5, name: 'Istanbul Trading', email: 'info@istanbultrading.tr', phone: '555-0005', country: 'Turkey', totalOrders: 2, totalSpend: 899.50 }
  ])

  return (
    <div className="dashboard-container">
      <div className="breadcrumb-nav">
        <button type="button" className="breadcrumb-link" onClick={() => onNavigate?.('home')}>Home</button>
        <span className="breadcrumb-sep">•</span>
        <span>Customers</span>
      </div>

      <h2 style={{marginTop: '20px'}}>Customer Management</h2>
      
      <div style={{marginTop: '20px'}}>
        <div className="dashboard-grid">
          <div className="metric-card">
            <div className="card-header">
              <h3>Total Customers</h3>
              <span className="card-icon">👥</span>
            </div>
            <div className="card-value">{customers.length}</div>
          </div>
          
          <div className="metric-card">
            <div className="card-header">
              <h3>Total Orders</h3>
              <span className="card-icon">📦</span>
            </div>
            <div className="card-value">{customers.reduce((sum, c) => sum + c.totalOrders, 0)}</div>
          </div>

          <div className="metric-card">
            <div className="card-header">
              <h3>Total Revenue</h3>
              <span className="card-icon">💵</span>
            </div>
            <div className="card-value">${customers.reduce((sum, c) => sum + c.totalSpend, 0).toFixed(2)}</div>
          </div>
        </div>
      </div>

      <h3 style={{marginTop: '30px'}}>All Customers</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Country</th>
            <th>Orders</th>
            <th>Total Spend</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(cust => (
            <tr key={cust.id}>
              <td>{cust.name}</td>
              <td>{cust.email}</td>
              <td>{cust.phone}</td>
              <td>{cust.country}</td>
              <td>{cust.totalOrders}</td>
              <td>${cust.totalSpend.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

