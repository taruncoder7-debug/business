import React, { useState } from 'react'

export default function SalesOverview({ onNavigate }) {
  const [sales] = useState([
    { month: 'January', revenue: 45000, orders: 120, avgOrderValue: 375 },
    { month: 'February', revenue: 52000, orders: 135, avgOrderValue: 385 },
    { month: 'March', revenue: 48500, orders: 128, avgOrderValue: 379 },
    { month: 'April', revenue: 61200, orders: 155, avgOrderValue: 395 },
    { month: 'May', revenue: 67800, orders: 168, avgOrderValue: 404 },
    { month: 'June', revenue: 71500, orders: 175, avgOrderValue: 408 }
  ])

  const totalRevenue = sales.reduce((sum, s) => sum + s.revenue, 0)
  const totalOrders = sales.reduce((sum, s) => sum + s.orders, 0)
  const avgRevenue = (totalRevenue / sales.length).toFixed(0)

  return (
    <div className="dashboard-container">
      <div className="breadcrumb-nav">
        <button type="button" className="breadcrumb-link" onClick={() => onNavigate?.('home')}>Home</button>
        <span className="breadcrumb-sep">•</span>
        <span>Analytics • Sales Overview</span>
      </div>

      <h2 style={{marginTop: '20px'}}>Sales Overview</h2>
      
      <div style={{marginTop: '20px'}}>
        <div className="dashboard-grid">
          <div className="metric-card">
            <div className="card-header">
              <h3>Total Revenue</h3>
              <span className="card-icon">💵</span>
            </div>
            <div className="card-value">${totalRevenue.toLocaleString()}</div>
          </div>
          
          <div className="metric-card">
            <div className="card-header">
              <h3>Total Orders</h3>
              <span className="card-icon">📦</span>
            </div>
            <div className="card-value">{totalOrders}</div>
          </div>

          <div className="metric-card">
            <div className="card-header">
              <h3>Average Monthly</h3>
              <span className="card-icon">📊</span>
            </div>
            <div className="card-value">${avgRevenue.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <h3 style={{marginTop: '30px'}}>Monthly Sales Trend</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Revenue</th>
            <th>Orders</th>
            <th>Avg Order Value</th>
            <th>Growth</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((s, idx) => {
            const prevRevenue = idx > 0 ? sales[idx - 1].revenue : s.revenue
            const growth = ((s.revenue - prevRevenue) / prevRevenue * 100).toFixed(1)
            return (
              <tr key={idx}>
                <td>{s.month}</td>
                <td>${s.revenue.toLocaleString()}</td>
                <td>{s.orders}</td>
                <td>${s.avgOrderValue.toFixed(2)}</td>
                <td><span style={{color: growth >= 0 ? '#00d084' : '#ff6b6b'}}>{growth >= 0 ? '📈' : '📉'} {growth}%</span></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

