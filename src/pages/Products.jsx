import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Products({ onNavigate }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    api.instance.get('/inventory')
      .then(r => setData(r.data || []))
      .catch(err => console.error('Error:', err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="dashboard-loading"><p>Loading products...</p></div>

  return (
    <div className="dashboard-container">
      <div className="breadcrumb-nav">
        <button type="button" className="breadcrumb-link" onClick={() => onNavigate?.('home')}>Home</button>
        <span className="breadcrumb-sep">•</span>
        <span>Products</span>
      </div>

      <h2 style={{marginTop: '20px'}}>Product Inventory</h2>
      
      {data.length === 0 ? (
        <div className="alert alert-danger">No products found</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Location</th>
              <th>Reorder Level</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item._id}>
                <td>{item.sku}</td>
                <td>{item.name}</td>
                <td>{item.category || '-'}</td>
                <td>{item.quantity}</td>
                <td>${item.price?.toFixed(2)}</td>
                <td>{item.location || '-'}</td>
                <td>{item.reorderLevel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

