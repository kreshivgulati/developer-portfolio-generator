// src/components/Form/StepPersonalInfo.jsx
import { usePortfolio } from '../../context/PortfolioContext'

export default function StepPersonalInfo() {
  const { portfolioData, updateField } = usePortfolio()
  const d = portfolioData

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>

      <div style={s.row}>
        <div style={s.field}>
          <label style={s.label}>Full Name *</label>
          <input style={s.input} placeholder="Alex Johnson"
            value={d.name} onChange={e => updateField('name', e.target.value)} />
        </div>
        <div style={s.field}>
          <label style={s.label}>Role / Title *</label>
          <input style={s.input} placeholder="Full Stack Developer"
            value={d.role} onChange={e => updateField('role', e.target.value)} />
        </div>
      </div>

      <div style={s.field}>
        <label style={s.label}>Short Bio *</label>
        <textarea style={s.textarea} rows={3}
          placeholder="Passionate developer building things for the web..."
          value={d.bio} onChange={e => updateField('bio', e.target.value)} />
      </div>

      <div style={s.field}>
        <label style={s.label}>Avatar / Profile Image URL</label>
        <input style={s.input} type="url"
          placeholder="https://avatars.githubusercontent.com/..."
          value={d.avatar} onChange={e => updateField('avatar', e.target.value)} />
        {d.avatar && (
          <img src={d.avatar} alt="avatar"
            style={{ width:'56px', height:'56px', borderRadius:'50%', objectFit:'cover', marginTop:'0.5rem', border:'2px solid var(--border)' }}
            onError={e => e.target.style.display='none'} />
        )}
      </div>

      <div style={s.row}>
        <div style={s.field}>
          <label style={s.label}>Location</label>
          <input style={s.input} placeholder="Delhi, India"
            value={d.location} onChange={e => updateField('location', e.target.value)} />
        </div>
        <div style={s.field}>
          <label style={s.label}>Email</label>
          <input style={s.input} type="email" placeholder="you@email.com"
            value={d.email} onChange={e => updateField('email', e.target.value)} />
        </div>
      </div>

    </div>
  )
}

const s = {
  row:      { display:'flex', gap:'0.8rem' },
  field:    { display:'flex', flexDirection:'column', gap:'0.4rem', flex:1 },
  label:    { fontSize:'0.72rem', fontWeight:600, color:'var(--muted)', letterSpacing:'0.5px', textTransform:'uppercase', fontFamily:"'DM Mono',monospace" },
  input:    { background:'var(--surface2)', border:'1px solid var(--border)', color:'var(--text)', padding:'0.65rem 0.9rem', borderRadius:'8px', fontSize:'0.9rem', fontFamily:"'Cabinet Grotesk',sans-serif", outline:'none', width:'100%' },
  textarea: { background:'var(--surface2)', border:'1px solid var(--border)', color:'var(--text)', padding:'0.65rem 0.9rem', borderRadius:'8px', fontSize:'0.9rem', fontFamily:"'Cabinet Grotesk',sans-serif", outline:'none', resize:'vertical', width:'100%' },
}