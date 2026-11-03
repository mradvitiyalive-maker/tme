import React, { useMemo } from 'react';

interface BalloonData {
  id: number;
  left: number; // percentage (0 - 95%)
  duration: number; // seconds
  delay: number; // seconds
  scale: number;
  color: string;
  stringWiggle: number;
  opacity: number;
}

const BALLOON_PALETTE = [
  '#F8DDE5', // Pastel pink
  '#EBA8BC', // Soft rose
  '#E8E1FA', // Lavender
  '#FFDCC5', // Soft peach
  '#FDE68A', // Warm yellow/cream
  '#FECDD3', // Light rose
];

export const FloatingBalloonsBackground: React.FC = () => {
  // Generate randomized balloons once on mount
  const balloons = useMemo<BalloonData[]>(() => {
    const list: BalloonData[] = [];
    const count = 12; // A tasteful number: festive yet never cluttered or distracting
    for (let i = 0; i < count; i++) {
      list.push({
        id: i,
        // Distribute nicely across screen width with jitter
        left: (i * (92 / count) + Math.random() * 6 + 2) % 94,
        duration: 16 + Math.random() * 12, // 16s to 28s slow drift
        delay: Math.random() * 18, // staggered starts
        scale: 0.75 + Math.random() * 0.45, // 0.75x to 1.2x size
        color: BALLOON_PALETTE[i % BALLOON_PALETTE.length],
        stringWiggle: (i % 2 === 0 ? 1 : -1) * (4 + Math.random() * 6),
        opacity: 0.55 + Math.random() * 0.3, // Soft, semi-translucent
      });
    }
    return list;
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {balloons.map((b) => (
        <div
          key={b.id}
          className="absolute bottom-[-160px] animate-balloon-float"
          style={{
            left: `${b.left}%`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear',
            transform: `scale(${b.scale})`,
            opacity: b.opacity,
          }}
        >
          {/* Balloon SVG */}
          <div className="relative animate-balloon-sway" style={{ animationDuration: `${3.5 + (b.id % 3)}s` }}>
            <svg
              width="60"
              height="80"
              viewBox="0 0 60 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-xs"
            >
              {/* Balloon Body */}
              <ellipse
                cx="30"
                cy="32"
                rx="24"
                ry="28"
                fill={b.color}
                stroke="#352D32"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              {/* Glossy light highlight curve */}
              <path
                d="M18 18 C 15 24, 15 34, 19 40"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.75"
              />
              {/* Little sparkle dot */}
              <circle cx="21" cy="15" r="1.5" fill="white" opacity="0.9" />

              {/* Balloon Knot */}
              <path
                d="M26 60 L34 60 L32 64 L28 64 Z"
                fill={b.color}
                stroke="#352D32"
                strokeWidth="1.5"
              />

              {/* Balloon String / Ribbon */}
              <path
                d={`M30 64 Q ${30 + b.stringWiggle} 70, 30 76 T ${30 - b.stringWiggle} 88 T 30 100`}
                stroke="#786B73"
                strokeWidth="1.2"
                fill="none"
                strokeDasharray="2 1"
                opacity="0.85"
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};
