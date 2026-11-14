import React from 'react';

/**
 * Art Nouveau Botanical SVGs: Whiplash tendrils, lily blossoms,
 * floral corner cartouches, stained-glass medallions, and ornamental dividers.
 */

// Whiplash Horizontal Divider with floral crest
export const WhiplashDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`w-full flex items-center justify-center my-8 select-none ${className}`}>
    <svg
      viewBox="0 0 1200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-4xl h-10 text-[#CFB53B]"
    >
      {/* Central Lily / Iris Crest */}
      <path
        d="M600 8 C600 8 592 24 584 28 C576 32 562 26 564 36 C566 46 580 44 594 38 C598 46 600 52 600 52 C600 52 602 46 606 38 C620 44 634 46 636 36 C638 26 624 32 616 28 C608 24 600 8 600 8 Z"
        fill="#CFB53B"
        opacity="0.9"
      />
      <circle cx="600" cy="22" r="3" fill="#008080" />
      <circle cx="586" cy="34" r="2" fill="#800020" />
      <circle cx="614" cy="34" r="2" fill="#800020" />

      {/* Whiplash curves left */}
      <path
        d="M564 34 C520 30 460 48 400 32 C340 16 280 46 210 32 C150 20 90 38 10 30"
        stroke="#CFB53B"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M540 38 C490 46 440 26 380 40 C320 52 260 28 190 38 C130 48 80 34 20 36"
        stroke="#008080"
        strokeWidth="1"
        strokeDasharray="4 4"
        opacity="0.75"
      />
      <path
        d="M390 34 C385 24 370 20 365 28 C360 36 375 42 385 36"
        stroke="#CFB53B"
        strokeWidth="1.2"
        fill="rgba(207, 181, 59, 0.15)"
      />
      <path
        d="M215 33 C210 23 195 19 190 27 C185 35 200 41 210 35"
        stroke="#CFB53B"
        strokeWidth="1.2"
        fill="rgba(0, 128, 128, 0.15)"
      />

      {/* Whiplash curves right */}
      <path
        d="M636 34 C680 30 740 48 800 32 C860 16 920 46 990 32 C1050 20 1110 38 1190 30"
        stroke="#CFB53B"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M660 38 C710 46 760 26 820 40 C880 52 940 28 1010 38 C1070 48 1120 34 1180 36"
        stroke="#008080"
        strokeWidth="1"
        strokeDasharray="4 4"
        opacity="0.75"
      />
      <path
        d="M810 34 C815 24 830 20 835 28 C840 36 825 42 815 36"
        stroke="#CFB53B"
        strokeWidth="1.2"
        fill="rgba(207, 181, 59, 0.15)"
      />
      <path
        d="M985 33 C990 23 1005 19 1010 27 C1015 35 1000 41 990 35"
        stroke="#CFB53B"
        strokeWidth="1.2"
        fill="rgba(0, 128, 128, 0.15)"
      />
    </svg>
  </div>
);

// Ornate Corner Flourish for Cards
export const OrnateCorner: React.FC<{
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}> = ({ position = 'top-left', className = '' }) => {
  const getTransform = () => {
    switch (position) {
      case 'top-right':
        return 'scaleX(-1)';
      case 'bottom-left':
        return 'scaleY(-1)';
      case 'bottom-right':
        return 'scale(-1, -1)';
      default:
        return 'none';
    }
  };

  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: getTransform() }}
      className={`w-10 h-10 pointer-events-none text-[#CFB53B] ${className}`}
    >
      <path
        d="M2 58 C2 24 24 2 58 2"
        stroke="#CFB53B"
        strokeWidth="1.5"
      />
      <path
        d="M8 58 C8 30 30 8 58 8"
        stroke="#008080"
        strokeWidth="1"
        opacity="0.6"
      />
      <path
        d="M6 34 C12 28 22 22 32 26 C26 34 16 38 6 34 Z"
        fill="rgba(207, 181, 59, 0.25)"
        stroke="#CFB53B"
        strokeWidth="0.75"
      />
      <circle cx="28" cy="28" r="2.5" fill="#800020" />
      <circle cx="12" cy="12" r="3" fill="#CFB53B" />
    </svg>
  );
};

