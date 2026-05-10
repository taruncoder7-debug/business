import axios from 'axios'

// Use Vite environment variables for backend URL
let API_BASE = 'https://busiback.onrender.com'
try {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE) {
    API_BASE = import.meta.env.VITE_API_BASE
  }
} catch (e) {
  // import.meta may not be available in some runtimes - ignore
}

const instance = axios.create({ baseURL: API_BASE + '/api' })

function setToken(token) {
  if (token) instance.defaults.headers.common['Authorization'] = 'Bearer ' + token
  else delete instance.defaults.headers.common['Authorization']
}

// If running in browser and a token exists in localStorage, set it immediately
try {
  if (typeof window !== 'undefined' && window.localStorage) {
    const t = window.localStorage.getItem('token')
    if (t) setToken(t)
  }
} catch (e) {
  // ignore (e.g., during server-side tools)
}

async function login(email, password) {
  return instance.post('/auth/login', { email, password })
}

async function me() {
  return instance.get('/auth/me')
}

export default { instance, setToken, login, me }
