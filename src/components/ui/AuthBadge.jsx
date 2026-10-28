export default function AuthBadge() {
  return (
    <div
      className="absolute z-10 inline-flex items-center rounded-full border border-primary/30 bg-primary/15 px-4 py-1.5"
      style={{ left: 56, top: 48 }}
    >
      <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-primary">
        Authentication UI
      </span>
    </div>
  )
}