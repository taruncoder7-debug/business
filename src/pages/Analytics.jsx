import React, { useState, useEffect } from 'react'
import api from '../api'

export default function Analytics({ user, onNavigate }) {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedReport, setSelectedReport] = useState('invoices')
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  })

  const reportTypes = [
    { id: 'invoices', name: '📄 Invoices Report', icon: '📄' },
    { id: 'purchases', name: '🛒 Purchases Report', icon: '🛒' },
    { id: 'inventory', name: '📦 Inventory Report', icon: '📦' },
    { id: 'employees', name: '👥 Employee Report', icon: '👥' },
    { id: 'attendance', name: '📅 Attendance Report', icon: '📅' },
    { id: 'tasks', name: '✓ Tasks Report', icon: '✓' },
  ]

  useEffect(() => {
    fetchReportData()
  }, [selectedReport])

  const fetchReportData = async () => {
    setLoading(true)
    try {
      let endpoint = `/reports?type=${selectedReport}&startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`
      const res = await api.instance.get(endpoint)
      setReports(res.data.data || [])
    } catch (err) {
      console.error('Error fetching report:', err)
      setReports([])
    } finally {
      setLoading(false)
    }
  }

  const exportToCSV = () => {
    if (!reports || reports.length === 0) {
      alert('No data to export')
      return
    }

    const headers = Object.keys(reports[0])
    const csv = [
      headers.join(','),
      ...reports.map(row => 
        headers.map(header => {
          const value = row[header]
          if (typeof value === 'object') return JSON.stringify(value)
          if (typeof value === 'string' && value.includes(',')) return `"${value}"`
          return value
        }).join(',')
      )
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${selectedReport}_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const exportToExcel = () => {
    if (!reports || reports.length === 0) {
      alert('No data to export')
      return
    }

    // Simple Excel-like CSV export (for proper Excel, install xlsx library)
    const headers = Object.keys(reports[0])
    let html = '<table border="1"><tr>'
    
    headers.forEach(h => {
      html += `<th>${h}</th>`
    })
    html += '</tr>'
    
    reports.forEach(row => {
      html += '<tr>'
      headers.forEach(h => {
        const value = row[h]
        html += `<td>${typeof value === 'object' ? JSON.stringify(value) : value}</td>`
      })
      html += '</tr>'
    })
    html += '</table>'

    const blob = new Blob([html], { type: 'application/vnd.ms-excel' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${selectedReport}_${new Date().toISOString().split('T')[0]}.xls`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const exportToPDF = () => {
    if (!reports || reports.length === 0) {
      alert('No data to export')
      return
    }

    let pdfContent = `
<!DOCTYPE html>
<html>
<head>
  <title>${selectedReport.toUpperCase()} Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    h1 { color: #333; }
    .header { color: #666; font-size: 12px; margin-bottom: 20px; }
    table { width: 100%; border-collapse: collapse; }
    th { background: #f0f0f0; padding: 10px; text-align: left; border: 1px solid #ddd; }
    td { padding: 8px; border: 1px solid #ddd; }
    tr:nth-child(even) { background: #f9f9f9; }
  </style>
</head>
<body>
  <h1>${selectedReport.toUpperCase()} Report</h1>
  <div class="header">
    <p>Generated on: ${new Date().toLocaleString()}</p>
    <p>Date Range: ${dateRange.startDate} to ${dateRange.endDate}</p>
    <p>Total Records: ${reports.length}</p>
  </div>
  <table>
    <thead>
      <tr>
        ${Object.keys(reports[0]).map(h => `<th>${h}</th>`).join('')}
      </tr>
    </thead>
    <tbody>
      ${reports.map(row => `
        <tr>
          ${Object.keys(reports[0]).map(h => {
            const value = row[h]
            return `<td>${typeof value === 'object' ? JSON.stringify(value) : value}</td>`
          }).join('')}
        </tr>
      `).join('')}
    </tbody>
  </table>
</body>
</html>
    `

    const blob = new Blob([pdfContent], { type: 'text/html' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${selectedReport}_${new Date().toISOString().split('T')[0]}.html`
    a.click()
    window.URL.revokeObjectURL(url)
    alert('PDF-format exported as HTML. For true PDF export, install jsPDF library.')
  }

  return (
    <div className="dashboard-container">
      <div className="breadcrumb-nav">
        <button type="button" className="breadcrumb-link" onClick={() => onNavigate?.('home')}>Home</button>
        <span className="breadcrumb-sep">•</span>
        <button type="button" className="breadcrumb-link" onClick={() => onNavigate?.('dashboard')}>Dashboard</button>
        <span className="breadcrumb-sep">•</span>
        <span>Analytics & Export</span>
      </div>

      {/* Report Selection */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '20px' }}>Select Report Type</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
          {reportTypes.map(type => (
            <div
              key={type.id}
              onClick={() => setSelectedReport(type.id)}
              style={{
                padding: '20px',
                borderRadius: '8px',
                background: selectedReport === type.id ? 'rgba(31,119,180,0.3)' : 'rgba(255,255,255,0.05)',
                border: selectedReport === type.id ? '2px solid #1f77b4' : '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer',
                transition: '0.3s',
                textAlign: 'center'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
              onMouseLeave={(e) => e.currentTarget.style.background = selectedReport === type.id ? 'rgba(31,119,180,0.3)' : 'rgba(255,255,255,0.05)'}
            >
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{type.icon}</div>
              <div style={{ fontSize: '0.9rem', color: selectedReport === type.id ? '#00d0ff' : 'var(--light-text)' }}>
                {type.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="form-card">
        <h3>Filter by Date Range</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', alignItems: 'flex-end' }}>
          <div className="form-group">
            <label className="form-label">Start Date</label>
            <input
              type="date"
              className="form-control"
              value={dateRange.startDate}
              onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">End Date</label>
            <input
              type="date"
              className="form-control"
              value={dateRange.endDate}
              onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
            />
          </div>
          <button
            onClick={fetchReportData}
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            🔄 Load Report
          </button>
        </div>
      </div>

      {/* Export Options */}
      <div style={{ marginTop: '30px', marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '15px' }}>Export Data</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={exportToCSV}
            className="btn"
            style={{ background: '#00d084', color: 'white' }}
          >
            📊 Export as CSV
          </button>
          <button
            onClick={exportToExcel}
            className="btn"
            style={{ background: '#00d0ff', color: 'var(--dark)' }}
          >
            📈 Export as Excel
          </button>
          <button
            onClick={exportToPDF}
            className="btn"
            style={{ background: '#ff6b6b', color: 'white' }}
          >
            📄 Export as PDF
          </button>
          <button
            onClick={() => window.print()}
            className="btn"
            style={{ background: '#ffc107', color: 'var(--dark)' }}
          >
            🖨️ Print Report
          </button>
        </div>
      </div>

      {/* Report Stats */}
      {reports.length > 0 && (
        <div className="dashboard-grid">
          <div className="metric-card">
            <div className="card-header">
              <h3>Total Records</h3>
              <span className="card-icon">📊</span>
            </div>
            <div className="card-value">{reports.length}</div>
          </div>
        </div>
      )}

      {/* Report Data Table */}
      {loading ? (
        <div className="dashboard-loading"><p>Loading report data...</p></div>
      ) : reports.length > 0 ? (
        <div style={{ marginTop: '30px' }}>
          <h3 style={{ marginBottom: '20px' }}>
            {selectedReport.toUpperCase().replace('_', ' ')} - {reports.length} Records
          </h3>
          <div className="table-responsive">
            <table className="table" style={{ fontSize: '0.9rem' }}>
              <thead>
                <tr>
                  {Object.keys(reports[0]).slice(0, 7).map(header => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reports.slice(0, 50).map((row, idx) => (
                  <tr key={idx}>
                    {Object.keys(reports[0]).slice(0, 7).map(header => (
                      <td key={header}>
                        {typeof row[header] === 'object' 
                          ? JSON.stringify(row[header]).substring(0, 30) 
                          : String(row[header]).substring(0, 30)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {reports.length > 50 && (
            <p style={{ color: 'var(--muted-text)', marginTop: '15px' }}>
              Showing 50 of {reports.length} records. Export to see all data.
            </p>
          )}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--muted-text)' }}>
          <p>No data available for selected report type and date range</p>
        </div>
      )}
    </div>
  )
}

