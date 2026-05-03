import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Invoices() {
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api.instance.get('/invoices')
      .then(r => {
        setInvoices(r.data || [])
        setError(null)
      })
      .catch(err => {
        console.error('Invoices fetch error:', err.message)
        setError(err.message)
        setInvoices([])
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div><h2>Invoices</h2><p>Loading...</p></div>
  if (error) return <div><h2>Invoices</h2><div className="alert alert-danger">Error: {error}</div></div>

  return (
    <div>
      <h2>Invoices & Billing</h2>
      {!invoices || invoices.length === 0 ? (
        <p>No invoices available</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Client</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv, i) => (
                <tr key={i}>
                  <td>{inv.invoiceNumber || '-'}</td>
                  <td>{inv.clientName || '-'}</td>
                  <td>${inv.totalAmount || '0.00'}</td>
                  <td>{new Date(inv.date).toLocaleDateString() || '-'}</td>
                  <td><span className="badge bg-warning">Pending</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
