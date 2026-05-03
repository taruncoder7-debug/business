import React, { useState, useEffect, useRef } from 'react'
import api from '../api'

export default function ConferenceRoom({ user, onNavigate }) {
  const [rooms, setRooms] = useState([
    { id: 'general', name: '# General', icon: '💬', active: true },
    { id: 'all-hands', name: '# All Hands Meeting', icon: '👥', active: false },
    { id: 'announcements', name: '# Announcements', icon: '📢', active: false },
    { id: 'support', name: '# Support', icon: '🆘', active: false },
    { id: 'dev-team', name: '# Dev Team', icon: '👨‍💻', active: false },
  ])
  
  const [selectedRoom, setSelectedRoom] = useState('general')
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [typing, setTyping] = useState([])
  const [onlineUsers, setOnlineUsers] = useState([
    { id: 1, name: 'John Admin', status: 'online', role: 'admin' },
    { id: 2, name: 'Jane Manager', status: 'online', role: 'manager' },
    { id: 3, name: 'Bob Employee', status: 'busy', role: 'employee' },
    { id: 4, name: 'Alice Employee', status: 'away', role: 'employee' },
  ])
  const [searchMessages, setSearchMessages] = useState('')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    loadRoomMessages(selectedRoom)
  }, [selectedRoom])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(scrollToBottom, [messages])

  const loadRoomMessages = (room) => {
    // Mock messages for different rooms
    const mockMessages = {
      general: [
        { id: 1, user: 'Admin User', role: 'admin', message: 'Welcome to the general chat!', time: '10:00 AM', avatar: '👨‍💼' },
        { id: 2, user: 'Manager', role: 'manager', message: 'Please check the updates on the dashboard', time: '10:15 AM', avatar: '👩‍💼' },
        { id: 3, user: 'Employee 1', role: 'employee', message: 'Thanks for the update!', time: '10:20 AM', avatar: '👨‍💻' },
      ],
      'all-hands': [
        { id: 1, user: 'Admin User', role: 'admin', message: 'Starting all-hands meeting in 5 minutes', time: '2:00 PM', avatar: '👨‍💼' },
        { id: 2, user: 'Admin User', role: 'admin', message: 'Q3 performance is exceeding targets!', time: '2:15 PM', avatar: '👨‍💼' },
      ],
      announcements: [
        { id: 1, user: 'Admin User', role: 'admin', message: 'New office policy effective immediately', time: '9:00 AM', avatar: '👨‍💼' },
        { id: 2, user: 'Admin User', role: 'admin', message: 'Please update your profiles by EOD Friday', time: '9:30 AM', avatar: '👨‍💼' },
      ],
      support: [],
      'dev-team': [
        { id: 1, user: 'Developer', role: 'employee', message: 'Code review ready for dashboard updates', time: '11:00 AM', avatar: '👨‍💻' },
      ]
    }
    setMessages(mockMessages[room] || [])
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message = {
      id: messages.length + 1,
      user: user?.name || 'Unknown User',
      role: user?.role || 'employee',
      message: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: '👤'
    }

    setMessages([...messages, message])
    setNewMessage('')
  }

  const filteredMessages = messages.filter(msg =>
    msg.message.toLowerCase().includes(searchMessages.toLowerCase()) ||
    msg.user.toLowerCase().includes(searchMessages.toLowerCase())
  )

  const getStatusColor = (status) => {
    switch(status) {
      case 'online': return '#00d084'
      case 'away': return '#ffc107'
      case 'busy': return '#ff6b6b'
      default: return '#95949b'
    }
  }

  const getRoleColor = (role) => {
    switch(role) {
      case 'admin': return '#ff6b6b'
      case 'manager': return '#ffc107'
      default: return '#00d0ff'
    }
  }

  return (
    <div className="dashboard-container">
      <div className="breadcrumb-nav">
        <button type="button" className="breadcrumb-link" onClick={() => onNavigate?.('home')}>Home</button>
        <span className="breadcrumb-sep">•</span>
        <button type="button" className="breadcrumb-link" onClick={() => onNavigate?.('dashboard')}>Dashboard</button>
        <span className="breadcrumb-sep">•</span>
        <span>Conference Room</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr 250px', gap: '20px', height: '70vh' }}>
        {/* Rooms Sidebar */}
        <div style={{ 
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '15px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h4 style={{ margin: '0 0 15px 0', color: 'white' }}>Chat Rooms</h4>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {rooms.map(room => (
              <button
                key={room.id}
                onClick={() => setSelectedRoom(room.id)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  marginBottom: '8px',
                  background: selectedRoom === room.id ? 'rgba(31,119,180,0.3)' : 'rgba(255,255,255,0.05)',
                  border: selectedRoom === room.id ? '1px solid #1f77b4' : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '6px',
                  color: selectedRoom === room.id ? '#00d0ff' : 'var(--light-text)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '0.9rem',
                  transition: '0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>{room.icon}</span>
                <span>{room.name.substring(2)}</span>
              </button>
            ))}
          </div>
          <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <button style={{
              width: '100%',
              padding: '8px 12px',
              background: '#00d084',
              color: 'var(--dark)',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '0.9rem'
            }}>
              + New Room
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div style={{ 
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Room Header */}
          <div style={{
            padding: '15px 20px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h3 style={{ margin: 0, color: 'white' }}>
              {rooms.find(r => r.id === selectedRoom)?.name}
            </h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{
                padding: '6px 12px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}>📞 Call</button>
              <button style={{
                padding: '6px 12px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}>📹 Video</button>
            </div>
          </div>

          {/* Search */}
          <div style={{ padding: '10px 20px' }}>
            <input
              type="text"
              placeholder="Search messages..."
              value={searchMessages}
              onChange={(e) => setSearchMessages(e.target.value)}
              className="form-control"
              style={{ fontSize: '0.9rem' }}
            />
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {filteredMessages.length === 0 ? (
              <div style={{ textAlign: 'center', color: 'var(--muted-text)', paddingTop: '40px' }}>
                <p>No messages yet. Start the conversation!</p>
              </div>
            ) : (
              filteredMessages.map(msg => (
                <div key={msg.id} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <div style={{
                    fontSize: '1.5rem',
                    minWidth: '35px',
                    textAlign: 'center'
                  }}>
                    {msg.avatar}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <strong style={{ color: 'white' }}>{msg.user}</strong>
                      <span style={{
                        background: getRoleColor(msg.role),
                        color: msg.role === 'manager' ? 'var(--dark)' : 'white',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        textTransform: 'uppercase'
                      }}>
                        {msg.role}
                      </span>
                      <span style={{ color: 'var(--muted-text)', fontSize: '0.85rem' }}>
                        {msg.time}
                      </span>
                    </div>
                    <div style={{
                      background: 'rgba(0,208,255,0.1)',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      color: 'var(--light-text)',
                      wordWrap: 'break-word'
                    }}>
                      {msg.message}
                    </div>
                  </div>
                </div>
              ))
            )}
            {typing.length > 0 && (
              <div style={{ color: 'var(--muted-text)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                {typing.join(', ')} is typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div style={{
            padding: '15px 20px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            gap: '10px'
          }}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="form-control"
              style={{ fontSize: '0.9rem' }}
            />
            <button
              onClick={handleSendMessage}
              className="btn btn-primary"
              style={{ padding: '10px 20px' }}
            >
              Send
            </button>
          </div>
        </div>

        {/* Online Users */}
        <div style={{ 
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '15px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h4 style={{ margin: '0 0 15px 0', color: 'white' }}>Online Users ({onlineUsers.length})</h4>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {onlineUsers.map((u) => (
              <div
                key={u.id}
                style={{
                  padding: '10px',
                  marginBottom: '8px',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '6px',
                  borderLeft: `3px solid ${getStatusColor(u.status)}`
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: getStatusColor(u.status)
                  }}></div>
                  <span style={{ color: 'var(--light-text)', fontSize: '0.9rem' }}>
                    <strong>{u.name}</strong>
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <span style={{
                    background: getRoleColor(u.role),
                    color: u.role === 'manager' ? 'var(--dark)' : 'white',
                    padding: '2px 6px',
                    borderRadius: '3px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}>
                    {u.role}
                  </span>
                  <span style={{
                    color: 'var(--muted-text)',
                    fontSize: '0.75rem',
                    padding: '2px 6px'
                  }}>
                    {u.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

