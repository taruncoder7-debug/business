import React, { useState, useCallback, useEffect } from 'react'
import api from './api'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import LoginModal from './components/LoginModal'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import Inventory from './pages/Inventory'
import Attendance from './pages/Attendance'
import Invoices from './pages/Invoices'
import Chat from './pages/Chat'
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

export default function App() {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [authChecked, setAuthChecked] = useState(!localStorage.getItem('token'))
  const [currentPage, setCurrentPage] = useState('dashboard')

  // Ensure axios instance has token on initial load (when page refresh)
  useEffect(() => {
    let cancelled = false

    async function verifySavedSession() {
      if (!token) {
        setAuthChecked(true)
        return
      }

      api.setToken(token)
      try {
        const saved = localStorage.getItem('user')
        if (saved) setUser(JSON.parse(saved))
        await api.me()
        if (!cancelled) setAuthChecked(true)
      } catch (e) {
        if (!cancelled) {
          console.warn('Saved session is invalid; signing out', e)
          setToken(null)
          setUser(null)
          setAuthChecked(true)
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          api.setToken(null)
        }
      }
    }

    verifySavedSession()
    return () => {
      cancelled = true
    }
  }, [token])

  const onLogin = useCallback((loginData) => {
    console.log('→ onLogin called with token:', !!loginData?.token)
    if (!loginData?.token || !loginData?.user) {
      console.error('Invalid login data received', loginData)
      return
    }
    
    localStorage.setItem('token', loginData.token)
    localStorage.setItem('user', JSON.stringify(loginData.user))
    
    api.setToken(loginData.token)
    
    setToken(loginData.token)
    setUser(loginData.user)
    
    console.log('→ Login success! User:', loginData.user.name)
  }, [])

  const logout = useCallback(() => {
    console.log('→ Logout')
    setToken(null)
    setUser(null)
    setAuthChecked(true)
    setCurrentPage('dashboard')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    api.setToken(null)
  }, [])

  const handleNavigate = (page) => {
    setCurrentPage(page)
  }
  const isAdmin = String(user?.role || '').toLowerCase() === 'admin'

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
        return <Payments user={user} onNavigate={handleNavigate} />  // Use Payments for Taxes (financial section)
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

  console.log('→ App render: authenticated=', !!token, ', user=', user?.name || 'none')

  return (
    <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
      <Navbar user={user} onLogout={logout} />
      
      {!authChecked ? (
        <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div className="dashboard-loading"><p>Checking session...</p></div>
        </div>
      ) : !token ? (
        <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <LoginModal onLogin={onLogin} />
        </div>
      ) : (
        <div style={{display: 'flex', flex: 1, overflow: 'hidden'}}>
          <Sidebar user={user} currentPage={currentPage} onNavigate={handleNavigate} />
          <main className="main-content" style={{flex: 1, overflowY: 'auto', padding: '30px'}}>
            {renderPage()}
          </main>
        </div>
      )}
    </div>
  )
}

