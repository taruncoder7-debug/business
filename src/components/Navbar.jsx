import React, { useState, useMemo } from 'react'

export default function Navbar({ user }) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const initials = useMemo(() => {
    if (!user || !user.name) return 'U'
    return user.name
      .split(' ')
      .map(s => s[0])
      .slice(0,2)
      .join('')
      .toUpperCase()
  }, [user])

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button
          className="hamburger"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen(v => !v)}
        >
          ☰
        </button>

        <div className="brand">
          <span className="brand-icon" aria-hidden>🌍</span>
          <span className="brand-text">Quantico</span>
        </div>

        <div className={`navbar-search ${searchOpen ? 'open' : ''}`}>
          <input
            type="text"
            placeholder="Search for people, orders, invoices..."
            className="search-input"
            aria-label="Search"
          />
          <button
            className="search-btn"
            onClick={() => setSearchOpen(s => !s)}
            aria-expanded={searchOpen}
            title="Search"
          >
            🔍
          </button>
        </div>
      </div>

      {user && (
        <div className={`nav-right ${mobileOpen ? 'open' : ''}`}>
          <div className="nav-links">
            <button className="icon-btn" title="Notifications">🔔</button>
            <button className="icon-btn" title="Messages">✉️</button>
          </div>

          <div className="profile" title={`${user.name} — ${user.role}`}>
            <div className="avatar">{initials}</div>
            <div className="user-meta">
              <div className="user-name">{user.name}</div>
              <div className="user-role">{user.role}</div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
