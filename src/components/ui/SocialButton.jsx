export default function SocialButton({ label, icon, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-[56px] w-[56px] items-center justify-center rounded-social border border-border bg-field text-[18px] font-bold text-primary transition-colors hover:border-primary/60"
    >
      {icon ?? label}
    </button>
  )
}