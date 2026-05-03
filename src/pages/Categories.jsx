import React, { useState } from 'react'

export default function Categories({ onNavigate }) {
  const [categories] = useState([
    'Hardware',
    'Accessories',
    'Cables',
    'Software',
    'Services'
  ])

  return (
    <div className="dashboard-container">
      <div className="breadcrumb-nav">
        <button type="button" className="breadcrumb-link" onClick={() => onNavigate?.('home')}>Home</button>
        <span className="breadcrumb-sep">•</span>
        <span>Categories</span>
      </div>

      <h2 style={{marginTop: '20px'}}>Product Categories</h2>
      
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px'}}>
        {categories.map((cat, idx) => (
          <div key={idx} className="card">
            <div className="card-body">
              <h5 style={{margin: 0, marginBottom: '10px'}}>{cat}</h5>
              <p style={{color: '#999', margin: 0}}>View products in this category</p>
              <button className="btn btn-primary" style={{marginTop: '10px', width: '100%'}}>
                Browse
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

