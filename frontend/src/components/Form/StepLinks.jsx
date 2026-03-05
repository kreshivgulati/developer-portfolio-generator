// src/components/Form/StepLinks.jsx
import { usePortfolio } from '../../context/PortfolioContext'

const LINKS = [
  { key:'github',   label:'GitHub Profile',        icon:'🐙', placeholder:'https://github.com/username' },
  { key:'linkedin', label:'LinkedIn',               icon:'💼', placeholder:'https://linkedin.com/in/username' },
  { key:'website',  label:'Personal Website / Blog',icon:'🌐', placeholder:'https://yourblog.dev' },
  { key:'twitter',  label:'Twitter / X',            icon:'🐦', placeholder:'https://twitter.com/username' },
  { key:'resume',   label:'Resume / CV (PDF link)', icon:'📄', placeholder:'https://drive.google.com/...' },
]

export default function StepLinks() {
  const { portfolioData, updateField } = usePortfolio()

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
      {LINKS.map(({ key, label, icon, placeholder }) => (
        <div key={key} style={s.field}>
          <label style={s.label}>{icon} {label}</label>
          <input style={s.input} type="url" placeholder={placeholder}
            value={portfolioData[key]}
            onChange={e => updateField(key, e.target.value)} />
        </div>
      ))}
    </div>
  )
}

const s = {
  field: { display:'flex', flexDirection:'column', gap:'0.4rem' },
  label: { fontSize:'0.78rem', fontWeight:600, color:'var(--muted)', fontFamily:"'Cabinet Grotesk',sans-serif" },
  input: { background:'var(--surface2)', border:'1px solid var(--border)', color:'var(--text)', padding:'0.65rem 0.9rem', borderRadius:'8px', fontSize:'0.9rem', fontFamily:"'Cabinet Grotesk',sans-serif", outline:'none', width:'100%' },
}