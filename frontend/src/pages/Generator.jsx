// src/pages/Generator.jsx

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePortfolio } from '../context/PortfolioContext'
import { generatePortfolio } from '../utils/generateHTML'
import FormStepper from '../components/Form/FormStepper'

export default function Generator() {
  const { portfolioData, isSaved, resetData, markSaved } = usePortfolio()
  const [saveStatus, setSaveStatus] = useState(null) // 'saving' | 'saved' | 'error'
  const navigate = useNavigate()

  const getHTML = () => generatePortfolio(portfolioData)

  const downloadHTML = () => {
    const html  = getHTML()
    const blob  = new Blob([html], { type: 'text/html' })
    const a     = document.createElement('a')
    a.href      = URL.createObjectURL(blob)
    a.download  = `${(portfolioData.name || 'my-portfolio').replace(/\s+/g,'-').toLowerCase()}.html`
    a.click()
  }

  const copyHTML = async () => {
    await navigator.clipboard.writeText(getHTML())
    const btn = document.getElementById('copy-btn')
    if (btn) {
      btn.textContent = '✓ Copied!'
      setTimeout(() => { btn.textContent = '⎘ Copy HTML' }, 2000)
    }
  }

  // ── Save to backend (wired up later) ──
  const handleSave = async () => {
    setSaveStatus('saving')
    try {
      // TODO: replace with real API call
      // const token = await auth.currentUser.getIdToken()
      // await fetch('/api/portfolio', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      //   body: JSON.stringify(portfolioData),
      // })
      await new Promise(r => setTimeout(r, 800)) // mock delay
      markSaved()
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus(null), 2500)
    } catch {
      setSaveStatus('error')
      setTimeout(() => setSaveStatus(null), 2500)
    }
  }

  const isEditing = !!portfolioData.id

  return (
    <div style={s.page}>

      {/* ── LEFT: FORM ── */}
      <div style={s.sidebar}>
        {/* Editing banner */}
        {isEditing && (
          <div style={s.editingBanner}>
            ✏️ Editing: <strong>{portfolioData.name}</strong>
            <button style={s.newBtn} onClick={() => { resetData(); }}>+ New</button>
          </div>
        )}
        <FormStepper />
      </div>

      {/* ── RIGHT: PREVIEW ── */}
      <div style={s.previewPane}>

        {/* Toolbar */}
        <div style={s.toolbar}>
          <div style={s.toolbarLeft}>
            <span style={s.liveDot} />
            <span style={s.liveLabel}>LIVE PREVIEW</span>
            {!isSaved && portfolioData.name && (
              <span style={s.unsavedBadge}>● unsaved</span>
            )}
          </div>

          <div style={s.toolbarRight}>
            {/* Save button */}
            <button
              style={{
                ...s.btnSave,
                ...(saveStatus === 'saved'  ? s.btnSaveSuccess : {}),
                ...(saveStatus === 'saving' ? { opacity: 0.7 }  : {}),
                ...(saveStatus === 'error'  ? s.btnSaveError   : {}),
              }}
              onClick={handleSave}
              disabled={saveStatus === 'saving'}
            >
              {saveStatus === 'saving' ? '⏳ Saving...'
               : saveStatus === 'saved'  ? '✓ Saved!'
               : saveStatus === 'error'  ? '✗ Failed'
               : isSaved ? '✓ Saved' : '💾 Save'}
            </button>

            <button style={s.btnOutline} id="copy-btn" onClick={copyHTML}>⎘ Copy HTML</button>
            <button style={s.btnSuccess} onClick={downloadHTML}>↓ Download</button>

            {/* Back to dashboard */}
            <button style={s.btnOutline} onClick={() => navigate('/dashboard')} title="Back to Dashboard">
              ← Dashboard
            </button>
          </div>
        </div>

        {/* iframe preview */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          <iframe
            style={{ width: '100%', height: '100%', border: 'none' }}
            title="Portfolio Preview"
            srcDoc={getHTML()}
          />
        </div>

      </div>
    </div>
  )
}

const s = {
  page:         { display:'grid', gridTemplateColumns:'400px 1fr', height:'calc(100vh - 64px)', background:'var(--bg)', overflow:'hidden' },
  sidebar:      { overflow:'hidden', display:'flex', flexDirection:'column', position:'relative' },
  previewPane:  { display:'flex', flexDirection:'column', overflow:'hidden' },

  editingBanner: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0.5rem 1.2rem', background: 'rgba(247,162,106,0.1)',
    borderBottom: '1px solid rgba(247,162,106,0.2)',
    fontSize: '0.8rem', color: 'var(--accent2)',
    fontFamily: "'Cabinet Grotesk',sans-serif",
    flexShrink: 0,
  },
  newBtn: {
    background: 'transparent', border: '1px solid var(--accent2)',
    color: 'var(--accent2)', padding: '0.2rem 0.6rem',
    borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem',
    fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 600,
  },

  toolbar:      { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0.7rem 1.2rem', borderBottom:'1px solid var(--border)', background:'var(--surface)', flexShrink:0, gap:'1rem', flexWrap:'wrap' },
  toolbarLeft:  { display:'flex', alignItems:'center', gap:'0.6rem' },
  liveDot:      { display:'inline-block', width:'7px', height:'7px', borderRadius:'50%', background:'var(--accent3)', animation:'pulse 2s infinite' },
  liveLabel:    { fontFamily:"'DM Mono',monospace", fontSize:'0.7rem', color:'var(--muted)', letterSpacing:'1px' },
  unsavedBadge: { fontFamily:"'DM Mono',monospace", fontSize:'0.68rem', color:'var(--accent2)', letterSpacing:'0.5px' },
  toolbarRight: { display:'flex', gap:'0.5rem', alignItems:'center', flexWrap:'wrap' },

  btnSave: {
    padding:'0.4rem 1rem', borderRadius:'7px',
    background:'var(--surface2)', border:'1px solid var(--accent)',
    color:'var(--accent)', fontSize:'0.8rem', fontWeight:700,
    cursor:'pointer', fontFamily:"'Cabinet Grotesk',sans-serif", transition:'all 0.2s',
  },
  btnSaveSuccess: { background:'rgba(106,247,200,0.1)', borderColor:'var(--accent3)', color:'var(--accent3)' },
  btnSaveError:   { background:'rgba(247,106,106,0.1)', borderColor:'#f76a6a', color:'#f76a6a' },

  btnOutline: { padding:'0.4rem 0.9rem', borderRadius:'7px', background:'transparent', border:'1px solid var(--border)', color:'var(--text)', fontSize:'0.8rem', fontWeight:600, cursor:'pointer', fontFamily:"'Cabinet Grotesk',sans-serif" },
  btnSuccess: { padding:'0.4rem 0.9rem', borderRadius:'7px', background:'var(--accent3)', border:'none', color:'#0a0a0f', fontSize:'0.8rem', fontWeight:700, cursor:'pointer', fontFamily:"'Cabinet Grotesk',sans-serif" },
}