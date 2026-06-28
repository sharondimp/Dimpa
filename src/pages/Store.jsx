import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTheme } from '../context/AppContext'

const mockStore = {
  name: "Dimp's Beauty Empire",
  slug: 'dimps-beauty',
  desc: 'Premium wigs and beauty products. All items are carefully sourced and quality-checked.',
  verified: true,
  premium: true,
  banner: '💄',
  products: [
    { id: 1, name: 'Ankara Midi Dress', price: 18500, type: 'physical', image: '👗', desc: 'Beautiful ankara fabric, available in sizes S-XL' },
    { id: 2, name: 'Bob Wig - Human Hair', price: 65000, type: 'physical', image: '👱‍♀️', desc: '12 inch bob, 100% human hair, natural black' },
    { id: 3, name: 'Lip Gloss Set (6 shades)', price: 8200, type: 'physical', image: '💄', desc: '6 stunning shades, long-lasting formula' },
    { id: 4, name: 'Business Plan Template', price: 3000, type: 'digital', image: '📘', desc: 'Professional business plan template in Word & PDF' },
  ]
}

export default function Store() {
  const { storeSlug } = useParams()
  const { theme, toggleTheme } = useTheme()
  const [filter, setFilter] = useState('all')
  const store = mockStore

  const filtered = filter === 'all' ? store.products : store.products.filter(p => p.type === filter)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Store header */}
      <div style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)', padding: '1rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem' }}>
          Ven<span style={{ color: 'var(--green)' }}>da</span>
        </Link>
        <button onClick={toggleTheme} style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: '50px', padding: '0.3rem 0.8rem', fontSize: '0.8rem', color: 'var(--text)', cursor: 'pointer' }}>
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>

      {/* Store banner */}
      <div style={{ background: 'linear-gradient(135deg, var(--green) 0%, var(--green-dim) 100%)', padding: '3rem 5%', textAlign: 'center', position: 'relative' }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.8rem' }}>{store.banner}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>{store.name}</h1>
          {store.verified && <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: '0.68rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '50px', letterSpacing: '0.04em' }}>✓ VERIFIED</span>}
          {store.premium && <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: '0.68rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '50px' }}>⭐ PREMIUM</span>}
        </div>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', maxWidth: '500px', margin: '0 auto' }}>{store.desc}</p>
      </div>

      <div style={{ padding: '2.5rem 5%' }}>
        {/* Filter */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {['all', 'physical', 'digital'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: '0.4rem 0.9rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 600, border: '1.5px solid', borderColor: filter === f ? 'var(--green)' : 'var(--border)', background: filter === f ? 'var(--green-soft)' : 'transparent', color: filter === f ? 'var(--green)' : 'var(--muted)', cursor: 'pointer', textTransform: 'capitalize' }}>
              {f === 'all' ? 'All Products' : f === 'physical' ? '📦 Physical' : '💻 Digital'}
            </button>
          ))}
        </div>

        {/* Products */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.2rem' }}>
          {filtered.map(p => (
            <div key={p.id} className="card" style={{ transition: 'all 0.2s', cursor: 'pointer' }}>
              <div style={{ height: '140px', background: 'var(--bg2)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', marginBottom: '1rem' }}>
                {p.image}
              </div>
              <span style={{ fontSize: '0.68rem', fontWeight: 600, padding: '0.18rem 0.5rem', borderRadius: '4px', background: 'var(--green-soft)', color: 'var(--green)', border: '1px solid rgba(0,168,120,0.2)', marginBottom: '0.5rem', display: 'inline-block' }}>
                {p.type === 'digital' ? '💻 Digital' : '📦 Physical'}
              </span>
              <div style={{ fontWeight: 700, marginBottom: '0.3rem', fontFamily: 'var(--font-display)' }}>{p.name}</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.8rem', lineHeight: 1.5 }}>{p.desc}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--green)', fontSize: '1.1rem' }}>₦{p.price.toLocaleString()}</div>
                <Link to={`/checkout/${storeSlug}/${p.id}`} className="btn-primary" style={{ padding: '0.45rem 1rem', fontSize: '0.82rem' }}>Buy Now</Link>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📭</div>
            <div>No {filter} products yet</div>
          </div>
        )}

        {/* Store footer */}
        <div style={{ textAlign: 'center', marginTop: '3rem', padding: '1.5rem', borderTop: '1px solid var(--border)' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Powered by <Link to="/" style={{ color: 'var(--green)', fontWeight: 600 }}>Venda</Link> · Verified marketplace</p>
        </div>
      </div>
    </div>
  )
}
