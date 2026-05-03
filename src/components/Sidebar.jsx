import React, { useState } from 'react'
import sidebarThumbnail from '../assets/sidebar-thumbnail.svg'

export default function Sidebar({ user, currentPage, onNavigate }) {
  const [expandedMenu, setExpandedMenu] = useState(null)
  const isActiveSubmenu = (item) => item.submenu?.some((subitem) => subitem.id === currentPage)
  const isAdmin = String(user?.role || '').toLowerCase() === 'admin'

  const menuItems = [
    { id: 'home', label: 'Home', icon: 'HM' },
    { id: 'dashboard', label: 'Dashboard', icon: 'DB' },
    ...(isAdmin
      ? [
          {
            id: 'admin',
            label: 'Admin Panel',
            icon: 'AD',
            submenu: [
              { id: 'employees', label: 'Employee Management' },
              { id: 'users', label: 'User Management' }
            ]
          }
        ]
      : []),
    {
      id: 'reports',
      label: 'Reports & Export',
      icon: 'RP',
      submenu: [
        { id: 'analytics', label: 'Analytics & Export' },
        { id: 'reports', label: 'View Reports' }
      ]
    },
    {
      id: 'sales',
      label: 'Sales',
      icon: 'SL',
      submenu: [
        { id: 'orders', label: 'Orders' },
        { id: 'invoices', label: 'Invoices' },
        { id: 'customers', label: 'Customers' },
        { id: 'payments', label: 'Payments' }
      ]
    },
    {
      id: 'inventory',
      label: 'Inventory',
      icon: 'IV',
      submenu: [
        { id: 'products', label: 'Products' },
        { id: 'stock-status', label: 'Stock Status' },
        { id: 'categories', label: 'Categories' }
      ]
    },
    {
      id: 'operations',
      label: 'Operations',
      icon: 'OP',
      submenu: [
        { id: 'tasks', label: 'Tasks' },
        { id: 'attendance', label: 'Attendance' },
        { id: 'chat', label: 'Messages & Chat' }
      ]
    },
    {
      id: 'vendors',
      label: 'Vendors & Purchases',
      icon: 'VN',
      submenu: [{ id: 'purchases', label: 'Purchase Orders' }]
    },
    {
      id: 'insights',
      label: 'Insights',
      icon: 'IN',
      submenu: [
        { id: 'sales-overview', label: 'Sales Overview' },
        { id: 'top-products', label: 'Top Products' },
        { id: 'reviews', label: 'Reviews' }
      ]
    }
  ]

  const handleMenuClick = (item) => {
    if (item.submenu) {
      setExpandedMenu(expandedMenu === item.id ? null : item.id)
    } else {
      onNavigate(item.id)
    }
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">
          <img
            src={sidebarThumbnail}
            alt="Company introduction thumbnail"
            className="brand-thumbnail"
          />
        </div>
        <div>
          <div className="brand-name">Quantico</div>
          <div className="brand-id">ID: CMP-1006</div>
        </div>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <div key={item.id}>
            <button
              className={`sidebar-link ${currentPage === item.id || expandedMenu === item.id || isActiveSubmenu(item) ? 'active' : ''}`}
              onClick={() => handleMenuClick(item)}
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
              {item.submenu && <span className="menu-toggle">{expandedMenu === item.id || isActiveSubmenu(item) ? 'v' : '>'}</span>}
            </button>
            {item.submenu && (expandedMenu === item.id || isActiveSubmenu(item)) && (
              <div className="sidebar-submenu">
                {item.submenu.map((subitem) => (
                  <button
                    key={subitem.id}
                    className={`sidebar-sublink ${currentPage === subitem.id ? 'active' : ''}`}
                    onClick={() => onNavigate(subitem.id)}
                  >
                    {subitem.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  )
}
