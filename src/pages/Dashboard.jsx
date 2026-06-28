import { Link } from 'react-router-dom'
import { useAuth } from '../context/AppContext'
import Navbar from '../components/Navbar'

const mockStats = { totalSales: 12, revenue: 145000, views: 342, products: 3 }
const mockOrders = [
  { id: 'ORD001', buyer: 'Tolu A.', product: 'Ankara Midi Dress', amount: 18500, status: 'pending', date: '28 Jun 2026', type: 'physical' },
  { id: 'ORD002', buyer: 'Chidi M.', product: 'Business Plan Template', amount: 3000, status: 'delivered', date: '27 Jun 2026', type: 'digital' },
  { id: 'ORD003', buyer: 'Amara S.', product: 'Lip Gloss Set', amount: 8200, status: 'pending', date: '26 Jun 2026', type: 'physical' },
]

export default function Dashboard() {
  const { user } = useAuth()
  const isPremium = user?.plan === 'premium'
  const isPending = user?.status === 'pending'

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg2)' }}>
      <Navbar variant="dashboard" />
      <div style={{ paddingTop: '64px', padding: '5rem 5% 3rem' }}>

        {/* Pending verification banner */}
        {isPending && (
          <div style={{ background: 'rgba(214,158,46,0.1)', border: '1px solid rgba(214,158,46,0.25)', borderRadius: '10px', padding: '1rem 1.2rem', marginBottom: '2rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1.2rem' }}>⏳</span>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--warning)', marginBottom: '0.2rem' }}>Verification pending</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Your NIN is being reviewed. Your store will go live within 24 hours. You'll get an email once approved.</div>
            </div>
          </div>
        )}

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.2rem' }}>
              Hey, {user?.fullName?.split(' ')[0]} 👋
            </div>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Here's what's happening with your store</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {!isPremium && <Link to="/dashboard/upgrade" className="btn-primary">⚡ Upgrade to Premium</Link>}
            <Link to={`/store/${user?.storeSlug}`} className="btn-secondary" target="_blank">View Store ↗</Link>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Total Sales', value: mockStats.totalSales, icon: '🛍️' },
            { label: 'Revenue', value: `₦${mockStats.revenue.toLocaleString()}`, icon: '💰' },
            { label: 'Store Views', value: mockStats.views, icon: '👀', locked: !isPremium },
            { label: 'Products', value: `${mockStats.products}${!isPremium ? '/5' : ''}`, icon: '📦' },
          ].map(s => (
            <div key={s.label} className="card" style={{ position: 'relative', overflow: 'hidden' }}>
              {s.locked && (
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius)', zIndex: 2 }}>
                  <span style={{ fontSize: '1.2rem', marginBottom: '0.3rem' }}>🔒</span>
                  <Link to="/dashboard/upgrade" style={{ fontSize: '0.75rem', color: 'var(--green)', fontWeight: 600 }}>Upgrade to unlock</Link>
                </div>
              )}
              <div style={{ fontSize: '1.4rem', marginBottom: '0.6rem' }}>{s.icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--green)', lineHeight: 1, marginBottom: '0.3rem' }}>{s.value}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem' }}>Recent Orders</div>
            <Link to="/dashboard/orders" style={{ fontSize: '0.82rem', color: 'var(--green)', fontWeight: 600 }}>View all →</Link>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Order ID', 'Buyer', 'Product', 'Amount', 'Status', 'Date'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '0.6rem 0.8rem', color: 'var(--muted)', fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockOrders.map(o => (
                  <tr key={o.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '0.75rem 0.8rem', color: 'var(--muted)', fontWeight: 600 }}>{o.id}</td>
                    <td style={{ padding: '0.75rem 0.8rem' }}>{o.buyer}</td>
                    <td style={{ padding: '0.75rem 0.8rem' }}>{o.product}</td>
                    <td style={{ padding: '0.75rem 0.8rem', fontWeight: 600, color: 'var(--green)' }}>₦{o.amount.toLocaleString()}</td>
                    <td style={{ padding: '0.75rem 0.8rem' }}>
                      <span className={`badge ${o.status === 'delivered' ? 'badge-green' : 'badge-yellow'}`}>{o.status}</span>
                    </td>
                    <td style={{ padding: '0.75rem 0.8rem', color: 'var(--muted)' }}>{o.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
          <Link to="/dashboard/products" className="card" style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', textDecoration: 'none', transition: 'border-color 0.2s' }}>
            <span style={{ fontSize: '1.5rem' }}>📦</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Manage Products</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>Add or edit listings</div>
            </div>
          </Link>
          <Link to="/dashboard/orders" className="card" style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', textDecoration: 'none', transition: 'border-color 0.2s' }}>
            <span style={{ fontSize: '1.5rem' }}>📋</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>View Orders</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>Track and manage orders</div>
            </div>
          </Link>
          {!isPremium && (
            <Link to="/dashboard/upgrade" className="card" style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', textDecoration: 'none', border: '1px solid rgba(0,168,120,0.25)', background: 'var(--green-soft)' }}>
              <span style={{ fontSize: '1.5rem' }}>⚡</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--green)' }}>Go Premium</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>Unlock all features</div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
