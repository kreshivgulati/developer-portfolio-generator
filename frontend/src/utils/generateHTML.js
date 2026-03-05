// src/utils/generateHTML.js

function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return r ? { r: parseInt(r[1],16), g: parseInt(r[2],16), b: parseInt(r[3],16) } : { r:124, g:106, b:247 }
}

export function generatePortfolio(d) {
  const themes = {
    minimal:  { bg:'#0d0d14', surface:'#16161f', card:'#1e1e2a', text:'#e8e8f0', muted:'#5a5a70', font:"'Space Grotesk',sans-serif",   heading:"'Syne',sans-serif" },
    vibrant:  { bg:'#0d0008', surface:'#1a0015', card:'#260020', text:'#f5e6ff', muted:'#8a6080', font:"'Plus Jakarta Sans',sans-serif", heading:"'Syne',sans-serif" },
    clean:    { bg:'#020c1b', surface:'#0a1628', card:'#112240', text:'#ccd6f6', muted:'#495670', font:"'Inter',sans-serif",             heading:"'Syne',sans-serif" },
    terminal: { bg:'#001100', surface:'#001a00', card:'#002200', text:'#00ff41', muted:'#007a20', font:"'Fira Code',monospace",           heading:"'Fira Code',monospace" },
  }

  const t   = themes[d.template] || themes.minimal
  const ac  = d.color || '#7c6af7'
  const rgb = hexToRgb(ac)
  const acA = `rgba(${rgb.r},${rgb.g},${rgb.b},0.15)`

  const statusMap = {
    open:     '✅ Open to Opportunities',
    freelance:'💼 Available for Freelance',
    employed: '🏢 Currently Employed',
    student:  '🎓 Student',
  }

  const statusBadge = d.status
    ? `<span class="status-badge">${statusMap[d.status] || ''}</span>` : ''

  const skillsHTML = d.skills.length
    ? d.skills.map(s => `<span class="skill-tag">${s}</span>`).join('') : ''

  const toolsHTML = d.tools.length
    ? d.tools.map(s => `<span class="skill-tag tools">${s}</span>`).join('') : ''

  const projectsHTML = d.projects.filter(p => p.title).map(p => `
    <div class="project-card">
      <div class="proj-header">
        <h3 class="proj-title">${p.title}</h3>
        <div class="proj-links">
          ${p.link ? `<a href="${p.link}" target="_blank">GitHub ↗</a>` : ''}
          ${p.demo ? `<a href="${p.demo}" target="_blank">Live ↗</a>`   : ''}
        </div>
      </div>
      ${p.desc ? `<p class="proj-desc">${p.desc}</p>` : ''}
      ${p.tech ? `<div class="proj-tech">${p.tech.split(',').map(t=>`<span>${t.trim()}</span>`).join('')}</div>` : ''}
    </div>
  `).join('')

  const socialLinks = [
    d.github   && `<a href="${d.github}"   target="_blank" class="social-link">GitHub</a>`,
    d.linkedin && `<a href="${d.linkedin}" target="_blank" class="social-link">LinkedIn</a>`,
    d.twitter  && `<a href="${d.twitter}"  target="_blank" class="social-link">Twitter</a>`,
    d.website  && `<a href="${d.website}"  target="_blank" class="social-link">Website</a>`,
  ].filter(Boolean).join('')

  const avatarHTML = d.avatar
    ? `<img src="${d.avatar}" alt="${d.name}" class="avatar" onerror="this.style.display='none'">`
    : `<div class="avatar-placeholder">${(d.name || 'U').charAt(0).toUpperCase()}</div>`

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${d.name || 'My Portfolio'}</title>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Space+Grotesk:wght@300;400;500;600;700&family=Fira+Code:wght@300;400;500&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
  :root{
    --bg:${t.bg};--surface:${t.surface};--card:${t.card};
    --text:${t.text};--muted:${t.muted};--ac:${ac};--ac-bg:${acA};
  }
  html{scroll-behavior:smooth}
  body{background:var(--bg);color:var(--text);font-family:${t.font};line-height:1.6}
  a{color:var(--ac);text-decoration:none}
  a:hover{text-decoration:underline}

  nav{
    position:fixed;top:0;left:0;right:0;
    display:flex;align-items:center;justify-content:space-between;
    padding:1rem 2.5rem;
    background:${t.bg}dd;backdrop-filter:blur(12px);
    border-bottom:1px solid ${t.card};z-index:100;
  }
  .nav-name{font-family:${t.heading};font-weight:700;font-size:1.1rem;color:var(--ac)}
  .nav-links{display:flex;gap:1.5rem}
  .nav-links a{color:var(--muted);font-size:0.85rem;transition:color 0.2s}
  .nav-links a:hover{color:var(--text);text-decoration:none}

  .hero{
    min-height:100vh;display:flex;align-items:center;
    padding:7rem 2.5rem 4rem;max-width:1100px;margin:0 auto;gap:4rem;
  }
  .hero-content{flex:1}
  .hero-avatar{flex-shrink:0}
  .avatar,.avatar-placeholder{
    width:160px;height:160px;border-radius:20px;
    object-fit:cover;border:2px solid var(--ac);
    box-shadow:0 0 40px ${acA};
  }
  .avatar-placeholder{
    display:flex;align-items:center;justify-content:center;
    font-size:4rem;font-weight:700;
    background:var(--surface);color:var(--ac);
  }
  .status-badge{
    display:inline-block;background:var(--ac-bg);color:var(--ac);
    border:1px solid var(--ac);padding:0.25rem 0.75rem;
    border-radius:20px;font-size:0.75rem;margin-bottom:1rem;font-weight:500;
  }
  .hero-name{
    font-family:${t.heading};font-size:clamp(2.5rem,5vw,4rem);
    font-weight:800;line-height:1.1;margin-bottom:0.4rem;
  }
  .hero-role{color:var(--ac);font-size:1.2rem;font-weight:500;margin-bottom:1.2rem}
  .hero-bio{color:var(--muted);font-size:1rem;max-width:520px;margin-bottom:1.5rem;line-height:1.7}
  .hero-meta{display:flex;flex-wrap:wrap;gap:1rem;color:var(--muted);font-size:0.85rem;margin-bottom:1.8rem}
  .hero-actions{display:flex;gap:0.8rem;flex-wrap:wrap}
  .btn-primary{
    background:var(--ac);color:#000;padding:0.7rem 1.5rem;
    border-radius:8px;font-weight:600;font-size:0.9rem;transition:all 0.2s;
  }
  .btn-primary:hover{opacity:0.85;text-decoration:none;transform:translateY(-1px)}
  .btn-outline{
    border:1px solid var(--ac);color:var(--ac);padding:0.7rem 1.5rem;
    border-radius:8px;font-weight:600;font-size:0.9rem;transition:all 0.2s;
  }
  .btn-outline:hover{background:var(--ac-bg);text-decoration:none}

  section{padding:5rem 2.5rem;max-width:1100px;margin:0 auto}
  .section-label{font-size:0.75rem;letter-spacing:3px;color:var(--ac);text-transform:uppercase;margin-bottom:0.6rem}
  .section-title{
    font-family:${t.heading};font-size:2rem;font-weight:700;margin-bottom:2.5rem;
    position:relative;display:inline-block;
  }
  .section-title::after{
    content:'';position:absolute;left:0;bottom:-8px;
    width:50px;height:3px;background:var(--ac);border-radius:2px;
  }
  .section-divider{border:none;border-top:1px solid ${t.card};max-width:1100px;margin:0 auto}

  .skills-group{margin-bottom:1.5rem}
  .skills-group-label{font-size:0.8rem;color:var(--muted);margin-bottom:0.8rem;letter-spacing:1px}
  .skills-grid{display:flex;flex-wrap:wrap;gap:0.6rem}
  .skill-tag{
    background:var(--ac-bg);color:var(--ac);border:1px solid ${ac}40;
    padding:0.35rem 0.9rem;border-radius:20px;font-size:0.85rem;font-weight:500;transition:all 0.2s;
  }
  .skill-tag:hover{background:var(--ac);color:#000}
  .skill-tag.tools{background:${t.card};color:var(--text);border-color:${t.muted}40}
  .skill-tag.tools:hover{border-color:var(--ac);color:var(--ac)}

  .projects-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1.5rem}
  .project-card{
    background:var(--card);border:1px solid ${t.muted}30;
    border-radius:12px;padding:1.5rem;transition:all 0.3s;
  }
  .project-card:hover{border-color:var(--ac);transform:translateY(-4px);box-shadow:0 20px 40px ${acA}}
  .proj-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:0.8rem;gap:1rem}
  .proj-title{font-family:${t.heading};font-size:1.1rem;font-weight:700}
  .proj-links{display:flex;gap:0.8rem;flex-shrink:0}
  .proj-links a{font-size:0.78rem;color:var(--ac);font-weight:500;white-space:nowrap}
  .proj-desc{color:var(--muted);font-size:0.88rem;margin-bottom:1rem;line-height:1.6}
  .proj-tech{display:flex;flex-wrap:wrap;gap:0.4rem}
  .proj-tech span{background:var(--surface);color:var(--muted);padding:0.2rem 0.55rem;border-radius:4px;font-size:0.75rem}

  .contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
  .contact-item{
    background:var(--card);border:1px solid ${t.muted}30;border-radius:10px;
    padding:1.2rem 1.5rem;display:flex;align-items:center;gap:0.8rem;
    transition:all 0.2s;text-decoration:none;color:var(--text);
  }
  .contact-item:hover{border-color:var(--ac);transform:translateY(-2px);text-decoration:none;color:var(--ac)}
  .contact-icon{font-size:1.4rem}
  .contact-label{font-size:0.75rem;color:var(--muted);display:block}
  .contact-value{font-weight:600;font-size:0.9rem}

  .social-links{display:flex;gap:1rem;flex-wrap:wrap;margin-top:2.5rem}
  .social-link{
    border:1px solid ${t.muted}50;color:var(--muted);
    padding:0.5rem 1rem;border-radius:6px;font-size:0.85rem;transition:all 0.2s;
  }
  .social-link:hover{border-color:var(--ac);color:var(--ac);text-decoration:none}

  footer{
    text-align:center;padding:2rem;color:var(--muted);
    font-size:0.8rem;border-top:1px solid ${t.card};margin-top:2rem;
  }

  @media(max-width:640px){
    .hero{flex-direction:column-reverse;gap:2rem;padding-top:6rem}
    .contact-grid{grid-template-columns:1fr}
    nav{padding:1rem 1.5rem}
    .nav-links{display:none}
    section{padding:3rem 1.5rem}
  }

  @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  .hero-content>*{animation:fadeUp 0.6s ease both}
  .hero-content>*:nth-child(1){animation-delay:0.1s}
  .hero-content>*:nth-child(2){animation-delay:0.2s}
  .hero-content>*:nth-child(3){animation-delay:0.3s}
  .hero-content>*:nth-child(4){animation-delay:0.4s}
  .hero-content>*:nth-child(5){animation-delay:0.5s}
