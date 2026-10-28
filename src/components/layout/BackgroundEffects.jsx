export default function BackgroundEffects() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      <div
        className="absolute rounded-full blur-[100px]"
        style={{
          width: 520,
          height: 520,
          left: -120,
          top: -130,
          background: 'radial-gradient(circle, rgba(255,214,10,0.18) 0%, rgba(255,214,10,0) 70%)',
        }}
      />
      <div
        className="absolute rounded-full blur-[120px]"
        style={{
          width: 600,
          height: 600,
          right: -180,
          bottom: -200,
          background: 'radial-gradient(circle, rgba(10,79,163,0.25) 0%, rgba(0,53,102,0) 70%)',
        }}
      />
    </div>
  )
}