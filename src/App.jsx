import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import Inventory from './pages/Inventory'
import Attendance from './pages/Attendance'
import Invoices from './pages/Invoices'
import Users from './pages/Users'
import Home from './pages/Home'
import Products from './pages/Products'
import Categories from './pages/Categories'
import Orders from './pages/Orders'
import Customers from './pages/Customers'
import Reviews from './pages/Reviews'
import Payments from './pages/Payments'
import SalesOverview from './pages/SalesOverview'
import TopProducts from './pages/TopProducts'
import StockStatus from './pages/StockStatus'
import Reports from './pages/Reports'
import EmployeeManagement from './pages/EmployeeManagement'
import Analytics from './pages/Analytics'
import Purchases from './pages/Purchases'
import ConferenceRoom from './pages/ConferenceRoom'

const DEFAULT_USER = {
  _id: '000000000000000000000001',
  name: 'Alice Johnson',
  email: 'admin@example.com',
  role: 'admin'
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const user = DEFAULT_USER
  const isAdmin = String(user.role || '').toLowerCase() === 'admin'

  const handleNavigate = (page) => {
    setCurrentPage(page)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home user={user} onNavigate={handleNavigate} />
      case 'dashboard':
        return <Dashboard user={user} onNavigate={handleNavigate} />
      case 'products':
        return <Products user={user} onNavigate={handleNavigate} />
      case 'categories':
        return <Categories user={user} onNavigate={handleNavigate} />
      case 'orders':
        return <Orders user={user} onNavigate={handleNavigate} />
      case 'customers':
        return <Customers user={user} onNavigate={handleNavigate} />
      case 'reviews':
        return <Reviews user={user} onNavigate={handleNavigate} />
      case 'payments':
        return <Payments user={user} onNavigate={handleNavigate} />
      case 'sales-overview':
        return <SalesOverview user={user} onNavigate={handleNavigate} />
      case 'top-products':
        return <TopProducts user={user} onNavigate={handleNavigate} />
      case 'stock-status':
        return <StockStatus user={user} onNavigate={handleNavigate} />
      case 'reports':
        return <Reports user={user} onNavigate={handleNavigate} />
      case 'taxes':
        return <Payments user={user} onNavigate={handleNavigate} />
      case 'tasks':
        return <Tasks user={user} onNavigate={handleNavigate} />
      case 'inventory':
        return <Inventory user={user} onNavigate={handleNavigate} />
      case 'attendance':
        return <Attendance user={user} onNavigate={handleNavigate} />
      case 'invoices':
        return <Invoices user={user} onNavigate={handleNavigate} />
      case 'purchases':
        return <Purchases user={user} onNavigate={handleNavigate} />
      case 'chat':
        return <ConferenceRoom user={user} onNavigate={handleNavigate} />
      case 'users':
        return isAdmin ? <Users user={user} onNavigate={handleNavigate} /> : <Dashboard user={user} onNavigate={handleNavigate} />
      case 'employees':
        return isAdmin ? <EmployeeManagement user={user} onNavigate={handleNavigate} /> : <Dashboard user={user} onNavigate={handleNavigate} />
      case 'analytics':
        return <Analytics user={user} onNavigate={handleNavigate} />
      default:
        return <Dashboard user={user} onNavigate={handleNavigate} />
    }
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
      <Navbar user={user} />
      <div style={{display: 'flex', flex: 1, overflow: 'hidden'}}>
        <Sidebar user={user} currentPage={currentPage} onNavigate={handleNavigate} />
        <main className="main-content" style={{flex: 1, overflowY: 'auto', padding: '30px'}}>
          {renderPage()}
        </main>
      </div>
    </div>
  )
}