</style>
</head>
<body>

<nav>
  <div class="nav-name">${d.name || 'My Portfolio'}</div>
  <div class="nav-links">
    <a href="#about">About</a>
    ${d.skills.length || d.tools.length ? '<a href="#skills">Skills</a>' : ''}
    ${d.projects.filter(p=>p.title).length ? '<a href="#projects">Projects</a>' : ''}
    <a href="#contact">Contact</a>
    ${d.resume ? `<a href="${d.resume}" target="_blank" style="color:var(--ac)">Resume ↗</a>` : ''}
  </div>
</nav>

<section class="hero" id="about">
  <div class="hero-content">
    ${statusBadge}
    <h1 class="hero-name">${d.name || 'Your Name'}</h1>
    <div class="hero-role">${d.role || 'Developer'}</div>
    <p class="hero-bio">${d.bio || 'A passionate developer building things for the web.'}</p>
    <div class="hero-meta">
      ${d.location ? `<span>📍 ${d.location}</span>` : ''}
      ${d.email    ? `<span>✉️ ${d.email}</span>`    : ''}
      ${d.years    ? `<span>⚡ ${d.years} years exp.</span>` : ''}
    </div>
    <div class="hero-actions">
      ${d.resume ? `<a href="${d.resume}" target="_blank" class="btn-primary">Download Resume</a>` : ''}
      ${d.github ? `<a href="${d.github}" target="_blank" class="btn-outline">GitHub ↗</a>` : ''}
      ${d.email  ? `<a href="mailto:${d.email}" class="btn-outline">Email Me</a>` : ''}
    </div>
  </div>
  <div class="hero-avatar">${avatarHTML}</div>
