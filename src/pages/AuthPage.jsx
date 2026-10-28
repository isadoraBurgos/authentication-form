import { useState } from 'react'
import BackgroundEffects from '../components/layout/BackgroundEffects'
import AuthBadge from '../components/ui/AuthBadge'
import SignInForm from '../components/auth/SignInForm'
import SignUpForm from '../components/auth/SignUpForm'

export default function AuthPage() {
  const [mode, setMode] = useState('signin')

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg">
      <BackgroundEffects />

      <AuthBadge />

      <div
        className="absolute z-10 text-[12px] font-semibold uppercase tracking-[0.08em] text-muted"
        style={{ right: 56, top: 48 }}
      >
        {mode === 'signin' ? 'SIGN IN' : 'SIGN UP'}
      </div>

      <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
        {mode === 'signin' ? (
          <SignInForm onSwitchToSignUp={() => setMode('signup')} />
        ) : (
          <SignUpForm onSwitchToSignIn={() => setMode('signin')} />
        )}
      </main>
    </div>
  )
}