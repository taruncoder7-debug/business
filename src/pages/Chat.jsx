import React, { useState, useEffect } from 'react'

export default function Chat({ user }) {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [room, setRoom] = useState('general')

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const newMessage = {
      id: Date.now(),
      sender: user?.name || 'Anonymous',
      message: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    }

    setMessages([...messages, newMessage])
    setInputMessage('')
  }

  return (
    <div>
      <h2>💬 Real-time Chat</h2>
      
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <div className="card-header">
              <h5>Rooms</h5>
            </div>
            <div className="list-group">
              <button 
                className={`list-group-item list-group-item-action ${room === 'general' ? 'active' : ''}`}
                onClick={() => setRoom('general')}
              >
                #general
              </button>
              <button 
                className={`list-group-item list-group-item-action ${room === 'dev' ? 'active' : ''}`}
                onClick={() => setRoom('dev')}
              >
                #development
              </button>
              <button 
                className={`list-group-item list-group-item-action ${room === 'sales' ? 'active' : ''}`}
                onClick={() => setRoom('sales')}
              >
                #sales
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-9">
          <div className="card">
            <div className="card-header">
              <h5>#{room}</h5>
            </div>
            <div className="card-body" style={{ height: '400px', overflowY: 'auto', backgroundColor: '#f8f9fa' }}>
              {messages.length === 0 ? (
                <p className="text-muted">No messages yet. Start the conversation!</p>
              ) : (
                messages.map(msg => (
                  <div key={msg.id} className="mb-3">
                    <strong>{msg.sender}</strong>
                    <span className="text-muted ms-2" style={{fontSize: '0.85em'}}>{msg.timestamp}</span>
                    <p className="mb-0">{msg.message}</p>
                  </div>
                ))
              )}
            </div>
            <div className="card-footer">
              <form onSubmit={handleSendMessage}>
                <div className="input-group">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Type a message..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                  />
                  <button className="btn btn-primary" type="submit">Send</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
