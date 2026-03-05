// src/pages/NotFound.jsx
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      color: 'var(--text)',
      textAlign: 'center',
      gap: '1rem'
    }}>
      <div style={{ fontSize: '4rem' }}>404</div>
      <h2 style={{
        fontFamily: "'Syne', sans-serif",
        color: 'var(--accent)'
      }}>
        Page Not Found
      </h2>
      <p style={{ color: 'var(--muted)' }}>
        The page you're looking for doesn't exist.
      </p>
      <Link to="/" style={{
        background: 'var(--accent)',
        color: '#fff',
        padding: '0.6rem 1.4rem',
        borderRadius: '8px',
        textDecoration: 'none',
        fontWeight: 600,
        marginTop: '0.5rem'
      }}>
        ← Go Home
      </Link>
    </div>
  )
}