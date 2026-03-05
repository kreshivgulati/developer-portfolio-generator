// src/components/Form/StepSkills.jsx
import { usePortfolio } from '../../context/PortfolioContext'
import TagInput from './TagInput'

export default function StepSkills() {
  const { portfolioData, updateField } = usePortfolio()
  const d = portfolioData

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1.2rem' }}>

      <div style={s.field}>
        <label style={s.label}>Technical Skills</label>
        <TagInput tags={d.skills} onChange={v => updateField('skills', v)} placeholder="React, Node.js, Python..." />
        <span style={s.hint}>↵ Enter or , to add</span>
      </div>

      <div style={s.field}>
        <label style={s.label}>Tools & Platforms</label>
        <TagInput tags={d.tools} onChange={v => updateField('tools', v)} placeholder="Git, Docker, AWS..." />
      </div>

      <div style={s.row}>
        <div style={s.field}>
          <label style={s.label}>Years of Experience</label>
          <input style={s.input} type="number" min="0" max="40" placeholder="3"
            value={d.years} onChange={e => updateField('years', e.target.value)} />
        </div>
        <div style={s.field}>
          <label style={s.label}>Work Status</label>
          <select style={s.input} value={d.status} onChange={e => updateField('status', e.target.value)}>
            <option value="">— Select —</option>
            <option value="open">✅ Open to opportunities</option>
            <option value="freelance">💼 Freelance / Contract</option>
            <option value="employed">🏢 Currently employed</option>
            <option value="student">🎓 Student</option>
          </select>
        </div>
      </div>

    </div>
  )
}

const s = {
  row:   { display:'flex', gap:'0.8rem' },
  field: { display:'flex', flexDirection:'column', gap:'0.4rem', flex:1 },
  label: { fontSize:'0.72rem', fontWeight:600, color:'var(--muted)', letterSpacing:'0.5px', textTransform:'uppercase', fontFamily:"'DM Mono',monospace" },
  input: { background:'var(--surface2)', border:'1px solid var(--border)', color:'var(--text)', padding:'0.65rem 0.9rem', borderRadius:'8px', fontSize:'0.9rem', fontFamily:"'Cabinet Grotesk',sans-serif", outline:'none', width:'100%' },
  hint:  { fontSize:'0.72rem', color:'var(--muted)', fontFamily:"'DM Mono',monospace" },
}