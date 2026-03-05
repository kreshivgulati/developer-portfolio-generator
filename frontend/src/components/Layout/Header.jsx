// src/components/Layout/Header.jsx

import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Header({ onLoginClick }) {
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [avatarError, setAvatarError] = useState(false)
  const location  = useLocation()
  const navigate  = useNavigate()
  const { user, logout } = useAuth()

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    logout()
    navigate('/')
    setMenuOpen(false)
  }

  return (
    <>
      <header style={styles.header}>

        {/* ── LOGO ── */}
        <Link to="/" style={styles.logoLink}>
          <div style={styles.logo}>Dev<span style={styles.logoAccent}>Folio</span></div>
          <span style={styles.logoBadge}>BETA</span>
        </Link>

        {/* ── DESKTOP NAV ── */}
        <nav style={styles.nav}>
          <Link to="/" style={{ ...styles.navLink, ...(isActive('/') ? styles.navLinkActive : {}) }}>
            Home
          </Link>

          {user ? (
            <>
              <Link to="/dashboard" style={{ ...styles.navLink, ...(isActive('/dashboard') ? styles.navLinkActive : {}) }}>
                Dashboard
              </Link>
              <Link to="/generator" style={{ ...styles.navLink, ...(isActive('/generator') ? styles.navLinkActive : {}) }}>
                Generator
              </Link>
            </>
          ) : (
            <span
              style={{ ...styles.navLink, cursor: 'pointer', opacity: 0.4 }}
              title="Login to access Generator"
              onClick={() => onLoginClick && onLoginClick()}
            >
              Generator 🔒
            </span>
          )}

          <a href="https://github.com" target="_blank" rel="noreferrer" style={styles.navLink}>
            GitHub ↗
          </a>
        </nav>

        {/* ── RIGHT SIDE ── */}
        <div style={styles.headerRight}>
          {user ? (
            <div style={styles.userArea}>
              {/* Avatar or initial */}
              {user.avatar && !avatarError ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  style={styles.userAvatarImg}
                  onError={() => setAvatarError(true)}
                />
              ) : (
                <div style={styles.userAvatarInitial}>
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              )}
              <span style={styles.userName}>{user.name?.split(' ')[0]}</span>

              {/* Dashboard shortcut */}
              <Link to="/dashboard" style={styles.dashBtn}>My Portfolios</Link>

              <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <>
              <button style={styles.loginBtn} onClick={() => onLoginClick && onLoginClick()}>Login</button>
              <button style={styles.ctaBtn}   onClick={() => onLoginClick && onLoginClick()}>Get Started →</button>
            </>
          )}

          {/* Hamburger */}
          <button style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
            <span style={{ ...styles.hamburgerLine, transform: menuOpen ? 'rotate(45deg) translate(5px,5px)'  : 'none' }} />
            <span style={{ ...styles.hamburgerLine, opacity: menuOpen ? 0 : 1 }} />
            <span style={{ ...styles.hamburgerLine, transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
          </button>
        </div>

      </header>

      {/* ── MOBILE MENU ── */}
      {menuOpen && (
        <div style={styles.mobileMenu}>
          <Link to="/"          style={styles.mobileLink} onClick={() => setMenuOpen(false)}>🏠 Home</Link>
          {user && (
            <Link to="/dashboard" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>📁 My Portfolios</Link>
          )}
          {user ? (
            <Link to="/generator" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>⚡ Generator</Link>
          ) : (
            <span style={{ ...styles.mobileLink, opacity: 0.4 }}
              onClick={() => { setMenuOpen(false); onLoginClick && onLoginClick() }}>
              ⚡ Generator 🔒
            </span>
          )}
          <a href="https://github.com" target="_blank" rel="noreferrer" style={styles.mobileLink}>🐙 GitHub ↗</a>
          {user ? (
            <button style={{ ...styles.mobileCta, background: '#f76a6a44', color: '#f76a6a', border: '1px solid #f76a6a55' }}
              onClick={handleLogout}>Logout</button>
          ) : (
            <button style={styles.mobileCta}
              onClick={() => { setMenuOpen(false); onLoginClick && onLoginClick() }}>Login / Sign Up →</button>
          )}
        </div>
      )}
    </>
  )
}

