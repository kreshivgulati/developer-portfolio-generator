// src/context/PortfolioContext.jsx

import { createContext, useContext, useState } from 'react'

const PortfolioContext = createContext()

export const defaultData = {
  id:       null,   // null = new portfolio, string = editing existing
  name:     '',
  role:     '',
  bio:      '',
  avatar:   '',
  location: '',
  email:    '',
  skills:   [],
  tools:    [],
  years:    '',
  status:   '',
  projects: [],
  github:   '',
  linkedin: '',
  website:  '',
  twitter:  '',
  resume:   '',
  template: 'minimal',
  color:    '#7c6af7',
}

export function PortfolioProvider({ children }) {
  const [portfolioData, setPortfolioData] = useState(defaultData)
  const [isSaved,       setIsSaved]       = useState(false)

  const updateField = (field, value) => {
    setIsSaved(false)
    setPortfolioData(prev => ({ ...prev, [field]: value }))
  }

  const updateMultiple = (fields) => {
    setIsSaved(false)
    setPortfolioData(prev => ({ ...prev, ...fields }))
  }

  // Load an existing portfolio for editing
  const loadPortfolio = (portfolio) => {
    setPortfolioData({ ...defaultData, ...portfolio })
    setIsSaved(true)
  }

  const resetData = () => {
    setPortfolioData(defaultData)
    setIsSaved(false)
  }

  const markSaved = () => setIsSaved(true)

  return (
    <PortfolioContext.Provider value={{
      portfolioData,
      isSaved,
      updateField,
      updateMultiple,
      loadPortfolio,
      resetData,
      markSaved,
    }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolio() {
  const context = useContext(PortfolioContext)
  if (!context) throw new Error('usePortfolio must be used inside PortfolioProvider')
  return context
}