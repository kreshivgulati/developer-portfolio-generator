// src/App.jsx

import { Routes, Route } from 'react-router-dom'
import Layout         from './components/Layout/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Home           from './pages/Home'
import Generator      from './pages/Generator'
import Dashboard      from './pages/Dashboard'
import NotFound       from './pages/NotFound'

export default function App() {
  return (
    <Routes>

      <Route path="/" element={<Layout><Home /></Layout>} />

      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Layout><Dashboard /></Layout>
        </ProtectedRoute>
      } />

      <Route path="/generator" element={
        <ProtectedRoute>
          <Layout><Generator /></Layout>
        </ProtectedRoute>
      } />

      <Route path="*" element={<Layout><NotFound /></Layout>} />

    </Routes>
  )
}