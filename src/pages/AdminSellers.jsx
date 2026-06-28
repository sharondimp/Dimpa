import { useState } from 'react'
import Navbar from '../components/Navbar'

const mockSellers = [
  { id: 1, name: 'Tolu Adeyemi', store: 'Tolu Styles', email: 'tolu@email.com', phone: '08012345678', status: 'pending', plan: 'free', productType: 'physical', nin: '12345678901', ninPhoto: true, date: '28 Jun 2026' },
  { id: 2, name: 'Chidi Madu', store: 'Chidi Tech', email: 'chidi@email.com', phone: '09087654321', status: 'approved', plan: 'premium', productType: 'digital', nin: '98765432109', ninPhoto: true, date: '27 Jun 2026' },
  { id: 3, name: 'Amara Suleiman', store: 'Amara Beauty', email: 'amara@email.com', phone: '08123456789', status: 'pending', plan: 'free', productType: 'both', nin: '11223344556', ninPhoto: true, date: '26 Jun 2026' },
  { id: 4, name: 'Ngozi Eze', store: 'Ngozi Fabrics', email: 'ngozi@email.com', phone: '07034567890', status: 'rejected', plan: 'free', productType: 'physical', nin: '99887766554', ninPhoto: true, date: '25 Jun 2026' },
  { id: 5, name: 'Emeka Obi', store: 'Emeka Digital', email: 'emeka@email.com', phone: '08056789012', status: 'approved', plan: 'free', productType: 'digital', nin: '44556677889', ninPhoto: true, date: '24 Jun 2026' },
]

