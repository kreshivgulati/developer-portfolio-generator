// src/pages/Home.jsx

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// ── LOGIN MODAL ──
function LoginModal({ onClose, onSuccess }) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) { setError('Please fill in all fields.'); return }
    if (!isLogin && !name)   { setError('Please enter your name.');    return }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onSuccess({ name: name || email.split('@')[0], email })
    }, 1200)
  }

  return (
    <div style={modal.overlay} onClick={onClose}>
      <div style={modal.box} onClick={(e) => e.stopPropagation()}>

        <button style={modal.closeBtn} onClick={onClose}>✕</button>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={modal.modalLogo}>
            Dev<span style={{ color: 'var(--accent)' }}>Folio</span>
          </div>
          <p style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>
            {isLogin ? 'Welcome back 👋' : 'Create your account'}
          </p>
        </div>

        <div style={modal.toggle}>
          <button
            style={{ ...modal.toggleBtn, ...(isLogin ? modal.toggleActive : {}) }}
            onClick={() => { setIsLogin(true); setError('') }}
          >Login</button>
          <button
            style={{ ...modal.toggleBtn, ...(!isLogin ? modal.toggleActive : {}) }}
            onClick={() => { setIsLogin(false); setError('') }}
          >Sign Up</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {!isLogin && (
            <div style={modal.field}>
              <label style={modal.label}>Full Name</label>
              <input type="text" placeholder="Alex Johnson" value={name}
                onChange={(e) => setName(e.target.value)} style={modal.input} />
            </div>
          )}
          <div style={modal.field}>
            <label style={modal.label}>Email</label>
            <input type="email" placeholder="you@email.com" value={email}
              onChange={(e) => setEmail(e.target.value)} style={modal.input} />
          </div>
          <div style={modal.field}>
            <label style={modal.label}>Password</label>
            <input type="password" placeholder="••••••••" value={password}
              onChange={(e) => setPassword(e.target.value)} style={modal.input} />
          </div>

          {error && (
            <div style={{
              background: 'rgba(247,106,106,0.1)',
              border: '1px solid rgba(247,106,106,0.3)',
              color: '#f76a6a', padding: '0.6rem 0.9rem',
              borderRadius: '6px', fontSize: '0.82rem'
            }}>{error}</div>
          )}

          <button type="submit" style={{ ...modal.submitBtn, opacity: loading ? 0.7 : 1 }} disabled={loading}>
            {loading ? 'Please wait...' : isLogin ? 'Login →' : 'Create Account →'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.2rem', fontSize: '0.82rem', color: 'var(--muted)' }}>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <span style={{ color: 'var(--accent)', cursor: 'pointer' }}
            onClick={() => { setIsLogin(!isLogin); setError('') }}>
            {isLogin ? 'Sign up' : 'Login'}
          </span>
        </p>

      </div>
    </div>
  )
}

