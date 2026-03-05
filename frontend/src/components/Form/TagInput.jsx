// src/components/Form/TagInput.jsx
import { useState } from 'react'

export default function TagInput({ tags = [], onChange, placeholder = 'Type and press Enter...' }) {
  const [input, setInput] = useState('')

  const addTag = (val) => {
    const trimmed = val.trim().replace(/,$/,'')
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed])
    }
    setInput('')
  }

  const removeTag = (i) => onChange(tags.filter((_, idx) => idx !== i))

  const handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag(input) }
    if (e.key === 'Backspace' && !input && tags.length) onChange(tags.slice(0,-1))
  }

  return (
    <div style={s.wrap} onClick={() => document.getElementById('tag-inp-'+placeholder)?.focus()}>
      {tags.map((tag, i) => (
        <span key={i} style={s.tag}>
          {tag}
          <span style={s.remove} onClick={() => removeTag(i)}>×</span>
        </span>
      ))}
      <input
        id={'tag-inp-'+placeholder}
        style={s.input}
        value={input}
        placeholder={tags.length === 0 ? placeholder : ''}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKey}
      />
    </div>
  )
}

const s = {
  wrap:   { background:'var(--surface2)', border:'1px solid var(--border)', borderRadius:'8px', padding:'0.5rem', display:'flex', flexWrap:'wrap', gap:'0.4rem', cursor:'text', minHeight:'44px', alignItems:'center' },
  tag:    { background:'rgba(124,106,247,0.18)', color:'var(--accent)', border:'1px solid rgba(124,106,247,0.3)', padding:'0.2rem 0.6rem', borderRadius:'20px', fontSize:'0.8rem', display:'flex', alignItems:'center', gap:'0.3rem' },
  remove: { cursor:'pointer', opacity:0.6, fontSize:'1rem', lineHeight:1 },
  input:  { border:'none', background:'transparent', outline:'none', color:'var(--text)', fontSize:'0.88rem', minWidth:'120px', flex:1, fontFamily:"'Cabinet Grotesk',sans-serif" },
}