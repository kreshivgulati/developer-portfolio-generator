// src/components/Form/StepTemplate.jsx
import { usePortfolio } from '../../context/PortfolioContext'

const TEMPLATES = [
  { id:'minimal',  name:'Minimal Dark',    emoji:'🌑', bg:'linear-gradient(135deg,#0f0f1a,#1a1a2e)' },
  { id:'vibrant',  name:'Vibrant Purple',  emoji:'🔮', bg:'linear-gradient(135deg,#1a0533,#330a1a)' },
  { id:'clean',    name:'Ocean Blue',      emoji:'🌊', bg:'linear-gradient(135deg,#001a33,#003366)' },
  { id:'terminal', name:'Hacker Terminal', emoji:'💻', bg:'linear-gradient(135deg,#001a00,#003300)' },
]

const COLORS = ['#7c6af7','#f7a26a','#6af7c8','#f76a6a','#f7e26a','#6ab8f7','#f76af0','#ffffff']

export default function StepTemplate() {
  const { portfolioData, updateField } = usePortfolio()

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>

      {/* Templates */}
      <div>
        <label style={s.label}>Template</label>
        <div style={s.tplGrid}>
          {TEMPLATES.map(t => (
            <div key={t.id}
              style={{ ...s.tplCard, ...(portfolioData.template === t.id ? s.tplActive : {}) }}
              onClick={() => updateField('template', t.id)}
            >
              <div style={{ ...s.tplPreview, background: t.bg }}>{t.emoji}</div>
              <div style={s.tplName}>{t.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <label style={s.label}>Accent Color</label>
        <div style={s.colorRow}>
          {COLORS.map(c => (
            <div key={c}
              style={{ ...s.colorDot, background: c, ...(portfolioData.color === c ? s.colorActive : {}) }}
              onClick={() => updateField('color', c)}
              title={c}
            />
          ))}
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', marginTop:'0.8rem' }}>
          <label style={s.label}>Custom</label>
          <input type="color" value={portfolioData.color}
            onChange={e => updateField('color', e.target.value)}
            style={{ width:'36px', height:'36px', border:'none', background:'none', cursor:'pointer', borderRadius:'6px' }} />
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.78rem', color:'var(--muted)' }}>{portfolioData.color}</span>
        </div>
      </div>

    </div>
  )
}

const s = {
  label:      { fontSize:'0.72rem', fontWeight:600, color:'var(--muted)', letterSpacing:'0.5px', textTransform:'uppercase', fontFamily:"'DM Mono',monospace", display:'block', marginBottom:'0.7rem' },
  tplGrid:    { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.8rem' },
  tplCard:    { border:'2px solid var(--border)', borderRadius:'10px', overflow:'hidden', cursor:'pointer', transition:'all 0.2s' },
  tplActive:  { borderColor:'var(--accent)', boxShadow:'0 0 0 3px rgba(124,106,247,0.2)' },
  tplPreview: { height:'70px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.5rem' },
  tplName:    { padding:'0.5rem', background:'var(--surface2)', fontSize:'0.78rem', fontWeight:600, textAlign:'center' },
  colorRow:   { display:'flex', gap:'0.5rem', flexWrap:'wrap' },
  colorDot:   { width:'28px', height:'28px', borderRadius:'50%', cursor:'pointer', border:'2px solid transparent', transition:'all 0.2s' },
  colorActive:{ border:'2px solid #fff', transform:'scale(1.2)' },
}