</section>

${d.skills.length || d.tools.length ? `
<hr class="section-divider">
<section id="skills">
  <div class="section-label">expertise</div>
  <h2 class="section-title">Skills & Tools</h2>
  ${d.skills.length ? `<div class="skills-group"><div class="skills-group-label">TECHNICAL SKILLS</div><div class="skills-grid">${skillsHTML}</div></div>` : ''}
  ${d.tools.length  ? `<div class="skills-group"><div class="skills-group-label">TOOLS & PLATFORMS</div><div class="skills-grid">${toolsHTML}</div></div>` : ''}
</section>` : ''}

${d.projects.filter(p=>p.title).length ? `
<hr class="section-divider">
<section id="projects">
  <div class="section-label">work</div>
  <h2 class="section-title">Projects</h2>
  <div class="projects-grid">${projectsHTML}</div>
</section>` : ''}

<hr class="section-divider">
<section id="contact">
  <div class="section-label">get in touch</div>
  <h2 class="section-title">Contact</h2>
  <div class="contact-grid">
    ${d.email    ? `<a href="mailto:${d.email}" class="contact-item"><span class="contact-icon">✉️</span><div><span class="contact-label">Email</span><span class="contact-value">${d.email}</span></div></a>` : ''}
    ${d.location ? `<div class="contact-item"><span class="contact-icon">📍</span><div><span class="contact-label">Location</span><span class="contact-value">${d.location}</span></div></div>` : ''}
    ${d.github   ? `<a href="${d.github}" target="_blank" class="contact-item"><span class="contact-icon">🐙</span><div><span class="contact-label">GitHub</span><span class="contact-value">${d.github.replace('https://','')}</span></div></a>` : ''}
    ${d.linkedin ? `<a href="${d.linkedin}" target="_blank" class="contact-item"><span class="contact-icon">💼</span><div><span class="contact-label">LinkedIn</span><span class="contact-value">${d.linkedin.replace('https://','')}</span></div></a>` : ''}
  </div>
  ${socialLinks ? `<div class="social-links">${socialLinks}</div>` : ''}
</section>

<footer>
  <p>Built with ❤️ by ${d.name || 'Developer'} · Generated with DevFolio</p>
</footer>

</body>
</html>`
}