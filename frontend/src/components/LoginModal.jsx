// src/components/LoginModal.jsx

import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginModal({ onClose }) {
  const [isLogin,  setIsLogin]  = useState(true)
  const [name,     setName]     = useState('')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const [gLoading, setGLoading] = useState(false)

  const { loginWithGoogle, loginWithEmail, signUpWithEmail } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from     = location.state?.from || '/generator'

  // ── Google Login ──
  const handleGoogle = async () => {
    setGLoading(true)
    setError('')
    const result = await loginWithGoogle()
    setGLoading(false)
    if (result.success) {
      onClose()
      navigate('/generator')
    } else {
      setError(result.error)
    }
  }

  // ── Email Login / Signup ──
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password)  { setError('Please fill in all fields.'); return }
    if (!isLogin && !name)    { setError('Please enter your name.');    return }

    setLoading(true)

    const result = isLogin
      ? await loginWithEmail(email, password)
      : await signUpWithEmail(name, email, password)

    setLoading(false)

    if (result.success) {
      onClose()
      navigate(from)
    } else {
      setError(result.error)
    }
  }

  return (
    <div style={s.overlay} onClick={onClose}>
      <div style={s.box} onClick={e => e.stopPropagation()}>

        {/* Close */}
        <button style={s.closeBtn} onClick={onClose}>✕</button>

        {/* Logo */}
        <div style={{ textAlign:'center', marginBottom:'1.5rem' }}>
          <div style={s.logo}>Dev<span style={{ color:'var(--accent)' }}>Folio</span></div>
          <p style={{ color:'var(--muted)', fontSize:'0.85rem', marginTop:'0.3rem' }}>
            {isLogin ? 'Welcome back 👋' : 'Create your free account'}
          </p>
        </div>

        {/* ── GOOGLE BUTTON ── */}
        <button
          style={{ ...s.googleBtn, opacity: gLoading ? 0.7 : 1 }}
          onClick={handleGoogle}
          disabled={gLoading}
        >
          {gLoading ? (
            <span style={s.spinner} />
          ) : (
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
              <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
              <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571.001-.001.002-.001.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
            </svg>
          )}
          {gLoading ? 'Signing in...' : 'Continue with Google'}
        </button>

        {/* Divider */}
        <div style={s.divider}>
          <div style={s.dividerLine} />
          <span style={s.dividerText}>or</span>
          <div style={s.dividerLine} />
        </div>

        {/* Login / Signup toggle */}
        <div style={s.toggle}>
          <button style={{ ...s.toggleBtn, ...(isLogin  ? s.toggleActive : {}) }} onClick={() => { setIsLogin(true);  setError('') }}>Login</button>
          <button style={{ ...s.toggleBtn, ...(!isLogin ? s.toggleActive : {}) }} onClick={() => { setIsLogin(false); setError('') }}>Sign Up</button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'0.9rem' }}>

          {!isLogin && (
            <div style={s.field}>
              <label style={s.label}>Full Name</label>
              <input style={s.input} type="text" placeholder="Alex Johnson"
                value={name} onChange={e => setName(e.target.value)} />
            </div>
          )}

          <div style={s.field}>
            <label style={s.label}>Email</label>
            <input style={s.input} type="email" placeholder="you@email.com"
              value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <div style={s.field}>
            <label style={s.label}>Password</label>
            <input style={s.input} type="password" placeholder="••••••••"
              value={password} onChange={e => setPassword(e.target.value)} />
          </div>

          {error && <div style={s.errorBox}>{error}</div>}

          <button
            type="submit"
            style={{ ...s.submitBtn, opacity: loading ? 0.7 : 1 }}
            disabled={loading}
          >
            {loading ? '⏳ Please wait...' : isLogin ? 'Login →' : 'Create Account →'}
          </button>

        </form>

        <p style={{ textAlign:'center', marginTop:'1rem', fontSize:'0.82rem', color:'var(--muted)' }}>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <span style={{ color:'var(--accent)', cursor:'pointer', fontWeight:600 }}
            onClick={() => { setIsLogin(!isLogin); setError('') }}>
            {isLogin ? 'Sign up free' : 'Login'}
          </span>
        </p>

      </div>
    </div>
  )
}

const s = {
  overlay:      { position:'fixed', inset:0, background:'rgba(0,0,0,0.75)', backdropFilter:'blur(8px)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000, padding:'1rem' },
  box:          { background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'16px', padding:'2rem', width:'100%', maxWidth:'420px', position:'relative', boxShadow:'0 40px 80px rgba(0,0,0,0.5)' },
  closeBtn:     { position:'absolute', top:'1rem', right:'1rem', background:'none', border:'none', color:'var(--muted)', fontSize:'1rem', cursor:'pointer', borderRadius:'4px', padding:'0.3rem' },
  logo:         { fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:'1.5rem', color:'var(--text)' },

  // Google button
  googleBtn: {
    width: '100%', padding: '0.75rem',
    background: 'var(--surface2)',
    border: '1px solid var(--border)',
    borderRadius: '10px', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.7rem',
    color: 'var(--text)', fontSize: '0.92rem', fontWeight: 600,
    fontFamily: "'Cabinet Grotesk',sans-serif",
    transition: 'all 0.2s', marginBottom: '0.5rem',
  },
  spinner: {
    width: '16px', height: '16px',
    border: '2px solid var(--border)',
    borderTopColor: 'var(--accent)',
    borderRadius: '50%',
    display: 'inline-block',
    animation: 'spin 0.7s linear infinite',
  },

  // Divider
  divider:     { display:'flex', alignItems:'center', gap:'0.8rem', margin:'1rem 0' },
  dividerLine: { flex:1, height:'1px', background:'var(--border)' },
  dividerText: { fontSize:'0.75rem', color:'var(--muted)', fontFamily:"'DM Mono',monospace" },

  // Toggle
  toggle:       { display:'flex', background:'var(--surface2)', borderRadius:'8px', padding:'0.25rem', marginBottom:'1rem', gap:'0.25rem' },
  toggleBtn:    { flex:1, padding:'0.5rem', border:'none', borderRadius:'6px', background:'transparent', color:'var(--muted)', cursor:'pointer', fontSize:'0.88rem', fontWeight:600, fontFamily:"'Cabinet Grotesk',sans-serif", transition:'all 0.2s' },
  toggleActive: { background:'var(--accent)', color:'#fff' },

  // Form
  field:     { display:'flex', flexDirection:'column', gap:'0.4rem' },
  label:     { fontSize:'0.72rem', fontWeight:600, color:'var(--muted)', letterSpacing:'0.5px', textTransform:'uppercase', fontFamily:"'DM Mono',monospace" },
  input:     { background:'var(--surface2)', border:'1px solid var(--border)', color:'var(--text)', padding:'0.7rem 0.9rem', borderRadius:'8px', fontSize:'0.9rem', fontFamily:"'Cabinet Grotesk',sans-serif", outline:'none', width:'100%' },
  errorBox:  { background:'rgba(247,106,106,0.1)', border:'1px solid rgba(247,106,106,0.3)', color:'#f76a6a', padding:'0.6rem 0.9rem', borderRadius:'6px', fontSize:'0.82rem' },
  submitBtn: { background:'var(--accent)', color:'#fff', padding:'0.8rem', border:'none', borderRadius:'8px', fontSize:'0.92rem', fontWeight:700, cursor:'pointer', fontFamily:"'Cabinet Grotesk',sans-serif", width:'100%' },
}