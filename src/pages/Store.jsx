import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { db } from '../firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { useTheme } from '../context/AppContext'
import Navbar from '../components/Navbar'

export default function Store() {
  const { storeSlug } = useParams()
  const { theme, toggleTheme } = useTheme()
  const [store, setStore] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchStore = async () => {
      try {
        // Get seller by storeSlug
        const sellerQ = query(collection(db, 'sellers'), where('storeSlug', '==', storeSlug))
        const sellerSnap = await getDocs(sellerQ)
        if (sellerSnap.empty) { setLoading(false); return }
        const sellerData = { id: sellerSnap.docs[0].id, ...sellerSnap.docs[0].data() }
        setStore(sellerData)

        // Get products
        const productsQ = query(collection(db, 'products'), where('sellerId', '==', sellerData.id), where('status', '==', 'active'))
        const productsSnap = await getDocs(productsQ)
        setProducts(productsSnap.docs.map(d => ({ id: d.id, ...d.data() })))
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchStore()
  }, [storeSlug])

  const filtered = products.filter(p => {
    const matchFilter = filter === 'all' || p.type === filter
    const matchSearch = search === '' || p.name?.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  if (loading) return (
    <div className="page-loader">
      <div className="spinner" />
    </div>
  )

  if (!store) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ fontSize: '3rem' }}>🔍</div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem' }}>Store not found</div>
      <Link to="/marketplace" className="btn-primary">Browse Stores</Link>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Store nav */}
      <div style={{ background: theme === 'dark' ? 'rgba(14,14,14,0.92)' : 'rgba(255,255,255,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border)', padding: '0 5%', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link to="/marketplace" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--text)', textDecoration: 'none' }}>
          Ven<span style={{ color: 'var(--green)' }}>da</span>
        </Link>
        <button onClick={toggleTheme} style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: '50px', padding: '0.3rem 0.8rem', fontSize: '0.8rem', color: 'var(--text)', cursor: 'pointer' }}>
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>

      {/* Store banner */}
      <div style={{ background: 'linear-gradient(135deg, var(--green) 0%, var(--green-dim) 100%)', padding: '2.5rem 5%', textAlign: 'center' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, color: '#fff', fontSize: '1.8rem', margin: '0 auto 0.9rem' }}>
          {store.storeName?.[0]}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>{store.storeName}</h1>
          <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: '0.68rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '50px' }}>✓ VERIFIED</span>
          {store.plan === 'premium' && <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: '0.68rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '50px' }}>⭐ PREMIUM</span>}
        </div>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', maxWidth: '480px', margin: '0 auto' }}>{store.storeDesc}</p>
      </div>

      <div style={{ padding: '2rem 5%' }}>
        {/* Search + filter */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." style={{ flex: 1, minWidth: '180px' }} />
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {['all', 'physical', 'digital'].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{ padding: '0.4rem 0.8rem', borderRadius: '50px', fontSize: '0.78rem', fontWeight: 600, border: '1.5px solid', borderColor: filter === f ? 'var(--green)' : 'var(--border)', background: filter === f ? 'var(--green-soft)' : 'transparent', color: filter === f ? 'var(--green)' : 'var(--muted)', cursor: 'pointer', textTransform: 'capitalize' }}>
                {f === 'all' ? 'All' : f === 'physical' ? '📦' : '💻'}
              </button>
            ))}
          </div>
        </div>

        {/* Products */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📭</div>
            <div>No products found</div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.2rem' }}>
            {filtered.map(p => (
              <div key={p.id} className="card" style={{ transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--green)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none' }}>
                {p.imageUrl ? (
                  <img src={p.imageUrl} alt={p.name} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.9rem' }} />
                ) : (
                  <div style={{ height: '140px', background: 'var(--bg2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', marginBottom: '0.9rem' }}>
                    {p.type === 'digital' ? '💻' : '📦'}
                  </div>
                )}
                <span style={{ fontSize: '0.68rem', fontWeight: 600, padding: '0.18rem 0.5rem', borderRadius: '4px', background: 'var(--green-soft)', color: 'var(--green)', border: '1px solid rgba(0,168,120,0.2)', marginBottom: '0.5rem', display: 'inline-block' }}>
                  {p.type === 'digital' ? '💻 Digital' : '📦 Physical'}
                </span>
                <div style={{ fontWeight: 700, marginBottom: '0.3rem', fontFamily: 'var(--font-display)', fontSize: '0.9rem' }}>{p.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginBottom: '0.8rem', lineHeight: 1.5 }}>{p.description?.slice(0, 60)}{p.description?.length > 60 ? '...' : ''}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--green)', fontSize: '1rem' }}>₦{p.price?.toLocaleString()}</div>
                  <Link to={`/checkout/${storeSlug}/${p.id}`} className="btn-primary" style={{ padding: '0.4rem 0.9rem', fontSize: '0.8rem' }}>Buy Now</Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '3rem', padding: '1.5rem', borderTop: '1px solid var(--border)' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
            Powered by <Link to="/" style={{ color: 'var(--green)', fontWeight: 600 }}>Venda</Link> · Real sellers. Real products.
          </p>
        </div>
      </div>
    </div>
  )
}
