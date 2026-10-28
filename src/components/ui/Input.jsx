export default function Input({
  id,
  name,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
}) {
  const errorId = error ? `${id}-error` : undefined

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[13px] font-medium text-white">
        {label}
      </label>
      <input
        id={id}
        name={name ?? id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        aria-describedby={errorId}
        className={`h-[56px] w-full rounded-field border bg-field px-4 text-[15px] text-white placeholder:text-muted outline-none transition-colors focus:border-primary ${
          error ? 'border-error' : 'border-border'
        }`}
      />
      {error && (
        <span id={errorId} className="text-[13px] text-error" role="alert">
          {error}
        </span>
      )}
    </div>
  )
}