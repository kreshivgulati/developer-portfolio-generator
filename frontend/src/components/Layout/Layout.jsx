// src/components/Layout/Layout.jsx

import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header    from './Header'
import Footer    from './Footer'
import LoginModal from '../LoginModal'

export default function Layout({ children }) {
  const [showLogin, setShowLogin] = useState(false)
  const location = useLocation()

  // Hide footer on generator page (split screen layout)
  const isGenerator = location.pathname === '/generator'

  return (
    <div style={{ display:'flex', flexDirection:'column', minHeight:'100vh', background:'var(--bg)' }}>

      <Header onLoginClick={() => setShowLogin(true)} />

      <main style={{ flex: 1 }}>
        {children}
      </main>

      {!isGenerator && <Footer />}

      {showLogin && (
        <LoginModal onClose={() => setShowLogin(false)} />
      )}

    </div>
  )
}