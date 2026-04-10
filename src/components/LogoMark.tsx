export default function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Lake Nottely Stays logo"
    >
      {/* Sun */}
      <circle cx="55" cy="24" r="10" fill="#E9B384" />
      {/* Sun rays */}
      <g stroke="#E9B384" strokeWidth="1.5" strokeLinecap="round">
        <line x1="55" y1="8" x2="55" y2="12" />
        <line x1="67" y1="12" x2="65" y2="15" />
        <line x1="43" y1="12" x2="45" y2="15" />
        <line x1="70" y1="24" x2="67" y2="24" />
        <line x1="40" y1="24" x2="43" y2="24" />
      </g>
      {/* Far mountain */}
      <path d="M25 62 L50 28 L75 62Z" fill="#7C9D96" opacity="0.5" />
      {/* Near mountain */}
      <path d="M10 62 L38 32 L66 62Z" fill="#5B7C99" opacity="0.7" />
      {/* Snow cap */}
      <path d="M32 42 L38 32 L44 42 L40 40 L36 42Z" fill="#F4F2DE" opacity="0.6" />
      {/* Cabin body */}
      <rect x="42" y="54" width="12" height="8" fill="#E9B384" rx="1" />
      {/* Cabin roof */}
      <path d="M40 55 L48 48 L56 55Z" fill="#2C3E52" />
      {/* Cabin door */}
      <rect x="46" y="57" width="4" height="5" fill="#2C3E52" rx="0.5" />
      {/* Shoreline */}
      <path d="M5 65 Q25 60 50 64 Q75 68 95 63" stroke="#5B7C99" strokeWidth="1.5" fill="none" />
      {/* Water ripples */}
      <g stroke="#5B7C99" strokeWidth="1" strokeLinecap="round" opacity="0.5">
        <line x1="20" y1="72" x2="35" y2="72" />
        <line x1="55" y1="70" x2="72" y2="70" />
        <line x1="30" y1="77" x2="48" y2="77" />
        <line x1="58" y1="76" x2="70" y2="76" />
        <line x1="22" y1="82" x2="38" y2="82" />
        <line x1="50" y1="83" x2="65" y2="83" />
      </g>
      {/* Trees */}
      <g fill="#2C3E52" opacity="0.6">
        <path d="M28 62 L30 52 L32 62Z" />
        <path d="M34 62 L36 54 L38 62Z" />
        <path d="M62 62 L64 53 L66 62Z" />
      </g>
    </svg>
  );
}
