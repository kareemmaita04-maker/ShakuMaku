interface BowlSVGProps {
  c1: string;
  c2: string;
  id: string;
  className?: string;
}

export function BowlSVG({ c1, c2, id, className }: BowlSVGProps) {
  const gid = `grad-${id}`;
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <defs>
        <radialGradient id={gid} cx="38%" cy="32%">
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${gid})`} />
      {/* Sheen highlight — no separate inner ellipse, so no ring */}
      <ellipse cx="160" cy="110" rx="70" ry="48" fill="#FFFCF5" opacity="0.18" />
      <g opacity="0.45">
        <circle cx="220" cy="180" r="5" fill="#FFFCF5" />
        <circle cx="170" cy="190" r="4" fill="#FFFCF5" />
        <circle cx="240" cy="155" r="3.5" fill="#FFFCF5" />
      </g>
      <path
        d="M150 120 q12 -22 30 -12"
        stroke="#5E7d4f"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="186" cy="106" rx="9" ry="5" fill="#5E7d4f" transform="rotate(-20 186 106)" />
    </svg>
  );
}
