// src/context/AuthContext.jsx

import { createContext, useContext, useState, useEffect } from 'react'
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth, provider } from '../firebase'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null)
  const [loading, setLoading] = useState(true)  // wait for Firebase to restore session

  // ── Listen to Firebase auth state changes ──
  // This auto-restores session on page refresh
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          name:   firebaseUser.displayName || firebaseUser.email.split('@')[0],
          email:  firebaseUser.email,
          avatar: firebaseUser.photoURL,
          uid:    firebaseUser.uid,
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })
    return () => unsubscribe()  // cleanup on unmount
  }, [])

  // ── Google Sign In ──
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      const u = result.user
      setUser({
        name:   u.displayName,
        email:  u.email,
        avatar: u.photoURL,
        uid:    u.uid,
      })
      return { success: true }
    } catch (err) {
      return { success: false, error: getErrorMessage(err.code) }
    }
  }

  // ── Email / Password Login ──
  const loginWithEmail = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      return { success: true }
    } catch (err) {
      return { success: false, error: getErrorMessage(err.code) }
    }
  }

  // ── Email / Password Sign Up ──
  const signUpWithEmail = async (name, email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      // Save display name to Firebase profile
      await updateProfile(result.user, { displayName: name })
      setUser({
        name:   name,
        email:  result.user.email,
        avatar: null,
        uid:    result.user.uid,
      })
      return { success: true }
    } catch (err) {
      return { success: false, error: getErrorMessage(err.code) }
    }
  }

  // ── Logout ──
  const logout = async () => {
    await signOut(auth)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      loginWithGoogle,
      loginWithEmail,
      signUpWithEmail,
      logout,
    }}>
      {/* Don't render children until Firebase restores session */}
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}

// ── Firebase error code → human readable message ──
function getErrorMessage(code) {
  const messages = {
    'auth/user-not-found':       'No account found with this email.',
    'auth/wrong-password':       'Incorrect password. Please try again.',
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/weak-password':        'Password must be at least 6 characters.',
    'auth/invalid-email':        'Please enter a valid email address.',
    'auth/popup-closed-by-user': 'Google sign-in was cancelled.',
    'auth/network-request-failed':'Network error. Check your connection.',
    'auth/too-many-requests':    'Too many attempts. Please try again later.',
    'auth/invalid-credential':   'Invalid email or password.',
  }
  return messages[code] || 'Something went wrong. Please try again.'
}