import React, { useState } from 'react'

export default function Reports({ onNavigate }) {
  const [reports] = useState([
    { id: 1, name: 'Monthly Sales Report', type: 'Sales', date: '2025-02-10', status: 'Generated' },
    { id: 2, name: 'Inventory Audit', type: 'Inventory', date: '2025-02-09', status: 'Generated' },
    { id: 3, name: 'Customer Analysis', type: 'Customer', date: '2025-02-08', status: 'Generated' },
    { id: 4, name: 'Payment Settlement Report', type: 'Financial', date: '2025-02-07', status: 'Pending' },
    { id: 5, name: 'Product Performance Q1', type: 'Analytics', date: '2025-02-06', status: 'Generated' }
  ])

  return (
    <div className="dashboard-container">
      <div className="breadcrumb-nav">
        <button type="button" className="breadcrumb-link" onClick={() => onNavigate?.('home')}>Home</button>
        <span className="breadcrumb-sep">•</span>
        <span>Analytics • Reports</span>
      </div>

      <h2 style={{marginTop: '20px'}}>Reports & Analytics</h2>
      
      <div style={{marginTop: '20px', marginBottom: '30px'}}>
        <button className="btn btn-primary">📥 Download Reports</button>
        <button className="btn btn-primary" style={{marginLeft: '10px'}}>🔄 Refresh Data</button>
      </div>

      <h3>Available Reports</h3>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px'}}>
        {reports.map(report => (
          <div key={report.id} className="card">
            <div className="card-body">
              <h5 style={{margin: '0 0 10px 0'}}>{report.name}</h5>
              <div style={{marginBottom: '10px'}}>
                <span className="badge bg-info">{report.type}</span>
                <span style={{marginLeft: '5px', color: '#999', fontSize: '0.85rem'}}>
                  {new Date(report.date).toLocaleDateString()}
                </span>
              </div>
              <p style={{margin: '10px 0', color: report.status === 'Generated' ? '#00d084' : '#ffc107'}}>
                {report.status === 'Generated' ? '✅' : '⏳'} {report.status}
              </p>
              <button className="btn btn-primary" style={{width: '100%', fontSize: '0.9rem'}}>
                View → Download
              </button>
            </div>
          </div>
        ))}
      </div>

      <h3 style={{marginTop: '40px'}}>Report History</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Report Name</th>
            <th>Type</th>
            <th>Generated Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(report => (
            <tr key={report.id}>
              <td>{report.name}</td>
              <td><span className="badge bg-info">{report.type}</span></td>
              <td>{report.date}</td>
              <td><span className={`badge ${report.status === 'Generated' ? 'bg-success' : 'bg-warning'}`}>{report.status}</span></td>
              <td>
                <button style={{background: 'none', border: 'none', color: '#00d0ff', cursor: 'pointer'}}>
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

