// src/pages/Dashboard.jsx

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { usePortfolio } from '../context/PortfolioContext'

// ── MOCK DATA (replace with API call later) ──
const MOCK_PORTFOLIOS = [
  {
    id:        'p1',
    name:      'Alex Johnson',
    role:      'Full Stack Developer',
    template:  'minimal',
    color:     '#7c6af7',
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    skills:    ['React', 'Node.js', 'Python'],
    projects:  [{ title: 'Portfolio App' }, { title: 'Chat Bot' }],
  },
  {
    id:        'p2',
    name:      'Alex Johnson',
    role:      'Frontend Developer',
    template:  'vibrant',
    color:     '#f7a26a',
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    skills:    ['Vue', 'TypeScript', 'Figma'],
    projects:  [{ title: 'E-Commerce Site' }],
  },
]

const TEMPLATE_PREVIEWS = {
  minimal:  { bg: 'linear-gradient(135deg,#0f0f1a,#1a1a2e)', emoji: '🌑' },
  vibrant:  { bg: 'linear-gradient(135deg,#1a0533,#330a1a)', emoji: '🔮' },
  clean:    { bg: 'linear-gradient(135deg,#001a33,#003366)', emoji: '🌊' },
  terminal: { bg: 'linear-gradient(135deg,#001a00,#003300)', emoji: '💻' },
}

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000)
  if (diff < 60)     return 'just now'
  if (diff < 3600)   return `${Math.floor(diff/60)}m ago`
  if (diff < 86400)  return `${Math.floor(diff/3600)}h ago`
  return `${Math.floor(diff/86400)}d ago`
}

// ── PORTFOLIO CARD ──
function PortfolioCard({ portfolio, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const tpl = TEMPLATE_PREVIEWS[portfolio.template] || TEMPLATE_PREVIEWS.minimal

  return (
    <div style={s.card}>

      {/* Template preview thumbnail */}
      <div style={{ ...s.thumbnail, background: tpl.bg }}>
        <span style={{ fontSize: '2rem' }}>{tpl.emoji}</span>
        <div style={{ ...s.colorDot, background: portfolio.color }} />

        {/* Hover overlay */}
        <div style={s.thumbnailOverlay}>
          <button style={s.editOverlayBtn} onClick={() => onEdit(portfolio)}>
            ✏️ Edit Portfolio
          </button>
        </div>
      </div>

      {/* Card body */}
      <div style={s.cardBody}>
        <div style={s.cardTop}>
          <div>
            <div style={s.cardName}>{portfolio.name}</div>
            <div style={s.cardRole}>{portfolio.role}</div>
          </div>

          {/* 3-dot menu */}
          <div style={{ position: 'relative' }}>
            <button style={s.menuBtn} onClick={() => setMenuOpen(!menuOpen)}>⋮</button>
            {menuOpen && (
              <div style={s.dropdown}>
                <button style={s.dropdownItem} onClick={() => { onEdit(portfolio); setMenuOpen(false) }}>
                  ✏️ Edit
                </button>
                <button style={s.dropdownItem} onClick={() => { onDelete(portfolio.id); setMenuOpen(false) }}>
                  🗑 Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Skills preview */}
        <div style={s.skillsRow}>
          {portfolio.skills.slice(0, 3).map(sk => (
            <span key={sk} style={s.skillPill}>{sk}</span>
          ))}
          {portfolio.skills.length > 3 && (
            <span style={{ ...s.skillPill, opacity: 0.5 }}>+{portfolio.skills.length - 3}</span>
          )}
        </div>

        {/* Footer */}
        <div style={s.cardFooter}>
          <span style={s.cardMeta}>
            {portfolio.projects.length} project{portfolio.projects.length !== 1 ? 's' : ''}
          </span>
          <span style={s.cardMeta}>Updated {timeAgo(portfolio.updatedAt)}</span>
        </div>
      </div>

    </div>
  )
}

// ── DELETE CONFIRM MODAL ──
function DeleteModal({ onConfirm, onCancel }) {
  return (
    <div style={s.overlay}>
      <div style={s.modalBox}>
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🗑️</div>
        <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: '1.2rem', marginBottom: '0.5rem' }}>
          Delete Portfolio?
        </h3>
        <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
          This action cannot be undone.
        </p>
        <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center' }}>
          <button style={s.cancelBtn} onClick={onCancel}>Cancel</button>
          <button style={s.deleteBtn} onClick={onConfirm}>Yes, Delete</button>
        </div>
      </div>
    </div>
  )
}