export default function AdminSellers() {
  const [sellers, setSellers] = useState(mockSellers)
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [emailModal, setEmailModal] = useState(false)
  const [emailForm, setEmailForm] = useState({ subject: '', body: '', target: 'all' })

  const filtered = filter === 'all' ? sellers : sellers.filter(s => s.status === filter)

  const approve = (id) => setSellers(ss => ss.map(s => s.id === id ? { ...s, status: 'approved' } : s))
  const reject = (id) => setSellers(ss => ss.map(s => s.id === id ? { ...s, status: 'rejected' } : s))

  const sendEmail = () => {
    alert(`Email sent to ${emailForm.target} sellers!\nSubject: ${emailForm.subject}`)
    setEmailModal(false)
    setEmailForm({ subject: '', body: '', target: 'all' })
  }

  const pendingCount = sellers.filter(s => s.status === 'pending').length

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg2)' }}>
      <Navbar variant="admin" />
      <div style={{ paddingTop: '64px', padding: '5rem 5% 3rem' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.2rem' }}>Sellers</div>
            <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>{sellers.length} total · {pendingCount} pending verification</p>
          </div>
          <button onClick={() => setEmailModal(true)} className="btn-primary">📧 Email Sellers</button>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {['all', 'pending', 'approved', 'rejected'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: '0.4rem 0.9rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 600, border: '1.5px solid', borderColor: filter === f ? 'var(--green)' : 'var(--border)', background: filter === f ? 'var(--green-soft)' : 'transparent', color: filter === f ? 'var(--green)' : 'var(--muted)', cursor: 'pointer', textTransform: 'capitalize' }}>
              {f} {f === 'pending' && pendingCount > 0 && <span style={{ background: 'var(--warning)', color: '#fff', borderRadius: '50px', padding: '0 5px', fontSize: '0.68rem', marginLeft: '2px' }}>{pendingCount}</span>}
            </button>
          ))}
        </div>

        {/* Sellers list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {filtered.map(s => (
            <div key={s.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--green-soft)', border: '1px solid rgba(0,168,120,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--green)', fontSize: '1rem', flexShrink: 0 }}>
                    {s.name[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, marginBottom: '0.15rem' }}>{s.name}</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.3rem' }}>{s.email} · {s.phone}</div>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      <span className={`badge ${s.status === 'approved' ? 'badge-green' : s.status === 'pending' ? 'badge-yellow' : 'badge-red'}`}>{s.status}</span>
                      <span className={`badge ${s.plan === 'premium' ? 'badge-green' : 'badge-gray'}`}>{s.plan}</span>
                      <span className="badge badge-gray">{s.productType}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button onClick={() => setSelected(s)} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.9rem' }}>View Details</button>
                  {s.status === 'pending' && <>
                    <button onClick={() => approve(s.id)} className="btn-primary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.9rem' }}>✓ Approve</button>
                    <button onClick={() => reject(s.id)} className="btn-danger" style={{ fontSize: '0.8rem', padding: '0.4rem 0.9rem', borderRadius: '8px' }}>✕ Reject</button>
                  </>}
                  {s.status === 'approved' && <button onClick={() => reject(s.id)} className="btn-danger" style={{ fontSize: '0.8rem', padding: '0.4rem 0.9rem', borderRadius: '8px' }}>Suspend</button>}
                  {s.status === 'rejected' && <button onClick={() => approve(s.id)} className="btn-primary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.9rem' }}>Re-approve</button>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Seller detail modal */}
        {selected && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div className="card" style={{ width: '100%', maxWidth: '460px', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem' }}>Seller Details</div>
                <button onClick={() => setSelected(null)} style={{ fontSize: '1.2rem', color: 'var(--muted)' }}>✕</button>
              </div>

              {[
                ['Full Name', selected.name],
                ['Store Name', selected.store],
                ['Email', selected.email],
                ['Phone', selected.phone],
                ['Product Type', selected.productType],
                ['Plan', selected.plan],
                ['Status', selected.status],
                ['NIN', selected.nin],
                ['Applied', selected.date],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid var(--border)', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--muted)' }}>{k}</span>
                  <span style={{ fontWeight: 600, color: 'var(--text)', textAlign: 'right' }}>{v}</span>
                </div>
              ))}

              {/* NIN Photo */}
              <div style={{ marginTop: '1.2rem', background: 'var(--bg2)', borderRadius: '10px', padding: '1.2rem', textAlign: 'center', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>🪪</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '0.6rem' }}>NIN Card Photo submitted</div>
                <button style={{ fontSize: '0.8rem', color: 'var(--green)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>View Photo ↗</button>
              </div>

              {selected.status === 'pending' && (
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                  <button onClick={() => { approve(selected.id); setSelected(null) }} className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>✓ Approve</button>
                  <button onClick={() => { reject(selected.id); setSelected(null) }} className="btn-danger" style={{ flex: 1, justifyContent: 'center', borderRadius: '8px' }}>✕ Reject</button>
                </div>
              )}
              {selected.status !== 'pending' && (
                <button onClick={() => setSelected(null)} className="btn-secondary" style={{ width: '100%', justifyContent: 'center', marginTop: '1.2rem' }}>Close</button>
              )}
            </div>
          </div>
        )}

        {/* Email modal */}
        {emailModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div className="card" style={{ width: '100%', maxWidth: '500px', padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem' }}>📧 Email Sellers</div>
                <button onClick={() => setEmailModal(false)} style={{ fontSize: '1.2rem', color: 'var(--muted)' }}>✕</button>
              </div>
              <div className="form-group">
                <label className="form-label">Send To</label>
                <select value={emailForm.target} onChange={e => setEmailForm(f => ({ ...f, target: e.target.value }))}>
                  <option value="all">All Sellers</option>
                  <option value="free">Free Plan Sellers</option>
                  <option value="premium">Premium Sellers</option>
                  <option value="approved">Approved Sellers</option>
                  <option value="pending">Pending Sellers</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Subject</label>
                <input value={emailForm.subject} onChange={e => setEmailForm(f => ({ ...f, subject: e.target.value }))} placeholder="Email subject" />
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea value={emailForm.body} onChange={e => setEmailForm(f => ({ ...f, body: e.target.value }))} placeholder="Write your message to sellers..." rows={6} style={{ resize: 'vertical' }} />
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={() => setEmailModal(false)} className="btn-secondary" style={{ flex: 1 }}>Cancel</button>
                <button onClick={sendEmail} className="btn-primary" style={{ flex: 1 }}>Send Email</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
