const base = "h-4 w-auto rounded-[2px] shadow-sm";

export function NorwayFlag() {
  return (
    <svg viewBox="0 0 22 16" className={base} aria-label="Norge" role="img">
      <rect width="22" height="16" fill="#BA0C2F" />
      <rect x="6" width="4" height="16" fill="#fff" />
      <rect y="6" width="22" height="4" fill="#fff" />
      <rect x="7" width="2" height="16" fill="#00205B" />
      <rect y="7" width="22" height="2" fill="#00205B" />
    </svg>
  );
}

export function SwedenFlag() {
  return (
    <svg viewBox="0 0 16 10" className={base} aria-label="Sverige" role="img">
      <rect width="16" height="10" fill="#006AA7" />
      <rect x="5" width="2" height="10" fill="#FECC00" />
      <rect y="4" width="16" height="2" fill="#FECC00" />
    </svg>
  );
}

export function DenmarkFlag() {
  return (
    <svg viewBox="0 0 37 28" className={base} aria-label="Danmark" role="img">
      <rect width="37" height="28" fill="#C8102E" />
      <rect x="12" width="4" height="28" fill="#fff" />
      <rect y="12" width="37" height="4" fill="#fff" />
    </svg>
  );
}