// src/components/Layout/Footer.jsx

import { Link } from 'react-router-dom'

const FOOTER_LINKS = {
  Product: [
    { label: 'Generator',    to: '/generator' },
    { label: 'Templates',    to: '/generator' },
    { label: 'How it works', to: '/' },
  ],
  Resources: [
    { label: 'GitHub',    href: 'https://github.com' },
    { label: 'Docs',      href: '#' },
    { label: 'Changelog', href: '#' },
  ],
  Connect: [
    { label: 'Twitter',  href: 'https://twitter.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Email',    href: 'mailto:hello@devfolio.app' },
  ],
}

function FooterLink({ link }) {
  if (link.to) {
    return (
      <Link to={link.to} style={styles.link}>
        {link.label}
      </Link>
    )
  }
  return (
    <a href={link.href} target="_blank" rel="noreferrer" style={styles.link}>
      {link.label} ↗
    </a>
  )
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={styles.footer}>

      <div style={styles.top}>

        <div style={styles.brand}>
          <div style={styles.logo}>
            Dev<span style={styles.logoAccent}>Folio</span>
          </div>
          <p style={styles.tagline}>
            Generate your developer portfolio in minutes.
            No code required.
          </p>
          <div style={styles.statusBadge}>
            <span style={styles.statusDot} />
            All systems operational
          </div>
        </div>

        <div style={styles.linksGrid}>
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category} style={styles.linkColumn}>
              <div style={styles.columnTitle}>{category}</div>
              {links.map((link) => (
                <FooterLink key={link.label} link={link} />
              ))}
            </div>
          ))}
        </div>

      </div>

      <div style={styles.divider} />

      <div style={styles.bottom}>
        <span style={styles.copyright}>
          © {currentYear} DevFolio. Built with love for developers.
        </span>
        <div style={styles.bottomLinks}>
          <a href="#" style={styles.bottomLink}>Privacy</a>
          <a href="#" style={styles.bottomLink}>Terms</a>
          <a href="#" style={styles.bottomLink}>Contact</a>
        </div>
      </div>

    </footer>
  )
}

const styles = {
  footer: {
    background: 'var(--surface)',
    borderTop: '1px solid var(--border)',
    padding: '3rem 2.5rem 1.5rem',
    marginTop: 'auto',
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '3rem',
    flexWrap: 'wrap',
    marginBottom: '2.5rem',
  },
  brand: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
    maxWidth: '240px',
  },
  logo: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: '1.4rem',
    color: 'var(--text)',
    letterSpacing: '-0.5px',
  },
  logoAccent: {
    color: 'var(--accent)',
  },
  tagline: {
    color: 'var(--muted)',
    fontSize: '0.85rem',
    lineHeight: 1.6,
    fontFamily: "'Cabinet Grotesk', sans-serif",
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'rgba(106, 247, 200, 0.08)',
    border: '1px solid rgba(106, 247, 200, 0.2)',
    color: 'var(--accent3)',
    padding: '0.3rem 0.8rem',
    borderRadius: '20px',
    fontSize: '0.72rem',
    fontFamily: "'DM Mono', monospace",
    width: 'fit-content',
    letterSpacing: '0.3px',
  },
  statusDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: 'var(--accent3)',
    flexShrink: 0,
  },
  linksGrid: {
    display: 'flex',
    gap: '3rem',
    flexWrap: 'wrap',
  },
  linkColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.7rem',
  },
  columnTitle: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '0.7rem',
    letterSpacing: '1.5px',
    color: 'var(--muted)',
    textTransform: 'uppercase',
    marginBottom: '0.3rem',
  },
  link: {
    color: 'var(--muted)',
    textDecoration: 'none',
    fontSize: '0.88rem',
    fontFamily: "'Cabinet Grotesk', sans-serif",
    fontWeight: 500,
  },
  divider: {
    borderTop: '1px solid var(--border)',
    marginBottom: '1.5rem',
  },
  bottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  copyright: {
    color: 'var(--muted)',
    fontSize: '0.8rem',
    fontFamily: "'DM Mono', monospace",
  },
  bottomLinks: {
    display: 'flex',
    gap: '1.5rem',
  },
  bottomLink: {
    color: 'var(--muted)',
    textDecoration: 'none',
    fontSize: '0.8rem',
    fontFamily: "'Cabinet Grotesk', sans-serif",
  },
}