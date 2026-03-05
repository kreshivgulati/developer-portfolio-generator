// src/components/ProtectedRoute.jsx

import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user } = useAuth()
  const location = useLocation()

  // Not logged in → redirect to home with a message
  if (!user) {
    return (
      <Navigate
        to="/"
        state={{ from: location.pathname, message: 'Please login to access the Generator.' }}
        replace
      />
    )
  }

  // Logged in → render the page normally
  return children
}