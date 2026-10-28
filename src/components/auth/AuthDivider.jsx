export default function AuthDivider() {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px flex-1 bg-border/60" />
      <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted">
        OR CONTINUE WITH
      </span>
      <span className="h-px flex-1 bg-border/60" />
    </div>
  )
}