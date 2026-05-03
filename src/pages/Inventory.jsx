import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Inventory() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api.instance.get('/inventory')
      .then(r => {
        setItems(r.data || [])
        setError(null)
      })
      .catch(err => {
        console.error('Inventory fetch error:', err.message)
        setError(err.message)
        setItems([])
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div><h2>Inventory</h2><p>Loading...</p></div>
  if (error) return <div><h2>Inventory</h2><div className="alert alert-danger">Error: {error}</div></div>

  return (
    <div>
      <h2>Inventory Management</h2>
      {!items || items.length === 0 ? (
        <p>No inventory items available</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>SKU</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i}>
                  <td>{item.name || '-'}</td>
                  <td>{item.sku || '-'}</td>
                  <td>{item.quantity || 0}</td>
                  <td>${item.unitPrice || '0.00'}</td>
                  <td><span className="badge bg-success">Active</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
