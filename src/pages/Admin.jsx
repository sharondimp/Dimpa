import { Link } from 'react-router-dom'
import { useAuth } from '../context/AppContext'
import Navbar from '../components/Navbar'

const mockStats = { totalSellers: 24, pendingVerification: 5, premiumSellers: 8, totalOrders: 142, totalRevenue: 980000 }
const mockRecentSellers = [
  { id: 1, name: 'Tolu Adeyemi', store: 'Tolu Styles', email: 'tolu@email.com', status: 'pending', plan: 'free', date: '28 Jun 2026' },
  { id: 2, name: 'Chidi Madu', store: 'Chidi Tech', email: 'chidi@email.com', status: 'approved', plan: 'premium', date: '27 Jun 2026' },
  { id: 3, name: 'Amara Suleiman', store: 'Amara Beauty', email: 'amara@email.com', status: 'pending', plan: 'free', date: '26 Jun 2026' },
]

export default function Admin() {
  const { user } = useAuth()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg2)' }}>
      <Navbar variant="admin" />
      <div style={{ paddingTop: '64px', padding: '5rem 5% 3rem' }}>

        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.2rem' }}>Admin Dashboard</div>
          <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>Welcome back, {user?.fullName} 👋</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Total Sellers', value: mockStats.totalSellers, icon: '👥', color: 'var(--text)' },
            { label: 'Pending Verification', value: mockStats.pendingVerification, icon: '⏳', color: 'var(--warning)' },
            { label: 'Premium Sellers', value: mockStats.premiumSellers, icon: '⭐', color: 'var(--green)' },
            { label: 'Total Orders', value: mockStats.totalOrders, icon: '🛍️', color: 'var(--text)' },
            { label: 'Platform Revenue', value: `₦${mockStats.totalRevenue.toLocaleString()}`, icon: '💰', color: 'var(--green)' },
          ].map(s => (
            <div key={s.label} className="card">
              <div style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{s.icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: s.color, lineHeight: 1, marginBottom: '0.3rem' }}>{s.value}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Pending verifications alert */}
        {mockStats.pendingVerification > 0 && (
          <div style={{ background: 'rgba(214,158,46,0.08)', border: '1px solid rgba(214,158,46,0.25)', borderRadius: '10px', padding: '1rem 1.2rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <span style={{ fontSize: '1.2rem' }}>⏳</span>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--warning)' }}>{mockStats.pendingVerification} sellers waiting for NIN verification</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>Review and approve or reject their applications</div>
              </div>
            </div>
            <Link to="/admin/sellers" className="btn-primary" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>Review Now →</Link>
          </div>
        )}

        {/* Quick actions */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <Link to="/admin/sellers" className="card" style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', textDecoration: 'none' }}>
            <span style={{ fontSize: '1.5rem' }}>👥</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Manage Sellers</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>Verify, approve, manage</div>
            </div>
          </Link>
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', cursor: 'pointer' }} onClick={() => alert('Email composer coming soon!')}>
            <span style={{ fontSize: '1.5rem' }}>📧</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Send Email Blast</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>Email all sellers</div>
            </div>
          </div>
        </div>

        {/* Recent sellers */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Recent Seller Applications</div>
            <Link to="/admin/sellers" style={{ fontSize: '0.82rem', color: 'var(--green)', fontWeight: 600 }}>View all →</Link>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Seller', 'Store', 'Plan', 'Status', 'Date'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '0.6rem 0.8rem', color: 'var(--muted)', fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockRecentSellers.map(s => (
                  <tr key={s.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '0.75rem 0.8rem' }}>
                      <div style={{ fontWeight: 600 }}>{s.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{s.email}</div>
                    </td>
                    <td style={{ padding: '0.75rem 0.8rem' }}>{s.store}</td>
                    <td style={{ padding: '0.75rem 0.8rem' }}>
                      <span className={`badge ${s.plan === 'premium' ? 'badge-green' : 'badge-gray'}`}>{s.plan}</span>
                    </td>
                    <td style={{ padding: '0.75rem 0.8rem' }}>
                      <span className={`badge ${s.status === 'approved' ? 'badge-green' : 'badge-yellow'}`}>{s.status}</span>
                    </td>
                    <td style={{ padding: '0.75rem 0.8rem', color: 'var(--muted)' }}>{s.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