// ── MAIN HOME PAGE ──
export default function Home() {
  const [showLogin, setShowLogin] = useState(false)
  const navigate = useNavigate()

  const handleLoginSuccess = (userData) => {
    setShowLogin(false)
    setTimeout(() => navigate('/generator'), 300)
  }

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', overflowX: 'hidden' }}>

      {/* ══════════════════════════════
          HERO SECTION
      ══════════════════════════════ */}
      <section style={styles.hero}>

        {/* Grid background */}
        <div style={styles.gridBg} />
        {/* Glow blobs */}
        <div style={styles.blob1} />
        <div style={styles.blob2} />

        {/* LEFT: Text content */}
        <div style={styles.heroLeft}>

          <div style={styles.badge}>
            <span style={styles.badgeDot} />
            Free to use · No credit card required
          </div>

          <h1 style={styles.headline}>
            Build Your Developer<br />
            <span style={{ color: 'var(--accent)' }}>Portfolio in Minutes</span>
          </h1>

          <p style={styles.subheadline}>
            Fill in your details, choose a template, and get a
            stunning portfolio website — ready to share or host anywhere.
          </p>

          <div style={styles.ctaRow}>
            <button style={styles.ctaPrimary} onClick={() => setShowLogin(true)}>
              Get Started — It's Free →
            </button>
            <button style={styles.ctaSecondary} onClick={() => navigate('/generator')}>
              Try without account
            </button>
          </div>

          <div style={styles.socialProof}>
            <div style={{ display: 'flex' }}>
              {['#7c6af7','#f7a26a','#6af7c8','#f76a6a'].map((c, i) => (
                <div key={i} style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: c, border: '2px solid var(--bg)',
                  marginLeft: i > 0 ? '-8px' : 0,
                }} />
              ))}
            </div>
            <span style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>
              Joined by <strong style={{ color: 'var(--text)' }}>2,400+</strong> developers
            </span>
          </div>
        </div>

        {/* RIGHT: Browser mockup */}
        <div style={styles.heroRight}>
          <div style={styles.mockup}>
            <div style={styles.mockupBar}>
              {['#f76a6a','#f7e26a','#6af7c8'].map((c, i) => (
                <span key={i} style={{ width: '11px', height: '11px', borderRadius: '50%', background: c, flexShrink: 0 }} />
              ))}
              <div style={styles.mockupUrl}>devfolio.app/alex-johnson</div>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '10px',
                  background: 'var(--accent)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontWeight: 700, color: '#fff', fontSize: '0.85rem', flexShrink: 0,
                }}>AJ</div>
                <div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.95rem' }}>Alex Johnson</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent)', marginTop: '2px' }}>Full Stack Developer</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                {['React','Node.js','Python','AWS'].map(t => (
                  <span key={t} style={{
                    background: 'rgba(124,106,247,0.15)', color: 'var(--accent)',
                    border: '1px solid rgba(124,106,247,0.25)',
                    padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 500,
                  }}>{t}</span>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {['Portfolio App','Chat Bot','E-Commerce'].map(p => (
                  <div key={p} style={{
                    background: 'var(--surface2)', border: '1px solid var(--border)',
                    borderRadius: '6px', padding: '0.6rem 0.8rem',
                    fontSize: '0.78rem', color: 'var(--muted)',
                  }}>{p}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ══════════════════════════════
          HOW IT WORKS
      ══════════════════════════════ */}
      <section style={styles.section}>
        <div style={styles.sectionLabel}>HOW IT WORKS</div>
        <h2 style={styles.sectionTitle}>Three steps to your portfolio</h2>
        <div style={styles.grid3}>
          {[
            { num: '01', title: 'Fill your details', desc: 'Enter your name, bio, skills, projects and social links in our simple step-by-step form.' },
            { num: '02', title: 'Choose a template', desc: 'Pick from 4 beautiful dark themes and customize your accent color to match your style.' },
            { num: '03', title: 'Download & deploy', desc: 'Get a ready-to-host HTML file or copy the code. Host free on GitHub Pages or Netlify.' },
          ].map(s => (
            <div key={s.num} style={styles.card}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '2rem', fontWeight: 700, color: 'var(--accent)', opacity: 0.35, marginBottom: '1rem' }}>{s.num}</div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.6rem' }}>{s.title}</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.65 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════
          TEMPLATES
      ══════════════════════════════ */}
      <section style={{ ...styles.section, background: 'var(--surface)' }}>
        <div style={styles.sectionLabel}>TEMPLATES</div>
        <h2 style={styles.sectionTitle}>Pick your aesthetic</h2>
        <div style={styles.grid4}>
          {[
            { name: 'Minimal Dark',     emoji: '🌑', bg: 'linear-gradient(135deg,#0f0f1a,#1a1a2e)' },
            { name: 'Vibrant Purple',   emoji: '🔮', bg: 'linear-gradient(135deg,#1a0533,#330a1a)' },
            { name: 'Ocean Blue',       emoji: '🌊', bg: 'linear-gradient(135deg,#001a33,#003366)' },
            { name: 'Hacker Terminal',  emoji: '💻', bg: 'linear-gradient(135deg,#001a00,#003300)' },
          ].map(t => (
            <div key={t.name} style={styles.tplCard} onClick={() => navigate('/generator')}>
              <div style={{ height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: t.bg, fontSize: '2rem' }}>
                {t.emoji}
              </div>
              <div style={{ padding: '0.8rem', background: 'var(--surface2)', textAlign: 'center', fontSize: '0.85rem', fontWeight: 600 }}>
                {t.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════
          FINAL CTA
      ══════════════════════════════ */}
      <section style={{ ...styles.section, textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.8rem' }}>
          Ready to build your portfolio?
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', marginBottom: '2rem' }}>
          Free forever. No account required to try.
        </p>
        <div style={{ ...styles.ctaRow, justifyContent: 'center' }}>
          <button style={styles.ctaPrimary} onClick={() => setShowLogin(true)}>Create Account →</button>
          <button style={styles.ctaSecondary} onClick={() => navigate('/generator')}>Try the Generator</button>
        </div>
      </section>

      {/* ── LOGIN MODAL ── */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSuccess={handleLoginSuccess}
        />
      )}

    </div>
  )
}

// ── STYLES ──
const styles = {
  hero: {
    minHeight: 'calc(100vh - 64px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4rem',
    padding: '4rem 5rem',
    position: 'relative',
    overflow: 'hidden',
    flexWrap: 'wrap',
  },
  gridBg: {
    position: 'absolute', inset: 0,
    backgroundImage: `
      linear-gradient(rgba(124,106,247,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(124,106,247,0.05) 1px, transparent 1px)
    `,
    backgroundSize: '48px 48px',
    zIndex: 0,
  },
  blob1: {
    position: 'absolute', top: '-120px', left: '-80px',
    width: '520px', height: '520px',
    background: 'radial-gradient(circle, rgba(124,106,247,0.13) 0%, transparent 70%)',
    borderRadius: '50%', zIndex: 0,
  },
  blob2: {
    position: 'absolute', bottom: '-80px', right: '10%',
    width: '420px', height: '420px',
    background: 'radial-gradient(circle, rgba(106,247,200,0.08) 0%, transparent 70%)',
    borderRadius: '50%', zIndex: 0,
  },
  heroLeft: {
    flex: '1 1 340px',
    maxWidth: '560px',
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '1.4rem',
  },
  heroRight: {
    flex: '1 1 340px',
    maxWidth: '480px',
    position: 'relative',
    zIndex: 1,
  },
  badge: {
    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
    background: 'rgba(124,106,247,0.1)', border: '1px solid rgba(124,106,247,0.25)',
    color: 'var(--accent)', padding: '0.35rem 0.9rem', borderRadius: '20px',
    fontSize: '0.75rem', fontFamily: "'DM Mono', monospace",
    letterSpacing: '0.3px', width: 'fit-content',
  },
  badgeDot: {
    width: '6px', height: '6px', borderRadius: '50%',
    background: 'var(--accent3)', flexShrink: 0,
    animation: 'pulse 2s infinite',
  },
  headline: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
    fontWeight: 800, lineHeight: 1.1,
  },
  subheadline: {
    color: 'var(--muted)', fontSize: '1.05rem',
    lineHeight: 1.7, maxWidth: '460px',
  },
  ctaRow: {
    display: 'flex', gap: '0.8rem', flexWrap: 'wrap',
  },
  ctaPrimary: {
    background: 'var(--accent)', color: '#fff',
    padding: '0.8rem 1.8rem', borderRadius: '10px', border: 'none',
    fontSize: '0.95rem', fontWeight: 700,
    fontFamily: "'Cabinet Grotesk', sans-serif",
    cursor: 'pointer', whiteSpace: 'nowrap',
  },
  ctaSecondary: {
    background: 'transparent', color: 'var(--muted)',
    padding: '0.8rem 1.8rem', borderRadius: '10px',
    border: '1px solid var(--border)',
    fontSize: '0.95rem', fontWeight: 600,
    fontFamily: "'Cabinet Grotesk', sans-serif",
    cursor: 'pointer', whiteSpace: 'nowrap',
  },
  socialProof: {
    display: 'flex', alignItems: 'center', gap: '0.8rem',
  },
  mockup: {
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: '14px', overflow: 'hidden',
    boxShadow: '0 32px 64px rgba(0,0,0,0.45), 0 0 0 1px rgba(124,106,247,0.1)',
  },
  mockupBar: {
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    padding: '0.75rem 1rem',
    background: 'var(--surface2)', borderBottom: '1px solid var(--border)',
  },
  mockupUrl: {
    flex: 1, background: 'var(--bg)', borderRadius: '4px',
    padding: '0.25rem 0.6rem', fontSize: '0.7rem',
    color: 'var(--muted)', fontFamily: "'DM Mono', monospace",
    marginLeft: '0.3rem',
  },
  section: {
    padding: '6rem 5rem',
    borderTop: '1px solid var(--border)',
  },
  sectionLabel: {
    fontFamily: "'DM Mono', monospace", fontSize: '0.7rem',
    letterSpacing: '3px', color: 'var(--accent)', marginBottom: '0.7rem',
  },
  sectionTitle: {
    fontFamily: "'Syne', sans-serif", fontSize: '2rem',
    fontWeight: 700, marginBottom: '2.5rem',
  },
  grid3: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '1.5rem',
  },
  grid4: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.2rem',
  },
  card: {
    background: 'var(--surface2)', border: '1px solid var(--border)',
    borderRadius: '12px', padding: '2rem',
  },
  tplCard: {
    border: '1px solid var(--border)', borderRadius: '12px',
    overflow: 'hidden', cursor: 'pointer',
    transition: 'transform 0.2s, border-color 0.2s',
  },
}

// ── MODAL STYLES ──
const modal = {
  overlay: {
    position: 'fixed', inset: 0,
    background: 'rgba(0,0,0,0.75)',
    backdropFilter: 'blur(8px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000, padding: '1rem',
  },
  box: {
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: '16px', padding: '2.5rem',
    width: '100%', maxWidth: '420px',
    position: 'relative',
    boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
  },
  closeBtn: {
    position: 'absolute', top: '1rem', right: '1rem',
    background: 'none', border: 'none', color: 'var(--muted)',
    fontSize: '1rem', cursor: 'pointer', padding: '0.3rem',
    borderRadius: '4px', lineHeight: 1,
  },
  modalLogo: {
    fontFamily: "'Syne', sans-serif", fontWeight: 800,
    fontSize: '1.6rem', color: 'var(--text)', marginBottom: '0.4rem',
  },
  toggle: {
    display: 'flex', background: 'var(--surface2)',
    borderRadius: '8px', padding: '0.25rem',
    marginBottom: '1.5rem', gap: '0.25rem',
  },
  toggleBtn: {
    flex: 1, padding: '0.5rem', border: 'none',
    borderRadius: '6px', background: 'transparent',
    color: 'var(--muted)', cursor: 'pointer',
    fontSize: '0.88rem', fontWeight: 600,
    fontFamily: "'Cabinet Grotesk', sans-serif",
    transition: 'all 0.2s',
  },
  toggleActive: {
    background: 'var(--accent)', color: '#fff',
  },
  field: {
    display: 'flex', flexDirection: 'column', gap: '0.4rem',
  },
  label: {
    fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted)',
    letterSpacing: '0.5px', textTransform: 'uppercase',
    fontFamily: "'DM Mono', monospace",
  },
  input: {
    background: 'var(--surface2)', border: '1px solid var(--border)',
    color: 'var(--text)', padding: '0.7rem 0.9rem',
    borderRadius: '8px', fontSize: '0.9rem',
    fontFamily: "'Cabinet Grotesk', sans-serif",
    outline: 'none', width: '100%',
  },
  submitBtn: {
    background: 'var(--accent)', color: '#fff',
    padding: '0.8rem', border: 'none', borderRadius: '8px',
    fontSize: '0.95rem', fontWeight: 700,
    cursor: 'pointer', fontFamily: "'Cabinet Grotesk', sans-serif",
    marginTop: '0.5rem', width: '100%',
  },
}