const styles = {
  header:       { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'1rem 2.5rem', borderBottom:'1px solid var(--border)', background:'rgba(10,10,15,0.95)', backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)', position:'sticky', top:0, zIndex:100, height:'64px' },
  logoLink:     { display:'flex', alignItems:'center', gap:'0.6rem', textDecoration:'none' },
  logo:         { fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:'1.4rem', letterSpacing:'-0.5px', color:'var(--text)' },
  logoAccent:   { color:'var(--accent)' },
  logoBadge:    { fontFamily:"'DM Mono',monospace", fontSize:'0.6rem', color:'var(--accent3)', border:'1px solid var(--accent3)', padding:'0.15rem 0.45rem', borderRadius:'20px', letterSpacing:'1.5px' },
  nav:          { display:'flex', alignItems:'center', gap:'2rem' },
  navLink:      { color:'var(--muted)', textDecoration:'none', fontSize:'0.88rem', fontWeight:500, fontFamily:"'Cabinet Grotesk',sans-serif" },
  navLinkActive:{ color:'var(--text)', fontWeight:600 },
  headerRight:  { display:'flex', alignItems:'center', gap:'0.8rem' },

  // Logged in
  userArea:          { display:'flex', alignItems:'center', gap:'0.6rem' },
  userAvatarImg:     { width:'32px', height:'32px', borderRadius:'50%', objectFit:'cover', border:'2px solid var(--accent)' },
  userAvatarInitial: { width:'32px', height:'32px', borderRadius:'50%', background:'var(--accent)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:'0.85rem', flexShrink:0 },
  userName:          { fontSize:'0.85rem', fontWeight:600, color:'var(--text)', fontFamily:"'Cabinet Grotesk',sans-serif", maxWidth:'80px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' },
  dashBtn:           { background:'var(--surface2)', border:'1px solid var(--border)', color:'var(--text)', padding:'0.4rem 0.8rem', borderRadius:'7px', fontSize:'0.8rem', fontWeight:600, cursor:'pointer', fontFamily:"'Cabinet Grotesk',sans-serif", textDecoration:'none', whiteSpace:'nowrap' },
  logoutBtn:         { background:'transparent', border:'1px solid var(--border)', color:'var(--muted)', padding:'0.4rem 0.8rem', borderRadius:'7px', fontSize:'0.8rem', fontWeight:600, cursor:'pointer', fontFamily:"'Cabinet Grotesk',sans-serif" },

  // Logged out
  loginBtn: { background:'transparent', border:'1px solid var(--border)', color:'var(--text)', padding:'0.45rem 1rem', borderRadius:'8px', fontSize:'0.85rem', fontWeight:600, cursor:'pointer', fontFamily:"'Cabinet Grotesk',sans-serif" },
  ctaBtn:   { background:'var(--accent)', color:'#fff', padding:'0.45rem 1rem', borderRadius:'8px', border:'none', fontSize:'0.85rem', fontWeight:600, cursor:'pointer', fontFamily:"'Cabinet Grotesk',sans-serif", whiteSpace:'nowrap' },

  // Hamburger
  hamburger:     { display:'none', flexDirection:'column', gap:'5px', background:'none', border:'none', cursor:'pointer', padding:'4px' },
  hamburgerLine: { display:'block', width:'22px', height:'2px', background:'var(--text)', borderRadius:'2px', transition:'all 0.3s' },

  // Mobile
  mobileMenu: { display:'flex', flexDirection:'column', gap:'0.2rem', padding:'1rem 1.5rem', background:'var(--surface)', borderBottom:'1px solid var(--border)', position:'sticky', top:'64px', zIndex:99 },
  mobileLink: { color:'var(--muted)', textDecoration:'none', padding:'0.7rem 0.5rem', borderRadius:'6px', fontSize:'0.9rem', fontWeight:500, borderBottom:'1px solid var(--border)', fontFamily:"'Cabinet Grotesk',sans-serif", cursor:'pointer', display:'block' },
  mobileCta:  { background:'var(--accent)', color:'#fff', padding:'0.7rem 1rem', borderRadius:'8px', border:'none', fontSize:'0.88rem', fontWeight:600, textAlign:'center', marginTop:'0.5rem', fontFamily:"'Cabinet Grotesk',sans-serif", cursor:'pointer' },
}