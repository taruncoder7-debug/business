import React, { useState } from 'react'

export default function TopProducts({ onNavigate }) {
  const [topProducts] = useState([
    { rank: 1, name: 'Dell Laptop', sku: 'LAP-001', unitsSold: 125, revenue: 162498.75, category: 'Hardware' },
    { rank: 2, name: 'Wireless Mouse', sku: 'MOU-004', unitsSold: 450, revenue: 22495.50, category: 'Accessories' },
    { rank: 3, name: 'USB-C Cable', sku: 'CAB-005', unitsSold: 890, revenue: 17801.10, category: 'Cables' },
    { rank: 4, name: 'Mechanical Keyboard', sku: 'KEY-003', unitsSold: 290, revenue: 37697.10, category: 'Accessories' },
    { rank: 5, name: 'Desktop Monitor', sku: 'MON-002', unitsSold: 45, revenue: 22499.55, category: 'Hardware' }
  ])

  const totalRevenue = topProducts.reduce((sum, p) => sum + p.revenue, 0)

  return (
    <div className="dashboard-container">
      <div className="breadcrumb-nav">
        <button type="button" className="breadcrumb-link" onClick={() => onNavigate?.('home')}>Home</button>
        <span className="breadcrumb-sep">•</span>
        <span>Analytics • Top Products</span>
      </div>

      <h2 style={{marginTop: '20px'}}>Top Selling Products</h2>
      
      <div style={{marginTop: '20px'}}>
        <div className="dashboard-grid">
          <div className="metric-card">
            <div className="card-header">
              <h3>Total Revenue</h3>
              <span className="card-icon">💵</span>
            </div>
            <div className="card-value">${totalRevenue.toLocaleString('en-US', {maximumFractionDigits: 0})}</div>
          </div>
          
          <div className="metric-card">
            <div className="card-header">
              <h3>Total Units Sold</h3>
              <span className="card-icon">📦</span>
            </div>
            <div className="card-value">{topProducts.reduce((sum, p) => sum + p.unitsSold, 0)}</div>
          </div>

          <div className="metric-card">
            <div className="card-header">
              <h3>Products Tracked</h3>
              <span className="card-icon">📊</span>
            </div>
            <div className="card-value">{topProducts.length}</div>
          </div>
        </div>
      </div>

      <h3 style={{marginTop: '30px'}}>Product Rankings</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Product Name</th>
            <th>SKU</th>
            <th>Category</th>
            <th>Units Sold</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {topProducts.map(product => (
            <tr key={product.rank}>
              <td>
                <strong style={{fontSize: '1.2rem'}}>
                  {product.rank === 1 ? '🥇' : product.rank === 2 ? '🥈' : product.rank === 3 ? '🥉' : ''}
                  {product.rank}
                </strong>
              </td>
              <td>{product.name}</td>
              <td>{product.sku}</td>
              <td>{product.category}</td>
              <td>{product.unitsSold}</td>
              <td>${product.revenue.toLocaleString('en-US', {maximumFractionDigits: 2})}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

