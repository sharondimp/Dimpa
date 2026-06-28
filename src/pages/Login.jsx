import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AppContext'
import Navbar from '../components/Navbar'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) return setError('Please fill in all fields')
    setLoading(true)
    try {
      // Mock login — will replace with Firebase
      await new Promise(r => setTimeout(r, 1000))

      // Mock admin login
      if (email === 'admin@venda.app') {
        login({ id: 'admin', fullName: 'Sharon', email, role: 'admin', plan: 'admin' })
        navigate('/admin')
        return
      }

      login({
        id: 'seller-1', fullName: 'Sharon Adelaja', email,
        storeName: 'My Store', storeSlug: 'my-store',
        productType: 'both', plan: 'free', status: 'approved', role: 'seller'
      })
      navigate('/dashboard')
    } catch (err) {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg2)', display: 'flex', flexDirection: 'column' }}>
      <Navbar variant="public" />
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5rem 5% 3rem' }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.8rem', marginBottom: '0.3rem' }}>Welcome back</div>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Log in to your Venda seller account</p>
          </div>

          <div className="card" style={{ padding: '2rem' }}>
            {error && (
              <div style={{ background: 'rgba(229,62,62,0.08)', border: '1px solid rgba(229,62,62,0.2)', borderRadius: '8px', padding: '0.7rem 1rem', marginBottom: '1.2rem', color: 'var(--danger)', fontSize: '0.85rem' }}>{error}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Your password" />
              </div>
              <div style={{ textAlign: 'right', marginBottom: '1.2rem' }}>
                <a href="#" style={{ fontSize: '0.82rem', color: 'var(--green)', fontWeight: 500 }}>Forgot password?</a>
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.8rem' }} disabled={loading}>
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </form>
          </div>

          <p style={{ textAlign: 'center', marginTop: '1.2rem', fontSize: '0.875rem', color: 'var(--muted)' }}>
            Don't have an account? <Link to="/register" style={{ color: 'var(--green)', fontWeight: 600 }}>Start selling</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
