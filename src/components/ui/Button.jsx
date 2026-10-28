export default function Button({ children, type = 'button', loading = false, disabled = false, onClick }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className="flex h-[56px] w-full items-center justify-center gap-2 rounded-field bg-primary text-[15px] font-bold text-on-primary shadow-[0_0_24px_rgba(255,214,10,0.25)] transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading && (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-on-primary/30 border-t-on-primary"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  )
}