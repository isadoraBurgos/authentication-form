import { useState } from 'react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import AuthDivider from './AuthDivider'
import SocialLogin from './SocialLogin'

const EMAIL_REGEX = /^\S+@\S+\.\S+$/

export default function SignUpForm({ onSwitchToSignIn }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const next = { name: '', email: '', password: '' }
    if (!name.trim()) next.name = 'Name is required'
    else if (name.trim().length < 2) next.name = 'Name must be at least 2 characters'
    if (!email.trim()) next.email = 'Email is required'
    else if (!EMAIL_REGEX.test(email)) next.email = 'Enter a valid email'
    if (!password) next.password = 'Password is required'
    else if (password.length < 8) next.password = 'Password must be at least 8 characters'
    setErrors(next)
    return !next.name && !next.email && !next.password
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (loading) return
    if (!validate()) return
    setLoading(true)
    setTimeout(() => {
      console.log('Sign Up:', { name, email, password: '***' })
      setLoading(false)
    }, 1000)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-[480px] flex-col gap-[18px] rounded-card bg-surface px-[30px] pt-[34px] pb-[30px]"
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-[32px] font-extrabold text-primary">Create Account</h1>
        <p className="text-[15px] font-normal text-muted">
          Sign up to get started
        </p>
      </div>

      <Input
        id="signup-name"
        label="Full Name"
        type="text"
        placeholder="Jane Doe"
        value={name}
        onChange={(e) => {
          setName(e.target.value)
          if (errors.name) setErrors((prev) => ({ ...prev, name: '' }))
        }}
        error={errors.name}
      />

      <Input
        id="signup-email"
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
        id="signup-password"
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

      <Button type="submit" loading={loading}>
        Sign Up
      </Button>

      <AuthDivider />
      <SocialLogin />

      <p className="text-center text-[13px] text-muted">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToSignIn}
          className="font-bold text-primary"
        >
          Sign In
        </button>
      </p>
    </form>
  )
}