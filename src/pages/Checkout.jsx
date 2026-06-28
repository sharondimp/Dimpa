import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const mockProduct = { id: 1, name: 'Ankara Midi Dress', price: 18500, type: 'physical', image: '👗', store: "Dimp's Beauty Empire", storeSlug: 'dimps-beauty' }

export default function Checkout() {
  const { storeSlug, productId } = useParams()
  const product = mockProduct
  const [form, setForm] = useState({ email: '', name: '', phone: '', address: '', city: '', note: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const deliveryFee = product.type === 'physical' ? 2000 : 0
  const total = product.price + deliveryFee

  const update = (f, v) => setForm(p => ({ ...p, [f]: v }))

  const handlePay = async () => {
    setError('')
    if (!form.email || !form.name) return setError('Name and email are required')
    if (product.type === 'physical' && (!form.phone || !form.address)) return setError('Phone and delivery address are required for physical products')
    setLoading(true)
    // Will integrate Paystack here
    await new Promise(r => setTimeout(r, 1500))
    setSuccess(true)
    setLoading(false)
  }

  if (success) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg2)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="card" style={{ maxWidth: '420px', width: '100%', textAlign: 'center', padding: '2.5rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>Order Placed!</div>
        {product.type === 'digital' ? (
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Your download link has been sent to <strong>{form.email}</strong>. Check your inbox!</p>
        ) : (
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Your order has been placed. The seller will contact you at <strong>{form.phone}</strong> to arrange delivery.</p>
        )}
        <Link to={`/store/${storeSlug}`} className="btn-primary" style={{ justifyContent: 'center', width: '100%' }}>Back to Store</Link>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg2)' }}>
      <div style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)', padding: '1rem 5%' }}>
        <Link to="/" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem' }}>
          Ven<span style={{ color: 'var(--green)' }}>da</span>
        </Link>
      </div>

      <div style={{ padding: '2.5rem 5%', display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
        {/* Form */}
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem' }}>Complete your order</div>

          {error && <div style={{ background: 'rgba(229,62,62,0.08)', border: '1px solid rgba(229,62,62,0.2)', borderRadius: '8px', padding: '0.7rem 1rem', marginBottom: '1rem', color: 'var(--danger)', fontSize: '0.85rem' }}>{error}</div>}

          <div className="card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
            <div style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '0.9rem' }}>Your Details</div>
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Your full name" />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@example.com" />
              <span className="form-hint">{product.type === 'digital' ? 'Your download link will be sent here' : 'Your order confirmation will be sent here'}</span>
            </div>
            {product.type === 'physical' && (
              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="08012345678" />
                <span className="form-hint">Seller will contact you via this number</span>
              </div>
            )}
          </div>

          {product.type === 'physical' && (
            <div className="card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
              <div style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '0.9rem' }}>Delivery Details</div>
              <div className="form-group">
                <label className="form-label">Delivery Address *</label>
                <input value={form.address} onChange={e => update('address', e.target.value)} placeholder="Street address" />
              </div>
              <div className="form-group">
                <label className="form-label">City / State</label>
                <input value={form.city} onChange={e => update('city', e.target.value)} placeholder="e.g. Lagos" />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Order Note (optional)</label>
                <textarea value={form.note} onChange={e => update('note', e.target.value)} placeholder="Any special instructions?" rows={2} style={{ resize: 'none' }} />
              </div>
            </div>
          )}
        </div>

        {/* Order summary */}
        <div>
          <div className="card" style={{ padding: '1.5rem', position: 'sticky', top: '1.5rem' }}>
            <div style={{ fontWeight: 700, marginBottom: '1.2rem', fontSize: '0.9rem' }}>Order Summary</div>
            <div style={{ display: 'flex', gap: '0.9rem', marginBottom: '1.2rem', paddingBottom: '1.2rem', borderBottom: '1px solid var(--border)' }}>
              <div style={{ width: '56px', height: '56px', background: 'var(--bg2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', flexShrink: 0 }}>{product.image}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.2rem' }}>{product.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>from {product.store}</div>
                <span style={{ fontSize: '0.68rem', fontWeight: 600, padding: '0.15rem 0.45rem', borderRadius: '4px', background: 'var(--green-soft)', color: 'var(--green)', border: '1px solid rgba(0,168,120,0.2)', marginTop: '0.3rem', display: 'inline-block' }}>{product.type}</span>
              </div>
            </div>
            {[
              ['Subtotal', `₦${product.price.toLocaleString()}`],
              ...(deliveryFee ? [['Delivery fee', `₦${deliveryFee.toLocaleString()}`]] : []),
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.6rem' }}>
                <span style={{ color: 'var(--muted)' }}>{k}</span>
                <span>{v}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border)', marginTop: '0.5rem', marginBottom: '1.2rem' }}>
              <span>Total</span>
              <span style={{ color: 'var(--green)' }}>₦{total.toLocaleString()}</span>
            </div>
            <button onClick={handlePay} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.8rem' }} disabled={loading}>
              {loading ? 'Processing...' : `Pay ₦${total.toLocaleString()} via Paystack`}
            </button>
            <p style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--muted)', marginTop: '0.7rem' }}>🔒 Secure payment via Paystack</p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          div[style*="gridTemplateColumns: '1fr 340px'"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
