import { Link } from 'react-router-dom'
import { useTheme } from '../context/AppContext'
import Navbar from '../components/Navbar'

export default function Landing() {
  const { theme } = useTheme()

  return (
    <div style={{ minHeight: '100vh', background: '#080B1E', color: '#fff', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Navbar variant="public" />

      {/* Hero */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '7rem 6% 4rem', position: 'relative', overflow: 'hidden' }}>
        {/* Background blobs */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,47,212,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '5%', left: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,200,150,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', maxWidth: '700px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0,200,150,0.1)', border: '1px solid rgba(0,200,150,0.25)', color: '#00C896', borderRadius: '50px', padding: '0.35rem 1rem', fontSize: '0.75rem', fontWeight: 700, marginBottom: '2rem', letterSpacing: '0.08em' }}>
            🇳🇬 &nbsp;MADE FOR NIGERIA
          </div>

          <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(2.6rem, 8vw, 5rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
            Buy. Sell.<br />
            <span style={{ background: 'linear-gradient(120deg, #1A2FD4 0%, #00C896 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Grow.</span>
          </h1>

          <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', color: 'rgba(255,255,255,0.6)', maxWidth: '480px', lineHeight: 1.75, marginBottom: '2.5rem' }}>
            Nigeria's trusted marketplace for physical and digital products. Every seller is verified. Get paid in naira. No stress.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/register" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.9rem 2rem', background: 'linear-gradient(135deg, #1A2FD4, #0F1A8C)', color: '#fff', borderRadius: '12px', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', boxShadow: '0 8px 32px rgba(26,47,212,0.4)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Start Selling Free →
            </Link>
            <Link to="/marketplace" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.9rem 2rem', background: 'rgba(255,255,255,0.06)', color: '#fff', borderRadius: '12px', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Start Shopping
            </Link>
          </div>

          <div style={{ marginTop: '2.5rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {[['100%', 'Verified sellers'], ['₦0', 'To get started'], ['5min', 'Store setup']].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '1.4rem', fontWeight: 800, color: '#00C896' }}>{v}</div>
                <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', marginTop: '0.1rem' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating store card mockup */}
        <div style={{ position: 'absolute', right: '5%', top: '50%', transform: 'translateY(-50%)', width: '280px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '1.5rem', backdropFilter: 'blur(20px)', display: 'none' }} className="hero-card">
          <div style={{ height: '120px', background: 'linear-gradient(135deg, #1A2FD4, #00C896)', borderRadius: '12px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>🛍️</div>
          <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, marginBottom: '0.3rem' }}>Amara's Boutique</div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '1rem' }}>Fashion · Verified ✓</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#00C896', fontWeight: 700 }}>₦12,500</span>
            <span style={{ background: '#1A2FD4', color: '#fff', padding: '0.3rem 0.8rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600 }}>Buy Now</span>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div style={{ background: 'rgba(255,255,255,0.03)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '1.2rem 6%', display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
        {['🔒 Secure payments via Paystack', '✓ NIN-verified sellers only', '📦 Physical & digital products', '💳 Pay in naira'].map(t => (
          <span key={t} style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', whiteSpace: 'nowrap' }}>{t}</span>
        ))}
      </div>

      {/* How it works */}
      <section id="how" style={{ padding: '6rem 6%' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#00C896', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>How it works</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15 }}>
              From sign up to first sale<br />in minutes.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', overflow: 'hidden' }}>
            {[
              { n: '01', t: 'Register your store', d: 'Sign up, verify with your NIN and set up your store in minutes.' },
              { n: '02', t: 'List your products', d: 'Add products with photos, prices, and descriptions.' },
              { n: '03', t: 'Share your link', d: 'Send your unique store link on WhatsApp, Instagram or anywhere.' },
              { n: '04', t: 'Get paid', d: 'Buyers pay via Paystack. Money released after successful delivery.' },
            ].map((s, i) => (
              <div key={s.n} style={{ padding: '2rem 1.5rem', background: '#080B1E', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '1.8rem', fontWeight: 800, color: 'rgba(26,47,212,0.3)', marginBottom: '1rem' }}>{s.n}</div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.5rem', color: '#fff' }}>{s.t}</div>
                <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.65 }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: '2rem 6% 6rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#00C896', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Features</div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15 }}>
              Everything you need.<br />Nothing you don't.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            {[
              { icon: '🛡️', t: 'Verified Sellers Only', d: 'Every seller is identity-verified via NIN. No scammers, no fakes, no headache.' },
              { icon: '🔒', t: 'Secure Payments', d: 'Payments are held safely and only released after successful delivery.' },
              { icon: '📦', t: 'Physical & Digital', d: 'Sell clothes, food, handmade items, ebooks, templates, courses and more.' },
              { icon: '🚀', t: 'Your Own Storefront', d: 'Get a beautiful store page you can share directly with your customers.' },
              { icon: '📊', t: 'Sales Analytics', d: 'Track your revenue, orders and store views in real time. Pro sellers only.' },
              { icon: '🎯', t: 'Featured Products', d: 'Boost your visibility by featuring your product at the top of the marketplace.' },
            ].map(f => (
              <div key={f.t} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '1.5rem', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(26,47,212,0.4)'; e.currentTarget.style.background = 'rgba(26,47,212,0.06)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>{f.icon}</div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, marginBottom: '0.4rem', color: '#fff' }}>{f.t}</div>
                <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.65 }}>{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '5rem 6%', margin: '0 6% 5rem', background: 'linear-gradient(135deg, rgba(26,47,212,0.2) 0%, rgba(0,200,150,0.1) 100%)', borderRadius: '24px', border: '1px solid rgba(26,47,212,0.25)', textAlign: 'center' }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#00C896', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>Get started today</div>
        <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1rem', lineHeight: 1.15 }}>
          Ready to start selling?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.55)', marginBottom: '2rem', fontSize: '1rem', maxWidth: '400px', margin: '0 auto 2rem' }}>
          Join verified sellers already growing their business on Dimpa.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/register" style={{ display: 'inline-flex', alignItems: 'center', padding: '0.9rem 2rem', background: 'linear-gradient(135deg, #1A2FD4, #0F1A8C)', color: '#fff', borderRadius: '12px', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', boxShadow: '0 8px 32px rgba(26,47,212,0.4)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Create your free store →
          </Link>
          <Link to="/marketplace" style={{ display: 'inline-flex', alignItems: 'center', padding: '0.9rem 2rem', background: 'rgba(255,255,255,0.08)', color: '#fff', borderRadius: '12px', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Browse stores
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '2.5rem 6%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem' }}>
          <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: '1.3rem' }}>
            <span style={{ color: '#1A2FD4' }}>D</span>impa
          </span>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[['#how','How it works'],['#features','Features']].map(([h,l]) => (
              <a key={l} href={h} style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>{l}</a>
            ))}
            <Link to="/login" style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Log in</Link>
            <Link to="/register" style={{ fontSize: '0.82rem', color: '#00C896', fontWeight: 600, textDecoration: 'none' }}>Sign up</Link>
            <Link to="/dispute" style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Report an issue</Link>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.3)' }}>© 2026 Dimpa · Buy. Sell. Grow.</div>
          <div style={{ display: 'flex', gap: '1.2rem' }}>
            <a href="https://instagram.com/dimpaapp" target="_blank" rel="noreferrer" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>📸 Instagram</a>
            <a href="https://tiktok.com/@dimpaapp" target="_blank" rel="noreferrer" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>🎵 TikTok</a>
            <a href="mailto:hello@dimpa.ng" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>✉️ hello@dimpa.ng</a>
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        @media (min-width: 900px) { .hero-card { display: block !important; } }
        @media (max-width: 640px) {
          section { padding-left: 5% !important; padding-right: 5% !important; }
          div[style*="right: 5%"][style*="position: absolute"] { display: none !important; }
        }
      `}</style>
    </div>
  )
}
