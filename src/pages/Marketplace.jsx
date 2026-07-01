import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../firebase'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { useTheme } from '../context/AppContext'
import Navbar from '../components/Navbar'

export default function Marketplace() {
  const { theme } = useTheme()
  const [sellers, setSellers] = useState([])
  const [sponsored, setSponsored] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const q = query(collection(db, 'sellers'), where('status', '==', 'approved'), where('role', '==', 'seller'))
        const snap = await getDocs(q)
        const all = snap.docs.map(d => ({ id: d.id, ...d.data() }))

        // Sponsored = premium sellers who opted in for sponsored ads
        const sponsoredSellers = all.filter(s => s.plan === 'premium' && s.sponsoredAds)
        // Sort: premium first then free
        const sorted = [
          ...all.filter(s => s.plan === 'premium' && !s.sponsoredAds),
          ...all.filter(s => s.plan === 'free'),
        ]
        setSponsored(sponsoredSellers)
        setSellers(sorted)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchSellers()
  }, [])

  const filtered = sellers.filter(s => {
    const matchSearch = search === '' ||
      s.storeName?.toLowerCase().includes(search.toLowerCase()) ||
      s.storeDesc?.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || s.productType === filter || (filter === 'both' && s.productType === 'both')
    return matchSearch && matchFilter
  })

  const productTypeEmoji = (type) => {
    if (type === 'physical') return '📦'
    if (type === 'digital') return '💻'
    return '🛍️'
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar variant="public" />
      <div style={{ paddingTop: '64px' }}>

        {/* Header */}
        <div style={{ background: 'var(--green)', padding: '3rem 5%', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#fff', marginBottom: '0.5rem', letterSpacing: '-0.03em' }}>
            Shop on Venda
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            Every seller is verified. Shop with confidence.
          </p>
          {/* Search */}
          <div style={{ maxWidth: '480px', margin: '0 auto', position: 'relative' }}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search for stores or products..."
              style={{ width: '100%', padding: '0.85rem 1.2rem 0.85rem 3rem', borderRadius: '10px', border: 'none', fontSize: '0.95rem', background: '#fff', color: '#111', outline: 'none' }}
            />
            <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem' }}>🔍</span>
          </div>
        </div>

        <div style={{ padding: '2.5rem 5%' }}>

          {/* Sponsored */}
          {sponsored.length > 0 && (
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>Sponsored</span>
                <div style={{ height: '1px', flex: 1, background: 'var(--border)' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
                {sponsored.map(s => (
                  <Link key={s.id} to={`/store/${s.storeSlug}`} style={{ textDecoration: 'none' }}>
                    <div className="card" style={{ border: '1.5px solid rgba(232,106,26,0.3)', background: 'rgba(232,106,26,0.04)', transition: 'all 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                        <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--green-soft)', border: '1px solid rgba(0,168,120,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--green)', fontSize: '1.1rem' }}>
                          {s.storeName?.[0]}
                        </div>
                        <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '0.15rem 0.45rem', borderRadius: '4px', background: 'rgba(232,106,26,0.1)', color: '#E86A1A', border: '1px solid rgba(232,106,26,0.2)' }}>AD</span>
                      </div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '0.3rem' }}>{s.storeName}</div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.75rem', lineHeight: 1.5 }}>{s.storeDesc?.slice(0, 80)}{s.storeDesc?.length > 80 ? '...' : ''}</div>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <span className="badge badge-green">✓ Verified</span>
                        <span className="badge badge-green">⭐ Premium</span>
                        <span className="badge badge-gray">{productTypeEmoji(s.productType)} {s.productType}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Filters */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {[['all', 'All Stores'], ['physical', '📦 Physical'], ['digital', '💻 Digital'], ['both', '🛍️ Both']].map(([val, label]) => (
                <button key={val} onClick={() => setFilter(val)} style={{ padding: '0.4rem 0.9rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 600, border: '1.5px solid', borderColor: filter === val ? 'var(--green)' : 'var(--border)', background: filter === val ? 'var(--green-soft)' : 'transparent', color: filter === val ? 'var(--green)' : 'var(--muted)', cursor: 'pointer' }}>
                  {label}
                </button>
              ))}
            </div>
            <span style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>{filtered.length} store{filtered.length !== 1 ? 's' : ''}</span>
          </div>

          {/* Sellers grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--muted)' }}>
              <div className="spinner" style={{ margin: '0 auto 1rem' }} />
              Loading stores...
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--muted)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🔍</div>
              <div style={{ fontWeight: 600, marginBottom: '0.3rem' }}>No stores found</div>
              <div style={{ fontSize: '0.875rem' }}>Try a different search or filter</div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
              {filtered.map(s => (
                <Link key={s.id} to={`/store/${s.storeSlug}`} style={{ textDecoration: 'none' }}>
                  <div className="card" style={{ transition: 'all 0.2s', height: '100%' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--green)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                      <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--green-soft)', border: '1px solid rgba(0,168,120,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--green)', fontSize: '1.1rem' }}>
                        {s.storeName?.[0]}
                      </div>
                      {s.plan === 'premium' && <span className="badge badge-green">⭐ Premium</span>}
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '0.3rem', color: 'var(--text)' }}>{s.storeName}</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.75rem', lineHeight: 1.5 }}>{s.storeDesc?.slice(0, 80)}{s.storeDesc?.length > 80 ? '...' : ''}</div>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      <span className="badge badge-green">✓ Verified</span>
                      <span className="badge badge-gray">{productTypeEmoji(s.productType)} {s.productType}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
