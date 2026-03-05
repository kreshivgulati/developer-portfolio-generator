// src/components/Form/StepProjects.jsx
import { usePortfolio } from '../../context/PortfolioContext'

let counter = 0

export default function StepProjects() {
  const { portfolioData, updateField } = usePortfolio()
  const projects = portfolioData.projects

  const addProject = () => {
    updateField('projects', [...projects, { id: `p_${counter++}`, title:'', desc:'', tech:'', link:'', demo:'' }])
  }

  const removeProject = (id) => updateField('projects', projects.filter(p => p.id !== id))

  const updateProject = (id, key, val) => {
    updateField('projects', projects.map(p => p.id === id ? { ...p, [key]: val } : p))
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>

      {projects.length === 0 && (
        <div style={{ textAlign:'center', padding:'2rem', color:'var(--muted)', background:'var(--surface2)', borderRadius:'10px', border:'1px dashed var(--border)' }}>
          <div style={{ fontSize:'2rem', marginBottom:'0.5rem' }}>📦</div>
          <p style={{ fontSize:'0.85rem' }}>No projects yet. Add your first one!</p>
        </div>
      )}

      {projects.map((p, idx) => (
        <div key={p.id} style={s.card}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.8rem' }}>
            <span style={{ fontSize:'0.82rem', fontWeight:600, color:'var(--accent2)', fontFamily:"'DM Mono',monospace" }}>PROJECT {idx + 1}</span>
            <button style={s.delBtn} onClick={() => removeProject(p.id)}>🗑 Remove</button>
          </div>

          <div style={s.field}>
            <label style={s.label}>Title *</label>
            <input style={s.input} placeholder="My Awesome App"
              value={p.title} onChange={e => updateProject(p.id,'title',e.target.value)} />
          </div>
          <div style={s.field}>
            <label style={s.label}>Description</label>
            <textarea style={s.textarea} rows={2} placeholder="What does it do? What problem does it solve?"
              value={p.desc} onChange={e => updateProject(p.id,'desc',e.target.value)} />
          </div>
          <div style={s.field}>
            <label style={s.label}>Tech Stack</label>
            <input style={s.input} placeholder="React, Firebase, Tailwind"
              value={p.tech} onChange={e => updateProject(p.id,'tech',e.target.value)} />
          </div>
          <div style={s.row}>
            <div style={s.field}>
              <label style={s.label}>GitHub Link</label>
              <input style={s.input} type="url" placeholder="https://github.com/..."
                value={p.link} onChange={e => updateProject(p.id,'link',e.target.value)} />
            </div>
            <div style={s.field}>
              <label style={s.label}>Live Demo</label>
              <input style={s.input} type="url" placeholder="https://myapp.vercel.app"
                value={p.demo} onChange={e => updateProject(p.id,'demo',e.target.value)} />
            </div>
          </div>
        </div>
      ))}

      <button style={s.addBtn} onClick={addProject}>＋ Add Project</button>
    </div>
  )
}

const s = {
  card:     { background:'var(--surface2)', border:'1px solid var(--border)', borderRadius:'10px', padding:'1rem', display:'flex', flexDirection:'column', gap:'0.8rem' },
  row:      { display:'flex', gap:'0.8rem' },
  field:    { display:'flex', flexDirection:'column', gap:'0.4rem', flex:1 },
  label:    { fontSize:'0.72rem', fontWeight:600, color:'var(--muted)', letterSpacing:'0.5px', textTransform:'uppercase', fontFamily:"'DM Mono',monospace" },
  input:    { background:'var(--bg)', border:'1px solid var(--border)', color:'var(--text)', padding:'0.6rem 0.8rem', borderRadius:'8px', fontSize:'0.88rem', fontFamily:"'Cabinet Grotesk',sans-serif", outline:'none', width:'100%' },
  textarea: { background:'var(--bg)', border:'1px solid var(--border)', color:'var(--text)', padding:'0.6rem 0.8rem', borderRadius:'8px', fontSize:'0.88rem', fontFamily:"'Cabinet Grotesk',sans-serif", outline:'none', resize:'vertical', width:'100%' },
  addBtn:   { background:'transparent', border:'1px dashed var(--border)', color:'var(--muted)', padding:'0.65rem', borderRadius:'8px', cursor:'pointer', fontSize:'0.88rem', fontFamily:"'Cabinet Grotesk',sans-serif", fontWeight:600, transition:'all 0.2s' },
  delBtn:   { background:'none', border:'1px solid var(--border)', color:'var(--muted)', padding:'0.3rem 0.7rem', borderRadius:'6px', cursor:'pointer', fontSize:'0.75rem', fontFamily:"'Cabinet Grotesk',sans-serif" },
}