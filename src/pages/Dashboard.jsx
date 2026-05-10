import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Dashboard({ onNavigate }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log('Dashboard mounting, fetching data...')
    api.instance.get('/dashboard')
      .then(r => {
        console.log('Dashboard data received:', r.data)
        setData(r.data)
        setError(null)
      })
      .catch(err => {
        const errMsg = err?.response?.data?.message || err?.response?.data?.error || err.message
        console.error('Dashboard fetch error:', errMsg)
        setError(errMsg)
        setData({ widgets: [] })
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="dashboard-loading">
      <div className="dashboard-grid">
        {[1,2,3,4].map(n => (
          <div key={n} className="metric-card skeleton">
            <div className="card-header">
              <div className="skeleton-line short" />
              <div className="skeleton-circle" />
            </div>
            <div className="card-value">
              <div className="skeleton-line large" />
            </div>
            <div className="card-trend">
              <div className="skeleton-line medium" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
  if (error) return <div className="dashboard-error"><div className="alert alert-danger">Error: {error}</div></div>

  return (
    <div className="dashboard-container">
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb-nav">
        <button type="button" className="breadcrumb-link" onClick={() => onNavigate?.('home')}>Home</button>
        <span className="breadcrumb-sep">•</span>
        <button type="button" className="breadcrumb-link" onClick={() => onNavigate?.('dashboard')}>Dashboard</button>
        <span className="breadcrumb-sep">•</span>
        <span>Analytics</span>
      </div>

      {/* KPI Cards Grid (server-provided widgets if available) */}
      <div className="dashboard-grid">
        {data.widgets && data.widgets.length > 0 ? (
          data.widgets.map((w, idx) => (
            <div key={idx} className="metric-card">
              <div className="card-header">
                <h3>{w.kpi}</h3>
                <span className="card-icon">📊</span>
              </div>
              <div className="card-value">{w.value}</div>
            </div>
          ))
        ) : (
          <>
            {/* Fallback hardcoded widgets */}
            <div className="metric-card">
              <div className="card-header">
                <h3>Nominal Balance</h3>
                <span className="card-icon">💎</span>
              </div>
              <div className="card-value">7,500.00 <span className="currency">USD</span></div>
              <div className="card-trend positive">
                <span className="trend-icon">📈</span>
                <span>1.19%</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="card-header">
                <h3>Total Stock Product</h3>
                <span className="card-icon">📦</span>
              </div>
              <div className="card-value">3,142 <span className="currency">ITEMS</span></div>
              <div className="card-trend positive">
                <span className="trend-icon">📈</span>
                <span>0.29%</span>
              </div>
            </div>

            <div className="metric-card activity-card">
              <div className="card-header">
                <h3>Product Activity</h3>
                <span className="card-icon">🎯</span>
              </div>
              <div className="gauge-container">
                <div className="gauge">
                  <div className="gauge-inner">415,236</div>
                  <div className="gauge-label">Total Activity</div>
                </div>
              </div>
            </div>

            <div className="metric-card">
              <div className="card-header">
                <h3>Nominal Revenue</h3>
                <span className="card-icon">💹</span>
              </div>
              <div className="card-value">21,430.00 <span className="currency">USD</span></div>
              <div className="card-trend positive">
                <span className="trend-icon">📈</span>
                <span>0.29%</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="card-header">
                <h3>Nominal Expense</h3>
                <span className="card-icon">💸</span>
              </div>
              <div className="card-value">12,980.00 <span className="currency">USD</span></div>
              <div className="card-trend negative">
                <span className="trend-icon">📉</span>
                <span>0.15%</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-container">
          <h3 className="chart-title">Customers Activity</h3>
          <div className="bar-chart">
            <div className="chart-bars">
              <div className="bar-item">
                <div className="bar" style={{height: '65%'}}></div>
                <span className="bar-label">Apr</span>
              </div>
              <div className="bar-item">
                <div className="bar" style={{height: '75%'}}></div>
                <span className="bar-label">May</span>
              </div>
              <div className="bar-item">
                <div className="bar" style={{height: '85%'}}></div>
                <span className="bar-label">Jun</span>
              </div>
              <div className="bar-item">
                <div className="bar" style={{height: '72%'}}></div>
                <span className="bar-label">Jul</span>
              </div>
              <div className="bar-item">
                <div className="bar" style={{height: '88%'}}></div>
                <span className="bar-label">Aug</span>
              </div>
              <div className="bar-item">
                <div className="bar" style={{height: '78%'}}></div>
                <span className="bar-label">Sep</span>
              </div>
              <div className="bar-item">
                <div className="bar" style={{height: '92%'}}></div>
                <span className="bar-label">Oct</span>
              </div>
            </div>
          </div>
        </div>

        <div className="chart-container">
          <h3 className="chart-title">Customers Activity by Country</h3>
          <div className="country-stats">
            <div className="country-item">
              <span className="flag">🇬🇧</span>
              <span className="country-name">United Kingdom</span>
              <div className="progress-bar"><div style={{width: '75%'}} className="progress-fill"></div></div>
            </div>
            <div className="country-item">
              <span className="flag">🇺🇸</span>
              <span className="country-name">United States</span>
              <div className="progress-bar"><div style={{width: '60%'}} className="progress-fill"></div></div>
            </div>
            <div className="country-item">
              <span className="flag">🇸🇪</span>
              <span className="country-name">Sweden</span>
              <div className="progress-bar"><div style={{width: '45%'}} className="progress-fill"></div></div>
            </div>
            <div className="country-item">
              <span className="flag">🇹🇷</span>
              <span className="country-name">Turkey</span>
              <div className="progress-bar"><div style={{width: '50%'}} className="progress-fill"></div></div>
            </div>
            <div className="country-item">
              <span className="flag">🇪🇸</span>
              <span className="country-name">Spain</span>
              <div className="progress-bar"><div style={{width: '40%'}} className="progress-fill"></div></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="transactions-section">
        <h3 className="section-title">Recent Transaction <span className="transaction-count">24</span></h3>
        <table className="transactions-table">
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>PRODUCT ITEM</th>
              <th>PRICE</th>
              <th>CUSTOMER</th>
              <th>DATE CHECKOUT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#ORD-001</td>
              <td>Product Name 1</td>
              <td>$99.99</td>
              <td>John Doe</td>
              <td>2025-10-15</td>
            </tr>
            <tr>
              <td>#ORD-002</td>
              <td>Product Name 2</td>
              <td>$149.99</td>
              <td>Jane Smith</td>
              <td>2025-10-14</td>
            </tr>
            <tr>
              <td>#ORD-003</td>
              <td>Product Name 3</td>
              <td>$79.99</td>
              <td>Bob Johnson</td>
              <td>2025-10-13</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Recent Invoices & Purchases (from server) */}
      <div style={{display: 'flex', gap: '20px', marginTop: '20px'}}>
        <div className="chart-container" style={{flex: 1}}>
          <h3 className="chart-title">Recent Invoices</h3>
          <div className="chart-placeholder" style={{minHeight: '120px', padding: '10px'}}>
            {data.recentInvoices && data.recentInvoices.length > 0 ? (
              <table className="transactions-table">
                <thead>
                  <tr><th>Invoice #</th><th>Customer</th><th>Total</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {data.recentInvoices.map(inv => (
                    <tr key={inv._id}><td>{inv.invoiceNumber}</td><td>{inv.customerName}</td><td>{inv.total}</td><td>{inv.status}</td></tr>
                  ))}
                </tbody>
              </table>
            ) : <div className="text-muted">No invoices yet</div>}
          </div>
        </div>

        <div className="chart-container" style={{flex: 1}}>
          <h3 className="chart-title">Recent Purchases</h3>
          <div className="chart-placeholder" style={{minHeight: '120px', padding: '10px'}}>
            {data.recentPurchases && data.recentPurchases.length > 0 ? (
              <table className="transactions-table">
                <thead>
                  <tr><th>Bill #</th><th>Vendor</th><th>Total</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {data.recentPurchases.map(p => (
                    <tr key={p._id}><td>{p.billNumber}</td><td>{String(p.vendor)}</td><td>{p.total}</td><td>{p.status}</td></tr>
                  ))}
                </tbody>
              </table>
            ) : <div className="text-muted">No purchases yet</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

