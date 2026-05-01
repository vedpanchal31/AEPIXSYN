interface LogoProps {
  className?: string;
  size?: number;
}

// Abstract "A" mark with purple gradient and small spark — Aepixsyn brand
export const LogoMark = ({ className = "", size = 40 }: LogoProps) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Aepixsyn"
  >
    <defs>
      <linearGradient id="aepx-grad" x1="10" y1="58" x2="54" y2="6" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="hsl(200 95% 65%)" />
        <stop offset="55%" stopColor="hsl(265 90% 70%)" />
        <stop offset="100%" stopColor="hsl(285 95% 78%)" />
      </linearGradient>
      <filter id="aepx-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g filter="url(#aepx-glow)">
      {/* Left blade of A */}
      <path
        d="M32 6 L10 58 L22 58 L32 32 Z"
        fill="url(#aepx-grad)"
        opacity="0.95"
      />
      {/* Right blade of A */}
      <path
        d="M32 6 L54 58 L42 58 L32 32 Z"
        fill="url(#aepx-grad)"
      />
      {/* Spark */}
      <path
        d="M40 36 L43 39 L40 42 L37 39 Z"
        fill="hsl(285 100% 88%)"
      />
    </g>
  </svg>
);

interface LogoLockupProps {
  className?: string;
  size?: number;
  showTagline?: boolean;
}

export const Logo = ({ className = "", size = 36, showTagline = false }: LogoLockupProps) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <LogoMark size={size} />
    <div className="flex flex-col leading-none">
      <span className="font-display font-light text-xl tracking-brand text-foreground">
        AEPIXSYN
      </span>
      {showTagline && (
        <span className="mt-1 text-[10px] tracking-[0.3em] text-muted-foreground">
          WHERE PIXELS MEET INTELLIGENCE
        </span>
      )}
    </div>
  </div>
);
