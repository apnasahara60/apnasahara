import React from 'react';

/**
 * Clean UI separators and layout helpers (floral and decorative curves removed)
 */

// Simple clean divider
export const WhiplashDivider: React.FC<{
  className?: string;
  color?: string;
}> = ({ className = '' }) => (
  <div className={`w-full max-w-5xl mx-auto px-6 my-8 ${className}`}>
    <hr className="border-[#CFB53B]/20" />
  </div>
);

// Corner flourish removed
export const OrnateCorner: React.FC<{
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  color?: string;
  size?: number;
}> = () => null;

// Medallion removed
export const StainedGlassMedallion: React.FC<{
  className?: string;
  color?: string;
}> = () => null;

// Floral branch crest removed
export const BotanicalBranch: React.FC<{
  className?: string;
  flipped?: boolean;
}> = () => null;
