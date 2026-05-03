import React, { useEffect, useState } from 'react'
import api from '../api'

export default function StockStatus({ onNavigate }) {
  const [inventory, setInventory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    api.instance.get('/inventory')
      .then(r => setInventory(r.data || []))
      .catch(err => console.error('Error:', err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="dashboard-loading"><p>Loading stock status...</p></div>

  const lowStock = inventory.filter(i => i.quantity <= i.reorderLevel)
  const outOfStock = inventory.filter(i => i.quantity === 0)

  return (
    <div className="dashboard-container">
      <div className="breadcrumb-nav">
        <button type="button" className="breadcrumb-link" onClick={() => onNavigate?.('home')}>Home</button>
        <span className="breadcrumb-sep">•</span>
        <span>Analytics • Stock Status</span>
      </div>

      <h2 style={{marginTop: '20px'}}>Inventory Stock Status</h2>
      
      <div style={{marginTop: '20px'}}>
        <div className="dashboard-grid">
          <div className="metric-card">
            <div className="card-header">
              <h3>Total Items</h3>
              <span className="card-icon">📦</span>
            </div>
            <div className="card-value">{inventory.length}</div>
          </div>
          
          <div className="metric-card">
            <div className="card-header">
              <h3>Low Stock Items</h3>
              <span className="card-icon">⚠️</span>
            </div>
            <div className="card-value" style={{color: '#ffc107'}}>{lowStock.length}</div>
          </div>

          <div className="metric-card">
            <div className="card-header">
              <h3>Out of Stock</h3>
              <span className="card-icon">❌</span>
            </div>
            <div className="card-value" style={{color: '#ff6b6b'}}>{outOfStock.length}</div>
          </div>

          <div className="metric-card">
            <div className="card-header">
              <h3>Total Units</h3>
              <span className="card-icon">📊</span>
            </div>
            <div className="card-value">{inventory.reduce((sum, i) => sum + i.quantity, 0)}</div>
          </div>
        </div>
      </div>

      <h3 style={{marginTop: '30px'}}>Stock Levels</h3>
      <table className="table">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Reorder Level</th>
            <th>Status</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map(item => {
            let status = '✅ OK'
            let statusColor = 'bg-success'
            if (item.quantity === 0) {
              status = '❌ Out of Stock'
              statusColor = 'bg-danger'
            } else if (item.quantity <= item.reorderLevel) {
              status = '⚠️ Low Stock'
              statusColor = 'bg-warning'
            }
            return (
              <tr key={item._id}>
                <td>{item.sku}</td>
                <td>{item.name}</td>
                <td><strong>{item.quantity}</strong></td>
                <td>{item.reorderLevel}</td>
                <td><span className={`badge ${statusColor}`}>{status}</span></td>
                <td>{item.location || '-'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

