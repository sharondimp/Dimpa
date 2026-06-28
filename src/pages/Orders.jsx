import { useState } from 'react'
import Navbar from '../components/Navbar'

const mockOrders = [
  { id: 'ORD001', buyer: 'Tolu Adeyemi', email: 'tolu@email.com', phone: '08012345678', product: 'Ankara Midi Dress', amount: 18500, status: 'pending', date: '28 Jun 2026', type: 'physical', address: '14 Bode Thomas, Surulere, Lagos' },
  { id: 'ORD002', buyer: 'Chidi Madu', email: 'chidi@email.com', phone: null, product: 'Business Plan Template', amount: 3000, status: 'delivered', date: '27 Jun 2026', type: 'digital', address: null },
  { id: 'ORD003', buyer: 'Amara Suleiman', email: 'amara@email.com', phone: '09087654321', product: 'Lip Gloss Set', amount: 8200, status: 'pending', date: '26 Jun 2026', type: 'physical', address: '5 Allen Avenue, Ikeja, Lagos' },
  { id: 'ORD004', buyer: 'Ngozi Eze', email: 'ngozi@email.com', phone: null, product: 'Business Plan Template', amount: 3000, status: 'delivered', date: '25 Jun 2026', type: 'digital', address: null },
]

export default function Orders() {
  const [orders, setOrders] = useState(mockOrders)
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter || o.type === filter)

  const markDelivered = (id) => setOrders(os => os.map(o => o.id === id ? { ...o, status: 'delivered' } : o))

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg2)' }}>
      <Navbar variant="dashboard" />
      <div style={{ paddingTop: '64px', padding: '5rem 5% 3rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.2rem' }}>Orders</div>
          <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>{orders.length} total orders</p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {['all', 'pending', 'delivered', 'physical', 'digital'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: '0.4rem 0.9rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 600, border: '1.5px solid', borderColor: filter === f ? 'var(--green)' : 'var(--border)', background: filter === f ? 'var(--green-soft)' : 'transparent', color: filter === f ? 'var(--green)' : 'var(--muted)', cursor: 'pointer', textTransform: 'capitalize' }}>
              {f}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {filtered.map(o => (
            <div key={o.id} className="card" onClick={() => setSelected(o)} style={{ cursor: 'pointer', transition: 'border-color 0.2s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.5rem' }}>{o.type === 'digital' ? '💻' : '📦'}</span>
                  <div>
                    <div style={{ fontWeight: 700, marginBottom: '0.15rem' }}>{o.product}</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>{o.buyer} · {o.date}</div>
                    {o.type === 'physical' && o.address && <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '0.2rem' }}>📍 {o.address}</div>}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--green)', fontSize: '1rem' }}>₦{o.amount.toLocaleString()}</div>
                  <span className={`badge ${o.status === 'delivered' ? 'badge-green' : 'badge-yellow'}`}>{o.status}</span>
                </div>
              </div>
              {o.status === 'pending' && o.type === 'physical' && (
                <div style={{ marginTop: '0.9rem', paddingTop: '0.9rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '0.5rem' }}>
                  <button onClick={e => { e.stopPropagation(); markDelivered(o.id) }} className="btn-primary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.9rem' }}>Mark as Delivered</button>
                  <a href={`https://wa.me/${o.phone}`} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.9rem' }}>WhatsApp Buyer</a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Order detail modal */}
        {selected && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div className="card" style={{ width: '100%', maxWidth: '440px', padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Order {selected.id}</div>
                <button onClick={() => setSelected(null)} style={{ fontSize: '1.2rem', color: 'var(--muted)' }}>✕</button>
              </div>
              {[
                ['Product', selected.product],
                ['Amount', `₦${selected.amount.toLocaleString()}`],
                ['Buyer', selected.buyer],
                ['Email', selected.email],
                ['Phone', selected.phone || 'N/A'],
                ['Type', selected.type],
                ['Status', selected.status],
                ['Date', selected.date],
                ...(selected.address ? [['Delivery Address', selected.address]] : []),
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid var(--border)', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--muted)' }}>{k}</span>
                  <span style={{ fontWeight: 600, color: k === 'Amount' ? 'var(--green)' : 'var(--text)', textAlign: 'right', maxWidth: '60%' }}>{v}</span>
                </div>
              ))}
              <button onClick={() => setSelected(null)} className="btn-secondary" style={{ width: '100%', justifyContent: 'center', marginTop: '1.2rem' }}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
