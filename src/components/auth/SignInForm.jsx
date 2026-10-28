import { useState } from 'react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import AuthDivider from './AuthDivider'
import SocialLogin from './SocialLogin'

const EMAIL_REGEX = /^\S+@\S+\.\S+$/

export default function SignInForm({ onSwitchToSignUp }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [errors, setErrors] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const next = { email: '', password: '' }
    if (!email.trim()) next.email = 'Email is required'
    else if (!EMAIL_REGEX.test(email)) next.email = 'Enter a valid email'
    if (!password) next.password = 'Password is required'
    setErrors(next)
    return !next.email && !next.password
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (loading) return
    if (!validate()) return
    setLoading(true)
    setTimeout(() => {
      // Never log the password in plain text.
      console.log('Sign In:', { email, password: '***', remember })
      setLoading(false)
    }, 1000)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-[480px] flex-col gap-[18px] rounded-card bg-surface px-[30px] pt-[34px] pb-[30px]"
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-[32px] font-extrabold text-primary">Welcome Back</h1>
        <p className="text-[15px] font-normal text-muted">
          Sign in to continue to your account
        </p>
      </div>

      <Input
        id="signin-email"
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
          if (errors.email) setErrors((prev) => ({ ...prev, email: '' }))
        }}
        error={errors.email}
      />

      <Input
        id="signin-password"
        label="Password"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
          if (errors.password) setErrors((prev) => ({ ...prev, password: '' }))
        }}
        error={errors.password}
      />

      <div className="flex items-center justify-between text-[13px]">
        <label className="flex items-center gap-2 text-muted">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-4 w-4 accent-primary"
          />
          Remember me
        </label>
        <a href="#" className="font-bold text-primary" onClick={(e) => e.preventDefault()}>
          Forgot password?
        </a>
      </div>

      <Button type="submit" loading={loading}>
        Sign In
      </Button>

      <AuthDivider />
      <SocialLogin />

      <p className="text-center text-[13px] text-muted">
        Don&apos;t have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToSignUp}
          className="font-bold text-primary"
        >
          Sign Up
        </button>
      </p>
    </form>
  )
}