// Stained Glass Arch Medallion
export const StainedGlassMedallion: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative inline-flex items-center justify-center p-3 ${className}`}>
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-16 h-16"
    >
      {/* Outer lead caming ring */}
      <circle cx="50" cy="50" r="46" stroke="#CFB53B" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="42" stroke="#17211C" strokeWidth="1" strokeDasharray="2 3" />

      {/* Petal facets */}
      <path
        d="M50 8 C40 26 40 40 50 50 C60 40 60 26 50 8 Z"
        fill="rgba(0, 128, 128, 0.45)"
        stroke="#CFB53B"
        strokeWidth="1.2"
      />
      <path
        d="M50 92 C40 74 40 60 50 50 C60 60 60 74 50 92 Z"
        fill="rgba(0, 128, 128, 0.45)"
        stroke="#CFB53B"
        strokeWidth="1.2"
      />
      <path
        d="M8 50 C26 40 40 40 50 50 C40 60 26 60 8 50 Z"
        fill="rgba(224, 176, 255, 0.4)"
        stroke="#CFB53B"
        strokeWidth="1.2"
      />
      <path
        d="M92 50 C74 40 60 40 50 50 C60 60 74 60 92 50 Z"
        fill="rgba(224, 176, 255, 0.4)"
        stroke="#CFB53B"
        strokeWidth="1.2"
      />

      {/* Diagonal facets */}
      <circle cx="28" cy="28" r="8" fill="rgba(207, 181, 59, 0.35)" stroke="#CFB53B" strokeWidth="1" />
      <circle cx="72" cy="28" r="8" fill="rgba(207, 181, 59, 0.35)" stroke="#CFB53B" strokeWidth="1" />
      <circle cx="28" cy="72" r="8" fill="rgba(207, 181, 59, 0.35)" stroke="#CFB53B" strokeWidth="1" />
      <circle cx="72" cy="72" r="8" fill="rgba(207, 181, 59, 0.35)" stroke="#CFB53B" strokeWidth="1" />

      {/* Center jewel */}
      <circle cx="50" cy="50" r="7" fill="#800020" stroke="#CFB53B" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="3" fill="#FFFFF0" />
    </svg>
  </div>
);

// Botanical Floral Branch Crest
export const BotanicalBranch: React.FC<{ className?: string; flipped?: boolean }> = ({
  className = '',
  flipped = false,
}) => (
  <svg
    viewBox="0 0 200 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: flipped ? 'scaleX(-1)' : 'none' }}
    className={`w-32 h-14 ${className}`}
  >
    {/* Stem */}
    <path
      d="M10 65 C40 60 70 35 120 40 C160 45 180 20 195 15"
      stroke="#CFB53B"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Leaves */}
    <path
      d="M45 55 C40 40 55 35 65 42 C60 50 50 55 45 55 Z"
      fill="rgba(0, 128, 128, 0.25)"
      stroke="#008080"
      strokeWidth="1.2"
    />
    <path
      d="M85 40 C85 25 102 22 110 32 C102 40 92 42 85 40 Z"
      fill="rgba(128, 128, 0, 0.25)"
      stroke="#808000"
      strokeWidth="1.2"
    />
    <path
      d="M135 40 C140 25 158 26 160 36 C152 42 142 42 135 40 Z"
      fill="rgba(0, 128, 128, 0.25)"
      stroke="#008080"
      strokeWidth="1.2"
    />
    {/* Blossom Buds */}
    <circle cx="120" cy="26" r="3" fill="#800020" />
    <circle cx="170" cy="22" r="3" fill="#CFB53B" />
    <circle cx="195" cy="15" r="4" fill="#008080" stroke="#CFB53B" strokeWidth="1" />
  </svg>
);
