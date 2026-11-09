
import { useEffect, useState, type FormEvent } from 'react'
import { supabase } from '../supabase'
import AdminDashboard from './AdminDashboard'
import './AdminLogin.css'

const ADMIN_ID = '5b73dee2-ea99-4bf0-bc80-0b37faa92464'

function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [checkingSession, setCheckingSession] = useState(true)
  const [error, setError] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    let active = true

    const checkSession = async () => {
      const { data, error } = await supabase.auth.getUser()

      if (!active) return

      setLoggedIn(!error && data.user?.id === ADMIN_ID)
      setCheckingSession(false)
    }

    void checkSession()

    return () => {
      active = false
    }
  }, [])

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        })

      if (loginError) {
        setError('Invalid email or password.')
        return
      }

      if (data.user?.id !== ADMIN_ID) {
        await supabase.auth.signOut()
        setError('This account does not have admin access.')
        return
      }

      setLoggedIn(true)
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      setError('Could not log out. Please try again.')
      return
    }

    setLoggedIn(false)
    setEmail('')
    setPassword('')
  }

  if (checkingSession) {
    return (
      <div className="admin-login">
        <p>Checking session...</p>
      </div>
    )
  }

  if (loggedIn) {
    return <AdminDashboard onLogout={handleLogout} />
  }

  return (
    <div className="admin-login">
      <span className="eyebrow">PRIVATE ACCESS</span>
      <h2>Admin Login</h2>
      <p>Cluj Girls Club Management</p>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoComplete="email"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />

        {error && <p role="alert">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in ↗'}
        </button>
      </form>
    </div>
  )
}

export default AdminLogin
