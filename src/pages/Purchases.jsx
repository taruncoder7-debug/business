import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Purchases({ onNavigate }) {
  const [purchases, setPurchases] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [suppliers, setSuppliers] = useState([])

  useEffect(() => {
    fetchPurchases()
    fetchSuppliers()
  }, [])

  const fetchPurchases = async () => {
    try {
      const res = await api.instance.get('/purchases')
      setPurchases(res.data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchSuppliers = async () => {
    try {
      const res = await api.instance.get('/suppliers')
      setSuppliers(res.data)
    } catch (err) {
      console.error('Error fetching suppliers:', err)
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return '#ffc107'
      case 'received': return '#00d084'
      case 'invoiced': return '#00d0ff'
      default: return '#95949b'
    }
  }

  const getSupplierName = (supplierId) => {
    const supplier = suppliers.find(s => s._id === supplierId)
    return supplier?.name || 'Unknown Supplier'
  }

  if (loading) return <div className="dashboard-loading"><p>Loading purchases...</p></div>
  if (error) return <div className="alert alert-danger">Error: {error}</div>

  return (
    <div className="dashboard-container">
      <div className="breadcrumb-nav">
        <button type="button" className="breadcrumb-link" onClick={() => onNavigate?.('home')}>Home</button>
        <span className="breadcrumb-sep">•</span>
        <button type="button" className="breadcrumb-link" onClick={() => onNavigate?.('dashboard')}>Dashboard</button>
        <span className="breadcrumb-sep">•</span>
        <span>Purchases</span>
      </div>

      {/* KPI Cards */}
      <div className="dashboard-grid">
        <div className="metric-card">
          <div className="card-header">
            <h3>Total Purchases</h3>
            <span className="card-icon">🛒</span>
          </div>
          <div className="card-value">{purchases.length}</div>
        </div>

        <div className="metric-card">
          <div className="card-header">
            <h3>Total Amount</h3>
            <span className="card-icon">💰</span>
          </div>
          <div className="card-value">
            ${purchases.reduce((sum, p) => sum + (p.total || 0), 0).toFixed(2)}
          </div>
        </div>

        <div className="metric-card">
          <div className="card-header">
            <h3>Pending</h3>
            <span className="card-icon">⏳</span>
          </div>
          <div className="card-value">{purchases.filter(p => p.status === 'pending').length}</div>
        </div>

        <div className="metric-card">
          <div className="card-header">
            <h3>Received</h3>
            <span className="card-icon">✓</span>
          </div>
          <div className="card-value">{purchases.filter(p => p.status === 'received').length}</div>
        </div>
      </div>

      {/* Purchases Table */}
      <div style={{ marginTop: '40px' }}>
        <h3 style={{ marginBottom: '20px' }}>Purchase Orders</h3>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>BILL #</th>
                <th>VENDOR</th>
                <th>ITEMS</th>
                <th>SUBTOTAL</th>
                <th>TAX</th>
                <th>TOTAL</th>
                <th>P.O. DATE</th>
                <th>DELIVERY DATE</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map(purchase => (
                <tr key={purchase._id}>
                  <td><strong>{purchase.billNumber}</strong></td>
                  <td>{getSupplierName(purchase.vendor)}</td>
                  <td>{purchase.items?.length || 0} items</td>
                  <td>${purchase.subtotal?.toFixed(2) || '0.00'}</td>
                  <td>${purchase.tax?.toFixed(2) || '0.00'}</td>
                  <td><strong>${purchase.total?.toFixed(2) || '0.00'}</strong></td>
                  <td>{purchase.purchaseDate ? new Date(purchase.purchaseDate).toLocaleDateString() : '-'}</td>
                  <td>{purchase.deliveryDate ? new Date(purchase.deliveryDate).toLocaleDateString() : '-'}</td>
                  <td>
                    <span 
                      className="badge"
                      style={{ 
                        background: getStatusColor(purchase.status),
                        color: purchase.status === 'pending' ? 'var(--dark)' : 'white'
                      }}
                    >
                      {purchase.status?.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Purchase Details */}
      {purchases.length > 0 && (
        <div style={{ marginTop: '40px' }}>
          <h3 style={{ marginBottom: '20px' }}>Recent Purchase Details</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {purchases.slice(0, 3).map(purchase => (
              <div 
                key={purchase._id}
                className="chart-container"
              >
                <h4 style={{ marginTop: 0 }}>{purchase.billNumber}</h4>
                <div style={{ fontSize: '0.9rem', color: 'var(--light-text)' }}>
                  <p><strong>Vendor:</strong> {getSupplierName(purchase.vendor)}</p>
                  <p><strong>Items:</strong> {purchase.items?.length || 0}</p>
                  <p><strong>Order Date:</strong> {purchase.purchaseDate ? new Date(purchase.purchaseDate).toLocaleDateString() : 'N/A'}</p>
                  <p><strong>Expected Delivery:</strong> {purchase.deliveryDate ? new Date(purchase.deliveryDate).toLocaleDateString() : 'N/A'}</p>
                  <p><strong>Total:</strong> <span style={{ color: '#00d084', fontWeight: 'bold' }}>${purchase.total?.toFixed(2) || '0.00'}</span></p>
                  <p><strong>Status:</strong> <span style={{ color: getStatusColor(purchase.status) }}>{purchase.status?.toUpperCase()}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

