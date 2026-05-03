import React, { useState } from 'react'

export default function Reviews({ onNavigate }) {
  const [reviews] = useState([
    { id: 1, product: 'Dell Laptop', customer: 'John Doe', rating: 5, comment: 'Excellent product, very satisfied!', date: '2025-02-08' },
    { id: 2, product: 'Desktop Monitor', customer: 'Jane Smith', rating: 4, comment: 'Good quality, sharp display', date: '2025-02-07' },
    { id: 3, product: 'Mechanical Keyboard', customer: 'Bob Wilson', rating: 5, comment: 'Perfect for typing and gaming!', date: '2025-02-06' },
    { id: 4, product: 'Wireless Mouse', customer: 'Alice Johnson', rating: 3, comment: 'Works fine but battery drains quickly', date: '2025-02-05' },
    { id: 5, product: 'USB-C Cable', customer: 'Charlie Brown', rating: 4, comment: 'Durable and fast charging', date: '2025-02-04' }
  ])

  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)

  return (
    <div className="dashboard-container">
      <div className="breadcrumb-nav">
        <button type="button" className="breadcrumb-link" onClick={() => onNavigate?.('home')}>Home</button>
        <span className="breadcrumb-sep">•</span>
        <span>Reviews</span>
      </div>

      <h2 style={{marginTop: '20px'}}>Customer Reviews</h2>
      
      <div style={{marginTop: '20px'}}>
        <div className="dashboard-grid">
          <div className="metric-card">
            <div className="card-header">
              <h3>Total Reviews</h3>
              <span className="card-icon">⭐</span>
            </div>
            <div className="card-value">{reviews.length}</div>
          </div>
          
          <div className="metric-card">
            <div className="card-header">
              <h3>Average Rating</h3>
              <span className="card-icon">📊</span>
            </div>
            <div className="card-value">{avgRating} <span className="currency">/ 5</span></div>
          </div>

          <div className="metric-card">
            <div className="card-header">
              <h3>5-Star Reviews</h3>
              <span className="card-icon">✨</span>
            </div>
            <div className="card-value">{reviews.filter(r => r.rating === 5).length}</div>
          </div>
        </div>
      </div>

      <h3 style={{marginTop: '30px'}}>Recent Reviews</h3>
      <div style={{display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px'}}>
        {reviews.map(review => (
          <div key={review.id} className="card">
            <div className="card-body">
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px'}}>
                <div>
                  <h5 style={{margin: '0 0 5px 0'}}>{review.product}</h5>
                  <p style={{margin: '0', color: '#999', fontSize: '0.9rem'}}>by {review.customer}</p>
                </div>
                <div style={{textAlign: 'right'}}>
                  <div style={{fontSize: '1.2rem', marginBottom: '5px'}}>
                    {'⭐'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </div>
                  <p style={{margin: '0', color: '#999', fontSize: '0.85rem'}}>{review.date}</p>
                </div>
              </div>
              <p style={{margin: '0', color: '#ddd'}}>{review.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

