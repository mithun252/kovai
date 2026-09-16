import { useState } from 'react'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../firebase/firebase'

function Login({ onLogin }) {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError('')
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      onLogin()
    } catch (err) {
      if (err.code === 'auth/popup-blocked') {
        setError('Popup was blocked. Please allow popups and try again.')
      } else if (err.code === 'auth/cancelled-popup-request') {
        setError('Authentication was cancelled. Please try again.')
      } else if (err.code === 'auth/network-request-failed') {
        setError('Network error. Please check your connection and try again.')
      } else {
        setError('Failed to sign in. Please try again.')
      }
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Task Manager</h1>
        <p>Manage your tasks simply.</p>
        {error && <div className="error-message">{error}</div>}
        <button
          type="button"
          className="google-btn"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign in with Google'}
        </button>
      </div>
    </div>
  )
}

export default Login
