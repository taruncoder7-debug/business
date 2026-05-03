import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Attendance() {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api.instance.get('/attendance')
      .then(r => {
        setRecords(r.data || [])
        setError(null)
      })
      .catch(err => {
        console.error('Attendance fetch error:', err.message)
        setError(err.message)
        setRecords([])
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div><h2>Attendance</h2><p>Loading...</p></div>
  if (error) return <div><h2>Attendance</h2><div className="alert alert-danger">Error: {error}</div></div>

  return (
    <div>
      <h2>Attendance Tracking</h2>
      {!records || records.length === 0 ? (
        <p>No attendance records available</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Date</th>
                <th>Clock In</th>
                <th>Clock Out</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, i) => (
                <tr key={i}>
                  <td>{record.employeeName || '-'}</td>
                  <td>{new Date(record.date).toLocaleDateString() || '-'}</td>
                  <td>{record.clockIn || '-'}</td>
                  <td>{record.clockOut || '-'}</td>
                  <td><span className="badge bg-success">Present</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
