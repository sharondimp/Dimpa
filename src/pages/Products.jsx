import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AppContext'
import Navbar from '../components/Navbar'

const mockProducts = [
  { id: 1, name: 'Ankara Midi Dress', price: 18500, type: 'physical', stock: 5, status: 'active', image: '👗' },
  { id: 2, name: 'Business Plan Template', price: 3000, type: 'digital', stock: null, status: 'active', image: '📘' },
  { id: 3, name: 'Lip Gloss Set', price: 8200, type: 'physical', stock: 12, status: 'active', image: '💄' },
]

export default function Products() {
  const { user } = useAuth()
  const isPremium = user?.plan === 'premium'
  const [products, setProducts] = useState(mockProducts)
  const [showModal, setShowModal] = useState(false)
  const [editProduct, setEditProduct] = useState(null)
  const [form, setForm] = useState({ name: '', price: '', type: 'physical', description: '', stock: '', file: null, image: null })
  const [error, setError] = useState('')

  const maxProducts = isPremium ? Infinity : 5
  const canAdd = products.length < maxProducts

  const openAdd = () => { setEditProduct(null); setForm({ name: '', price: '', type: 'physical', description: '', stock: '', file: null, image: null }); setShowModal(true) }
  const openEdit = (p) => { setEditProduct(p); setForm({ name: p.name, price: p.price, type: p.type, description: '', stock: p.stock || '', file: null, image: null }); setShowModal(true) }

  const handleSave = () => {
    setError('')
    if (!form.name || !form.price) return setError('Name and price are required')
    if (editProduct) {
      setProducts(ps => ps.map(p => p.id === editProduct.id ? { ...p, name: form.name, price: Number(form.price), type: form.type, stock: form.stock || null } : p))
    } else {
      setProducts(ps => [...ps, { id: Date.now(), name: form.name, price: Number(form.price), type: form.type, stock: form.stock || null, status: 'active', image: form.type === 'digital' ? '💻' : '📦' }])
    }
    setShowModal(false)
  }

  const deleteProduct = (id) => setProducts(ps => ps.filter(p => p.id !== id))
  const toggleStatus = (id) => setProducts(ps => ps.map(p => p.id === id ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' } : p))

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg2)' }}>
      <Navbar variant="dashboard" />
      <div style={{ paddingTop: '64px', padding: '5rem 5% 3rem' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.2rem' }}>Products</div>
            <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>{products.length}/{isPremium ? '∞' : '5'} products used</p>
          </div>
          {canAdd ? (
            <button onClick={openAdd} className="btn-primary">+ Add Product</button>
          ) : (
            <Link to="/dashboard/upgrade" className="btn-primary">⚡ Upgrade to add more</Link>
          )}
        </div>

        {!isPremium && (
          <div style={{ background: 'var(--green-soft)', border: '1px solid rgba(0,168,120,0.2)', borderRadius: '10px', padding: '0.9rem 1.2rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--light)' }}>You're on the free plan — {5 - products.length} product slot{5 - products.length !== 1 ? 's' : ''} remaining</span>
            <Link to="/dashboard/upgrade" style={{ fontSize: '0.82rem', color: 'var(--green)', fontWeight: 600 }}>Go Premium for unlimited →</Link>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
          {products.map(p => (
            <div key={p.id} className="card" style={{ opacity: p.status === 'inactive' ? 0.6 : 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.9rem' }}>
                <div style={{ fontSize: '2rem' }}>{p.image}</div>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <span className={`badge ${p.status === 'active' ? 'badge-green' : 'badge-gray'}`}>{p.status}</span>
                  <span className={`badge ${p.type === 'digital' ? 'badge-green' : 'badge-gray'}`}>{p.type}</span>
                </div>
              </div>
              <div style={{ fontWeight: 700, marginBottom: '0.3rem', fontFamily: 'var(--font-display)' }}>{p.name}</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--green)', marginBottom: '0.3rem' }}>₦{p.price.toLocaleString()}</div>
              {p.type === 'physical' && <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginBottom: '1rem' }}>Stock: {p.stock ?? 'N/A'}</div>}
              {p.type === 'digital' && <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginBottom: '1rem' }}>Digital download</div>}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => openEdit(p)} className="btn-secondary" style={{ flex: 1, padding: '0.45rem', fontSize: '0.8rem', justifyContent: 'center' }}>Edit</button>
                <button onClick={() => toggleStatus(p.id)} className="btn-secondary" style={{ flex: 1, padding: '0.45rem', fontSize: '0.8rem', justifyContent: 'center' }}>{p.status === 'active' ? 'Hide' : 'Show'}</button>
                <button onClick={() => deleteProduct(p.id)} style={{ padding: '0.45rem 0.7rem', borderRadius: '6px', background: 'rgba(229,62,62,0.08)', color: 'var(--danger)', fontSize: '0.8rem', border: '1px solid rgba(229,62,62,0.2)' }}>🗑</button>
              </div>
            </div>
          ))}
        </div>

        {/* Add/Edit Modal */}
        {showModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div className="card" style={{ width: '100%', maxWidth: '480px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem' }}>{editProduct ? 'Edit Product' : 'Add Product'}</div>
                <button onClick={() => setShowModal(false)} style={{ fontSize: '1.2rem', color: 'var(--muted)' }}>✕</button>
              </div>

              {error && <div style={{ background: 'rgba(229,62,62,0.08)', border: '1px solid rgba(229,62,62,0.2)', borderRadius: '8px', padding: '0.7rem 1rem', marginBottom: '1rem', color: 'var(--danger)', fontSize: '0.85rem' }}>{error}</div>}

              <div className="form-group">
                <label className="form-label">Product Type</label>
                <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                  <option value="physical">📦 Physical Product</option>
                  <option value="digital">💻 Digital Product</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Product Name</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Ankara Midi Dress" />
              </div>
              <div className="form-group">
                <label className="form-label">Price (₦)</label>
                <input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="e.g. 5000" />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Describe your product..." rows={3} style={{ resize: 'vertical' }} />
              </div>
              {form.type === 'physical' && (
                <div className="form-group">
                  <label className="form-label">Stock Quantity</label>
                  <input type="number" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} placeholder="How many do you have?" />
                </div>
              )}
              {form.type === 'digital' && (
                <div className="form-group">
                  <label className="form-label">Upload File</label>
                  <div style={{ border: '2px dashed var(--border)', borderRadius: '10px', padding: '1.2rem', textAlign: 'center', cursor: 'pointer', background: 'var(--bg2)' }} onClick={() => document.getElementById('product-file').click()}>
                    {form.file ? <div style={{ color: 'var(--green)', fontWeight: 600, fontSize: '0.875rem' }}>✓ {form.file.name}</div> : <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>📎 Tap to upload your digital file</div>}
                  </div>
                  <input id="product-file" type="file" style={{ display: 'none' }} onChange={e => setForm(f => ({ ...f, file: e.target.files[0] }))} />
                </div>
              )}
              <div className="form-group">
                <label className="form-label">Product Image</label>
                <div style={{ border: '2px dashed var(--border)', borderRadius: '10px', padding: '1.2rem', textAlign: 'center', cursor: 'pointer', background: 'var(--bg2)' }} onClick={() => document.getElementById('product-img').click()}>
                  {form.image ? <div style={{ color: 'var(--green)', fontWeight: 600, fontSize: '0.875rem' }}>✓ {form.image.name}</div> : <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>🖼 Tap to upload a product image</div>}
                </div>
                <input id="product-img" type="file" accept="image/*" style={{ display: 'none' }} onChange={e => setForm(f => ({ ...f, image: e.target.files[0] }))} />
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button onClick={() => setShowModal(false)} className="btn-secondary" style={{ flex: 1 }}>Cancel</button>
                <button onClick={handleSave} className="btn-primary" style={{ flex: 1 }}>Save Product</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