// ── MAIN DASHBOARD ──
export default function Dashboard() {
  const { user }                    = useAuth()
  const { updateMultiple, resetData } = usePortfolio()
  const navigate                    = useNavigate()
  const [portfolios, setPortfolios] = useState([])
  const [loading, setLoading]       = useState(true)
  const [deleteId, setDeleteId]     = useState(null)

  // ── Load portfolios (mock for now, replace with API later) ──
  useEffect(() => {
    setTimeout(() => {
      setPortfolios(MOCK_PORTFOLIOS)
      setLoading(false)
    }, 800)
    // TODO: replace with real API call:
    // const data = await fetch('/api/portfolio/me', { headers: { Authorization: `Bearer ${token}` } })
    // setPortfolios(await data.json())
  }, [])

  // ── Load portfolio into context and open generator ──
  const handleEdit = (portfolio) => {
    updateMultiple(portfolio)   // load all fields into context
    navigate('/generator')      // go to generator with data pre-filled
  }

  // ── Create new portfolio ──
  const handleNew = () => {
    resetData()                 // clear context
    navigate('/generator')      // go to generator fresh
  }

  // ── Delete ──
  const handleDelete = (id) => setDeleteId(id)

  const confirmDelete = () => {
    setPortfolios(prev => prev.filter(p => p.id !== deleteId))
    setDeleteId(null)
    // TODO: also call DELETE /api/portfolio/:id
  }

  const firstName = user?.name?.split(' ')[0] || 'there'

  return (
    <div style={s.page}>

      {/* ── HEADER ── */}
      <div style={s.pageHeader}>
        <div>
          <h1 style={s.pageTitle}>
            Hey, {firstName} 👋
          </h1>
          <p style={s.pageSubtitle}>
            {portfolios.length === 0
              ? "You haven't created any portfolios yet."
              : `You have ${portfolios.length} portfolio${portfolios.length > 1 ? 's' : ''}.`
            }
          </p>
        </div>

        <button style={s.newBtn} onClick={handleNew}>
          ＋ New Portfolio
        </button>
      </div>

      {/* ── STATS BAR ── */}
      {portfolios.length > 0 && (
        <div style={s.statsBar}>
          {[
            { label: 'Total Portfolios', value: portfolios.length },
            { label: 'Total Projects',   value: portfolios.reduce((a, p) => a + p.projects.length, 0) },
            { label: 'Templates Used',   value: new Set(portfolios.map(p => p.template)).size },
          ].map(stat => (
            <div key={stat.label} style={s.statCard}>
              <div style={s.statValue}>{stat.value}</div>
              <div style={s.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* ── CONTENT ── */}
      {loading ? (
        // Loading state
        <div style={s.loadingWrap}>
          <div style={s.spinner} />
          <p style={{ color: 'var(--muted)', marginTop: '1rem', fontSize: '0.88rem' }}>
            Loading your portfolios...
          </p>
        </div>

      ) : portfolios.length === 0 ? (
        // Empty state
        <div style={s.emptyState}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎨</div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: '1.4rem', marginBottom: '0.5rem' }}>
            No portfolios yet
          </h2>
          <p style={{ color: 'var(--muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            Create your first portfolio and stand out to employers.
          </p>
          <button style={s.newBtn} onClick={handleNew}>
            ＋ Create My First Portfolio
          </button>
        </div>

      ) : (
        // Portfolio grid
        <div style={s.grid}>
          {portfolios.map(p => (
            <PortfolioCard
              key={p.id}
              portfolio={p}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}

          {/* New portfolio card */}
          <div style={s.newCard} onClick={handleNew}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>＋</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>New Portfolio</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '0.3rem' }}>
              Start from scratch
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE MODAL ── */}
      {deleteId && (
        <DeleteModal
          onConfirm={confirmDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}

    </div>
  )
}

// ── STYLES ──
const s = {
  page: {
    minHeight: 'calc(100vh - 64px)',
    background: 'var(--bg)',
    padding: '2.5rem 3rem',
    color: 'var(--text)',
  },

  // Header
  pageHeader: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem',
  },
  pageTitle: {
    fontFamily: "'Syne',sans-serif", fontSize: '2rem',
    fontWeight: 800, marginBottom: '0.3rem',
  },
  pageSubtitle: {
    color: 'var(--muted)', fontSize: '0.9rem',
    fontFamily: "'Cabinet Grotesk',sans-serif",
  },
  newBtn: {
    background: 'var(--accent)', color: '#fff',
    padding: '0.7rem 1.4rem', borderRadius: '10px', border: 'none',
    fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer',
    fontFamily: "'Cabinet Grotesk',sans-serif", whiteSpace: 'nowrap',
  },

  // Stats
  statsBar: {
    display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap',
  },
  statCard: {
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: '10px', padding: '1rem 1.5rem', minWidth: '140px',
  },
  statValue: {
    fontFamily: "'Syne',sans-serif", fontSize: '1.8rem',
    fontWeight: 800, color: 'var(--accent)',
  },
  statLabel: {
    fontSize: '0.75rem', color: 'var(--muted)',
    fontFamily: "'DM Mono',monospace", letterSpacing: '0.5px',
  },

  // Grid
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem',
  },

  // Portfolio card
  card: {
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: '14px', overflow: 'hidden',
    transition: 'transform 0.2s, border-color 0.2s',
    cursor: 'default',
  },
  thumbnail: {
    height: '140px', display: 'flex', alignItems: 'center',
    justifyContent: 'center', position: 'relative', overflow: 'hidden',
  },
  colorDot: {
    position: 'absolute', bottom: '10px', right: '10px',
    width: '14px', height: '14px', borderRadius: '50%',
    border: '2px solid rgba(255,255,255,0.3)',
  },
  thumbnailOverlay: {
    position: 'absolute', inset: 0,
    background: 'rgba(0,0,0,0.6)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.2s',
    // CSS hover handled via JS onMouseEnter/Leave — using a simpler approach:
  },
  editOverlayBtn: {
    background: 'var(--accent)', color: '#fff',
    border: 'none', padding: '0.6rem 1.2rem',
    borderRadius: '8px', cursor: 'pointer',
    fontWeight: 600, fontSize: '0.85rem',
    fontFamily: "'Cabinet Grotesk',sans-serif",
  },
  cardBody: {
    padding: '1.2rem',
  },
  cardTop: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: '0.8rem',
  },
  cardName: {
    fontFamily: "'Syne',sans-serif", fontWeight: 700,
    fontSize: '1rem', marginBottom: '0.2rem',
  },
  cardRole: {
    fontSize: '0.78rem', color: 'var(--accent)',
    fontFamily: "'Cabinet Grotesk',sans-serif",
  },
  menuBtn: {
    background: 'none', border: '1px solid var(--border)',
    color: 'var(--muted)', width: '28px', height: '28px',
    borderRadius: '6px', cursor: 'pointer', fontSize: '1rem',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: 0,
  },
  dropdown: {
    position: 'absolute', right: 0, top: '32px',
    background: 'var(--surface2)', border: '1px solid var(--border)',
    borderRadius: '8px', overflow: 'hidden', zIndex: 10,
    minWidth: '120px', boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
  },
  dropdownItem: {
    display: 'block', width: '100%', padding: '0.6rem 0.9rem',
    background: 'none', border: 'none', color: 'var(--text)',
    textAlign: 'left', cursor: 'pointer', fontSize: '0.85rem',
    fontFamily: "'Cabinet Grotesk',sans-serif",
  },
  skillsRow: {
    display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.8rem',
  },
  skillPill: {
    background: 'rgba(124,106,247,0.12)', color: 'var(--accent)',
    border: '1px solid rgba(124,106,247,0.2)',
    padding: '0.15rem 0.55rem', borderRadius: '20px', fontSize: '0.72rem',
  },
  cardFooter: {
    display: 'flex', justifyContent: 'space-between',
    borderTop: '1px solid var(--border)', paddingTop: '0.7rem',
  },
  cardMeta: {
    fontSize: '0.72rem', color: 'var(--muted)',
    fontFamily: "'DM Mono',monospace",
  },

  // New card
  newCard: {
    background: 'transparent',
    border: '2px dashed var(--border)',
    borderRadius: '14px', cursor: 'pointer',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    minHeight: '240px', color: 'var(--muted)',
    transition: 'all 0.2s',
    fontFamily: "'Cabinet Grotesk',sans-serif",
  },

  // Loading
  loadingWrap: {
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    minHeight: '300px',
  },
  spinner: {
    width: '36px', height: '36px',
    border: '3px solid var(--border)',
    borderTopColor: 'var(--accent)',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },

  // Empty state
  emptyState: {
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    minHeight: '400px', textAlign: 'center',
  },

  // Delete modal
  overlay: {
    position: 'fixed', inset: 0,
    background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000,
  },
  modalBox: {
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: '16px', padding: '2.5rem',
    textAlign: 'center', maxWidth: '360px', width: '100%',
    boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
  },
  cancelBtn: {
    padding: '0.6rem 1.5rem', borderRadius: '8px',
    background: 'transparent', border: '1px solid var(--border)',
    color: 'var(--text)', cursor: 'pointer', fontWeight: 600,
    fontSize: '0.88rem', fontFamily: "'Cabinet Grotesk',sans-serif",
  },
  deleteBtn: {
    padding: '0.6rem 1.5rem', borderRadius: '8px',
    background: '#f76a6a', border: 'none',
    color: '#fff', cursor: 'pointer', fontWeight: 700,
    fontSize: '0.88rem', fontFamily: "'Cabinet Grotesk',sans-serif",
  },
}