// src/components/Form/FormStepper.jsx
import { useState } from 'react'
import StepPersonalInfo from './StepPersonalInfo'
import StepSkills       from './StepSkills'
import StepProjects     from './StepProjects'
import StepLinks        from './StepLinks'
import StepTemplate     from './StepTemplate'

const STEPS = [
  { id:0, label:'01 · Info',     title:'Personal Info',   subtitle:'// tell us about yourself',    component: StepPersonalInfo },
  { id:1, label:'02 · Skills',   title:'Skills & Stack',  subtitle:'// what do you know?',          component: StepSkills },
  { id:2, label:'03 · Projects', title:'Projects',        subtitle:'// showcase your best work',    component: StepProjects },
  { id:3, label:'04 · Links',    title:'Social & Links',  subtitle:'// connect with the world',     component: StepLinks },
  { id:4, label:'05 · Template', title:'Choose Template', subtitle:'// pick your aesthetic',        component: StepTemplate },
]

export default function FormStepper() {
  const [current, setCurrent]     = useState(0)
  const [completed, setCompleted] = useState(new Set())

  const goTo = (n) => setCurrent(n)

  const next = () => {
    setCompleted(prev => new Set([...prev, current]))
    if (current < STEPS.length - 1) setCurrent(c => c + 1)
  }

  const prev = () => { if (current > 0) setCurrent(c => c - 1) }

  const ActiveComponent = STEPS[current].component
  const progress = (current / (STEPS.length - 1)) * 100

  const stepBtnStyle = (id) => ({
    ...s.stepBtn,
    ...(id === current     ? s.stepBtnActive : {}),
    ...(completed.has(id) && id !== current ? s.stepBtnDone : {}),
  })

  return (
    <div style={s.wrapper}>

      {/* ── STEP NAV ── */}
      <div style={s.nav}>
        {STEPS.map(step => (
          <button key={step.id} style={stepBtnStyle(step.id)} onClick={() => goTo(step.id)}>
            {completed.has(step.id) && step.id !== current ? `✓ ${step.label}` : step.label}
          </button>
        ))}
      </div>

      {/* ── PROGRESS BAR ── */}
      <div style={s.progressTrack}>
        <div style={{ ...s.progressFill, width: `${progress}%` }} />
      </div>

      {/* ── STEP CONTENT ── */}
      <div style={s.content}>
        <div style={s.stepHeader}>
          <div style={s.stepTitle}>{STEPS[current].title}</div>
          <div style={s.stepSubtitle}>{STEPS[current].subtitle}</div>
        </div>
        <ActiveComponent />
      </div>

      {/* ── FOOTER ── */}
      <div style={s.footer}>
        <button style={{ ...s.btnSecondary, visibility: current === 0 ? 'hidden' : 'visible' }} onClick={prev}>
          ← Prev
        </button>
        <span style={s.indicator}>Step {current + 1} of {STEPS.length}</span>
        <button style={current === STEPS.length - 1 ? s.btnDone : s.btnPrimary} onClick={next}>
          {current === STEPS.length - 1 ? '✓ Done' : 'Next →'}
        </button>
      </div>

    </div>
  )
}

const s = {
  wrapper:      { display:'flex', flexDirection:'column', height:'100%', background:'var(--surface)', borderRight:'1px solid var(--border)', overflow:'hidden' },
  nav:          { display:'flex', gap:'0.4rem', padding:'1rem 1.2rem', borderBottom:'1px solid var(--border)', overflowX:'auto', flexShrink:0, scrollbarWidth:'none' },
  stepBtn:      { flexShrink:0, background:'none', border:'1px solid var(--border)', color:'var(--muted)', padding:'0.35rem 0.8rem', borderRadius:'20px', cursor:'pointer', fontFamily:"'DM Mono',monospace", fontSize:'0.7rem', transition:'all 0.2s', whiteSpace:'nowrap' },
  stepBtnActive:{ background:'var(--accent)', borderColor:'var(--accent)', color:'#fff', fontWeight:600 },
  stepBtnDone:  { borderColor:'var(--accent3)', color:'var(--accent3)' },
  progressTrack:{ height:'2px', background:'var(--border)', flexShrink:0 },
  progressFill: { height:'100%', background:'var(--accent)', transition:'width 0.3s ease' },
  content:      { flex:1, overflowY:'auto', padding:'1.5rem 1.2rem', scrollbarWidth:'thin', scrollbarColor:'var(--border) transparent' },
  stepHeader:   { marginBottom:'1.2rem' },
  stepTitle:    { fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:'1.05rem', marginBottom:'0.2rem' },
  stepSubtitle: { fontSize:'0.78rem', color:'var(--muted)', fontFamily:"'DM Mono',monospace" },
  footer:       { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'1rem 1.2rem', borderTop:'1px solid var(--border)', background:'var(--surface)', flexShrink:0 },
  indicator:    { fontFamily:"'DM Mono',monospace", fontSize:'0.7rem', color:'var(--muted)' },
  btnPrimary:   { padding:'0.45rem 1rem', borderRadius:'8px', background:'var(--accent)', border:'none', color:'#fff', fontWeight:600, fontSize:'0.82rem', cursor:'pointer', fontFamily:"'Cabinet Grotesk',sans-serif" },
  btnDone:      { padding:'0.45rem 1rem', borderRadius:'8px', background:'var(--accent3)', border:'none', color:'#0a0a0f', fontWeight:700, fontSize:'0.82rem', cursor:'pointer', fontFamily:"'Cabinet Grotesk',sans-serif" },
  btnSecondary: { padding:'0.45rem 1rem', borderRadius:'8px', background:'transparent', border:'1px solid var(--border)', color:'var(--text)', fontWeight:600, fontSize:'0.82rem', cursor:'pointer', fontFamily:"'Cabinet Grotesk',sans-serif" },
}