import SocialButton from '../ui/SocialButton'

export default function SocialLogin() {
  return (
    <div className="flex items-center justify-center gap-[14px]">
      <SocialButton label="Google" icon="G" />
      <SocialButton label="Apple" icon="A" />
      <SocialButton label="Facebook" icon="f" />
    </div>
  )
}