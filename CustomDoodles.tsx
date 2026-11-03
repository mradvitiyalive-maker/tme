import React from 'react';

export const HandDrawnHeart: React.FC<{ className?: string; fill?: string }> = ({
  className = 'w-6 h-6',
  fill = '#EBA8BC',
}) => (
  <svg
    viewBox="0 0 100 100"
    className={`inline-block ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M50 82C50 82 15 58 15 35C15 20 28 12 40 16C46 18 50 24 50 24C50 24 54 18 60 16C72 12 85 20 85 35C85 58 50 82 50 82Z"
      fill={fill}
      stroke="#352D32"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M26 28C23 35 25 42 27 45"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      opacity="0.8"
    />
  </svg>
);

export const HandDrawnStar: React.FC<{ className?: string; fill?: string }> = ({
  className = 'w-5 h-5',
  fill = '#FDE68A',
}) => (
  <svg
    viewBox="0 0 100 100"
    className={`inline-block ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M50 8L61 36L92 38L67 58L75 88L50 71L25 88L33 58L8 38L39 36L50 8Z"
      fill={fill}
      stroke="#352D32"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const WashiTape: React.FC<{ color?: 'pink' | 'lavender' | 'peach'; className?: string }> = ({
  color = 'pink',
  className = '',
}) => {
  const colorMap = {
    pink: 'bg-[#F8DDE5] border-[#EBA8BC]',
    lavender: 'bg-[#E8E1FA] border-[#D4C7F5]',
    peach: 'bg-[#FFDCC5] border-[#FBC5A8]',
  };
  return (
    <div
      className={`h-4.5 w-24 sm:w-28 opacity-85 shadow-sm border-t border-b border-dashed -rotate-2 select-none pointer-events-none rounded-xs ${colorMap[color]} ${className}`}
      style={{
        clipPath: 'polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)',
      }}
    />
  );
};

export const StampBadge: React.FC<{ text: string; subtext?: string; className?: string; rotate?: string }> = ({
  text,
  subtext,
  className = '',
  rotate = '-rotate-6',
}) => (
  <div
    className={`inline-flex flex-col items-center justify-center border-2 border-dashed border-[#EBA8BC] bg-[#FFF9F2]/90 px-3 py-1.5 rounded-lg text-xs font-heading text-[#786B73] shadow-xs select-none ${rotate} ${className}`}
  >
    <span className="font-bold tracking-wider uppercase text-[11px] text-[#352D32]">{text}</span>
    {subtext && <span className="text-[9px] text-[#EBA8BC] font-semibold">{subtext}</span>}
  </div>
);

export const ClassroomBenchIllustration: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => (
  <svg
    viewBox="0 0 400 240"
    className={`max-w-md mx-auto ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Blackboard at front */}
    <rect x="50" y="20" width="300" height="70" rx="6" fill="#3A4D39" stroke="#5E4E3E" strokeWidth="4" />
    <path d="M70 65 Q 120 60 170 65 T 270 63" stroke="#F0F3E8" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
    <text x="210" y="78" fill="#F8DDE5" fontSize="10" fontFamily="Caveat" opacity="0.95">
      Nobody was listening anyway 💀
    </text>

    {/* Front Benches */}
    <rect x="70" y="115" width="100" height="15" rx="3" fill="#D2B48C" stroke="#352D32" strokeWidth="2" />
    <rect x="230" y="115" width="100" height="15" rx="3" fill="#D2B48C" stroke="#352D32" strokeWidth="2" />
    <text x="95" y="126" fill="#786B73" fontSize="9" fontFamily="Poppins">Front Bench</text>
    <text x="250" y="126" fill="#786B73" fontSize="9" fontFamily="Poppins">Studious Kids</text>

    {/* Middle row lines */}
    <line x1="80" y1="150" x2="160" y2="150" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="4 4" />
    <line x1="240" y1="150" x2="320" y2="150" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="4 4" />

    {/* The Legendary Last Bench (Spotlighted!) */}
    <ellipse cx="200" cy="195" rx="140" ry="32" fill="#F8DDE5" opacity="0.4" />
    <rect x="90" y="175" width="220" height="26" rx="5" fill="#E8A87C" stroke="#352D32" strokeWidth="3" />
    
    {/* Bench legs */}
    <line x1="110" y1="201" x2="108" y2="230" stroke="#352D32" strokeWidth="3.5" strokeLinecap="round" />
    <line x1="290" y1="201" x2="292" y2="230" stroke="#352D32" strokeWidth="3.5" strokeLinecap="round" />
    <line x1="190" y1="201" x2="190" y2="230" stroke="#352D32" strokeWidth="2" strokeLinecap="round" />

    {/* Two students doodle on the last bench */}
    {/* Student 1 (You - doing nonsense / poking with pen) */}
    <g transform="translate(130, 145)">
      <circle cx="20" cy="15" r="14" fill="#FFDCC5" stroke="#352D32" strokeWidth="2.5" />
      {/* Hair */}
      <path d="M8 12 Q 20 2 32 10" fill="#352D32" />
      {/* Silly face */}
      <circle cx="16" cy="14" r="1.5" fill="#352D32" />
      <circle cx="24" cy="14" r="1.5" fill="#352D32" />
      <path d="M16 20 Q 20 24 24 20" stroke="#352D32" strokeWidth="1.5" strokeLinecap="round" />
      {/* Uniform */}
      <path d="M8 29 L32 29 L30 46 L10 46 Z" fill="#93C5FD" stroke="#352D32" strokeWidth="2" />
      {/* Arm reaching out talking / gesturing */}
      <path d="M30 35 Q 45 32 54 28" stroke="#352D32" strokeWidth="2.5" strokeLinecap="round" />
      {/* Chat bubble */}
      <text x="-12" y="-2" fill="#EBA8BC" fontSize="16">💬</text>
    </g>

    {/* Student 2 (Meitrii - laughing!) */}
    <g transform="translate(210, 145)">
      <circle cx="20" cy="15" r="14" fill="#FFDCC5" stroke="#352D32" strokeWidth="2.5" />
      {/* Hair ponytail */}
      <path d="M6 14 Q 20 0 34 14" fill="#4B382A" stroke="#352D32" strokeWidth="1.5" />
      <path d="M33 16 Q 42 20 38 28" stroke="#4B382A" strokeWidth="4" strokeLinecap="round" />
      {/* Laughing eyes & big smile */}
      <path d="M14 14 Q 17 11 19 14" stroke="#352D32" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M23 14 Q 26 11 28 14" stroke="#352D32" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M16 19 Q 21 26 26 19" stroke="#E11D48" strokeWidth="2" fill="#F8DDE5" strokeLinecap="round" />
      {/* Uniform */}
      <path d="M8 29 L32 29 L30 46 L10 46 Z" fill="#FCA5A5" stroke="#352D32" strokeWidth="2" />
      {/* Laughing tears */}
      <text x="35" y="8" fill="#F43F5E" fontSize="12">😂</text>
    </g>

    {/* Doodled books on bench */}
    <rect x="175" y="168" width="18" height="8" rx="1" fill="#E8E1FA" stroke="#352D32" strokeWidth="1.5" />
    <rect x="174" y="162" width="19" height="7" rx="1" fill="#FEF08A" stroke="#352D32" strokeWidth="1.5" />

    {/* Last Bench Crown Banner */}
    <g transform="translate(145, 208)">
      <rect x="0" y="0" width="110" height="20" rx="10" fill="#352D32" />
      <text x="12" y="14" fill="#FFF9F2" fontSize="9.5" fontFamily="Fredoka" fontWeight="bold">
        👑 LAST BENCH HQ
      </text>
    </g>
  </svg>
);

export const InteractiveCake: React.FC<{
  lit: boolean;
  onToggleBlow: () => void;
}> = ({ lit, onToggleBlow }) => (
  <div className="relative inline-block cursor-pointer select-none group" onClick={onToggleBlow} title={lit ? "Click to blow out the candle!" : "Click to relight the candle!"}>
    <svg viewBox="0 0 200 180" className="w-40 sm:w-48 h-auto mx-auto filter drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Plate */}
      <ellipse cx="100" cy="162" rx="85" ry="14" fill="#E8E1FA" stroke="#352D32" strokeWidth="3" />

      {/* Bottom Tier */}
      <path
        d="M35 125 C35 110, 45 105, 100 105 C155 105, 165 110, 165 125 L165 152 C165 162, 140 168, 100 168 C60 168, 35 162, 35 152 Z"
        fill="#FFDCC5"
        stroke="#352D32"
        strokeWidth="3"
      />
      {/* Strawberry drip frosting */}
      <path
        d="M35 125 Q45 138 55 125 Q65 142 75 125 Q85 140 95 125 Q105 145 115 125 Q125 140 135 125 Q145 142 155 125 Q160 136 165 125 L165 115 C165 105 145 102 100 102 C55 102 35 105 35 115 Z"
        fill="#F8DDE5"
        stroke="#EBA8BC"
        strokeWidth="1.5"
      />

      {/* Top Tier */}
      <path
        d="M55 85 C55 75, 70 70, 100 70 C130 70, 145 75, 145 85 L145 105 C145 112, 125 118, 100 118 C75 118, 55 112, 55 105 Z"
        fill="#FFF9F2"
        stroke="#352D32"
        strokeWidth="3"
      />
      {/* Pastel lavender drips */}
      <path
        d="M55 85 Q65 96 75 85 Q85 98 95 85 Q105 98 115 85 Q125 96 135 85 Q140 93 145 85 L145 80 C145 72 130 68 100 68 C70 68 55 72 55 80 Z"
        fill="#E8E1FA"
      />

      {/* Cherries / Sprinkles */}
      <circle cx="75" cy="84" r="4" fill="#F43F5E" />
      <circle cx="100" cy="85" r="4" fill="#F43F5E" />
      <circle cx="125" cy="84" r="4" fill="#F43F5E" />

      {/* Candle */}
      <rect x="96" y="38" width="8" height="34" rx="2" fill="#FDE68A" stroke="#352D32" strokeWidth="2" />
      <line x1="97" y1="44" x2="103" y2="48" stroke="#F43F5E" strokeWidth="1.5" />
      <line x1="97" y1="54" x2="103" y2="58" stroke="#F43F5E" strokeWidth="1.5" />
      <line x1="100" y1="38" x2="100" y2="30" stroke="#352D32" strokeWidth="1.5" />

      {/* Candle Flame (Interactive!) */}
      {lit ? (
        <g className="animate-flicker">
          <ellipse cx="100" cy="22" rx="6" ry="11" fill="#F59E0B" />
          <ellipse cx="100" cy="23" rx="3.5" ry="7" fill="#FEF08A" />
          <ellipse cx="100" cy="24" rx="1.5" ry="3.5" fill="#FFFFFF" />
        </g>
      ) : (
        <g opacity="0.6">
          {/* Gentle smoke curls */}
          <path d="M100 30 Q 95 24 102 18 Q 97 12 101 6" stroke="#9CA3AF" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      )}
    </svg>

    <div className="text-center mt-1">
      <span className="inline-block text-[11px] font-heading font-medium bg-[#FFF9F2] px-2.5 py-0.5 rounded-full border border-[#EBA8BC] text-[#786B73] shadow-xs group-hover:scale-105 transition-transform">
        {lit ? '💨 Click cake candle to blow it out!' : '✨ Click to relight candle!'}
      </span>
    </div>
  </div>
);
