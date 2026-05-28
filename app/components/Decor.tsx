import type { CSSProperties, ReactNode } from "react";

export const PinTag = ({
  children,
  color = "currentColor",
}: {
  children: ReactNode;
  color?: string;
}) => (
  <span className="pin-tag" style={{ color }}>
    <span className="end-cap-l" />
    {children}
    <span className="end-cap-r" />
  </span>
);

export const Steam = () => (
  <svg
    className="steam"
    viewBox="0 0 1440 900"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <defs>
      <radialGradient id="g1" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#e58a44" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#e58a44" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="g2" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0f4d33" stopOpacity="0.18" />
        <stop offset="100%" stopColor="#0f4d33" stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="320" cy="560" r="240" fill="url(#g1)">
      <animate
        attributeName="cy"
        values="560;540;560"
        dur="9s"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="1180" cy="240" r="320" fill="url(#g2)">
      <animate
        attributeName="cy"
        values="240;220;240"
        dur="11s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

export const SpinSeal = ({
  text = "IBRIK KITCHEN · BUN VENIT · ",
  color = "currentColor",
  size = 130,
}: {
  text?: string;
  color?: string;
  size?: number;
}) => {
  const r = size / 2 - 14;
  const cx = size / 2;
  const cy = size / 2;
  const style: CSSProperties = { width: size, height: size, color };
  return (
    <div className="spinner" style={style}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <path
            id="circ"
            d={`M ${cx},${cy} m -${r},0 a ${r},${r} 0 1,1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0`}
          />
        </defs>
        <text
          fill={color}
          fontFamily="DM Mono, monospace"
          fontSize="9.5"
          letterSpacing="2"
        >
          <textPath href="#circ">{text.repeat(3)}</textPath>
        </text>
        <circle cx={cx} cy={cy} r="8" fill={color} />
      </svg>
    </div>
  );
};

export const ImageSlot = ({
  placeholder,
  style,
}: {
  placeholder: string;
  style?: CSSProperties;
}) => (
  <div className="image-slot" style={style} role="img" aria-label={placeholder}>
    <span>{placeholder}</span>
  </div>
);
